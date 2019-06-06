import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import ResultsList from '../Results/ResultsList';

const SearchView = ({searchSettings, enableSearch, results, beginSearch}) => (
  <>
    <SearchForm 
      searchSettings={searchSettings}
      enableSearch={enableSearch}
      beginSearch={beginSearch}
    />

    <ResultsList results={results}/>
  </>
)

export default SearchView;