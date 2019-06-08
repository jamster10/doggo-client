import React from 'react';
import './Login.css'
import AuthService from '../../Services/authentication-api'



const Login = ({errorHandler, handleLogin, getMyPlaces,  ...props}) =>  {
  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = e.target;

    AuthService.loginUser({
      user_name: username.value,
      password: password.value
    })
      .then(res =>{
        if (res.message){ 
          return Promise.reject(res) 

        }
        username.value = "";
        password.value = "";
        handleLogin()
        props.routeProps.history.push('/')
      })
      .catch(errorHandler);
    }
    
  return <form className="login-form" onSubmit={handleSubmit}>
    <label htmlFor="username">Username: </label>
    <input type="text" className="login-input" name="username" id="username" maxLength="15" minLength="3" placeholder="doggo_fan" required/>
    <br/>
    <label htmlFor="password">Password: </label>
    <input type="password" className="login-input" name="password" id="password" maxLength="60" minLength="8" placeholder="" required/>
    <br/>
    <br/>
    <input type="submit"></input>
    <h5>login: jamster1, password: password</h5>
  </form>
}

export default Login;