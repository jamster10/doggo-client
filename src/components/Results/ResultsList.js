import React from 'react';
import ResultItem from './ResultItem';
import './Results.css'

const ResultList = ({results}) => {
  
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


  const createdList = results.map(result => (
    <li className="single-result" key={result.placeId}>
      <ResultItem result={result} key={'result-'+ result.placeId}/>
      <div className="result-btn-container">
        {pricelevelFinder(result)}
        {ratingFinder(result)}<span className="rating-count">({result.user_ratings_total})</span>
        <button className="result-btns save-button" >Save</button>
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

export default ResultList;