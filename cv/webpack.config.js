const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: ["@babel/polyfill", './index.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      '@images': path.resolve(__dirname, 'src/assets/images')
    }
  },
  // optimization: {
  //   splitChunks: {
  //     chunks: 'all'
  //   }
  // },
  devServer: {
    port: 4200
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      minify: {
        collapseWhitespace: true
      }
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        { from: path.resolve(__dirname, 'src/copyFilesFolder'), to: path.resolve(__dirname, 'dist') },
      ]
    }),
    new MiniCssExtractPlugin({
      filename: "style.css"
    })


  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader,  "css-loader", 'sass-loader']
       
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        // use: ['file-loader']
        type: 'asset/resource'
      },
      {
        test: /\.(ttf|woff|woff2|eot)/,
        // use: ['file-loader']
        type: 'asset/resource'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              '@babel/preset-env',
              "@babel/preset-typescript"
            ]
          }
        }
      }
    ]
  }
};