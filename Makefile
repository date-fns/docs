.DEFAULT_GOAL := build
.PHONY: build
build:
	@rm -rf lib
	@npx tsc
	@rsync --archive --prune-empty-dirs --include='*.d.ts' --include='*.json' -f 'hide,! */' --relative src/./ lib
	@cp *.md lib
	@cp package.json lib

publish: build
	cd lib && npm publish --access public

publish-next: build
	cd lib && npm publish --access public --tag next
