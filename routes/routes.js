import express from "express"

const router = express()

router.get('/', (req, res) => {
  res.render('index')
})

router.get('/home', (req, res) => {
  res.render('home')
})

router.post('sendTwit')

export default router
