/*!
 * @author lanxuewu
 */
var path = require("path");
var webpack = require("webpack");
var evn=process.env.NODE_ENV;
var config={
    entry:{
        "index":"./index.js"
    },
    output:{
        path:path.join(__dirname, "dist"),
        publicPath:"",
        filename:"[name].js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude:path.resolve(__dirname, 'node_modules/'),
                loader: 'babel',
                query: {
                    cacheDirectory: true
                }
            }
        ]
    },
    plugins: []
};
module.exports = config;