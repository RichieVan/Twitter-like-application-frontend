const path = require('path');
const webpack = require('webpack')
const dotenv = require('dotenv');
dotenv.config();

const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
console.log(process.env.BUILD_ENV);
const modeStatus = (process.env?.BUILD_ENV == 'production') ? 'production' : 'development';

require('dotenv').config({path : './.env'})

module.exports = {
    mode: modeStatus,
    entry: [
        './src/index.js'
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath : '/',
        filename: 'build/project.js'
    },
    module: {
        rules: [
            {
                test: /\.(jsx|js)$/,
                exclude: '/node_modules',
                use: 'babel-loader'
            },
            {
                test : /\.css$/, 
                use : [
                    modeStatus == 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.(png|jpg|ico)$/,
                use: 'file-loader'
            },
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: "babel-loader"
                    },
                    {
                        loader: "react-svg-loader",
                        options: {
                            jsx: true // true outputs JSX tags
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'build/[name].css',
            chunkFilename: 'build/[id].css'
        }),
        new HTMLWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, 'src/index.html'),
            minify: false
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/assets'),
                    to: path.resolve(__dirname, 'dist/assets')
                },
            ]
        }),
        new webpack.DefinePlugin({
            'process.env' : JSON.stringify(process.env)
        })
    ],
    resolve : {
        extensions : ['.js', '.jsx', '.css'],
        modules: [path.resolve(__dirname, 'node_modules'), 'node_modules']
    },
    devServer: {
        compress: true,
        port: 8000,
        client: {
            logging: 'none',
            progress: false
        },
        static: {
            directory: path.join(__dirname, 'dist'),
            watch: true
        },
        historyApiFallback : true
    },
    devtool: 'source-map',
    ignoreWarnings: [
        {
            //message: /performance/
        }
    ]
}