//go:build ignore

// tajmahal.go is a helper script for running the Tajmahal CLI against this
// site without needing the binary installed.
//
// Usage (from the maniartech project root):
//
//	go run ./scripts/tajmahal.go start
//	go run ./scripts/tajmahal.go build
//	go run ./scripts/tajmahal.go start -p 9090
//
// Any arguments are forwarded directly to the tajmahal CLI.

package main

import (
	"fmt"
	"os"
	"os/exec"
	"os/signal"
	"path/filepath"
	"runtime"
	"syscall"
)

func main() {
	// runtime.Caller(0) returns the absolute path of this source file,
	// which is reliable under `go run` even on Windows.
	_, thisFile, _, ok := runtime.Caller(0)
	if !ok {
		fmt.Fprintln(os.Stderr, "error: could not determine script location")
		os.Exit(1)
	}

	// scripts/ → maniartech/ (the site root)
	siteDir := filepath.Dir(filepath.Dir(thisFile))

	// maniartech/ → maniartech.com/ → Projects/ → tajmahal/src
	tajSrc := filepath.Join(siteDir, "..", "..", "tajmahal", "src")
	tajSrc, err := filepath.Abs(tajSrc)
	if err != nil {
		fmt.Fprintf(os.Stderr, "error resolving tajmahal path: %v\n", err)
		os.Exit(1)
	}

	// Forward all CLI arguments, appending -d <siteDir> so Tajmahal knows
	// which site to serve. The user can still pass their own flags freely.
	args := append([]string{"run", "./cmd/main.go"}, os.Args[1:]...)
	args = append(args, "-d", siteDir)

	cmd := exec.Command("go", args...)
	cmd.Dir = tajSrc
	cmd.Stdin = os.Stdin
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr

	// Suppress the default SIGINT/SIGTERM handler so that `go run` does not
	// call os.Exit before the child process finishes its graceful shutdown.
	// The OS already delivers the signal to the child (same console/process
	// group), so we just need to wait for cmd.Run() to return naturally.
	sigCh := make(chan os.Signal, 1)
	signal.Notify(sigCh, os.Interrupt, syscall.SIGTERM)
	go func() {
		<-sigCh
		// signal received — child handles its own shutdown; we just wait.
	}()

	if err := cmd.Run(); err != nil {
		os.Exit(1)
	}
}
