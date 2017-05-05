import express from 'express'
import bodyParser from 'body-parser'
import {router} from './routes/routes'
import favicon  from 'serve-favicon'
import path from 'path'

const server = express()

server.use(bodyParser.urlencoded({extended:true}))
server.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

server.set('view engine', 'pug')
server.use(express.static(__dirname + '/public'))
server.use(router)

server.listen(9000, () => {
  console.log('Example app listening on port 9000!')
})
