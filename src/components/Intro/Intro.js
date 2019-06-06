import React from 'react';
import './Intro.css'

export default class IntroModal extends React.Component {
  state ={
    view: 1
  }
  

  handleNext = (e) => {
    e.preventDefault();
    this.setState({view: this.state.view + 1})

  }

  handlePrevious = (e) => {
    console.log('ddd')
    e.preventDefault();

    this.setState({view: this.state.view - 1})
  }


  
  welcome = (
    <div>
    <h2 className="welcome-text">Welcome to Doggo!</h2>
    <p>DogGo helps you plan a route for you and your best bud!</p>
  </div>
  )
  
  whyUse = (
    <div>
    <p>You can find bars, parks, vets and more, all along your route.</p>
    {/* <img>alt instruction images</img> */}
  </div>
  )
  
  howSearch = (
  <div>
    <p>Select the options you want to search for, as well as an origin and destination.</p>
  </div>
  )
  
  whyLogin = (
    <div>
    <p>Login to save places to view later!</p>
    {/* <img>alt instruction images</img> */}
  </div>
  )
  
  views = {
    welcome: this.welcome,
    whyUse: this.whyUse,
    howSearch: this.howSearch,
    whyLogin: this.whyLogin
  }
  render(){
    const messages = Object.keys(this.views)

    return (
      <div className="intro-container">
        <button type="button" className="close-btn" onClick={this.props.disableModal}>x</button>
        <img className="intro-logo-img" src={require('../../img/logo.svg')} alt='dogGo logo'/>

        {this.views[messages[this.state.view]]}
        <div className="button-controls">
          <button className="modal-control" disabled={this.state.view === 0} onClick={this.handlePrevious}>Previous</button> 
          <button className="modal-control"  onClick={this.handleNext}>Next</button> 
        </div>
      </div>
    )
  }
}

