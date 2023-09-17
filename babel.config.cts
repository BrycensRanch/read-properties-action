/** @type {import('@babel/core').ConfigFunction} */
const babelConfig = {
	// plugins: [
	//     "@babel/plugin-transform-async-to-generator"
	// ],
	presets: [["@babel/preset-env", { targets: { node: 20 } }], "@babel/preset-typescript"],
};
module.exports = babelConfig;
