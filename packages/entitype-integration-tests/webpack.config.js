var TsConfigPathsPlugin = require('awesome-typescript-loader').TsConfigPathsPlugin;
var path = require('path');

module.exports = {
  resolve: {
    extensions: ['.ts', '.js', '.json', '.tsx', '.jsx'],
    modules: [
      path.dirname(__dirname), // Search entitype packages in the parent directory
      `${__dirname}/node_modules`,
      path.resolve(__dirname, '..', '..', 'node_modules') // Lerna hoisting
    ]
  },
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'awesome-typescript-loader'
      },
      {
        test: /\.sql$/,
        use: 'raw-loader'
      }
    ]
  }
}
