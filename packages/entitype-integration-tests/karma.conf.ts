// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html
let webpackConfig = require('./webpack.config');

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai'],
    plugins: [
      require('karma-mocha'),
      require('karma-mocha-reporter'),
      require('karma-chai'),
      require('karma-chrome-launcher'),
      require('karma-webpack')
    ],
    preprocessors: {
      '**/*.ts': ['webpack']
    },
    reporters: ['mocha'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeHeadless'],
    singleRun: true,
    files: [
      'test/websql/index.spec.ts'
    ],

    webpack: webpackConfig,
    mime: {
      'text/x-typescript': ['ts', 'tsx']
    }
  });
};
