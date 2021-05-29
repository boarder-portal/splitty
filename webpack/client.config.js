const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const LoadablePlugin = require('@loadable/webpack-plugin')

module.exports = {
  entry: path.resolve(__dirname, '../app/client/client.tsx'),
  module: {
    rules: [{
      test: /.tsx?$/,
      use: 'babel-loader',
      exclude: /node_modules/,
    }]
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name].[contenthash].js',
    path: path.resolve(__dirname, '../build/client'),
  },
  mode: process.env.PRODUCTION ? 'production' : 'development',
  resolve: {
    alias: {
      client: path.resolve(__dirname, '../app/client'),
      common: path.resolve(__dirname, '../app/common'),
      server: path.resolve(__dirname, '../app/server'),
    },
    extensions: ['.tsx', '.ts', '.js'],
  },
  devtool: 'source-map',
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  plugins: [
    new LoadablePlugin(),
    process.env.ANALYZE_BUNDLE ? new BundleAnalyzerPlugin() : undefined,
  ].filter(Boolean)
}
