const path = require("path");
module.exports = {
    mode: "production",
    optimization: {
        minimize: true,
    },
    entry: "./src/dynamic.ts",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "dynamic.min.js"
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