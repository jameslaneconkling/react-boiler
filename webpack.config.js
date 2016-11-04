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
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader?sourceMap')
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'app/index.html'
    }),
    new ExtractTextPlugin('style.css'),
    ...(!PROD ? [new webpack.HotModuleReplacementPlugin()] : []),
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
