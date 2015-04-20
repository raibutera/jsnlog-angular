'use strict';

module.exports = function(app) {
    function ngJSNlogJLProvider() {
        /*jshint validthis: true */
        var JL;

        try {
            JL = require("../lib/jsnlog.min.js");
        } catch (e) {}

        if (!JL) {
            try {
                JL = window.JL;
            } catch (e) {}
        }
        if (!JL) {
            throw new Error('JSNlog must be loaded!');
        }


        this.createAjaxAppender = JL.createAjaxAppender;
        this.createConsoleAppender = JL.createConsoleAppender;
        this.getAllLevel = JL.getAllLevel;
        this.getDebugLevel = JL.getDebugLevel;
        this.getErrorLevel = JL.getErrorLevel;
        this.getFatalLevel = JL.getFatalLevel;
        this.getInfoLevel = JL.getInfoLevel;
        this.getAllLevel = JL.getAllLevel;
        this.getTraceLevel = JL.getTraceLevel;
        this.getWarnLevel = JL.getWarnLevel;
        this.setOptions = JL.setOptions;

        /*jshint validthis: true */
        this.$get = [function() {
            var angularAppender = JL().createConsoleAppender('angularAppender');

            JL().setOptions({appenders: [angularAppender]});

            return JL;
        }];
    }

    app.provider('JL', ngJSNlogJLProvider);

    return app;
};
