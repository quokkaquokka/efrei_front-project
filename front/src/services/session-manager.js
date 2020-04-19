import Router from '../router/index'
import config from '../client.config'
import jwtDecode from 'jwt-decode'
import axios from 'axios'

export { refreshToken }

async function refreshToken () {
  const tokenExpiryDate = localStorage.getItem('tokenExpiry')
  if (!tokenExpiryDate) {
    console.log('No token expiry date. user probably never logged in')
    return Router.push('/signin')
  }
  const reNewAt = tokenExpiryDate - 60
  let reNewIn = reNewAt - (Date.now() / 1000)
  if (reNewIn < 0) {
    reNewIn = 1
  }
  const options = {
    headers: {
      authorization: 'Bearer ' + localStorage.getItem('token')
    }
  }
  const resp = await axios.get(config.apiURL + '/auth/renew', options)
  setToken(resp.data)
}

function setToken (token) {
  const credentials = token ? jwtDecode(token) : null
  localStorage.setItem('tokenExpiry', credentials.exp)
  localStorage.setItem('token', token || '')
  if (!token) return
  const expiresAt = credentials.exp * 1000
  const renewIn = expiresAt - 60000 - Date.now()

  if (expiresAt < Date.now() || renewIn < 0) {
    return setToken(null)
  }
  setTimeout(refreshToken, renewIn)
}
