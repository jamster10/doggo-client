import React, { useState } from 'react';
import './Register.css'
import AuthService from '../../Services/authentication-api'




const Registration = ({errorHandler, handleLogin, waitingOnServer, ...props}) => {
  const [ username, setUsername ] = useState('')
  const [ nickname, setNickname ] = useState('')

  const verifyName = (e) => {
    const typed = e.target.value;
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

    const handleSubmit = async (e) => {
      
    e.preventDefault();
    const { username, nickname, password, confirm } = e.target;
    if (confirm.value !== password.value){
      errorHandler({message: "Your passwords do not match"})
      confirm.value = "";
      return
    }

    const newUser = {
      user_name: username.value,
      password: password.value,
    }
    
    if (nickname) newUser.nickname = nickname.value;
    waitingOnServer.waiting()
    try {
      await AuthService.registerUser(newUser) 
      
      waitingOnServer.notWaiting()
      handleLogin();
      props.routeProps.history.push('/')
       
    } catch(e) {
      waitingOnServer.notWaiting()
      errorHandler(e)
    };
  };

  return (  <form 
    className="register-form" onSubmit={handleSubmit}>
      <fieldset className= "register-fieldset" name="sign up">
    <label htmlFor="username">Username<span className="required">*</span>: </label>
    <input type="text" className="register-input" name="username" id="username" maxLength="15" minLength="3" placeholder="doggo_fan" value={username} onChange={verifyName} required/>
    <br/>
    <label htmlFor="nickname">Nickname: </label>
    <input type="text" className="register-input" name="nickname" id="nickname" maxLength="15" minLength="3" placeholder="Morty" value={nickname} onChange={verifyName}/>
    <br/>
    <label htmlFor="password">Password<span className="required">*</span>: </label>
    <input type="password" className="register-input" name="password" id="password" maxLength="60" minLength="8" placeholder="" required/>
    
    <label htmlFor="password"> Confirm: <span className="required">*</span>: </label>
    <input type="password" className="register-input" name="confirm" id="confirm" maxLength="60" minLength="8" placeholder="" required/>
  
    <input className="register-submit" type="submit"></input>
    </fieldset>
  </form>
  )};

  export default Registration

