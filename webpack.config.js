const webpack           = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const HOST = 'localhost';
const PORT = 8080;
const PROD = process.env.NODE_ENV === 'production';

// TODO
// - minification
// - server proxy
// - figure out why the build is so large
// - webpack validate?
// - asset hash names
// - chunking?

module.exports = {
  entry: [
    ...(!PROD ? [`webpack-dev-server/client?http://${HOST}:${PORT}`] : []),
    ...(!PROD ? ['webpack/hot/only-dev-server'] : []),
    './app/index.jsx'
  ],

  output: {
    path: './dist',
    filename: 'index.js'
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: [
          ...(!PROD ? ['react-hot'] : []),
          'babel'
        ]
      },
      {
        test: /\.css$/,
        loader: PROD ? ExtractTextPlugin.extract('style-loader', 'css-loader') : 'style-loader!css-loader'
      },
      {
        test: /\.scss$/,
        loader: PROD ? ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader?sourceMap') : 'style-loader!css-loader!sass-loader?sourceMap'
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
};
