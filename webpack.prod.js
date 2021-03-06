const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin")

const{ CleanWebpackPlugin }= require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
    entry: './src/client/index.js',
    mode: 'production',
    module: {
        rules: [
            {
                test: '/\.js$/',
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                  // Creates `style` nodes from JS strings
                  MiniCssExtractPlugin.loader,
                  // Translates CSS into CommonJS
                  'css-loader',
                  // Compiles Sass to CSS
                  'sass-loader',
                ],
            },
        ]
    },
    optimization: {
        minimizer: [
          new OptimizeCssAssetsPlugin(),
          new TerserPlugin(),
         
        ]
      },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html",
        }),
        // new MiniCssExtractPlugin({ filename: "[name].[contentHash].css" }),
        new CleanWebpackPlugin({
             // Simulate the removal of files
             dry: true,
             // Write Logs to Console
             verbose: true,
             // Automatically remove all unused webpack assets on rebuild
             cleanStaleWebpackAssets: true,
             protectWebpackAssets: false
        }) , 
        new MiniCssExtractPlugin({ filename: "[name].css" }),
        new WorkboxPlugin.GenerateSW(),
        
    ],
    

}
