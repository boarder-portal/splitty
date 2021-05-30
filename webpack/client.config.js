const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const LoadablePlugin = require('@loadable/webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const commonConfig = require('./common.config');

module.exports = {
  ...commonConfig,
  module: {
    rules: [
      ...commonConfig.module.rules,
      {
        test: /\.(scss|css)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      }
    ]
  },
  entry: path.resolve(__dirname, '../app/client/client.tsx'),
  output: {
    filename: '[name].js',
    chunkFilename: '[name].[contenthash].js',
    path: path.resolve(__dirname, '../build/client'),
  },
  plugins: [
    new LoadablePlugin(),
    new MiniCssExtractPlugin(),
    process.env.ANALYZE_BUNDLE ? new BundleAnalyzerPlugin() : undefined,
  ].filter(Boolean)
}
