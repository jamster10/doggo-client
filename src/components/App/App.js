import React, { Component } from 'react';
import './App.css';
import Navbar from '../Navbar/Navbar';
import Provider from '../Provider/Provider';
import Modal from '../Modal/Modal.js';
import Intro from '../Intro/Intro'
import TokenService from '../../Services/token-service'

class App extends Component {
  state={
    location:{
      lat: 38.8,
      lon: 104.8,
      city: null,
    },
    showModal:true,
    error: null,
    loggedIn: false
  }

  componentDidMount(){
    this.checkLogin()
    this.getLocation()
  }

  checkLogin = () => {
    if(TokenService.hasAuthToken()) this.setState({showModal: false, loggedIn: true})
  }

  handleLogin = () => {
    this.setState({loggedIn: true})
  }

  handleLogout = () => {
    this.setState({loggedIn: false})
  }

  disableModal = () => {
    this.setState({showModal: false})
  }

  getLocation = () => {
    return fetch('http://ip-api.com/json/')
    .then(res=>res.json())
    .then(loc => {
      if(!loc.city) return Promise.reject({message: 'no city provided'})
      this.setState({
      location: {
        lat: loc.lat,
        lon: loc.lon,
        city: loc.city,
        }

      })
    })
    .catch(e => {
      const fix = () => {
        this.setState({location: { 
        lat: 30.25,
      lon: -97.726,
      city: 'Georgetown',
      }})
    }
      this.errorHandler({
        message: "There was a problem getting your current location. Using default."
        }, fix );
    })
  }

  errorHandler = (error, recoveryStateFix) => {
    console.log('im here')
    this.setState({
      error: error.message,
    })
    if (recoveryStateFix){
      recoveryStateFix();
    }

    setTimeout(() => this.setState({error: null}), 5000);
  }

  render() {
    return (
      <>
        { this.state.showModal ? <Modal> <Intro disableModal={this.disableModal}/>  </Modal> :  ""} 
      <nav>
      <Navbar loggedIn={this.state.loggedIn} handleLogout={this.handleLogout}/>
      </nav>  
      <main>
        <Provider
          handleLogin={this.handleLogin}
          errorHandler={this.errorHandler}
          location={this.state.location}
          loggedIn ={this.state.loggedIn}
          error={this.state.error}
        />
      </main>
      </>
    );
  }
}

export default App;