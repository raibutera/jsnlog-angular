'use strict';

module.exports = function(app) {
    function logReplacement(Logger) {
        /*jshint validthis: true */

        var logger = new Logger('$log',{app:false});

        this.log = function(msg) {
            logger().trace(msg);
        };
        this.debug = function(msg) {
            logger().debug(msg);
        };
        this.info = function(msg) {
            logger().info(msg);
        };
        this.warn = function(msg) {
            logger().warn(msg);
        };
        this.error = function(msg) {
            logger().error(msg);
        };
    }
    logReplacement.$inject = ['Logger'];

    app.service('$log', logReplacement);

    return app;
};
