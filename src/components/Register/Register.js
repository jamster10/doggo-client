import React, { useState } from 'react';
import './Register.css'
import { verify } from 'crypto';



const Registration = ({errorHandler}) => {
  let [ username, setUsername ] = useState('')
  let [ nickname, setNickname ] = useState('')

  const verifyName = (e) => {
    const typed = e.target.value;
    console.log(e.target)
    const lastChar = typed.substr(-1)
    if ( ['<', '>', '^', '$','&', '%', '`', '"', `'`, '*', '!', '=', '+', '|', `/`].includes(lastChar) ){
      errorHandler({message: `invalid character: '${lastChar}'.` })
      return
    }
    if ( lastChar === ' ' ){
      errorHandler({message: `invalid character, no spaces allowed.` })
      return
    }
    if (e.target.name === 'username'){
    setUsername(typed);
    return;
    }
    setNickname(typed)
  }

  const verifyPassword = (e) => {

  }

  


    const handleSubmit = (e) => {
    e.preventDefault();
    const { username, nickname, password } = e.target;
    
    const newUser = {
      user_name: username.value,
      nickname: nickname.value,
      password: password.value,
    }
  };

  return (  <form 
    className="login-form" onSubmit={handleSubmit}>
    <label htmlFor="username">Username<span className="required">*</span>: </label>
    <input type="text" className="login-input" name="username" id="username" maxLength="15" minLength="3" placeholder="doggo_fan" value={username} onChange={verifyName} required/>
    <br/>
    <label htmlFor="nickname">Nickname: </label>
    <input type="text" className="login-input" name="nickname" id="nickname" maxLength="15" minLength="3" placeholder="Morty" value={nickname} onChange={verifyName}/>
    <br/>
    <label htmlFor="password">Password<span className="required">*</span>: </label>
    <input type="password" className="login-input" name="password" id="password" maxLength="60" minLength="8" placeholder="" required/>
    
    <label htmlFor="password">Confirm Password<span className="required">*</span>: </label>
    <input type="password" className="login-input" name="password" id="password" maxLength="60" minLength="8" placeholder="" required/>
    <br/>
    <br/>
    <input type="submit"></input>
  </form>
  )};

  export default Registration

