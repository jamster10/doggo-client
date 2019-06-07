import React from 'react';
import Map from '../Map/Map'
import Sidepanel from '../Sidepanel/Sidepanel'
import PlacesApiService from '../../Services/places-service'
import TokenService from '../../Services/token-service'

const dogRouteOptions =['Bars', 'Parks', 'Pet Store', 'Lodging', 'Groomers', 'Kennels', 'Vet'];

class Provider extends React.Component{
  constructor(props){
    super(props)
    this.mapComponent = React.createRef()
  }
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
    results: [],
    enableSearch: false,
    myPlaces: []
  }

  componentDidMount() {
    
    if(TokenService.hasAuthToken()){
      this.getMyPlaces();
    }
  }

  handleEnableSearch = (e) => {
    e.preventDefault();
    this.setState({ enableSearch: true })
  }

  handleDisableSearch = () => {
    this.setState({ enableSearch: false })
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
   
  const results = res.map(res => ({
    address: res.formatted_address, //text
    icon: res.icon, //url -text
    name: res.name, //text
    open_now: res.hasOwnProperty('opening_hours') ? res.opening_hours.open_now :  undefined, 
    //photo: res.photos[0].getUrl() || 'none',
    place_id: res.place_id, //unique
    price_level: res.price_level || 'n/a', //text
    rating: res.rating || 2, //number
    user_ratings_total: res.user_ratings_total || 0, //number
    location: res.geometry.location,
    saved: false //bool
  }))
  this.setState({results: [...this.state.results, ...results]})
 }

 handleSearch = () => {
   console.log(this.mapComponent)
   this.setState({results: []})
   this.mapComponent.current.beginSearch()

   // console.log(this.mapComponent)
 }

 handleListeners = () => {
   console.log(this.mapComponent)
   this.mapComponent.current.setUpListeners();
 }

 toggleSavePlace = (id) => {
   const result = this.state.results.find(item => item.place_id === id)
   result.saved = true;
 }

 getMyPlaces = () => {
   console.log('i run')
  PlacesApiService.getPlaces()
    .then(myPlaces => {this.setState({myPlaces}, console.log(myPlaces)) })
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
        <Sidepanel 
        handleListeners={this.handleListeners}
        loggedIn={this.props.loggedIn} 
        searchSettings = {searchSettings} 
        errorHandler={this.props.errorHandler} 
        enableSearch={this.handleEnableSearch}
        results = {this.state.results}
        beginSearch={this.handleSearch}
        handleLogin={this.props.handleLogin}
        savePlace={this.toggleSavePlace}
        getMyPlaces={this.getMyPlaces}
        myPlaces={this.state.myPlaces}
        >
        {this.props.error ? this.props.error : ""}
        </Sidepanel>
        <div className="map-container">
          {this.props.location.city ? <Map 
          ref={this.mapComponent}
          enableSearch={this.state.enableSearch}
          preventSearch={this.handleDisableSearch}
          location = {this.props.location} 
          searchRange = {this.state.searchRange}
          handleOriginAutoComplete={this.handleOriginAutoComplete} 
          handleDestinationAutoComplete={this.handleDestinationAutoComplete} 
          selection = {this.state.checkboxes}
          resultsHandler = {this.handleResults}
          errorHandler={this.props.errorHandler}
          /> : <p className="loading-text">Please wait while the map loads</p>} 
        </div>
      </>

    )
  }
}

export default Provider;