// Initialize map
var map = L.map('map', {
  crs: L.CRS.Simple,
  minZoom: -0.5
});

// Add boundaries and map image
var bounds = [[0, 0], [1000, 1000]];
var image = L.imageOverlay('map.png', bounds).addTo(map);
map.fitBounds(bounds);


function CoordinatesCompass(){
var marker = L.marker([246, 868], {
  draggable: true,
  icon: orange,
}).addTo(map);
marker.bindPopup('<b>Coordinates compass:</b> Drag me to find (lat, long)!').openPopup();
marker.on('dragend', function(e) {
  marker.getPopup().setContent(marker.getLatLng().toString()).openOn(map);
});
}


async function mapSpotsToMap() {
  const spotsData = await (await fetch('./spotsData.json')).json();
  
      // Create the layer groups
      var Cities = L.layerGroup();
      var Towns = L.layerGroup();
      var Places_Of_Interest = L.layerGroup();
      var Previous_Sessions = L.layerGroup();
      var Important_Places = L.layerGroup();
      var Other = L.layerGroup();

    for (let spot of spotsData) {;
      // Get Lat and Lng of marker
      let position = L.latLng([spot.lat, spot.lng]);
    
      //Set the Colour of the marker based on its group
      let colour;
      switch (spot.group) {
        case "Cities": 
          colour = red;
          break;
        case "Places Of Interest":
          colour = grey; 
          break;
        case "Towns":
          colour = violet; 
          break;
        case "Previous Sessions":
          colour = blue; 
          break;
        case "Important Places":
          colour = ;
          break;
        default:
          colour = grey;
      }

      let marker = L.marker(position, {icon: colour}).bindPopup('<h3>'+spot.locationName+'</h3><h4>Type: '+spot.group+'</h4><p>'+spot.locationDescription+'</p>');


      //Add the marker to the layer group corresponding to its group value
      switch (spot.group) {
        case "Cities":
          marker.addTo(Cities);
          break;
        case "Towns":
          marker.addTo(Towns);
          break;
        case "Places Of Interest":
          marker.addTo(Places_Of_Interest);
          break;
        case "Previous Sessions":
          marker.addTo(Previous_Sessions);
          break;
        case "Important Places":
          marker.addTo(Important_Places);
        default:
          marker.addTo(Other);

      }
  }
  //Group the overlays together
  var overlays = {
    "Cities 🏛️" : Cities.addTo(map),
    "Towns 🛖" : Towns.addTo(map),
    "Places of interest 🔎" : Places_Of_Interest.addTo(map),
    "Previous Sessions 📝" : Previous_Sessions.addTo(map),
    "Important Places 🌟" : Important_Places.addTo(map),
    "Other ❓": Other.addTo(map),
  }
  //Add them to the map
  L.control.layers(null, overlays).addTo(map)

}
mapSpotsToMap()
CoordinatesCompass()

