const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
	mode: 'development',
	entry: './src/index.ts',
	output: {
		filename: 'app.js',
		path: path.resolve(__dirname, 'dist'),
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		port: 9000,
	},
	plugins: [new Dotenv()],
};
