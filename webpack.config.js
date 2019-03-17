const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: './sources/webpush-sdk.js',
  output: {
    filename: 'webpush-sdk.js',
    path: path.resolve(__dirname, 'distributions')
  },
  plugins: [
    new CopyWebpackPlugin([{
      from: "./sources/service-worker.js",
      to: "./"
    }])
  ]
};