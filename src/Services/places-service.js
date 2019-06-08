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
    return fetch(`${config.API_ENDPOINT}/places`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({
        address: place.address,
        name: place.name,
        place_id: place.place_id,
        price_level: place.price_level,
        rating: place.rating,
        user_ratings_total: place.user_ratings_total,
        saved: place.saved
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
