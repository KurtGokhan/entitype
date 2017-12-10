var TsConfigPathsPlugin = require('awesome-typescript-loader').TsConfigPathsPlugin;
var path = require('path');

module.exports = {
  resolve: {
    extensions: ['.ts', '.js', '.json', '.tsx', '.jsx'],
    modules: [
      path.dirname(__dirname),
      `${__dirname}/node_modules`
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
