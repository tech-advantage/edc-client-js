const path = require('path');

// Webpack plugins
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, '../index.ts'),
  output: {
    library: {
      name: 'edc-client-js',
      type: 'umd'
    },
    path: path.resolve('./dist'),
    filename: 'index.js',
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        loader: 'ts-loader'
      }
    ]
  },
  resolve: {
    modules: [
      "node_modules"
    ],
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new CleanWebpackPlugin(),
  ],
  externals: {
    axios: 'axios',
    "es6-promise": 'es6-promise',
    lodash: 'lodash-es'
  },
  stats: 'verbose',
}
