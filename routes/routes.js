import express from 'express'
import Twitter from 'twitter'
import passport from 'passport'
import { strategy } from '../passport'
require('dotenv').load()

const router = express()
const client = new Twitter({
  consumer_key: process.env.API_KEY,
  consumer_secret: process.env.API_SECRET,
  access_token_key: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
})

passport.use( strategy )

router.get('/', (req, res) => {
  res.render('index')
})

router.get('/home', (req, res) => {
  client.get(`statuses/user_timeline`, {screen_name: 'JPH5_'})
  .then( data => {
    res.status(200)
    res.render('home', {twit: data})
  })
  .catch( error => {
    console.log( error )
    res.sendStatus(400)
  })
})

router.get('/oldHome', (req, res) => {
  res.sendStatus(301)
  .then( () => {
    res.redirect('/home')
  })
  .catch( error => {
    console.log( error )
    res.sendStatus(400)
  })
})

router.post('/newTweet', (req, res) => {
  client.post('statuses/update', {status: req.body.twit})
  .then( status => {
    if(status) {
    res.status(201)
    res.redirect('/home')
  }
  })
  .catch( error => {
    res.sendStatus(400)
  })
})

router.post('/delete/:id_str', (req, res) => {
   client.post('statuses/destroy/' + req.params.id_str, { id: req.params.id_str })
  .then( () => {
    res.status(200)
    res.redirect('/home')
  })
  .catch( error => {
    console.log( error )
    res.sendStatus(400)
  })
})

router.get('/auth/twitter', passport.authenticate('twitter'))
router.get('/auth/twitter/callback', passport.authenticate('twitter', { successRedirect: '/home',
  failureRedirect: '/'}))

router.get('/*', (req, res) => {
  res.status(404)
  res.render('not-found')
})

module.exports = {
  router,
  client
}
