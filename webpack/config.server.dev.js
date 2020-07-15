const path = require('path');
const webpack = require('webpack');
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
    ]
  },
  target: 'node',
  externals: [nodeExternals()],
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: '[name].js',
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
        PORT: 8081,
        IS_BROWSER: JSON.stringify(false)
      }
    }),
    new NodemonPlugin({
      watch: path.resolve(__dirname, '../server'),
      script: './build/server_app.js',
      ext: 'js',
      delay: '100',
    }),
  ]
};
