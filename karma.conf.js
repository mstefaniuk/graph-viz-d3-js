module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', 'requirejs'],
    files: [
      'spec/test-main.js',
      {pattern: 'lib/**/*.js', included: false},
      {pattern: 'spec/*-helper.js', included: true},
      {pattern: 'spec/*-spec.js', included: false},
      {pattern: 'spec/*/**/*.+(js|gv|xdot)', included: false},
      {pattern: 'src/**/*.js', included: false},
      {pattern: 'parser/*.js', included: false}
    ],
    exclude: [],
    preprocessors: {
      'src/js/*.js': ['coverage'],
      'parser/*.js': ['coverage']
    },
    reporters: ['progress', 'coverage'],
    coverageReporter: {
      type: 'lcov'
    },
    port: 9876,
    colors: true,
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,
    //autoWatch: true,
    //browsers: ['PhantomJS'],
    browsers: ['Firefox'],
    singleRun: true
  });
};
