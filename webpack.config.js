const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const javascript = {
	test: /\.js$/,
	exclude: /(node_modules)/,
	use: {
		loader: 'babel-loader',
		options: {
			presets: ["env"]
		}
	}
};

const postcss = {
	loader: 'postcss-loader',
	options: {
    plugins: (loader) => [
      require('autoprefixer')()
    ]
  }
};

const styles = {
  test: /\.scss$/,
	use: ExtractTextPlugin.extract(['css-loader', postcss, 'sass-loader'])
};

const images = {
  test: /\.(png|jpg|gif)$/,
  use: [
    {
      loader: 'file-loader',
      options: {outputPath: 'images/', name: '[name][hash:6].[ext]'}
    }
  ]
};

const uglify = new webpack.optimize.UglifyJsPlugin();

const config = {
  entry: {
  	main: ['babel-polyfill', './public/javascript/main.js']
  },
  output: {
    path: path.resolve(__dirname, './public/dist'),
    filename: '[name].bundle.js'
  },
  devtool: 'source-map',
  module: {
    rules: [javascript, styles, images]
  },
  plugins: [uglify, new ExtractTextPlugin("styles.css")]
};

module.exports = config;