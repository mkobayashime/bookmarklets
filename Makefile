cli = bunx --bun bookmarklets-cli 'src/*.ts'
vitest = bunx --bun vitest
biome = bunx --bun biome
eslint = bunx --bun eslint

node_modules: PHONY
ifeq ($(CI), true)
	bun install --frozen-lockfile
else
	bun install
endif

lint: node_modules PHONY
	$(biome) check .
	$(eslint) .

lint.fix: node_modules PHONY
	$(biome) check --fix .
	$(eslint) --fix .

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

docgen: node_modules PHONY
	bun run bin/docgen/index.ts
	@make lint.fix

typecheck: node_modules PHONY
	bunx tsc --noEmit

typecheck.watch: node_modules PHONY
	bunx tsc --noEmit --watch

PHONY:
