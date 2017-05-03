import express from 'express'
import Twitter from 'twitter'
require('dotenv').load()

const router = express()
const client = new Twitter({
  consumer_key: process.env.API_KEY,
  consumer_secret: process.env.API_SECRET,
  access_token_key: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
})
let params = {
  q: 'banana since:2011-11-11',
  count: 1
}

router.get('/', (req, res) => {
  res.render('index')
})

router.get('/home', (req, res) => {
  client.get(`search/tweets`, params)
  .then( data => {
    res.status(200)
    res.render('home', {twit: data.statuses[0].text})
  })
})

router.post('/newTweet', (req, res) => {
  client.post('statuses/update', {status: req.body.twit})
  .then( () => {
    res.redirect('/home')
  })
})

router.get('/*', (req, res) => {
  res.status(404)
  res.render('not-found')
})

module.exports = {
  router
}
