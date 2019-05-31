import React from 'react';
import './Navbar.css'
import { NavLink } from 'react-router-dom'



const Navbar = ({loggedIn}) => {

  let userControls = loggedIn ? <div className= "user-controls"><button>My Routes</button>|<button>Logout</button></div> : <div className= "user-controls"><button><NavLink to="/login">Login</NavLink></button>|<button>Sign Up!</button></div>;
  
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