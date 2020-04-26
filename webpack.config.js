const path = require('path')
const webpack = require('webpack')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.pug$/,
                loader: 'pug-loader',
                options: {
                    pretty: true
                }
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                loader: 'file-loader',
                exclude: [
                    path.resolve(__dirname, 'src/fonts/')
                ],
                options: {
                    outputPath: 'img/'
                }
            },
            {
                test: /\.(ttf|woff|svg|eot|woff2)$/,
                include: [
                    path.resolve(__dirname, 'src/fonts/')
                ],
                loader: 'file-loader',
                options: {
                    outputPath: 'fonts/'
                }
            }
        ]
    },
    plugins: [
        new HTMLWebpackPlugin({
            filename: 'colors-and-type.html',
            template: './src/pages/colors-and-type/colors-and-type.pug'
        }),
        new HTMLWebpackPlugin({
            filename: 'form-elements.html',
            template: './src/pages/form-elements/form-elements.pug'
        }),
        new HTMLWebpackPlugin({
            filename: 'cards.html',
            template: './src/pages/cards/cards.pug'
        }),
        new HTMLWebpackPlugin({
            filename: 'headers-and-footers.html',
            template: './src/pages/headers-and-footers/headers-and-footers.pug'
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        })
    ]
}
