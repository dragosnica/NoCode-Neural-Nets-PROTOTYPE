const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const NodemonPlugin = require('nodemon-webpack-plugin');
const dotenv = require('dotenv');

const env = dotenv.config().parsed;
const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

module.exports = {
  mode: 'development',
  entry: {
    server_app: [
      './server/server.js'
    ],
    client_app: [
      'react-hot-loader/patch',
      // 'webpack-dev-server/client?http://localhost:8080',
      // 'webpack/hot/only-dev-server',
      './client/index.jsx'
    ]
  },
  target: 'node',
  externals: [nodeExternals()],
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: '[name].bundle.js',
    publicPath: '/'
  },
  devServer: {
    hot: true,
    publicPath: '/',
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        resolve: {
          extensions: [
            '.js',
            '.jsx'
          ]
        },
        use: [{
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          }
        }, {
          loader: 'eslint-loader'
        }]
      },
      {
        test: /main\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.svg$/,
        use: 'file-loader'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin(envKeys),
    new webpack.DefinePlugin({
      'process.env': {
        PORT: 8080,
        IS_BROWSER: JSON.stringify(false)
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '../server/views/index.jsx'),
      inject: false,
    }),
    new NodemonPlugin({
      watch: path.resolve(__dirname, '../server'),
      script: './build/server_app.bundle.js',
      ext: 'js',
      delay: '100',
    }),
    new NodemonPlugin({
      watch: path.resolve(__dirname, '../client'),
      script: './build/client_app.bundle.js',
      ext: 'js',
      delay: '100',
    }),
  ]
};
