import React, { useState } from 'react';
import ResultItem from '../Results/ResultItem';
import ResultsList from '../Results/ResultsList';
import ResultList from '../Results/ResultsList';
import PlaceApiService from '../../Services/places-service'


const MyPlaces = ({ myPlaces, errorHandler, deletePlace }) => {
  const [serviceWorking, toggleServiceWorking] = useState(false)

  const pricelevelFinder = (result) => {
    if(!result.hasOwnProperty('price_level')) return
    const $ = '$';
    let pricelevel = "";
    let x = 0;
    while( x < Number(result.price_level) ){
      pricelevel += $
      x++
    }
    return <div className="rating">{pricelevel}</div>;
  }

  const ratingFinder = (result) => {
    if(!result.hasOwnProperty('rating')) return
    const $ = '⭐';
    let ratinglevel = "";
    let x = 0;
    while( x < Number(result.rating) ){
      ratinglevel += $
      x++
    }
    return <span className="rating">{ratinglevel}</span>;
  }

  const removeItem = (placeId) => {
    toggleServiceWorking(!serviceWorking);
      PlaceApiService.deletePlace(placeId)
        .then(_ => {
          removeItem(placeId)
          toggleServiceWorking(!serviceWorking)
        })
        .catch(errorHandler)
  }

  const createdList = myPlaces.map(result => (
    <li className="single-result" key={result.placeId}>
      <div className="info-box">
        <h3 className="result-name">{result.name}</h3>
        <p className="result-address">{result.address}</p>
      </div>
      <div className="result-btn-container">
        {pricelevelFinder(result)}
        {ratingFinder(result)}<span className="rating-count">({result.user_ratings_total})</span>
        <button className="result-btns save-button" disabled={serviceWorking} onClick={() => removeItem(result.place_id)}>{result.saved ? 'saved' : 'save'}</button>
        <button className="result-btns more-info-button" >More Info</button>
      </div>
    </li>
    )
  );
  return (
    <div className="results-section">
      <ul className="results">
        {createdList}
      </ul>
    </div>
  );
}
  


export default MyPlaces

  
  

  

