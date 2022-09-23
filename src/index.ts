import express from 'express'
import path from 'path'
import dotenv from 'dotenv'

const app = express()

// 動態選擇環境變數的檔案 , 因為 prod , dev 路徑不同，需用 ../退到根目錄再指定 src 資料夾內的 env
dotenv.config({
  path: path.resolve(
    __dirname,
    `../src/environments/${process.env.NODE_ENV}.env`
  )
})

app.get('/', (req, res, next) => {
  res.send('Hello, Express')
})

app.listen(process.env.PORT, () =>
  console.log(`http server is running at port ${process.env.PORT}.`)
)
