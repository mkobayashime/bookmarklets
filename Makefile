node_modules: package.json yarn.lock
	yarn
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

.PHONY: create-dist-dir
create-dist-dir:
	mkdir -p dist

.PHONY: clear
clear:
	rm -rf dist

.PHONY: dev
dev: node_modules create-dist-dir
	node --loader ts-node/esm bin/index.ts --watch

.PHONY: build
build: node_modules clear create-dist-dir
	node --loader ts-node/esm bin/index.ts
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
