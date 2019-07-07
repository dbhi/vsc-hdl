//@ts-check

'use strict';

const path = require('path');

/**@type {import('webpack').Configuration}*/

module.exports = {
  entry: './ts/extension.ts',
  target: 'node',
  output: {
    path: path.resolve(__dirname),
    filename: 'main.js',
    libraryTarget: 'commonjs2',
    devtoolModuleFilenameTemplate: '../[resource-path]'
  },
  devtool: 'source-map',
  externals: {
    vscode: 'commonjs vscode'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader'
          }
        ]
      }
    ]
  }
};
