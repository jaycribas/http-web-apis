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
  count: 5
}

router.get('/', (req, res) => {
  res.render('index')
})

router.get('/home', (req, res) => {
  client.get(`statuses/user_timeline`, {screen_name: 'JPH5_'})
  .then( data => {
    res.status(200)
    res.render('home', {twit: data})
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
    console.log(error)
    res.sendStatus(400)
  })
})

router.post('/delete/:id_str', (req, res) => {
  console.log( "(>'')>  ", parseInt(req.params.id_str) )
  let idValue = req.params.id_str
   client.post('statuses/destroy/' + idValue, { id: (req.params.id_str)} )
  .then( response => {
    console.log( "=-=-=-> response", response )
    res.redirect('/home')
  })
  .catch(error => {
    console.log( "=-=-=-> error", error )
  })

})

//
// router.post('/deleteTweet', (req, res) => {
//   client.post(`statuses/destroy:${1}`, {status: req.body.twit})
//   .then( status => {
//     if(status) {
//     res.status(201)
//     res.render('home', { twit: status.text })
//   }
//   })
//   .catch( error => {
//     console.log(error)
//     res.sendStatus(400)
//   })
// })


router.get('/*', (req, res) => {
  res.status(404)
  res.render('not-found')
})

module.exports = {
  router
}
