import React from 'react';
import ResultItem from './ResultItem';

const ResultList = ({results}) => {

  const createdList = results.map(result => (
    <li key={result.placeId}>
      <ResultItem result={result}/>
      <button className="save-button" >Save</button>
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