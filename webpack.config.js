var webpack = require('webpack');

module.exports = {
    entry: [
        // 'webpack-dev-server/client?http://' + require("os").hostname() + ':8080/',
        // 'webpack/hot/only-dev-server',
        "materialize-loader!./materialize.config.js",
        './src/index.jsx'
    ],
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel'
            },
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader:"url?limit=10000&mimetype=application/font-woff" },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file" }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    output: {
        path: __dirname + '/dist/static',
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