import React from 'react';
import './Map.css';
import SearchForm from '../SearchForm/SearchForm';
import RouteBoxerInit from './Boxer'
import AutocompleteDirectionsHandler from './autocompletedirections'

const dogRouteOptions =['Bars', 'Parks', 'Hotels', 'Groomers', 'Kennels', 'Vet'];

class Map extends React.Component {
 
  state={
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

  constructor(props){
    super(props)
    this.autocomplete = null
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

  componentDidMount(){
    this.setup()
  }
   setup =  () => {
     window.initMap = () => {
       this.initMap();
     }

    loadScript(`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_G_MAPS_KEY}&libraries=places&callback=initMap`);
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

  
  handleMap = (func) => {
    let boxes = func();

  }
//make btn call new prototyped function, only clickable when response not null
  initMap = () => {
     const map = new window.google.maps.Map(document.getElementById('map'), {
      streetViewControl: false,
      mapTypeId: window.google.maps.MapTypeId.ROADMAP,
      mapTypeControl: false,
      center: {lat: this.props.location.lat, lng: this.props.location.lon},
      zoom: 13
    });
    this.autocomplete = new AutocompleteDirectionsHandler(map, RouteBoxerInit(), this.handleMap);
    
    this.autocomplete.distance = this.state.searchRange
    this.autocomplete.origin.addListener('place_changed', () => {
      console.log('hellowsdcs')
      const place = this.autocomplete.origin.getPlace()
      this.props.handleOriginAutoComplete(place.name)
    })
 
    this.autocomplete.destination.addListener('place_changed', () => {
      const place = this.autocomplete.destination.getPlace()
      this.props.handleDestinationAutoComplete(place.name)
    })
  }

  render(){  
    return(
      <>
        <div id="map"></div>
        {/* <SearchForm 
          checkboxes={this.state.checkboxes}
          currentLocation={this.props.location.city} 
          handleRouteInput={this.handleRouteInputs} 
          startLocation={this.state["origin-input"]} 
          endLocation={this.state["destination-input"]}
          handleCheckboxChange={this.handleCheckboxChange}
          routeOptions = {dogRouteOptions}
          /> */}
      </>

    )
  }
}

function loadScript(url){
  const index = window.document.getElementsByTagName("script")[0]
  const script = window.document.createElement('script')

  script.src = url;
  script.async = true;
  script.defer = true;
  index.parentNode.insertBefore(script, index)
}

export default Map;