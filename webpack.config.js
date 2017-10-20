/**
 * DozyLoad Webpack configuration.
 */

const path = require("path");
const webpack = require('webpack');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	devtool: 'inline-source-map',
	entry: path.resolve(__dirname, 'src/dozyload.js'),
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'dozyload.js',
		publicPath: '/',
	},
	devServer: {
		compress: true,
		//contentBase: './dist',
		contentBase: path.join(__dirname, 'demo'),
		port: 3000,
		publicPath: '/js/',
		// quiet: true,
		watchOptions: {
			ignored: /node_modules/,
		},
		overlay: false,
	},
	module: {
		strictExportPresence: true,
		rules: [
			/* {
				enforce: 'pre',
				test: /\.js$/,
				include: path.resolve(__dirname, 'src'),
				loader: 'eslint-loader',
				options: {
					formatter: require('eslint/lib/formatters/stylish'),
				}
			}, */
			{
				test: /\.js$/,
				include: path.resolve(__dirname, 'src'),
				loader: 'babel-loader',
				options: {
					presets: ['env']
				}
			},
			/*{
				test: /\.html$/,
				loader: 'html-loader',
			}*/
		]
	},
	plugins: [
		// new HtmlWebpackPlugin()
		/* new HtmlWebpackPlugin({
			inject: true,
			template: path.resolve(__dirname, 'demo/index.html'),
		}), */
	],
};