import express from 'express'
const router = express.Router()
import { UserModel } from '../models/user'

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
