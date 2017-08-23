var path = require('path');

module.exports = {
  context: __dirname,
  entry: './index.js',
  output: {
    path: path.resolve(__dirname),
    filename: '../public/bundle.js',
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
      }
    ]
  },
  devtool: 'source-map',
  resolve: {
    extensions: [".js", ".jsx", "*"],
  },
};
