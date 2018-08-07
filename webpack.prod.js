/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CspHtmlWebpackPlugin = require('csp-html-webpack-plugin');
const common = require('./webpack.common.js');


module.exports = merge(common, {
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader' }, // translates CSS into CommonJS
          { loader: 'sass-loader' }, // compiles Sass to CSS
        ],
      },
    ],
  },

  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },

  devtool: 'source-map',

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new HtmlWebpackPlugin({ template: 'src/index.html' }),
    new CspHtmlWebpackPlugin({
      'default-src': "'self'",
      'base-uri': "'self'",
      'object-src': "'none'",
      'script-src': "'self'",
      'style-src': "'self'",
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css',
    }),
    new webpack.HashedModuleIdsPlugin(),
  ],
});
