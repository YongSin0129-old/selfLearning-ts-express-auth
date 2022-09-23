import express from 'express'
const router = express.Router()
import { UserModel } from '../models/user'

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

/********************************************************************************
*
          CRUD test
*
*********************************************************************************/
router.post('/users', async (req, res, next) => {
  try {
    const { username, email } = req.body
    const user = new UserModel({ username, email })
    const data = await user.save()
    res.send(data)
  } catch (error) {
    res.status(400).send((error as any).message)
  }
})

router.get('/users', async (req, res, next) => {
  try {
    const documents = await UserModel.find({})
    res.send(documents)
  } catch (error) {
    res.status(400).send((error as any).message)
  }
})

router.patch('/users/:id', express.json(), async (req, res, next) => {
  const options: Object = {
    new: true,
    runValidators: true
  }
  const document = await UserModel.findByIdAndUpdate(
    req.params.id,
    { username: req.body.username },
    options
  )
  res.send(document)
})

router.delete('/users/:id', async (req, res, next) => {
  await UserModel.findByIdAndRemove(req.params.id)
  res.send('刪除成功')
})

export default router
