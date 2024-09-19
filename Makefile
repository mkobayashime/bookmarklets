cli = pnpm exec bookmarklets-cli 'src/*.ts'
vitest = pnpm exec vitest
eslint = pnpm exec eslint
prettier = pnpm exec prettier

node_modules: package.json pnpm-*.yaml
	pnpm install
	@touch node_modules

lint: node_modules PHONY
	$(eslint) .

lint.fix: node_modules PHONY
	$(eslint) --fix .

format: node_modules PHONY
	$(prettier) --write .

format.check: node_modules PHONY
	$(prettier) --check .

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
	@make format

typecheck: node_modules PHONY
	pnpm exec tsc --noEmit

typecheck.watch: node_modules PHONY
	pnpm exec tsc --noEmit --watch

PHONY:
