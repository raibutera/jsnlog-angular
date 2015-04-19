'use strict';

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

module.exports = buildPrefix;
