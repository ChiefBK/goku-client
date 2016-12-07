var webpack = require('webpack');

module.exports = {
    entry: [
        // 'webpack-dev-server/client?http://' + require("os").hostname() + ':8080/',
        // 'webpack/hot/only-dev-server',
        './src/index.jsx'
    ],
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel'
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    output: {
        path: __dirname + '/dist',
        publicPath: '/dist',
        filename: 'bundle.js'
    },
    // devServer: {
    //     contentBase: './dist'
    // },
    // plugins: [
    //     new webpack.HotModuleReplacementPlugin()
    // ]
};