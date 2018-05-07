const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const javascript = {
  test: /\.js$/,
  exclude: /(node_modules)/,
  use: {
    loader: "babel-loader",
    options: {
      presets: ["env"]
    }
  }
};

const postcss = {
  loader: "postcss-loader",
  options: {
    plugins: loader => [require("autoprefixer")()]
  }
};

const fonts = {
  test: /\.(eot|ttf|woff|woff2)$/,
  use: [
    {
      loader: "url-loader",
      options: {
        limit: 8192,
        fallback: "file-loader"
      }
    }
  ]
};

const styles = {
  test: /\.scss$/,
  use: ExtractTextPlugin.extract([
    { loader: "css-loader", options: { minimize: true } },
    postcss,
    { loader: "sass-loader" }
  ])
};

const images = {
  test: /\.(png|jpg|gif|svg)$/,
  use: [
    {
      loader: "file-loader",
      options: { outputPath: "images/", name: "[name][hash:6].[ext]" }
    }
  ]
};

const config = {
  entry: {
    main: ["babel-polyfill", "./public/javascript/main.js"]
  },
  output: {
    path: path.resolve(__dirname, "./public/dist"),
    filename: "[name].bundle.js"
  },
  devtool: "source-map",
  module: {
    rules: [javascript, styles, images, fonts]
  },
  plugins: [
    new UglifyJsPlugin({
      test: /\.js($|\?)/i,
      sourceMap: true
    }),
    new ExtractTextPlugin("styles.css"),
    new webpack.optimize.CommonsChunkPlugin({ name: "common" })
  ]
};

module.exports = config;
