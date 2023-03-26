module.exports = {
    "*.{js,jsx,ts,tsx}": ["eslint --fix", "eslint", "prettier --write"],
    "**/*.ts?(x)": () => "npm run check-types",
    "*.json": ["prettier --write"],
};
export {};
//# sourceMappingURL=lint-staged.config.cjs.map