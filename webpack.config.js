const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlInlinePlugin = require('html-inline-script-webpack-plugin')

module.exports = {
  mode: process.env.NODE_ENV || 'production',
  entry: {
    main: './src/script.tsx',
    initColorScheme: './src/initColorScheme.ts'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.svg$/,
        type: 'asset/resource',
      },
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    alias: { '@components': path.resolve('./src/components') },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'bundle.[contenthash].css',
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new HtmlInlinePlugin([/initColorScheme\..+\.js$/]),
    new StylelintPlugin({
      files: 'src/{**/*,*}.css',
    }),
    new ESLintPlugin({
      files: 'src/{**/*,*}.{tsx,ts}',
    }),
  ],
  devServer: {
    open: true,
    historyApiFallback: {
      disableDotRule: true,
    },
  },
};
