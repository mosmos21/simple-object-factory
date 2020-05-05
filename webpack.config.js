const path = require('path')

module.exports = {
  mode: 'production',
  target: 'node',
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.ts'],
/*    modules: [
      path.resolve(__dirname, 'src'),
      'node_modules'
    ],*/
    alias: {
      '~': path.resolve(__dirname, 'src')
    }
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname),
    libraryTarget: 'commonjs'
  },
  devtool: 'inline-source-map'
}
