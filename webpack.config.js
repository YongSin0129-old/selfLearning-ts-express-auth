const path = require('path')
const webpack = require('webpack')
const dotenv = require('dotenv')
const nodeExternals = require('webpack-node-externals')
const NodemonPlugin = require('nodemon-webpack-plugin')

module.exports = (env, argv) => {
  // 取得環境變數檔的內容，並依照 mode 來切換模式
  const params = dotenv.config({
    path: path.resolve(__dirname, `./src/environments/${argv.mode}.env`)
  }).parsed

  // 將環境變數的設置寫入 Object 中，以方便後續調用
  const processEnv = {}
  Object.keys(params).forEach(
    key => (processEnv[`process.env.${key}`] = JSON.stringify(params[key]))
  )

  return {
    entry: './src/index.ts', // 載入點
    target: 'node', // 使用 node
    externals: [
      nodeExternals() // 排除 node_modules
    ],
    module: {
      rules: [
        {
          test: /\.ts$/, // .ts 的檔案用 ts-loader 讀取
          use: 'ts-loader',
          exclude: /node_modules/
        }
      ]
    },
    resolve: {
      extensions: ['.ts', '.js'] // 補足 import 檔案的結尾
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    plugins: [
      new webpack.DefinePlugin(processEnv), // 設置環境變數
      new NodemonPlugin()
    ]
  }
}
