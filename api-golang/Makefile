BIN = $(CURDIR)/bin
GO = go
MODULE = $(shell $(GO) list -m)

.PHONY: all
all: lint | $(BIN) ; $(info building executable…)
	@$(GO) build \
		-o $(BIN)/$(basename $(MODULE))

$(BIN):
	@mkdir -p $@
$(BIN)/%: | $(BIN) ; $(info building $(PACKAGE)…)
	@tmp=$$(mktemp -d); \
	   env GO111MODULE=off GOPATH=$$tmp GOBIN=$(BIN) $(GO) get $(PACKAGE) \
		|| ret=$$?; \
	   rm -rf $$tmp ; exit $$ret

GOLINT = $(BIN)/golint
$(BIN)/golint: PACKAGE=golang.org/x/lint/golint

.PHONY: lint
lint: | $(GOLINT) ; $(info running golint…)
	@$(GOLINT)

.PHONY: clean
clean: ; $(info cleaning up…)
	@rm -rf $(BIN)
