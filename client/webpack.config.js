var path = require('path');

module.exports = {
	context: __dirname,
	entry: './index.js',
	output: {
		filename: './bundle.js',
	},
	module: {
		loaders: [
			{
				test: [/\.jsx?$/, /\.js?$/],
				exclude: /(node_modules)/,
				loader: 'babel-loader',
				query: {
					presets: ['es2015', 'react', 'stage-2'],
				},
			},
			{
				test: /\.css/,
				loaders: ['style-loader', 'css-loader'],
				include: __dirname + '/styles'
			}
		]
	},
	devtool: 'source-map',
	resolve: {
		extensions: [".js", ".jsx", "*"],
	},
};
