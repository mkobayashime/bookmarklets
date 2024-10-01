cli = pnpm exec bookmarklets-cli 'src/*.ts'
vitest = pnpm exec vitest
biome = pnpm exec biome

node_modules: package.json pnpm-*.yaml
	pnpm install
	@touch node_modules

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
	node --loader @swc-node/register/esm bin/docgen/index.ts
	@make lint.fix

typecheck: node_modules PHONY
	pnpm exec tsc --noEmit

typecheck.watch: node_modules PHONY
	pnpm exec tsc --noEmit --watch

PHONY:
