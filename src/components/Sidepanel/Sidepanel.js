import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './Sidepanel.css';

import SearchView from '../SearchView/SearchView';
import Login from '../Login/Login'
import Register from '../Register/Register';
import TokenService from '../../Services/token-service';






const Sidepanel = ({children, searchSettings, errorHandler, enableSearch, results, beginSearch, handleLogin, savePlace}) => {
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
        render={() => <SearchView errorHandler={errorHandler} searchSettings={searchSettings} enableSearch={enableSearch} savePlace={savePlace} beginSearch={beginSearch} results={results} />}
      />
      <Route
        exact
        path={'/login'}
        render={(routeProps) => <Login  routeProps={routeProps} errorHandler={errorHandler} handleLogin={handleLogin}/>}
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