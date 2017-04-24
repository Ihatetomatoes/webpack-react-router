const webpack = require('webpack');
const ForkCheckerPlugin = require('awesome-typescript-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');

var config = {
    app: ['./src/index.tsx'],
    tsxLoaders: ['babel-loader','awesome-typescript-loader']
}

module.exports = (env) => {

    const isDevelopment = env.development === true;
    const isProduction = env.production === true;

    return {
        entry: {
            app: './src/index.tsx'
        },
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: '[name].bundle.js'
        },
        devtool: (() => {
            if (isProduction) return 'hidden-source-map'
            else return 'cheap-module-eval-source-map'
        })(),
        module: {
            loaders: [
                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    use: config.tsxLoaders
                },
                {
                    test: /\.scss$/, 
                    use: ExtractTextPlugin.extract({
                        fallbackLoader: 'style-loader',
                        use: ['css-loader','sass-loader'],
                        publicPath: '/dist'
                    })
                }
            ]
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.webpack.js', '.scss']
        },
        devServer: {
            contentBase: path.join(__dirname, "dist"),
            compress: true,
            stats: "errors-only",
            open: true
        },
        plugins: [
            new webpack.DefinePlugin({
                // Allows these constants to be accessed by the aurelia app
                DEVELOPMENT: JSON.stringify(isDevelopment),
                PRODUCTION: JSON.stringify(isProduction)
            }),
            new HtmlWebpackPlugin({
                title: 'React Router Starter',
                hash: true,
                template: './src/index.html', // Load a custom template (ejs by default see the FAQ for details)
            }),
            new ExtractTextPlugin({
                filename: '[name].css',
                disable: false,
                allChunks: true
            })
        ]
    }
}