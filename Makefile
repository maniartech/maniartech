TM_SRC := ../../tajmahal/src

start:
	cd $(TM_SRC) && go run ./cmd/main.go start -d ../../maniartech.com/maniartech

build:
	cd $(TM_SRC) && go run ./cmd/main.go build -d ../../maniartech.com/maniartech

.PHONY: start build
