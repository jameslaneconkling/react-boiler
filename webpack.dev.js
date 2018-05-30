/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const common = require('./webpack.common.js');

const HOST = 'localhost';
const PORT = '4000';
// const DEV_PROXY = process.env.DEV_PROXY || 'http://localhost:8080';


module.exports = merge(common, {
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          'style-loader',
          { loader: 'css-loader' }, // translates CSS into CommonJS
          { loader: 'sass-loader' }, // compiles Sass to CSS
        ],
      },
    ],
  },

  devtool: 'eval-source-map',

  devServer: {
    contentBase: './dist',
    host: HOST,
    port: PORT,
    historyApiFallback: true,
    // hot: true,
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
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
});
