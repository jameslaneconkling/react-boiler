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

const entry = PROD ?
  './app/index.jsx' : [
    `webpack-dev-server/client?http://${HOST}:${PORT}`,
    'webpack/hot/only-dev-server',
    './app/index.jsx'
  ];

const loaders = PROD ?
  [
    {
      test: /\.jsx?$/,
      include: path.join(__dirname, 'app'),
      loaders: ['babel']
    },
    {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader?sourceMap'),
      include: path.join(__dirname, 'app')
    }
  ] : [
    {
      test: /\.jsx?$/,
      include: path.join(__dirname, 'app'),
      loaders: [
        'react-hot',
        'babel'
      ]
    },
    {
      test: /\.scss$/,
      loader: 'style-loader!css-loader!sass-loader?sourceMap',
      include: path.join(__dirname, 'app')
    }
  ];

const plugins = PROD ?
  [
    new HtmlWebpackPlugin({ template: 'app/index.html' }),
    new ExtractTextPlugin('style.css'),
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('production') }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      mangle: false
    })
  ] : [
    new HtmlWebpackPlugin({ template: 'app/index.html' }),
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('development') }),
    new webpack.HotModuleReplacementPlugin()
  ]

module.exports = validate({
  entry,

  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: 'index.js'
  },

  module: {
    loaders
  },

  plugins,

  devtool: PROD ? 'source-map' : 'eval-source-map',

  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    stats: 'errors-only',
    host: HOST,
    port: PORT,
    proxy: {
      '/api/*': {
        target: 'http://localhost:3000',
        secure: false,
        changeOrigin: true
      }
    }
  },

  resolve: {
    extensions: ['', '.js', '.jsx', '.json']
  }
});
