# WASM PDF Extraction Integration

To offload PDF extraction to the frontend, you can use the generated `pdf_extractor.wasm` file.

## Prerequisites

1.  **wasm_exec.js**: You need the `wasm_exec.js` file from your Go installation. You can find it at `$(go env GOROOT)/misc/wasm/wasm_exec.js`.
2.  **pdf_extractor.wasm**: Build it using `.\build_wasm.ps1`.

## Integration Example

````html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <script src="wasm_exec.js"></script>
    <script>
      const go = new Go();
      WebAssembly.instantiateStreaming(
        fetch("pdf_extractor.wasm"),
        go.importObject
      ).then((result) => {
        go.run(result.instance);
        console.log("WASM Loaded");
      });

      async function handleFileSelect(event) {
        const file = event.target.files[0];
        if (!file) return;

        const arrayBuffer = await file.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);

        // Call the Go function
        const result = extractPDF(uint8Array);

        if (result.error) {
          console.error("Extraction failed:", result.error);
          document.getElementById("output").innerText =
            "Error: " + result.error;
        } else {
          console.log("Extracted Text:", result.text);
          document.getElementById("output").innerText = result.text;

          // Now you can send this text to the Lambda instead of the PDF bytes
          // sendToLambda(result.text);
        }
      }
    </script></head
  ># Go WASM PDF Extractor - Setup & Usage Guide ## Overview This WASM module
  extracts text from PDF files directly in the browser using Go compiled to
  WebAssembly. It uses Go's standard `syscall/js` interface for JavaScript
  interoperability. ## Files - **cmd/wasm/main.go** - Go source code compiled to
  WASM - **cmd/wasm/loader.js** - JavaScript loader with proper import object
  setup - **cmd/wasm/index.html** - Example HTML page with PDF extractor UI -
  **build_wasm.ps1** - PowerShell build script (Windows) ## Building the WASM
  Module ### Windows (PowerShell) ```powershell .\build_wasm.ps1
</html>
````

### macOS/Linux

```bash
GOOS=js GOARCH=wasm go build -o cmd/wasm/extractor.wasm ./cmd/wasm
```

### Manual Build with Optimization

```bash
GOOS=js GOARCH=wasm go build -ldflags="-s -w" -o cmd/wasm/extractor.wasm ./cmd/wasm
```

## How It Works

### Go WASM Runtime Requirements

Go's WASM target uses `syscall/js` which requires specific imports:

1. **gojs module** - Go runtime function stubs
2. **WASI imports** - WebAssembly System Interface stubs
3. **Environment** - Standard environment exports

### Import Object Structure

```javascript
const importObject = {
  gojs: {
    // Go runtime stubs (see loader.js)
    "runtime.wasmExit": () => {},
    "runtime.nanotime1": () => BigInt(Date.now()) * BigInt(1000000),
    // ... more stubs
  },
  wasi_unstable: {
    fd_write: () => 0,
    fd_close: () => 0,
    // ... more WASI stubs
  },
  env: {},
};
```

### Loading the Module

```javascript
// Option 1: Using the loader
const wasm = await loadGoWasm("./extractor.wasm");

// Option 2: Direct call after initialization
const result = window.extractPDF(uint8Array);
```

## API

### extractPDF(pdfBuffer: Uint8Array)

Extracts text from a PDF file.

**Parameters:**

- `pdfBuffer` (Uint8Array) - PDF file contents as binary data

**Returns:**

```javascript
{
  text: "extracted text...",  // Success
  // or
  error: "error message"      // Error
}
```

**Example:**

```javascript
const fileBuffer = await file.arrayBuffer();
const uint8Array = new Uint8Array(fileBuffer);

const result = window.extractPDF(uint8Array);
if (result.error) {
  console.error("Extraction failed:", result.error);
} else {
  console.log("Extracted:", result.text);
}
```

## Integration Steps

### 1. Build the WASM Module

```bash
GOOS=js GOARCH=wasm go build -o ./extractor.wasm ./cmd/wasm
```

### 2. Include JavaScript Loader

```html
<script src="loader.js"></script>
```

### 3. Initialize on Page Load

```javascript
window.addEventListener("load", async () => {
  try {
    await loadGoWasm("./extractor.wasm");
    console.log("WASM ready!");
  } catch (error) {
    console.error("Failed to load WASM:", error);
  }
});
```

### 4. Use the API

```javascript
document.getElementById("pdfInput").addEventListener("change", async (e) => {
  const file = e.target.files[0];
  const buffer = await file.arrayBuffer();
  const uint8Array = new Uint8Array(buffer);

  const result = window.extractPDF(uint8Array);
  console.log(result.text || result.error);
});
```

## Troubleshooting

### "module is not an object or function" Error

- **Cause:** Missing gojs module in import object
- **Solution:** Ensure loader.js is loaded before instantiating WASM
- **Fix:** loader.js provides complete import object with all stubs

### "extractPDF is not a function"

- **Cause:** WASM module not fully initialized
- **Solution:** Wait for load event and check wasmReady flag
- **Fix:** Use loadGoWasm() which handles initialization

### Large File Sizes

- **Issue:** WASM file is large (~4-5MB uncompressed)
- **Solution:** Enable gzip compression on server
- **Optimization:** Use `-ldflags="-s -w"` during build

### Slow on First Load

- **Cause:** WASM module instantiation and compilation
- **Solution:** Show loading indicator
- **Optimization:** Cache WASM in Service Worker (optional)

## Performance

- **File Size:** ~2-3MB gzip compressed
- **Load Time:** ~500ms on 4G
- **Processing:** Depends on PDF size
  - Small PDFs (<5MB): <100ms
  - Medium PDFs (5-20MB): 100-500ms
  - Large PDFs (>20MB): >1s

## Security

- ✅ No server communication - all processing local
- ✅ No data collection
- ✅ No external dependencies
- ✅ Runs in browser sandbox

## Browser Compatibility

| Browser | Support | Notes                 |
| ------- | ------- | --------------------- |
| Chrome  | ✅ Full | 57+ required for WASM |
| Firefox | ✅ Full | 52+ required for WASM |
| Safari  | ✅ Full | 11+ required for WASM |
| Edge    | ✅ Full | 79+ Chromium-based    |
| IE 11   | ❌ No   | No WASM support       |

## Further Development

To add more functions:

1. Add Go function in `cmd/wasm/main.go`
2. Export to JavaScript: `js.Global().Set("functionName", js.FuncOf(functionName))`
3. Call from browser: `window.functionName(args)`

Example:

```go
func analyzeText(this js.Value, args []js.Value) interface{} {
  // Implementation
  return result
}

// In main():
js.Global().Set("analyzeText", js.FuncOf(analyzeText))
```

## License

See project LICENSE file

  <body>
    <h1>PDF Text Extractor (WASM)</h1>
    <input
      type="file"
      accept="application/pdf"
      onchange="handleFileSelect(event)"
    />
    <pre id="output"></pre>
  </body>
</html>
```

## Benefits

1.  **Efficiency**: The Lambda function receives plain text instead of binary PDF data, reducing its workload.
2.  **Cost**: Smaller payloads and less processing time in Lambda.
3.  **Privacy**: PDF content is processed locally in the user's browser.

## Note on Binary Size

Go WASM binaries can be large (approx. 2-5MB). Ensure your web server uses compression (gzip or brotli) when serving `.wasm` files.
