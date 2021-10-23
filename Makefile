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

dev: install
	node bin/index.js --watch

build: install
	node bin/index.js
