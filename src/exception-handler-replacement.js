'use strict';

var buildPrefix = require('./build-prefix.js');

module.exports = function(app){
    function exceptionHandlerReplacement(JL){
        return function (exception, cause) {
            JL(buildPrefix(null, {angular: true})).fatalException(cause, exception);
            throw exception;
        };
    }
    exceptionHandlerReplacement.$inject = ['JL'];

    app.factory('$exceptionHandler', exceptionHandlerReplacement);
};
