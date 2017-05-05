import express from 'express'
import bodyParser from 'body-parser'
import {router} from './routes/routes'
import favicon  from 'serve-favicon'
import path from 'path'
import passport from 'passport'
const session = require('express-session')

const server = express()

server.use(bodyParser.urlencoded({extended:true}))
server.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

server.set('view engine', 'pug')
server.use(express.static(__dirname + '/public'))


server.use(session({
   secret: 'keyboard cat'
}))

server.use(passport.initialize())
passport.serializeUser(function(user, callback) {
  callback(null, user);
})
passport.deserializeUser(function(obj, callback) {
  callback(null, obj);
})

server.use(router)

server.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})

module.exports = {
  server
}
