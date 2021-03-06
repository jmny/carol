.PHONY: test lint example

lint:
	deno fmt --check
	deno lint --unstable

test:
	deno test --allow-env --allow-read --allow-write --allow-run --allow-net

example:
	deno run --allow-env --allow-read --allow-write --allow-run --allow-net examples/hello.ts