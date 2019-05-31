import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './Sidepanel.css';
import SearchForm from '../SearchForm/SearchForm';
import Login from '../Login/Login'





const Sidepanel = ({children, loggedIn, searchSettings, errorHandler}) => {
  const userButtons = <div className="logged-in-controls"><button className="user-buttons">Search</button><button className="user-buttons">My Routes</button><button className="user-buttons">My Places</button></div>

  const headerBar = children ? <p className="error-message">{children}</p> : !loggedIn ? <p className="welcome-text"><b>Welcome to DogGo!</b></p> : userButtons;



  return (
  <div className="Sidepanel">
    <div className="controls">
      {headerBar}
    </div>
    <Switch>
      <Route
        exact
        path={'/'}
        render={() => <SearchForm searchSettings={searchSettings} />}
      />
      <Route
        exactpath={'/login'}
        render={() => <Login errorHandler={errorHandler}/>}
      />
    </Switch>
 

  </div>
  
  )
}

export default Sidepanel;