import React from 'react';

cont Results = () => {
  const resultsList = results.map( result => 
    <li key={result.place.id}>
      <img className="img-photo" src={result.image} alt={result.name}/>
      <div className="info-box">
        <span>{result.name}</span>
        <span>{result.address}</span>
        <span>{result.phone}</span>
        <span>{result.hours}</span>
      </div>
      <button>Save</button>
    </li>
    )

  return(

  )
}