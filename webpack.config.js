/**
 * External dependencies
 */
const RemoveEmptyScriptsPlugin = require("webpack-remove-empty-scripts");
const path = require("path");
const defaultConfig = require("@wordpress/scripts/config/webpack.config");

module.exports = {
	...defaultConfig,

	entry: {
		index: path.resolve(process.cwd(), "src/index.js"),
	},

	plugins: [...defaultConfig.plugins, new RemoveEmptyScriptsPlugin()],
};
