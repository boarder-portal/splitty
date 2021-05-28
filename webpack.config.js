const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  entry: './app/client/client.tsx',
  module: {
    rules: [{
      test: /.tsx?$/,
      use: 'ts-loader',
      exclude: /node_modules/,
    }]
  },
  output: {
    filename: 'client.js',
    path: path.resolve(__dirname, 'build'),
  },
  mode: 'production',
  resolve: {
    alias: {
      client: path.join(__dirname, 'app', 'client'),
      common: path.join(__dirname, 'app', 'common'),
      server: path.join(__dirname, 'app', 'server'),
    },
    extensions: ['.tsx', '.ts', '.js'],
  },
  devtool: 'source-map',
  plugins: [
    process.env.ANALYZE_BUNDLE ? new BundleAnalyzerPlugin() : undefined,
  ].filter(Boolean)
}
