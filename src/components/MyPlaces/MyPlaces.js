import React, { useState, useEffect } from 'react';
import PlaceApiService from '../../Services/places-service'


const MyPlaces = ({ myPlaces, errorHandler, deletePlace, getMyPlaces}) => {


  useEffect( ()=>{
    getMyPlaces();
  }, [])

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
      PlaceApiService.deletePlace(placeId)
        .then(_ => {
          getMyPlaces();
        })
        .catch(errorHandler)
  }

  const createdList = myPlaces.map(result => (
    <li className="single-result" key={result.place_id}>
      <div className="info-box">
        <h3 className="result-name">{result.name}</h3>
        <p className="result-address">{result.address}</p>
      </div>
      <div className="result-btn-container">
        {pricelevelFinder(result)}
        {ratingFinder(result)}<span className="rating-count">({result.user_ratings_total})</span>
        <button className="result-btns save-button"  onClick={() => removeItem(result.place_id)}>Delete</button>
        {/* <button className="result-btns more-info-button" >More Info</button> */}
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

  
  

  

