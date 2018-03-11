const MinifyPlugin = require("babel-minify-webpack-plugin");

const config = {
  entry: './js/index.js',
  output: {
    filename: 'bundle.js',
    path: './',
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
      }
    ]
  },
  plugins: [
    new MinifyPlugin(),
  ]
};

module.exports = config;