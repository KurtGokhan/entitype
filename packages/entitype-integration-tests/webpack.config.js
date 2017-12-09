var TsConfigPathsPlugin = require('awesome-typescript-loader').TsConfigPathsPlugin;

module.exports = {
  resolve: {
    extensions: ['.ts', '.js', '.tsx', '.jsx'],
    plugins: [
      new TsConfigPathsPlugin()
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
