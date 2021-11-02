const webpackConfig = require('./webpack/webpack.common');
const TEST_AUTO = process.env.TEST_AUTO;

module.exports = function(config) {
  config.set({
    basePath: '',
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],
    files: [
      'src/**/*.spec.ts'
    ],
    exclude: [
    ],
    // preprocess matching files before serving them to the browser
    // Available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'src/**/*.spec.ts': ['webpack'],
    },
    webpack: {
      module: webpackConfig.module,
      resolve: webpackConfig.resolve,
      mode: 'development'
    },
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['spec'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],
    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: !TEST_AUTO,
    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-webpack'),
      require('karma-sourcemap-loader'),
      require('karma-spec-reporter')
    ]
  })
}
