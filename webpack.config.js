var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, './admin/build');
var SOURCE_DIR = path.resolve(__dirname, './admin/source');

module.exports = {
    entry: SOURCE_DIR + '/main.jsx',
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js'
    },
    devServer: {
        host: '0.0.0.0',
        port: 3000,
        status: {'colors': true, 'progress': true},
        contentBase: './admin/build/',
        lazy: true
    },
    module : {
        loaders : [
          {
            test : /\.jsx?$/,
            include : SOURCE_DIR,
            exclude: /node_modules/,
            loader : 'babel'
          }
        ]
    }
}