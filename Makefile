node_modules: package.json yarn.lock
	yarn
	@touch node_modules

lint: node_modules
	yarn eslint .

lint.fix: node_modules
	yarn eslint --fix .

format: node_modules
	yarn prettier --write .

format.check: node_modules
	yarn prettier --check .

test: node_modules
	yarn run ava

test.watch: node_modules
	yarn run ava --watch

create-dist-dir:
	mkdir -p dist

clear:
	rm -rf dist

dev: node_modules create-dist-dir
	node --loader ts-node/esm bin/index.ts --watch

build: node_modules clear create-dist-dir
	node --loader ts-node/esm bin/index.ts
	@make docgen

docgen: node_modules
	node --loader ts-node/esm bin/docgen.ts
	@make format

typecheck: node_modules
	yarn tsc --noEmit

typecheck.watch: node_modules
	yarn tsc --noEmit --watch
