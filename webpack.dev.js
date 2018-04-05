const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const HOST = 'localhost';
const PORT = '4000';
const DEV_PROXY = process.env.DEV_PROXY || 'http://localhost:8080';


module.exports = merge(common, {
  devtool: 'eval-source-map',

  devServer: {
    contentBase: './dist',
    host: HOST,
    port: PORT,
    historyApiFallback: true,
    hot: true,
    inline: true,
    clientLogLevel: 'none',
    stats: 'errors-only',
    // proxy: {
    //   '/api/*': {
    //     target: DEV_PROXY,
    //     secure: false,
    //     changeOrigin: true,
    //   },
    // },
  },

  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
});
