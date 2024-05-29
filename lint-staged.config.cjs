module.exports = {
	// disabled until eslint v9 is sorted
	// "*.{js,jsx,ts,tsx}": ["eslint --fix", "eslint", "prettier --write"],
	"*.{js,jsx,ts,tsx}": ["prettier --write"],
	"**/*.ts?(x)": () => "npm run check-types",
	"*.json": ["prettier --write"],
};
