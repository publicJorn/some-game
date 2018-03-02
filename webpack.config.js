const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',

  output: {
    filename: 'dist/game.js'
  },

  devtool: 'inline-source-map',

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['babel-preset-env'],
          },
        },
      }
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      // Using custom index for adding some default css, that should not be part of the project
      template: 'src/index.html',
    }),
  ],

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 3000,
  }
}
