const webpack           = require('webpack');
const path              = require('path');
const validate          = require('webpack-validator');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const HOST = 'localhost';
const PORT = 8080;
const PROD = process.env.NODE_ENV === 'production';

// TODO
// - server proxy
// - asset hash names
// - chunking?
// npm install babel-runtime --save
// npm install babel-plugin-transform-runtime --save-dev

module.exports = validate({
  entry: [
    ...(!PROD ? [`webpack-dev-server/client?http://${HOST}:${PORT}`] : []),
    ...(!PROD ? ['webpack/hot/only-dev-server'] : []),
    './app/index.jsx'
  ],

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.js'
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: path.join(__dirname, 'app'),
        loaders: [
          ...(!PROD ? ['react-hot'] : []),
          'babel'
        ]
      },
      {
        test: /\.css$/,
        loader: PROD ? ExtractTextPlugin.extract('style-loader', 'css-loader') : 'style-loader!css-loader',
        include: path.join(__dirname, 'app')
      },
      {
        test: /\.scss$/,
        loader: PROD ? ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader?sourceMap') : 'style-loader!css-loader!sass-loader?sourceMap',
        include: path.join(__dirname, 'app')
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'app/index.html'
    }),
    ...(!PROD ? [new webpack.HotModuleReplacementPlugin()] : []),
    ...(PROD ? [new ExtractTextPlugin('style.css')] : []),
    ...(PROD ? [new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      mangle: false
    })] : [])
  ],

  devtool: PROD ? 'source-map' : 'eval-source-map',

  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    stats: 'errors-only',
    host: HOST,
    port: PORT
  }
});
