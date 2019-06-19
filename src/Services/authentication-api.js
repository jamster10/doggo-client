import config from '../config';
import { rejects } from 'assert';
import TokenService from './token-service'

const AuthService = {
  async registerUser(user) {

    const response = await fetch(config.API_ENDPOINT + '/users/register', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(user),
    })

    if(!response.ok){
      const jsonError = await response.json();
      return Promise.reject(jsonError)
    }
    this.loginUser(user)
  },

  async loginUser(user) {
    const response = await fetch(config.API_ENDPOINT + '/auth/login', {
      method: 'POST',
      headers:{
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })

    if (!response.ok){
      const error = await response.json()
      return Promise.reject(error)
    }
    const data = await response.json();
    TokenService.saveAuthToken(data.token)
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
