'use strict';

var prefixes = {
        base: 'ng',
        app: 'ng.app',
        angular: 'ng.framework'
};

function buildPrefix (input, options){
    if(input){
        if(options && options.angular){
            return prefixes.angular + '.' + input;
        } else if (options && options.app) {
            return prefixes.app + '.' + input;
        } else {
            return prefixes.base + '.' + input;
        }
    } else {
        if(options && options.angular){
            return prefixes.angular;
        } else if (options && options.app) {
            return prefixes.app;
        } else {
            return prefixes.base;
        }
    }
}

module.exports = buildPrefix;
