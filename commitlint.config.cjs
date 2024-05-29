// This file is used by commitlint to validate commit messages.
// It was adapted for monorepos
// While we're technically not a monorepo, it keeps things consistent
const fs = require("fs"),
	path = require("path"),
	{ dirname: dirName, basename: baseName } = require("path"),
	{ lstatSync: fileInfo } = require("fs");

const readdirSync = (p, a = [], ignored = ["node_modules", "lib", "coverage", ".git"]) => {
		if (fs.statSync(p).isDirectory()) {
			fs.readdirSync(p)
				.filter(f => {
					return baseName(f) !== ignored && !ignored?.includes(f);
				})

				.map(f => readdirSync(a[a.push(path.join(p, f)) - 1], a, ignored));
		}
		return a.filter(f => baseName(f) !== ignored && !ignored?.includes(f));
	},
	DEFAULT_SCOPES = [
		"repo",
		"commitlint",
		"sec",
		"security",
		"deps",
		"dependencies",
		"release",
		"actions",
		"docker",
		"config",
		"renovate",
	],
	blacklistedScopes = ["src", "next", "dist", "out"],
	dirNames = readdirSync("./")
		.map(e => dirName(e))
		.map(entry => {
			const newEntry = fileInfo(entry);
			newEntry.name = baseName(entry);
			return newEntry;
		})
		.map(dir => dir.name)
		.map(s => {
			if (s.charAt(0) === ".") return s.slice(1);

			return s;
		})
		.map(s => {
			if (s.includes("-")) return s.split("-");

			return s;
		})
		.flat(Number.POSITIVE_INFINITY),
	scopes = [...new Set(DEFAULT_SCOPES.concat(dirNames))]
		.map(s => {
			return s.replace(/_/g, "");
		})
		.filter(s => {
			return s.length >= 1;
		})
		.filter(s => !blacklistedScopes.includes(s));

module.exports = {
	extends: ["@commitlint/config-conventional"],
	rules: {
		"scope-enum": [2, "always", scopes],
		"body-max-length": [0, "always", Infinity],
		"body-max-line-length": [0, "always", Infinity],
	},
};
