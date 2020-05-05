const path = require('path')

module.exports = {
  mode: 'production',
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
    alias: {
      '~': path.resolve(__dirname, 'src/')
    }
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname)
  },
  devtool: 'inline-source-map'
}
