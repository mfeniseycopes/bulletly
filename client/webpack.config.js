var path = require('path');

module.exports = {
  context: __dirname,
  entry: [
    'react-hot-loader/patch',
    './index.js',
  ],
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
        test: /\.scss/,
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
        include: __dirname + '/styles'
      },
      {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: "url-loader"
      },
      {
        test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
        use: 'file-loader'
      },
    ]
  },
  devtool: 'source-map',
  resolve: {
    extensions: [".js", ".jsx", "*"],
    alias: {
      "Actions": path.resolve(__dirname, 'actions'),
      "APIs": path.resolve(__dirname, 'api'),
      "Components": path.resolve(__dirname, 'components'),
      "Reducers": path.resolve(__dirname, 'reducers'),
      "Styles": path.resolve(__dirname, 'styles'),
    }
  },
};
