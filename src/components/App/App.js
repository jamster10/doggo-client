import React, { Component } from 'react';
import './App.css';
import Navbar from '../Navbar/Navbar';
import Provider from '../Provider/Provider';

class App extends Component {
  state={
    loggedIn: false,
    location:{
      lat: 38.8,
      lon: 104.8,
      city: null,
    },
    boxes: null,
    error: null
  }


  handleBoxes =(boxes) => {
    this.setState({boxes});
  }

  componentDidMount(){
    this.getLocation()
  }

  getLocation = () => {
    return fetch('https://geoip-db.com/json/')
    .then(res=>res.json())
    .then(loc => this.setState({
      location: {
        lat: loc.latitude,
        lon: loc.longitude,
        city: loc.city,
      }, 
    }))
    .catch(e => {
      const fix = () => {
        this.setState({location: { 
        lat: 30.25,
      lon: -97.726,
      city: 'Georgetown',
      }})
    }
      this.errorHandler({
        message: "There was a problem getting your location. Using default. Check console for more information."
        }, fix );
    })
  }

  errorHandler =(error, recoveryStateFix) => {
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
      <nav>
      <Navbar loggedIn={this.state.loggedIn}/>
      </nav>  
      <main>
        <Provider
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