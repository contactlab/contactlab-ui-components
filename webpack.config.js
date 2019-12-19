const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const DEMO_DIR = path.resolve(__dirname, 'demo');

module.exports = {
	mode: 'development',

	entry: {
		main: path.join(DEMO_DIR, 'main.js')
	},

	output: {
		path: DEMO_DIR,
		filename: '[name].[contenthash].bundle.js'
	},

	devtool: 'eval-source-map',

	devServer: {
		compress: true,
		hot: false,
		host: '0.0.0.0',
		disableHostCheck: true,
		inline: false,
		watchOptions: {
			aggregateTimeout: 1000,
			ignored: 'node_modules',
			poll: false
		},
		stats: {
			all: false,
			modules: true,
			maxModules: 0,
			warnings: true,
			errors: true
		}
	},

	module: {
		rules: [
			{
				test: /\.html$/,
				use: 'polymer-webpack-loader'
			}
		]
	},

	plugins: [
		new HtmlWebpackPlugin({
			inject: false,
			template: path.join(DEMO_DIR, 'index.ejs')
		})
	]
};
