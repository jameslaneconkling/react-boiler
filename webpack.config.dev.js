/* eslint-disable import/no-extraneous-dependencies */
const webpack             = require('webpack');
const path                = require('path');
const HtmlWebpackPlugin   = require('html-webpack-plugin');
const CopyWebpackPlugin   = require('copy-webpack-plugin');
const childProcess        = require('child_process');


const HOST = 'localhost';
const PORT = process.env.PORT || 4000;
const DEV_PROXY = process.env.DEV_PROXY || 'http://localhost:3000';


module.exports = {
  entry: [
    `webpack-dev-server/client?http://${HOST}:${PORT}`,
    'webpack/hot/only-dev-server',
    './app/index.jsx'
  ],

  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: 'index.js'
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: path.join(__dirname, 'app'),
        use: [
          'react-hot-loader',
          'babel-loader'
        ]
      },
      {
        test: /\.scss$/,
        include: path.join(__dirname, 'app'),
        loader: 'style-loader!css-loader!sass-loader?sourceMap'
      },
      {
        test: /\.(woff2?|svg)$/,
        loader: 'url-loader?limit=10000'
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({ template: 'app/index.html', inject: 'body' }),
    new CopyWebpackPlugin([{ from: 'app/assets', to: 'assets' }]),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      'process.env.__GIT_DESCRIPTION__': JSON.stringify(
        childProcess.execSync('git describe --always').toString()
      )
    }),
    new webpack.HotModuleReplacementPlugin()
  ],

  devtool: 'eval-source-map',

  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    stats: 'errors-only',
    host: HOST,
    port: PORT,
    proxy: {
      '/api/*': {
        target: DEV_PROXY,
        secure: false,
        changeOrigin: true
      }
    }
  },

  resolve: {
    extensions: ['.js', '.jsx', '.json', '.scss'],
    alias: {
      '@graphistry/falcor': path.resolve('./node_modules/@graphistry/falcor/dist/falcor.all.js')
    }
  }
};
