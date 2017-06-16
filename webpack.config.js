const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: "./js/main.js",
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    module: {
      rules: [
        { 
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader" 
        },
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              { loader: 'css-loader', options: { importLoaders: 1 } },
              'postcss-loader'
            ]
          })
        }
      ]
    },
    plugins: [
      new ExtractTextPlugin('[name].css'),
      new webpack.optimize.UglifyJsPlugin({minimize: true})
    ]
};