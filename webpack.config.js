const webpack = require('webpack')
const fs = require('fs')
const LICENSE = fs.readFileSync('./LICENSE').toString()
module.exports = {
  mode: 'production',
  entry: { index: './index', },
  module: {
    rules: [
      { enforce: 'pre', test: /\.ts(x?)$/, exclude: /node_modules/, loader: 'tslint-loader' },
      { test: /\.ts(x?)$/, exclude: /node_modules/, loader: 'ts-loader' }
    ]
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: LICENSE
    })
  ],
  resolve: { extensions: ['.ts', '.js'] }
}