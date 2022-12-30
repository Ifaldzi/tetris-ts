const path = require("path");

module.exports = {
  entry: './src/index.ts',
  mode: 'development',
  output: {
    filename: 'index.min.js',
    path: path.resolve(__dirname, 'dist')
  },
  // devTool: 'source-map',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js"]
  }
}