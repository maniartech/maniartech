/**
 * Go WASM Loader - Handles loading and initialization of Go WASM modules
 * with proper import object setup for syscall/js compatibility
 */

/**
 * Create the import object with gojs module stubs required by Go's WASM runtime
 */
function createGoImportObject() {
  let memory = null;
  const getMemory = () => memory;

  // syscall/js support - value references
  const values = [
    NaN, 0, null, undefined, true, false,
    window, // global (ref 6)
    null,   // memory (ref 7) - will be set to {buffer: memory.buffer}
  ];

  const loadValue = (ref) => values[ref];

  const readString = (ptr, len) => {
    const mem = getMemory();
    if (!mem) return "";
    return new TextDecoder().decode(new Uint8Array(mem.buffer, ptr, len));
  };

  return {
    // Go's syscall/js module stubs
    gojs: {
      // Runtime functions
      "runtime.wasmExit": (code) => console.log("WASM Exit:", code),
      "runtime.wasmWrite": (fd, ptr, len) => {
        const mem = getMemory();
        if (mem) console.log(new TextDecoder().decode(new Uint8Array(mem.buffer, ptr, len)));
      },
      "runtime.resetMemoryDataView": () => { },
      "runtime.nanotime1": () => BigInt(Date.now()) * BigInt(1000000),
      "runtime.walltime1": () => {
        const now = Date.now();
        return [Math.floor(now / 1000), (now % 1000) * 1000000];
      },
      "runtime.ticks": () => BigInt(Date.now()),
      "runtime.scheduleTimeoutEvent": () => 0,
      "runtime.clearTimeoutEvent": () => { },

      // syscall/js implementation
      "syscall/js.stringVal": (ptr, len) => {
        const s = readString(ptr, len);
        values.push(s);
        return values.length - 1;
      },
      "syscall/js.valueGet": (v_ref, p_ptr, p_len) => {
        const v = loadValue(v_ref);
        const p = readString(p_ptr, p_len);
        const res = v[p];
        values.push(res);
        return values.length - 1;
      },
      "syscall/js.valueSet": (v_ref, p_ptr, p_len, x_ref) => {
        const v = loadValue(v_ref);
        const p = readString(p_ptr, p_len);
        const x = loadValue(x_ref);
        v[p] = x;
        if (v === window && p === "extractPDF") {
          console.log("✓ WASM registered window.extractPDF via syscall/js");
        }
      },
      "syscall/js.valueIndex": (v_ref, i) => {
        const res = loadValue(v_ref)[i];
        values.push(res);
        return values.length - 1;
      },
      "syscall/js.valueSetIndex": (v_ref, i, x_ref) => {
        loadValue(v_ref)[i] = loadValue(x_ref);
      },
      "syscall/js.valueCall": () => 3, // undefined
      "syscall/js.valueNew": () => 3,
      "syscall/js.valueLength": (v_ref) => {
        const v = loadValue(v_ref);
        return v ? v.length : 0;
      },
      "syscall/js.valuePrepareString": (v_ref) => {
        const s = String(loadValue(v_ref));
        const b = new TextEncoder().encode(s);
        values.push(b);
        return [values.length - 1, b.length];
      },
      "syscall/js.valueLoadString": (v_ref, ptr, len) => {
        const b = loadValue(v_ref);
        new Uint8Array(getMemory().buffer, ptr, len).set(b);
      },
      "syscall/js.copyBytesToGo": (dst_ptr, dst_len, src_ref) => {
        const src = loadValue(src_ref);
        if (!(src instanceof Uint8Array || src instanceof Uint8ClampedArray)) return false;
        new Uint8Array(getMemory().buffer, dst_ptr, dst_len).set(src);
        return true;
      },
      "syscall/js.copyBytesToJS": (dst_ref, src_ptr, src_len) => {
        const dst = loadValue(dst_ref);
        if (!(dst instanceof Uint8Array || dst instanceof Uint8ClampedArray)) return false;
        dst.set(new Uint8Array(getMemory().buffer, src_ptr, src_len));
        return true;
      },
      "syscall/js.valueInstanceOf": () => false,
      "syscall/js.valueInvoke": () => 3,
      "syscall/js.valueDelete": () => 0,
      "syscall/js.finalizeRef": () => 0,
      "syscall/js.tryAcquire": () => 0,
      "syscall/js.tryRelease": () => 0,
      "syscall/js.scheduleMicrotask": () => 0,
      "debug/js.log": (v) => console.log("WASM Debug:", v),
      "debug/js.resume": () => 0,
      "debug/js.Call": () => 0,
      "debug/js.Eval": () => 0,
    },
    // WASI compatibility stubs
    wasi_snapshot_preview1: {
      fd_write: () => 0,
      fd_read: () => 0,
      fd_close: () => 0,
      fd_seek: () => 0,
      proc_exit: () => { },
      environ_get: () => 0,
      environ_sizes_get: () => 0,
      args_get: () => 0,
      args_sizes_get: () => 0,
      clock_time_get: () => 0,
      random_get: () => 0,
      poll_oneoff: () => 0,
    },
    wasi_unstable: {
      fd_write: () => 0,
      fd_read: () => 0,
      fd_close: () => 0,
      proc_exit: () => { },
      environ_get: () => 0,
      environ_sizes_get: () => 0,
    },
    env: {},
    __setMemory: (mem) => {
      memory = mem;
      values[7] = { buffer: memory.buffer };
    },
  };
}

