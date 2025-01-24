const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        app: './out/src/app.js',
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        host: '0.0.0.0',
        server: 'https',
        compress: true,
        port: 8800,
        client: {
            overlay: { warnings: false, errors: true },
        },
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    plugins: [
		new ESLintPlugin({
			extensions: ['js'],
			eslintPath: require.resolve('eslint'),
			overrideConfigFile: path.resolve(__dirname, './eslint.config.cjs'),
		}),
		new HtmlWebpackPlugin({
			template: './src/HTML/app.html',
		}),
    ],
    devtool: 'source-map',
};
