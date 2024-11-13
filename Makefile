cli = bunx bookmarklets-cli 'src/*.ts'
vitest = bunx vitest
biome = bunx biome
tsx = bunx tsx

node_modules: PHONY
	bun install

lint: node_modules PHONY
	$(biome) check .

lint.fix: node_modules PHONY
	$(biome) check --fix .

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
	@make docgen

docgen: node_modules PHONY
	$(tsx) bin/docgen/index.ts
	@make lint.fix

typecheck: node_modules PHONY
	bunx tsc --noEmit

typecheck.watch: node_modules PHONY
	bunx tsc --noEmit --watch

PHONY:
