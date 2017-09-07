var path = require('path');

const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractCSS = new ExtractTextPlugin('[name].bundle.css');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {
    entry: {
        app: './src/js/app.js',
        vendors: ['jquery']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ["es2015"]
                }
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader'})
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [autoprefixer]
                        }
                    }, 'resolve-url-loader', 'sass-loader']
                })
            },
            {
                test: /\.(ttf|eot|woff2?)(\?v=[a-z0-9=\.]+)?$/i,
                loader: 'file-loader?name=./fonts/[name].[ext]'
            },
            {
                test: /\.(jpe?g|png|gif|svg|ico)$/i,
                loaders: 'file-loader?name=./img/[sha512:hash:base64:7].[ext]'
            },
            {
                test: /\.hbs$/,
                loader: 'handlebars-loader',
                query: {
                    partialDirs: [
                        path.resolve(__dirname, 'src/partials')
                    ]
                }
            },
        ]
    },
    plugins: [
        extractCSS,
        new HtmlWebpackPlugin({
            template: 'src/index.hbs'
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        new CopyWebpackPlugin([{
            from: 'src/img',
            to: path.resolve(__dirname, 'dist/img')
        }])
    ]
};