/**
 * Load and initialize a Go WASM module
 * @param {string} wasmPath - Path to the .wasm file
 * @returns {Promise<Object>} - Object with exported WASM functions
 */
async function loadGoWasm(wasmPath) {
  try {
    // Create the import object with Go runtime stubs
    const importObject = createGoImportObject();

    // Fetch and instantiate the WASM module
    const response = await fetch(wasmPath);
    if (!response.ok) {
      throw new Error(`Failed to fetch WASM: ${response.statusText}`);
    }

    const buffer = await response.arrayBuffer();
    const wasmModule = await WebAssembly.instantiate(buffer, importObject);

    // The Go runtime expects memory and other exports to be available
    // Export the module instance for access to exported functions
    const instance = wasmModule.instance;

    // Wire up memory for syscall/js
    if (typeof importObject.__setMemory === "function" && instance.exports && instance.exports.memory) {
      importObject.__setMemory(instance.exports.memory);
    }

    // Try to start the module if it exposes a start/run function (do this asynchronously
    // so we don't block the main thread). Go's runtime normally needs to be started so
    // that `main()` runs and it can register exported helpers on `window` (e.g. `extractPDF`).
    try {
      if (typeof instance.exports._start === "function") {
        setTimeout(() => {
          try { instance.exports._start(); } catch (e) { console.error("Error while running _start:", e); }
        }, 0);
      } else if (typeof instance.exports.run === "function") {
        setTimeout(() => {
          try { instance.exports.run(); } catch (e) { console.error("Error while running run:", e); }
        }, 0);
      }
    } catch (e) {
      console.warn("Unable to auto-start WASM module:", e);
    }

    // If the Go code provided an init function, call it (it may set up exports)
    if (typeof window.initWasm === "function") {
      try { window.initWasm(); } catch (e) { console.warn("initWasm threw:", e); }
    }

    // Wait briefly for the Go code to register `extractPDF` on the global object.
    const waitForExport = (name, timeoutMs = 2000) => new Promise((resolve) => {
      const start = Date.now();
      (function poll() {
        if (typeof window[name] === "function") return resolve(window[name]);
        if (Date.now() - start > timeoutMs) return resolve(null);
        setTimeout(poll, 50);
      })();
    });

    const exportedExtract = await waitForExport("extractPDF", 2000);

    // Return the exported functions from the WASM module (include the discovered function if present)
    return {
      instance: instance,
      exports: instance.exports,
      extractPDF: exportedExtract,
    };
  } catch (error) {
    console.error("Failed to load Go WASM module:", error);
    throw error;
  }
}

/**
 * Simple wrapper for extractPDF with proper error handling
 * @param {Uint8Array} pdfBuffer - PDF file as Uint8Array
 * @returns {Promise<string>} - Extracted text from PDF
 */
async function extractPDFText(pdfBuffer, wasmModule) {
  try {
    // Prefer an explicitly provided module export, otherwise fall back to the global
    let fn = (wasmModule && wasmModule.extractPDF) || window.extractPDF;

    // If it's not yet available, try to auto-initialize the default WASM file and retry
    if (typeof fn !== "function") {
      console.warn("extractPDF not found; attempting to load default WASM at ./extractor.wasm");
      try {
        const mod = await loadGoWasm("./extractor.wasm");
        fn = (mod && mod.extractPDF) || window.extractPDF;
      } catch (e) {
        console.warn("Auto-load of default WASM failed:", e);
      }
    }

    if (typeof fn !== "function") {
      throw new Error("extractPDF function not available - WASM module not loaded");
    }

    const result = fn(pdfBuffer);

    if (result && result.error) {
      throw new Error(`PDF extraction failed: ${result.error}`);
    }

    return result ? result.text : null;
  } catch (error) {
    console.error("Error extracting PDF:", error);
    throw error;
  }
}

// Export for use in modules
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    loadGoWasm,
    extractPDFText,
    createGoImportObject,
  };
}