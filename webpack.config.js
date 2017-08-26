

var HTMLWebPackPlugin = require('html-webpack-plugin');
var HTMLWebPackPluginConfig = new HTMLWebPackPlugin(
    {
        template : __dirname + "/index.html",
        filename : 'index.html',
        inject : 'body'
    }
);
var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'public');
var APP_DIR = path.resolve(__dirname, 'app')
module.exports = {
    entry: APP_DIR + '/index.js',
    output: {
                path: BUILD_DIR,
                filename: 'bundle.js'
            },
            module: {
                loaders : [
                    {
                        test : /\.js?/,
                        include : APP_DIR,
                        exclude : /node_modules/,
                        loader : 'babel-loader'
                                
                    },
                    {
                        test: /\.css$/,
                        include : APP_DIR,
                        use: [
                            {loader : "style-loader"},
                            {loader : "css-loader"}
                        ]
                    }
                    // {
                    //   test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, 
                    //   loader: 'url?limit=10000&mimetype=application/font-woff'
                    // },
                    // {
                    //   test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, 
                    //   loader: 'url?limit=10000&mimetype=application/octet-stream'
                    // },
                    // {
                    //   test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, 
                    //   loader: 'file'
                    // },
                    // {
                    //   test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, 
                    //   loader: 'url?limit=10000&mimetype=image/svg+xml'
                    // }
                ]
              
            },
            plugins: [HTMLWebPackPluginConfig]
   };



