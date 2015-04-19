# jsnlog-angular
Angular.JS 1.x module for jsnlog, ' a tiny JavaScript logging library, [that's] simple and well documented.'

## Installation 
### Install
- include `angular-jsnlog.min.js` AFTER `angular.js`
- use **bower**? (recommended!): `bower install -save jsnlog-angular`

## Build
- Uses webpack, but build process is done using `gulp`
- **gulp** Instructions:
    + `gulp dist` to minify and build to `./dist/`

## Contributing 
To update the version of jsnlog:
- replace `lib/jsnlog.js`
- bump the version number using `bower version patch`
- run `gulp build`
