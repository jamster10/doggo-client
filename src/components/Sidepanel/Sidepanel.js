import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './Sidepanel.css';

import SearchView from '../SearchView/SearchView';
import Login from '../Login/Login'
import Register from '../Register/Register';
import MyPlaces from '../MyPlaces/MyPlaces'







const Sidepanel = ({handleListeners, children, searchSettings, errorHandler, enableSearch, results, beginSearch, handleLogin, savePlace, myPlaces, getMyPlaces}) => {
  // const userButtons = <div className="logged-in-controls"><button className="user-buttons">Search</button><button className="user-buttons">My Routes</button><button className="user-buttons">My Places</button></div>

  const headerBar = children ? <p className="error-message">{children}</p> : <p className="welcome-text-side"><b>Welcome to DogGo!</b></p>

  



  return (
  <div className="Sidepanel">
    <div className="controls">
      {/* <button><NavLink to='/'>Search</NavLink></button>  */}
      {headerBar}
    </div>
    <Switch>
      <Route
        exact
        path={'/'}
        render={() => <SearchView handleListeners={handleListeners} errorHandler={errorHandler} searchSettings={searchSettings} enableSearch={enableSearch} savePlace={savePlace} beginSearch={beginSearch} results={results} />}
      />
      <Route
        exact
        path={'/myplaces'}
        render={() => <MyPlaces errorHandler={errorHandler} toggleSavePlace={savePlace} myPlaces={myPlaces} />}
      />
      <Route
        exact
        path={'/login'}
        render={(routeProps) => <Login  routeProps={routeProps} errorHandler={errorHandler} handleLogin={handleLogin} getMyPlaces={getMyPlaces}/>}
      />
      <Route
        exact
        path={'/register'}
        render={() => <Register errorHandler={errorHandler}/>}
      />
    </Switch>
    

  </div>
  
  )
}

export default Sidepanel;