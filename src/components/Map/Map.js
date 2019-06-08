import React from 'react';
import './Map.css';
import RouteBoxerInit from './Boxer'
import AutocompleteDirectionsHandler from './autocompletedirections'

class Map extends React.Component {
 
   constructor(props){
    super(props)
    this.autocomplete = null
    this.state = {
      loaded: false
    }
  }

  beginSearch = () => {
    if(this.autocomplete){
      this.autocomplete.beginSearch()
    }
  }
  setUpListeners = () => {

    this.autocomplete.test()
    
    // this.autocomplete.origin.addListener('place_changed', () => {
    //   const place = this.autocomplete.origin.getPlace()
    //   this.props.handleOriginAutoComplete(place.name)
    // })

    // this.autocomplete.destination.addListener('place_changed', () => {
    //   const place = this.autocomplete.destination.getPlace()
    //   this.props.handleDestinationAutoComplete(place.name)
    // })
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
    // this.setup()
  }
   setup = () => {
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

//make btn call new prototyped function, only clickable when response not null
  initMap = () => {

     const map = new window.google.maps.Map(document.getElementById('map'), {
      streetViewControl: false,
      mapTypeId: window.google.maps.MapTypeId.ROADMAP,
      mapTypeControl: false,
      center: {lat: this.props.location.lat, lng: this.props.location.lon},
      zoom: 13
    });
    window.google.markers = [];
    this.autocomplete = new AutocompleteDirectionsHandler(map, RouteBoxerInit(), ()=> Object.keys(this.props.selection).filter(key => this.props.selection[key]), this.props.resultsHandler, this.props.enableSearch, this.props.preventSearch, this.props.errorHandler);
    
    this.autocomplete.distance = this.props.searchRange
    this.autocomplete.origin.addListener('place_changed', () => {
      const place = this.autocomplete.origin.getPlace()
      this.props.handleOriginAutoComplete(place.name)
    })
    // this.setUpListeners()
 
    this.autocomplete.destination.addListener('place_changed', () => {
      const place = this.autocomplete.destination.getPlace()
      this.props.handleDestinationAutoComplete(place.name)
    })
    this.setState({loaded: true})
  }

  render(){  
    return(
        <div id="map"></div>
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