'use strict';

function ngJSNlog () {
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
    var ngJSNlogModule = angular.module('ngJSNlog', []);

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
        var defaultConfig = {

        };

        /*jshint validthis: true */
        this.$get = [function(){
            return JL;
        }];
    }
    ngJSNlogModule.provider('JL', ngJSNlogJLProvider);


    // ngJSNlog custom wrapper for JL
    var prefixes = {
            base: 'ng',
            client: 'ng.client',
            angular: 'ng.framework'
    };

    function buildPrefix (input, options){
        if(options && options.angular){
            return prefixes.angular + '.' + input;
        } else if (options && options.client) {
            return prefixes.client + '.' + input;
        } else {
            return prefixes.base + '.' + input;
        }
    }

    function ngJSNlogLoggerProvider (){
        /*jshint validthis: true */

        this.$get = ["JL", function(JL){

        }];
    }

    ngJSNlogModule.provider('Logger', ngJSNlogLoggerProvider);

    // overwrite vanilla Angular exception handler
    function exceptionHandlerReplacement(JL){
        return function (exception, cause) {
            JL(prefixes.angular).fatalException(cause, exception);
            throw exception;
        };
    }
    exceptionHandlerReplacement.$inject = ['JL'];

    ngJSNlogModule.factory('$exceptionHandler', exceptionHandlerReplacement);

    return ngJSNlogModule;
}

module.exports = ngJSNlog;
