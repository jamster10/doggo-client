

export default function AutocompleteDirectionsHandler(map, RouteBoxer, mapHandler) {

  this.distance = 15;
  this.routeBoxer = new RouteBoxer();
  this.map = map;
  this.originPlaceId = null;
  this.destinationPlaceId = null;
  this.travelMode = 'DRIVING';
  this.directionsService = new window.google.maps.DirectionsService();
  this.directionsDisplay = new window.google.maps.DirectionsRenderer();
  this.directionsDisplay.setMap(map);
  this.mapHandler = mapHandler;
  this.drawn = []; //using to hold all routeboxer bounds
  this.response = null; //using to hold response from server
  this.markers = []; //using to hold all the markers




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
    me.route(me.map);
  });
};

AutocompleteDirectionsHandler.prototype.route = function (map) {
  if (!this.originPlaceId || !this.destinationPlaceId) {
    return;
  }
  var me = this;

  this.directionsService.route(
    {
      origin: { 'placeId': this.originPlaceId },
      destination: { 'placeId': this.destinationPlaceId },
      travelMode: this.travelMode
    },
    function (response, status) {
      if (status === 'OK') {
        // let getRoute = function() {

        me.directionsDisplay.setDirections(response);
        var path = response.routes[0].overview_path;
        var boxes = me.routeBoxer.box(path, me.distance);
        //}

        //mapHandler()
        clearRouteBoxes(me.drawn);
        clearMarkers(me.markers, map)
        drawBoxes(boxes, map, me.drawn);
        //clearMap(me.drawn);

        var service = new window.google.maps.places.PlacesService(map);
        // Perform a nearby search.


        boxes.forEach(bound => {
          service.textSearch(
            { query: 'dog', bounds: bound, type: ['bar'] },
            function (results, status, pagination) {
              if (status !== 'OK') return;
              console.log(results)
              console.log(results[0].photos[0].getUrl())
              createMarkers(results);

            });
        })



        function createMarkers(places) {
          var bounds = new window.google.maps.LatLngBounds();

          for (var i = 0, place; place = places[i]; i++) {
            var image = {
              url: place.icon,
              size: new window.google.maps.Size(71, 71),
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(17, 34),
              scaledSize: new window.google.maps.Size(25, 25)
            };

            var marker = new window.google.maps.Marker({
              map: map,
              icon: image,
              title: place.name,
              position: place.geometry.location
            });
            me.markers.push(marker)
            bounds.extend(place.geometry.location);
            console.log(me.markers)
          }
          map.fitBounds(bounds);
        }


        // return boxes;
        // }
        // me.mapHandler(getRoute)
        // console.log(me);

      } else {
        window.alert('Directions request failed due to ' + status);
      }
    }.bind(this));
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





function clearRouteBoxes(boxpolys) {
  boxpolys.forEach(item => item.setMap(null))

}


function clearMarkers(markers) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
  markers.length = [];
}

