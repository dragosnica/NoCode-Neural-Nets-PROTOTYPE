const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const dotenv = require('dotenv');

const env = dotenv.config().parsed;
const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

module.exports = {
  mode: 'production',
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
    publicPath: '/',
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
        // API_URL: JSON.stringify('/api'),
        PORT: 5000,
        // MONGODB_URL: JSON.stringify('mongodb://localhost/no-code-neural-nets'),
        NODE_ENV: JSON.stringify('production'),
        IS_BROWSER: JSON.stringify(false),
        // SECRET_TOKEN: JSON.stringify('ncnn_secret'),
      }
    })
  ]
};
