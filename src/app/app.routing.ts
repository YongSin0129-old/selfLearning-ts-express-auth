import express from 'express'
const router = express.Router()

router.get('/test', (req, res, next) => {
  res.send('test!')
})

router.post('/test', (req, res, next) => {
  res.send(JSON.stringify(req.body))
})

/********************************************************************************
*
          測試 error handle
*
*********************************************************************************/
// 錯誤處理 1 直接顯示錯誤
// router.get('/error', (req, res, next) => {
//   throw 'error page.';
// });

// 錯誤處理 2 使用 next 下傳

router.get('/data/error', (req, res, next) => {
  // Fake API
  const getProfile = new Promise((resolve, reject) => {
    setTimeout(() => resolve({ name: 'howhow', age: 25 }), 100)
  })
  const getFriends = new Promise((resolve, reject) => {
    setTimeout(() => resolve([]), 120)
  })
  const errorRequest = new Promise((resolve, reject) => {
    setTimeout(() => reject('Oops ! error !!!'), 1000)
  })

  getProfile
    .then(profile => getFriends)
    .then(friends => errorRequest)
    .then(() => res.send('GoGoGo!'))
    .catch(err => next(err))
})

export default router
