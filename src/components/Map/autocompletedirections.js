import SearchHandler from './SearchHandler'

export default function AutocompleteDirectionsHandler(map, RouteBoxer, selection, resultsHandler, enableSearch, preventSearch, errorHandler) {

  this.distance = 15;
  this.routeBoxer = new RouteBoxer();
  this.map = map;
  this.originPlaceId = null;
  this.destinationPlaceId = null;
  this.travelMode = 'DRIVING';
  this.directionsService = new window.google.maps.DirectionsService();
  this.directionsDisplay = new window.google.maps.DirectionsRenderer();
  this.directionsDisplay.setMap(map);
  this.selection = selection;
  this.drawn = []; //using to hold all routeboxer bounds
  this.response = null; //using to hold response from server
  this.markers = []; //using to hold all the markers
  this.resultsHandler  = resultsHandler;
  this.enableSearch = enableSearch;
  this.preventSearch = preventSearch;
  this.beginSearch =   this.route.bind(this, this.map);
  this.setUpListeners = this.setupPlaceChangedListener.bind(this);

  this.errorHandler = errorHandler;
  //this.selections = selections;



  var originInput = document.getElementById('origin-input');
  var destinationInput = document.getElementById('destination-input');

  this.origin = new window.google.maps.places.Autocomplete(originInput);
  this.destination = new window.google.maps.places.Autocomplete(destinationInput);


    this.setupPlaceChangedListener(this.origin, 'ORIG');
    this.setupPlaceChangedListener(this.destination, 'DEST');
  

}

AutocompleteDirectionsHandler.prototype.drawResults = function () {}
AutocompleteDirectionsHandler.prototype.setupPlaceChangedListener = function (
  autocomplete, mode) {

  var me = this;

  autocomplete.bindTo('bounds', this.map);
  autocomplete.setFields(['place_id', 'name']);
  autocomplete.addListener('place_changed', function () {
    const place = autocomplete.getPlace();


    if (!place.place_id) {
      //use error handler instead
      window.alert('Please select an option from the dropdown list.');
      return;
    }
    if (mode === 'ORIG') {
      me.originPlaceId = place.place_id;
    } else {
      me.destinationPlaceId = place.place_id;
    }
  
  });
};

AutocompleteDirectionsHandler.prototype.route = function (map) {

  if(!this.originPlaceId || !this.destinationPlaceId) {
    this.errorHandler( {message: 'Please add an origin and destination'} )
    return
  }
  this.preventSearch();
  var me = this;

  this.directionsService.route(
    {
      origin: { 'placeId': this.originPlaceId },
      destination: { 'placeId': this.destinationPlaceId },
      travelMode: this.travelMode
    },
    function (response, status) {
      if (status === 'OK') {


        me.directionsDisplay.setDirections(response);
        var path = response.routes[0].overview_path;
        var boxes = me.routeBoxer.box(path, me.distance);


     
        clearRouteBoxes(me.drawn);
        clearMarkers(window.google.markers, map)
        drawBoxes(boxes, map, me.drawn);
        //clearMap(me.drawn);

        var service = new window.google.maps.places.PlacesService(map);
        // Perform a nearby search.


   SearchHandler(service, boxes, me.selection, me.map, me.resultsHandler)


      } else {
        window.alert('Directions request failed due to ' + status);
      }
    })
};

function drawBoxes(boxes, map, boxpolys) {

  boxpolys.length = boxes.length;
  for (var i = 0; i < boxes.length; i++) {
    boxpolys[i] = new window.google.maps.Rectangle({
      bounds: boxes[i],
      fillOpacity: 0,
      strokeOpacity: 1.0,
      strokeColor: '#000000',
      strokeWeight: 1,
      map: map
    });
  }
}



//After search clean up

function clearRouteBoxes(boxpolys) {
  boxpolys.forEach(item => item.setMap(null))

}
function clearMarkers(markers) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
  markers.length = [];
}



