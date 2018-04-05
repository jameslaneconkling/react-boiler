const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const HOST = 'localhost';
const PORT = '4000';
const DEV_PROXY = process.env.DEV_PROXY || 'http://localhost:8080';


module.exports = {
  entry: './src/index.jsx',

  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist')
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: path.join(__dirname, 'src'),
        use: { loader: 'babel-loader' }
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: "css-loader" }, // translates CSS into CommonJS
          { loader: "sass-loader" } // compiles Sass to CSS
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader']
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader']
      }
    ]
  },

  devtool: 'eval-source-map',

  devServer: {
    contentBase: './dist',
    host: HOST,
    port: PORT,
    historyApiFallback: true
  },

  plugins: [
    new CleanWebpackPlugin(['dist']),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({ template: 'src/index.html' })
  ],
  
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.scss'],
  },
};
