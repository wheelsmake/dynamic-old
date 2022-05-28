const path = require("path");
const isMinify = process.env.MINIFY;
module.exports = {
    mode: "development",
    optimization: {
        minimize: false,
    },
    entry: "./src/dynamic.ts",
    devtool: "source-map",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "dynamic.js"
    },
    resolve: {
        extensions: [
            ".ts",
            ".js"
        ]
    },
    module: {
        rules:[{
            test: /\.ts$/,
            use: "ts-loader",
            exclude: /node_modules/
        }]
    }
}