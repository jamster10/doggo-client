import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import ResultsList from '../Results/ResultsList';

const SearchView = ({handleListeners, searchSettings, enableSearch, results, beginSearch, errorHandler, savePlace}) => (
  <>
    <SearchForm 
      handleListeners={handleListeners}
      searchSettings={searchSettings}
      enableSearch={enableSearch}
      beginSearch={beginSearch}
    />

    <ResultsList errorHandler={errorHandler} results={results} savePlace={savePlace}/>
  </>
)

export default SearchView;