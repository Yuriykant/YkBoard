const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlInlineScriptWebpackPlugin = require('html-inline-script-webpack-plugin');

const mode = process.env.NODE_ENV || 'production';

module.exports = {
  mode: process.env.NODE_ENV || 'production',
  entry: {
    main: './src/script.tsx',
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
  optimization: {
    runtimeChunk: mode === 'production' ? false : 'single',
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    alias: {
      '@Components': path.resolve('./src/Components'),
      '@features': path.resolve('./src/features'),
      '@app': path.resolve('./src/app'),
      '@images': path.resolve('./src/images'),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/app/index.html',
    }),
    new HtmlInlineScriptWebpackPlugin({
      scriptMatchPattern: [/initColorScheme\..+\.js$/],
    }),
    new CleanWebpackPlugin(),
    new StylelintPlugin({
      files: 'src/{**/*,*}.css',
    }),
    new ESLintPlugin({
      files: 'src/{**/*,*}.{tsx,ts}',
    }),
    new MiniCssExtractPlugin({
      filename: 'bundle.[contenthash].css',
    }),
  ],
  devServer: {
    open: true,
    historyApiFallback: true,
  },
};
