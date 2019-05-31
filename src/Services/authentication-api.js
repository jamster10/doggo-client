import config from '../config';
import { rejects } from 'assert';
import TokenService from './token-service'

const AuthService = {
  registerUser(user) {
    return fetch(config.API_ENDPOINT + '/api/users/register', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(user),
    })
    .then(res => {
      if (!res.ok) { 
        res.json()
          .then(e => Promise/rejects(e))
      }
      res.json()
    })
    .catch(console.log)
  }, 
  loginUser(user) {
    return fetch(config.API_ENDPOINT + '/auth/login', {
      method: 'POST',
      headers:{
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(res => {
      if (!res.ok) {
        return Promise.reject(res.json())
       }
      return res.json()
    })
    .then(res => {
      console.log(res)
      console.log(res.body)
      console.log('herre')
      TokenService.saveAuthToken(res.token)
      //add expiration here
      return res;
    })
    .catch(e => e)
  }, 
  getRefreshToken() {
    return fetch(config.API_ENDPOINT + '/api/auth/refresh', {
      method: 'POST',
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`
      },
    })
    .then( res => {
      !res.ok
        ? res.json()
            .then(e => Promise.reject(e))
        : res.json();
    })
    .then(res => {
      TokenService.saveAuthToken(res.token)
      //add expiration code
    })
    .catch(e => {
      console.log('Problem getting refresh token', e)
    });
  }
}

export default AuthService;
