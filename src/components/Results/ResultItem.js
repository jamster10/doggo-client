import React from 'react';

const ResultItem = ({result}) => {
  const open = result.open_now === undefined ? <span className="result-open-now">Currently Open: Uncertain</span> :
    result.open_now ? <span className="result-open-now">Currently Open: Yes</span> : <span className="result-open-now">Currently Open: No</span>
  return (
      <div className="info-box">
        <span className="result-name">{result.name}</span>
        <br/>
        <span className="result-address">{result.address}</span>
        <br/>
        {open}
        <br/>
        <span>{result.user_ratings_total}</span>
      </div>
    )

}

export default ResultItem;