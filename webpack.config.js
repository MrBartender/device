const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const nodeExternals = require('webpack-node-externals')
require("babel-polyfill")

const opts = {
  DEV: false,
}

const frontendConfig = {
    target: 'web',
    entry: ['babel-polyfill', './src/core.js'],
    output: {
      path: path.resolve(__dirname, 'public')
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          exclude: /node_modules/,
          loader: 'vue-loader'
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            {loader: 'babel-loader'},
            {loader:'ifdef-loader', options: opts}
          ],
        },
        {
          test: /\.scss$/,
          use: [
            'vue-style-loader',
            'css-loader',
            'sass-loader'
          ]
        }
      ]
    },
    plugins: [
      new VueLoaderPlugin(),
      new HtmlWebpackPlugin({
        template: './src/index.html'
      })
    ],
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
      }
    },
    node: {
      fs: "empty"
   }
  }

  const backendConfig = {
    target: 'node',
    entry: ['babel-polyfill', './server/index.js'],
    output: {
      path: path.resolve(__dirname, 'server/build'),
      filename: 'index.js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            {loader: 'babel-loader'},
            {loader:'ifdef-loader', options: opts}
          ],
        },
      ]
    },
    externals: [nodeExternals()],
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
      }
    }
  }  

  module.exports = (env, argv) => {
    if (argv.mode === 'development') {
      opts.DEV = true
    }
    return [frontendConfig, backendConfig];
  }