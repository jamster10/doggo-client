import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './Sidepanel.css';

import SearchView from '../SearchView/SearchView';
import Login from '../Login/Login'
import Register from '../Register/Register';
import MyPlaces from '../MyPlaces/MyPlaces'







const Sidepanel = ({children, searchSettings, errorHandler, enableSearch, results, beginSearch, handleLogin, savePlace, myPlaces, getMyPlaces, handleListeners, waitingOnServer}) => {
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
        render={() => <SearchView waitingOnServer={waitingOnServer} errorHandler={errorHandler} searchSettings={searchSettings} enableSearch={enableSearch} savePlace={savePlace} beginSearch={beginSearch} results={results}  handleListeners={handleListeners}/>}
      />
      <Route
        exact
        path={'/myplaces'}
        render={() => <MyPlaces errorHandler={errorHandler} waitingOnServer={waitingOnServer} toggleSavePlace={savePlace} myPlaces={myPlaces} getMyPlaces={getMyPlaces}/>}
      />
      <Route
        exact
        path={'/login'}
        render={(routeProps) => <Login  waitingOnServer={waitingOnServer} routeProps={routeProps} errorHandler={errorHandler} handleLogin={handleLogin} />}
      />
      <Route
        exact
        path={'/register'}
        render={(routeProps) => <Register routeProps={routeProps} errorHandler={errorHandler} waitingOnServer={waitingOnServer} handleLogin={handleLogin}/>}
      />
    </Switch>
    

  </div>
  
  )
}

export default Sidepanel;