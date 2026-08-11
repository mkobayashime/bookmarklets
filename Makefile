cli = bunx --bun bookmarklets-cli 'src/*.ts'
vitest = bunx --bun vitest
oxlint = bunx oxlint
oxfmt = bunx oxfmt

node_modules: PHONY
ifeq ($(CI), true)
	bun install --frozen-lockfile
else
	bun install
endif

lint: node_modules PHONY
	$(oxfmt) --check
	$(oxlint) --type-aware

lint.fix: node_modules PHONY
	$(oxfmt)
	$(oxlint) --fix --type-aware

test: node_modules PHONY
	$(vitest) run

test.watch: node_modules PHONY
	$(vitest) watch

clear: PHONY
	rm -rf dist

dev: node_modules PHONY
	$(cli) --watch

build: node_modules clear PHONY
	$(cli)
	@make build.manifest
	@make docgen

build.manifest: node_modules PHONY
	bun run ./bin/generateManifest.ts ./src ./dist
	$(oxfmt) ./dist/manifest.json

docgen: node_modules PHONY
	bun run bin/docgen/index.ts
	@make lint.fix

typecheck: node_modules PHONY
	bunx tsc --noEmit

typecheck.watch: node_modules PHONY
	bunx tsc --noEmit --watch

PHONY:
