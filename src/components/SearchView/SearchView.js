import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import ResultsList from '../Results/ResultsList';

const SearchView = ({searchSettings, enableSearch, results}) => (
  <>
    <SearchForm 
      searchSettings={searchSettings}
      enableSearch={enableSearch}
    />

    <ResultsList results={results}/>
  </>
)

export default SearchView;