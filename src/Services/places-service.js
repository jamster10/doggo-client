import TokenService from '../Services/token-service'
import config from '../config'

const PlaceApiService = {
  getPlaces() {
    return fetch(`${config.API_ENDPOINT}/places`, {
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
    })
    .then(res => {
      if (!res.ok) {
        return Promise.reject(res.json())
       }
      return res.json()
    })
    .catch(e => e)
  }, 
  deletePlace(placeId) {
    return fetch(`${config.API_ENDPOINT}/places/${placeId}`, {
      method: 'DELETE',
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
    })
    .then(res => {
      if (!res.ok) {
        return Promise.reject(res.json())
       }
      return res.json()
    })
    .catch(e => e)
  }, 
  savePlace(place) {
    return fetch(`${config.API_ENDPOINT}/place`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({
        place
      }),
    })
    .then(res => {
      if (!res.ok) {
        return Promise.reject(res.json())
       }
      return res.json()
    })
    
  } 
}

export default PlaceApiService
