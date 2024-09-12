cli = yarn run bookmarklets-cli 'src/*.ts'
vitest = yarn run vitest

node_modules: package.json yarn.lock
ifeq ($(MAKE_YARN_FROZEN_LOCKFILE), 1)
	yarn install --frozen-lockfile
else
	yarn install
endif
	@touch node_modules

lint: node_modules PHONY
	yarn eslint .

lint.fix: node_modules PHONY
	yarn eslint --fix .

format: node_modules PHONY
	yarn prettier --write .

format.check: node_modules PHONY
	yarn prettier --check .

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
	yarn tsc --noEmit

typecheck.watch: node_modules PHONY
	yarn tsc --noEmit --watch

PHONY:
