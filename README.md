# jsnlog-angular
Angular.JS 1.x module for jsnlog, ' a tiny JavaScript logging library, [that's] simple and well documented.'


## Installation 
### Install
- include `angular-jsnlog.min.js` AFTER `angular.js`
- use **bower**? (recommended!): `bower install -save jsnlog-angular`

## Usage 
### App-level Injection
- inject 'ngJSNlog' when declaring angular module: 
``` 
var app = angular.module('example', ['ngJSNlog']);
```

This will expose the providers '`JL`' (for JL configuration) '`Logger`' (for use) also overwrite `$log`

**Note**:

This module replaces `$exceptionHandler` service to ensure exceptions are logged with severity FATAL:
```javascript
angular.module('ngJSNlog', [])
.factory('$exceptionHandler', function () {
    return function (exception, cause) {
        JL('Angular').fatalException(cause, exception);
        throw exception;
    };
});
```

it also overwrites the `$log` service 

```javascript 

```

### Using the JLprovider / LoggerProvider 
#### Injection and Creating Loggers 
it is recommended that the **Logger** service be used, as it prefixes logger names with `ng.client`, and sets up appenders as appropriate.

in a controller/service/directive/whatever: 
```javascript 
app.service('exampleService', function('Logger'){
    var log = new Logger('exampleService');

    log.info('hello world');
    // output: ('ng.client.exampleService: hello world')
})`
```

exceptions logged by the angular library begin with `ng.framework`


#### Configuration 
- low level configuration of JL is available via the JL provider. refer to the [JSNLog configuration docs](http://js.jsnlog.com/Documentation/JSNLogJs/JL/SetOptions) for configuration options.

```javascript
- app.config('JLprovider', function(JL){
    // library wide options 
    var options = {
        enabled: true,
        maxMessages: 0,
        defaultAjaxUrl: '/jsnlog.logger',
        clientIP : '',
        requestId: ''
    };
    JL.setOptions(options);
})
```

#### AJAX Interceptors (NOT YET IMPLEMENTED, (BUT SIMPLE TO INCLUDE) PLEASE CONTRIBUTE)
from the [jsnlog angularJS docs](http://js.jsnlog.com/Documentation/GetStartedLogging/AngularJsErrorHandling)

>To add JavaScript error handling for AJAX calls, it makes sense to use an AngularJS Interceptor. This allows you to run your own code when the $http service is about to send an AJAX request, after it has received a response, and after detecting an error.

>Add a factory to create the interceptor to your logToServer module:

```javascript
angular.module('logToServer', [])
...
.factory('logToServerInterceptor', ['$q', function ($q) {
    var myInterceptor = {
        'request': function (config) {
            config.msBeforeAjaxCall = new Date().getTime();
            return config;
        },
        'response': function (response) {
            if (response.config.warningAfter) {
                var msAfterAjaxCall = new Date().getTime();
                var timeTakenInMs = 
                      msAfterAjaxCall - response.config.msBeforeAjaxCall;
                if (timeTakenInMs > response.config.warningAfter) {
                    JL('Angular.Ajax').warn({ 
                      timeTakenInMs: timeTakenInMs, 
                      config: response.config, 
                      data: response.data });
                }
            }
            return response;
        },
        'responseError': function (rejection) {
            var errorMessage = "timeout";
            if (rejection.status != 0) {
                errorMessage = rejection.data.ExceptionMessage;
            }
            JL('Angular.Ajax').fatalException({ 
                      errorMessage: errorMessage, 
                      status: rejection.status, 
                      config: rejection.config }, rejection.data);
            return $q.reject(rejection);
        }
    };
    return myInterceptor;
}]);
var app = angular.module('main', ['logToServer']);
```

>The request function is called before the AJAX request is sent. It gives you access to the config object, which is shared throughout the interceptor. Here it is used to store the current time, so after the response is received it can calculate whether it was too late.

> The response function is called after receiving a good response from the server (that is, it has an HTTP code in the 200 range). This is the right place to calculate how long the user had to wait for the response, and to log a warning message if it took too long.

>The responseError function is called when an error response was received, or when a timeout happened. You can distinguish between timeout and bad response by looking at rejection.status - it will contain 0 for a timeout, and the HTTP response code in case of an error response.

>**Don't forget to add the new interceptor to the interceptor pipeline of your main module:**

```javascript
app.config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('logToServerInterceptor');
}]);
```

>When you call $http to send an AJAX message, set the timeout and the delay after which a warning log message is sent in milliseconds in the config object, using timeout and warningAfter:

```javascript
$http({ method: '...', url: '...', data: ..., 
        timeout: 5000, warningAfter: 2000 })
.success(function (data, status, headers, config) {
    // ...
})
.error(function (data, status, headers, config) {
    // ...
});
```

## Build
- Uses webpack, but build process is done using `gulp`
- **gulp** Instructions:
    + `gulp dist` to minify and build to `./dist/`

## Contributing 
to update this package (e.g. To update the version of jsnlog):
- replace `lib/jsnlog.js`
- run `gulp jshint` to check for javascript errors
- run `gulp dist`
- bump the version number using `bower version patch`
- submit a pull request 
