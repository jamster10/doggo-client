import React from 'react';
import './Navbar.css'
import { NavLink } from 'react-router-dom'
import  TokenService from '../../Services/token-service'


const Navbar = ({ loggedIn, handleLogout }) => {

  const clearAuth = () => {
    TokenService.clearToken();
    handleLogout();
  }

 const userControls = loggedIn ? <div className= "user-controls"><button className="nav-search-btn"><NavLink to="/">Search!</NavLink></button>|<button>My Places</button>|<button onClick={clearAuth}>Logout</button></div> : <div className= "user-controls"><button className="nav-search-btn"><NavLink to="/">Search!</NavLink></button>|<button><NavLink to="/login">Login</NavLink></button>|<button><NavLink to="/register">Sign Up!</NavLink></button></div>;
  
  return (
    <nav className='Navbar'>
      <div className='logo-container'>
        <img className="logo-img" src={require('../../img/logo.svg')} alt='dogGo logo'/>
        <h1 className='brand'>DogGo!</h1>
      </div>
      {userControls}
    </nav>

  )
}

export default Navbar;  