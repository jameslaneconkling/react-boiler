/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack');
const path = require('path');
const childProcess = require('child_process');
const CleanWebpackPlugin = require('clean-webpack-plugin');


module.exports = {
  entry: [
    'babel-polyfill',
    './src/index.tsx',
  ],

  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: path.join(__dirname, 'src'),
        use: { loader: 'babel-loader' },
      },
      {
        test: /\.tsx?$/,
        include: path.join(__dirname, 'src'),
        use: [
          { loader: 'babel-loader' },
          { loader: 'ts-loader' },
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader'],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader'],
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(['dist']),
    new webpack.DefinePlugin({
      'process.env.__GIT_DESCRIPTION__': JSON.stringify(
        childProcess.execSync('git describe --always').toString()
      ),
    }),
  ],

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.css', '.scss'],
  },
};
