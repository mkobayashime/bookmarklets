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
	node bin/index.js --watch

build: install create-dist-dir
	node bin/index.js
