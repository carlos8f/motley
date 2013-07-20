test:
	@cd example && make
	@cd example/blog && npm install
	@./node_modules/.bin/mocha \
		--reporter spec \
		--bail \
		--timeout 5s \
		--require test/common.js

.PHONY: test