import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import ResultItem from './ResultItem';
import './Results.css'
import PlaceApiService from '../../Services/places-service'
import TokenService from '../../Services/token-service'

const ResultList = ({results, errorHandler, savePlace, history, waitingOnServer}) => {

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

  const handleSaving = (result) => {
    console.log(waitingOnServer)
    if(!TokenService.hasAuthToken()){
      errorHandler({message: "Login to save places"})
      history.push('/login')
      return;
    }
    if (result.saved){
      waitingOnServer.waiting()
      PlaceApiService.deletePlace(result.placeId)
        .then(_ => {
          savePlace(result.place_id)
        })
        .catch(errorHandler)
    } else{
      waitingOnServer.waiting()
      PlaceApiService.savePlace(result)
        .then(_ => {
          waitingOnServer.notWaiting()
          savePlace(result.place_id)
        })
        .catch(e => {
          waitingOnServer.notWaiting()
          errorHandler(e)
        })
    }
    
  }

  const createdList = results.map(result => (
    <li className="single-result" key={result.place_id}>
      <ResultItem result={result} key={'result-'+ result.place_id}/>
      <div className="result-btn-container">
        {pricelevelFinder(result)}
        {ratingFinder(result)}<span className="rating-count">({result.user_ratings_total})</span>
        <button className="result-btns save-button"  onClick={() => handleSaving(result)}>{!!result.saved ? 'saved' : 'save'}</button>
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

export default withRouter(ResultList);