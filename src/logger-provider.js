'use strict';

module.exports = function(app){
    function ngJSNlogLoggerProvider (){
        /*jshint validthis: true */

        this.$get = ["JL", function(JL){

        }];
    }

    app.provider('Logger', ngJSNlogLoggerProvider);

    return app;
};
