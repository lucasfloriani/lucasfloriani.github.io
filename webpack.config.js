const path = require('path');

module.exports = {
  entry: {
    index: './js/index.js'
  },
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname)
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
            presets: [['es2015']]
        }
      },
      {
        test: /\.sass$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      },
    ]
  }
}