import React from 'react';
import Map from '../Map/Map'
import Sidepanel from '../Sidepanel/Sidepanel'

const dogRouteOptions =['Bars', 'Parks', 'Pet Store', 'Lodging', 'Groomers', 'Kennels', 'Vet'];

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
    resutls: []
  }

  getCurrentSelection = () => {
    return Object.keys(this.state.checkboxes).filter(key => this.state.checkboxes[key])
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

 handleResults = (res) => {
   console.log(res);
   
  const results = res.map(res => ({
    address: res.formatted_address,
    icon: res.icon,
    name: res.name,
    open_now: res.opening_hours.open_now,
    photos: [{}],
    place_id: res.place_id,
    price_level: res.price_level,
    rating: res.rating,
    user_ratings_total: res.user_ratings_total,
    geometry: {}
  }))

  //  }));
  //  this.setState({results})
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
        <Sidepanel loggedIn={this.props.loggedIn} searchSettings = {searchSettings} errorHandler={this.props.errorHandler}>
          {this.props.error ? this.props.error : ""}
        </Sidepanel>
        <div className="map-container">
          {this.props.location.city ? <Map 
          location = {this.props.location} 
          searchRange = {this.state.searchRange}
          handleOriginAutoComplete={this.handleOriginAutoComplete} 
          handleDestinationAutoComplete={this.handleDestinationAutoComplete} 
          selection = {this.state.checkboxes}
          resultsHandler = {this.handleResults}
          /> : <p className="loading-text">Please wait while the map loads</p>} 
        </div>
      </>

    )
  }
}

export default Provider;