install:
	yarn install

lint: install
	yarn eslint .

lint.fix: install
	yarn eslint --fix .

format: install
	yarn prettier --write .

format.check: install
	yarn prettier --check .

create-dist-dir:
	mkdir -p dist

clear:
	rm -rf dist

dev: install create-dist-dir
	node --loader ts-node/esm bin/index.ts --watch

build: install create-dist-dir
	node --loader ts-node/esm bin/index.ts
	@make docgen

docgen: install
	node --loader ts-node/esm bin/docgen.ts
	@make format

typecheck: install
	yarn tsc --noEmit

typecheck.watch: install
	yarn tsc --noEmit --watch
