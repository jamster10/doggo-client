import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import ResultsList from '../Results/ResultsList';

const SearchView = ({handleListeners, searchSettings, enableSearch, results, beginSearch, errorHandler, savePlace, searchFormInputs}) => (
  <>
    <SearchForm 
      handleListeners={handleListeners}
      searchSettings={searchSettings}
      enableSearch={enableSearch}
      beginSearch={beginSearch}
    
    >{searchFormInputs}</SearchForm>

    <ResultsList errorHandler={errorHandler} results={results} savePlace={savePlace}/>
  </>
)

export default SearchView;