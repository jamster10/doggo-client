import React from 'react';
import Map from '../Map/Map'
import Sidepanel from '../Sidepanel/Sidepanel'

const dogRouteOptions =['Bars', 'Parks', 'Hotels', 'Groomers', 'Kennels', 'Vet'];

class Provider extends React.Component{
  
  state = {
    'origin-input': "",
    'destination-input': "",
    checkboxes: dogRouteOptions.reduce(
      (options, option) => ({
        ...options,
        [option]: false
      }),
      {}
    ),
    searchRange: 5,
  }

  handleOriginAutoComplete = (value) => {
    this.setState({
      'origin-input': value
    })
  }

  handleDestinationAutoComplete = (value) => {
    this.setState({
      'destination-input': value
    })
  }
 
  handleCheckboxChange = e => {
    const { name } = e.target;
  
    this.setState(prevState => ({
      checkboxes: {
        ...prevState.checkboxes,
        [name]: !prevState.checkboxes[name]
      }
    }));
  };

  handleRouteInputs = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  
 

        


  render(){

    const searchSettings = {
      checkboxes: this.state.checkboxes,
      currentCity: this.props.location.city,
      handleRouteInput: this.handleRouteInputs,
      startLocation: this.state['origin-input'],
      endLocation: this.state["destination-input"],
      handleCheckboxChange: this.handleCheckboxChange,
      routeOptions: dogRouteOptions
    }

    return(
      <>  
        <div className="map-container">
          {this.props.location.city ? <Map location = {this.props.location} handleOriginAutoComplete={this.handleOriginAutoComplete} handleDestinationAutoComplete={this.handleDestinationAutoComplete} /> : <p className="loading-text">Please wait while the map loads</p>} 
        </div>
        <Sidepanel loggedIn={this.props.loggedIn} searchSettings = {searchSettings} errorHandler={this.props.errorHandler}>
          {this.props.error ? this.props.error : ""}
        </Sidepanel>
      </>

    )
  }
}

export default Provider;