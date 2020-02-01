import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

const { builder } = require("./scripts/build");

const production = process.env.NODE_ENV === "production";

builder({ watch: !production });

function serve() {
	let started = false;

	return {
		writeBundle() {
			if (!started) {
				started = true;

				require("child_process").spawn("npm", ["run", "serve"], {
					stdio: ["ignore", "inherit", "inherit"],
					shell: true,
				});
			}
		},
	};
}

export default {
	input: "src/client/index.js",
	output: {
		sourcemap: true,
		format: "iife",
		name: "app",
		file: "docs/js/main.js",
	},
	plugins: [
		resolve({ browser: true }), // node modules
		commonjs(), // commonjs
		!production && serve(), // serve docs/
	],
};
