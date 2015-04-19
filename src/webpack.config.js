var webpack = require("webpack");

module.exports = {
    "entry": "./src/entry.js",
    "externals": {
        "angular": "angular"
    },
    "output": {
        "library": "jsnlog-angular",
        "libraryTarget": "umd",
        "filename": "jsnlog-angular.min.js",
        "path": __dirname
    },
    plugins: [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin()
    ]
};
