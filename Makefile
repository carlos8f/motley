test:
	./bin/motley --testFile test/hello-world.js example/hello-world
	./bin/motley --testFile test/blog.js example/blog
	./bin/motley --testFile test/blog.js example/gist-blog
	./node_modules/.bin/mocha --reporter spec --timeout 10s --require test/common.js test/minimal.js

.PHONY: test
