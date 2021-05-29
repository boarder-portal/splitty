const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, '../app/server/server.ts'),
  target: 'node',
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
    path: path.resolve(__dirname, '../build/server'),
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
}
