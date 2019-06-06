import Bottleneck from 'bottleneck';


const limiter = new Bottleneck({
  maxConcurrent: 1,
  minTime: 200
});

const search = (service, query, bounds, type) => {
  return new Promise ( (resolve, reject) => {
    const options = {query, bounds, type}
    service.textSearch(options, function(results, status, pagination) {
      console.log(options.query, options.type)
      if(status === 'OK'){
        resolve(results);
      } else {
        reject(status);
      }
    })

  }).catch(console.log)
}


export default function  searchHandler(service, routeBounds, searchSelections, map, resultsHandler){
  const boundaryCount = routeBounds.length;

  const queryTerms = {
    Bars: ['dog', 'bar'],
    Parks: ['dog', 'park'],
    "Pet Store": ['', 'pet_store'],
    Lodging: ['dog-friendly', 'lodging'],
    Groomers: ['dog', 'spa'],
    Kennels: ["dog", 'lodging'],
    Vet: ["dog", "veterinary_care"]
  }

  const searchSelection = searchSelections();

   searchSelection.forEach(query => {
    for (let currentBound = 0; currentBound < boundaryCount; currentBound++){
    // function search(){
      
      // const promise = 
      
      limiter.schedule(() => search(service, queryTerms[query][0],  routeBounds[currentBound], queryTerms[query][1] ))
      // .then((result) => {
      //   /* handle result */
      // });
      // search(service, queryTerms[query][0],  bounds[currentBound], queryTerms[query][1] )
      
     .then(placesArray => {
      
  
      var bounds = new window.google.maps.LatLngBounds();

      const tempResultsContainer = []
      for (var i = 0, place; place = placesArray[i]; i++) {
        
        if(!routeBounds[currentBound].contains(place.geometry.location)) continue;

        tempResultsContainer.push(place)

        var image = {
          url: place.icon,
          size: new window.google.maps.Size(71, 71),
          origin: new window.google.maps.Point(0, 0),
          anchor: new window.google.maps.Point(17, 34),
          scaledSize: new window.google.maps.Size(25, 25)
        };

        let marker = new window.google.maps.Marker({
          map: map,
          icon: image,
          title: place.name,
          position: place.geometry.location
        });
        window.google.markers.push(marker)
        bounds.extend(place.geometry.location);
      }
      console.log(tempResultsContainer)
      if(tempResultsContainer.length !== 0) resultsHandler(tempResultsContainer)
      })
      .catch(console.log)
    }
  })
};