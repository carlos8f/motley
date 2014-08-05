test:
	./bin/motley --test test/hello-world.js example/hello-world
	./bin/motley --test test/blog.js example/blog
	./bin/motley --test test/blog.js example/gist-blog
	./node_modules/.bin/mocha --reporter spec --timeout 10s --require test/common.js test/minimal.js

.PHONY: test
