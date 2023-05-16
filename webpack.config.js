const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlInlinePlugin = require('html-inline-script-webpack-plugin');

const mode = process.env.NODE_ENV || 'production';

module.exports = {
  mode: process.env.NODE_ENV || 'production',
  entry: {
    main: './src/components/script.tsx',
    initColorScheme: './src/features/colorScheme/initColorScheme.ts',
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
        test: /\.(svg|jpg)$/,
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
  optimization: {
    runtimeChunk: mode === 'production' ? false : 'single',
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
