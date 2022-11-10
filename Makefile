cli = yarn run bookmarklets-cli 'src/*.ts'

node_modules: package.json yarn.lock
ifeq ($(MAKE_YARN_FROZEN_LOCKFILE), 1)
	yarn install --frozen-lockfile
else
	yarn install
endif
	@touch node_modules

.PHONY: lint
lint: node_modules
	yarn eslint .

.PHONY: lint.fix
lint.fix: node_modules
	yarn eslint --fix .

.PHONY: format
format: node_modules
	yarn prettier --write .

.PHONY: format.check
format.check: node_modules
	yarn prettier --check .

.PHONY: test
test: node_modules
	yarn run ava

.PHONY: test.watch
test.watch: node_modules
	yarn run ava --watch

.PHONY: clear
clear:
	rm -rf dist

.PHONY: dev
dev: node_modules
	$(cli) -w

.PHONY: build
build: node_modules clear
	$(cli)
	@make docgen

.PHONY: docgen
docgen: node_modules
	node --loader ts-node/esm bin/docgen/index.ts
	@make format

.PHONY: typecheck
typecheck: node_modules
	yarn tsc --noEmit

.PHONY: typecheck.watch
typecheck.watch: node_modules
	yarn tsc --noEmit --watch
