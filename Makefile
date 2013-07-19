test:
	@cd example && make
	@./node_modules/.bin/mocha \
		--reporter spec \
		--bail \
		--timeout 5s \
		--require test/common.js

.PHONY: test