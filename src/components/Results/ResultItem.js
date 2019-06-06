import React from 'react';

const ResultItem = ({result}) => {
  const open = result.open_now === undefined ? <span className="result-open-now">Currently Open: Uncertain</span> :
    result.open_now ? <span className="result-open-now">Currently Open: Yes</span> : <span className="result-open-now">Currently Open: No</span>
  return (
      <div className="info-box">
        <h3 className="result-name">{result.name}</h3>
        <p className="result-address">{result.address}</p>
        {open}
      </div>
    )

}

export default ResultItem;