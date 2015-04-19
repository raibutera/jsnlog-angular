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

// providers etc

// vanilla JL provider
function ngJSNlogJLProvider(){
    var JL;

    try {
      JL = require("../lib/jsnlog.min.js");
    } catch (e) {
    }

    if (!JL) {
      try {
        JL = window.JL;
      } catch (e) {
      }
    }
    if (!JL) {
      throw new Error('JSNlog must be loaded!');
    }

    // configure
    // var defaultConfig = {
    //     lol: 'lol'
    // };

    // console.log(defaultConfig);

    /*jshint validthis: true */
    this.$get = [function(){
        return JL;
    }];
}

ngJSNlog.provider('JL', ngJSNlogJLProvider);


// ngJSNlog custom wrapper for JL
var prefixes = {
        base: 'ng',
        client: 'ng.client',
        angular: 'ng.framework'
};

function buildPrefix (input, options){
    if(input){
        if(options && options.angular){
            return prefixes.angular + '.' + input;
        } else if (options && options.client) {
            return prefixes.client + '.' + input;
        } else {
            return prefixes.base + '.' + input;
        }
    } else {
        if(options && options.angular){
            return prefixes.angular;
        } else if (options && options.client) {
            return prefixes.client;
        } else {
            return prefixes.base;
        }
    }
}

function ngJSNlogLoggerProvider (){
    /*jshint validthis: true */

    this.$get = ["JL", function(JL){

    }];
}

ngJSNlog.provider('Logger', ngJSNlogLoggerProvider);

// overwrite vanilla Angular exception handler
function exceptionHandlerReplacement(JL){
    return function (exception, cause) {
        JL(buildPrefix(null, {angular: true})).fatalException(cause, exception);
        throw exception;
    };
}
exceptionHandlerReplacement.$inject = ['JL'];

ngJSNlog.factory('$exceptionHandler', exceptionHandlerReplacement);

module.exports = ngJSNlog;
