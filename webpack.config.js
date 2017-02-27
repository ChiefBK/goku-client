var webpack = require('webpack');

module.exports = {
    entry: [
        // 'webpack-dev-server/client?http://' + require("os").hostname() + ':8080/',
        // 'webpack/hot/only-dev-server',
        './style.less',
        './src/index.jsx'
    ],
    module: {
        loaders: [
            { test: /\.jsx?$/, exclude: /(node_modules|bower_components)/, loader: 'babel' },
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            { test: /\.less$/, loader: 'style!css!less'},
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
            { test: /\.(woff|woff2)$/, loader:"url?prefix=font/&limit=5000" },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" }
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
    plugins: [
        // new webpack.HotModuleReplacementPlugin()
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
    //     // new ExtractTextPlugin("styles.css")
    ]
};