import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import { server } from '../app'
import { client } from '../routes/routes'

chai.use( chaiHttp )

describe('Route Tests ', () => {
  it( '/home gets user data', done => {
    chai.request(server)
    .get('/home')
      client.get(`statuses/user_timeline`, {screen_name: 'JPH5_'})
    .then(response => {
      expect(response[0].user.screen_name).to.equal('JPH5_')
      expect(response[0].user.name).to.equal('John Philip Hallman')
      done()
    })
    .catch( error => {
      console.log( "=-=-=-> error", error )
      done()
    })
  })
})
