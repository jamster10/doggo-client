import React from 'react';
import Checkbox from './Checkbox'
import './SearchForm.css'

const SearchForm = ({searchSettings}) => {
  let {currentCity, startLocation, endLocation, handleRouteInput, checkboxes, handleCheckboxChange, routeOptions} = searchSettings;
  console.log(startLocation)

  const createCheckbox = (option) => {
    return <Checkbox key={option} label={option} isSelected={checkboxes[option]} onCheckboxChange={handleCheckboxChange}/>
  
  }
  const createCheckboxes = () => routeOptions.map(createCheckbox);

  return (
  <form className="query-form">
    <div className="input-item input-start">
      <label htmlFor="origin-input">Start:</label>
      <input className="query-input" type="text"  name="origin-input" id="origin-input" placeholder={currentCity} value={startLocation} onChange={handleRouteInput}></input>
    </div>
    <br/>
    <div className="input-item input-end">
      <label htmlFor="destination-input">End:</label>
      <input className="query-input" type="text" placeholder='Zion National Park' name="destination-input" id="destination-input" value={endLocation} onChange={handleRouteInput}/>
    </div>
    <fieldset>
      <legend>Searching for dog friendly:</legend>
        <div className="search-options">
          {createCheckboxes()}
          
        </div>
    </fieldset>
  </form>
  )
}



export default SearchForm;