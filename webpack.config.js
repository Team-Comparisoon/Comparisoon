
const path = require('path');
// const MinifyPlugin = require("babel-minify-webpack-plugin");

module.exports = {
  mode: process.env.NODE_ENV,
  entry: './src/client/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')
  },
  devServer: {
    publicPath: 'http://localhost:8080/build/',
    proxy: {
      '/api': {
        target: 'http://localhost:3000/'
      },
    },
    hot: true,
  },
  module: {
    rules: [{
        test: /\.jsx?/,
        exclude: path.resolve(__dirname, 'node_modules/'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          },
        }
      },
      {
        test: /\.s?css$/i,
        exclude: path.resolve(__dirname, 'node_modules/'),
        use: ['style-loader', 'css-loader', 'sass-loader'],
      }
    ],
  },
}