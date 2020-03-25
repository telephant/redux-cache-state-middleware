const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /(test|node_module)/,
      },
    ],
    resolve: {
      extensions: ['.tsx', '.ts', '.js']
    },
  }
};