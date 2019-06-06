import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './Sidepanel.css';

import SearchView from '../SearchView/SearchView';
import Login from '../Login/Login'
import Register from '../Register/Register';
import TokenService from '../../Services/token-service';






const Sidepanel = ({children, searchSettings, errorHandler, enableSearch, results, beginSearch}) => {
  const userButtons = <div className="logged-in-controls"><button className="user-buttons">Search</button><button className="user-buttons">My Routes</button><button className="user-buttons">My Places</button></div>

  const headerBar = children ? <p className="error-message">{children}</p> : !TokenService.hasAuthToken() ? <p className="welcome-text"><b>Welcome to DogGo!</b></p> : userButtons;

  



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
        render={() => <SearchView searchSettings={searchSettings} enableSearch={enableSearch} beginSearch={beginSearch} results={results} />}
      />
      <Route
        exact
        path={'/login'}
        render={() => <Login errorHandler={errorHandler}/>}
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