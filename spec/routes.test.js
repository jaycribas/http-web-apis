import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import { server } from '../app'
import { client } from '../routes/routes'

chai.use( chaiHttp )

describe('Route Tests ', () => {
  context('get', () => {

    it( '/ renders the index', done => {

      chai.request(server)
      .get('/home')
        client.get(`statuses/user_timeline`, {screen_name: 'JPH5_'})
      .then( response => {
        console.log( "=-=-=-> response", response )
        expect(response.user.screen_name).to.equal('JPH_5')
        done()
      })
      .catch( error => {
        console.log( "=-=-=-> error", error )
        done()
      })
    })
  })
})
