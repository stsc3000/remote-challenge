var path = require("path");
var webpack = require("webpack");

module.exports = {
  cache: true,
  debug: true,
  devtool: '#source-map',
  entry: {
    app: "./app",
  },
  output: {
    path: path.join(__dirname, "dist"),
    publicPath: "dist/",
    filename: "[name].js",
    chunkFilename: "[chunkhash].js"
  },
  module: {
    loaders: [
      // required to write "require('./style.css')"
      { test: /\.css$/, loader: "style-loader!css-loader" },
    ]
  },
  resolve: {
    modulesDirectories: ['node_modules', 'src'],
    fallback: path.join(__dirname, 'node_modules')
  },
  node: {
    fs: "empty"
  }
};
