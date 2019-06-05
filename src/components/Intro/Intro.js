import React, { useState } from 'react'

export default function IntroModal () {
  let [view, setView] = useState(0);
  

  const handleNext = (e) => {
    e.preventDefault();
    setView(view++)

  }

  const handlePrevious = (e) => {
    e.preventDefault();

  }

  const welcome = (
  <div>
    <h2>Welcome to Doggo!</h2>
    <p>DogGo helps you plan a route for you and your best bud!</p>
  </div>
  )

  const whyUse = (
  <div>
    <p>You can find bars, parks, vets and more, all along your route.</p>
    <img>alt instruction images</img>
  </div>
  )

  const howSearch = (
  <div>
    <p>Select the options you want to search for</p>
    <p>Then select an origin and destination</p>
  </div>
  )

  const whyLogin = (
  <div>
    <p>Login to save places to view later</p>
    <img>alt instruction images</img>
  </div>
  )


  return (
    <div className="container">
      <img className="logo-img" src={require('../../img/logo.svg')} alt='dogGo logo'/>
      { view === 0 ? welcome : view === 1 ? whyUse : view === 2 ? howSearch : whyLogin }
       { view !== 0 && <button className="modal-control" onClick={handlePrevious}>Previous</button> }
      { view !== 3 && <button className="modal-control" onClick={handleNext}>Next</button> }
      {view === 3 && <button>let's Go</button>}
    </div>
  )
}

