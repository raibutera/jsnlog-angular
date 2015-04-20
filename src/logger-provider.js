'use strict';

var buildPrefix = require('./build-prefix.js');

module.exports = function(app) {
    var dependencies = [];

    function service() {
        var isInitialized = false;
        var init = function() {
            isInitialized = true;
        };
        return {
            // initialization
            init: init,

            $get: ['JL', 'LoggerRegistry',
                function(JL, LoggerRegistry) {
                     /**
                     * Logger class
                     * @param {string} name          'ng.app.'/'ng.framework' prefix will be prepended
                     * @param {object} options       optional configuration object
                     * @param {boolean} options.app  (default = true) is the logger being instantiated on behalf of the application? is set to false for instances used in a angular framework general context TODO: rewrite this when sober
                     * @param {}
                     */
                    function Logger(name, options) {
                        var isEnabled;

                        var params = {
                            app: (options && options.app) ? options.app : true
                        };

                        this.name = buildPrefix(name, params);

                        this.disable = function(){
                            isEnabled = false;
                            return LoggerRegistry.register(this.name, false);
                        };

                        this.enable = function(){
                            isEnabled = true;
                            return LoggerRegistry.register(this.name, true);
                        };

                        if (isEnabled) {
                            return JL(this.name);
                        } else {
                            return function() {
                                return;
                            };
                        }
                    }

                    return Logger;
                }

            ]
        };

    }
    service.$inject = dependencies;

    app.provider('Logger', service);
};
