'use strict';

var angular;

try {
  angular = require('angular');
} catch (e) {
}

if (!angular) {
  try {
    angular = window.angular;
  } catch (e) {
  }
}
if (!angular) {
  throw new Error('angular must be loaded!');
}

// set up base module
var ngJSNlog = angular.module('ngJSNlog', []);

// vanilla JL provider
require('./jl-provider.js')(ngJSNlog);

// ngJSNlog custom wrapper for JL
require('./logger-provider.js')(ngJSNlog);

// overwrite vanilla Angular $log service and exception handler
require('./log-replacement.js')(ngJSNlog);
require('./exception-handler-replacement.js')(ngJSNlog);

module.exports = ngJSNlog;
