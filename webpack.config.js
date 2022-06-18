const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: 'production', // development /////////////////////////
    entry: {
        main: path.resolve(__dirname, 'src/scripts/startGame.js'),
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
        assetModuleFilename: '[name][ext]',
        clean: true,
    },
    //devtool: 'inline-source-map', ///////////////////////////
    devServer: {
        static: path.resolve(__dirname, 'dist'),
        port: 8080,
        open: true,
        hot: true,
    },
    //loaders
    module: {
        rules: [
            //css
            //{ test: /\.css$/, use: ['style-loader', 'css-loader']},
            { 
                test: /\.css$/i, 
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            //images
            { test: /\.(svg|ico|png|webp|jpg|gif|jpeg)$/, type: 'asset/resource' },
            //js for babel
            {
              test: /\.js$/,
              exclude: /node_modules/,
              use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'],
                },
              },
            },
        ],
    },
    //plugins
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Corona game',
            filename: 'index.html',
            template: path.resolve(__dirname, 'src/temp.html'),
        }),
        new MiniCssExtractPlugin(),
    ],
};