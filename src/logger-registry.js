'use strict';

var _ = require('lodash');

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

            $get: ['JL',
                function(JL) {
                    var loggerRegistry = {
                        'ng.app':true,
                        'ng.framework':true
                    };

                    function LoggerList (){
                            this.app = [];
                            this.framework = [];
                            this.unknown = [];
                        }

                    LoggerList.prototype.add = function(name){
                        if (name && _.isString(name)) {
                            if (_.startsWith(name, 'ng.framework')) {
                                this.framework.push(name);
                            } else if (_.startsWith(name, 'ng.app')){
                                this.app.push(name);
                            } else {
                                this.unknown.push(name);
                            }
                        }
                    };

                    function registerLogger (name, status){
                        if(name && _.isString(name) && !_.isNull(status) && !_.isUndefined(status)){
                            loggerRegistry[name] = status;
                        } else {
                            console.error('jsnlog-angular: failed to register logger: missing/invalid name or status');
                        }
                    }

                    function listLoggers(){
                        var enabled = new LoggerList();
                        var disabled = new LoggerList();

                        _.forEach(loggerRegistry, function(value,key){
                            if(value){
                                enabled.add(key);
                            } else {
                                disabled.add(key);
                            }
                        });

                        return {
                            enabled: enabled,
                            disabled: disabled
                        };
                    }

                    function getLogger(name){
                        return loggerRegistry[name];
                    }

                    return {
                        register: registerLogger,
                        all: listLoggers,
                        get: getLogger
                    };
                }
            ]
        };

    }
    service.$inject = dependencies;

    app.provider('LoggerRegistry', service);
};
