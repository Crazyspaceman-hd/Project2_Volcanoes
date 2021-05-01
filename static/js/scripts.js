// Empty JS for your own code to be here
function createMap(EruptionSpots) {

  // Create the tile layer that will be the background of our map
  const lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 16,
    id: "mapbox/light-v10",
    accessToken: API_KEY
  });

  // Create a baseMaps object to hold the lightmap layer
  const baseMap = {
    "Light Map": lightmap
  };

  // Create an overlayMaps object to hold the EruptionSpots layer
  const overlayMap = {
    "Volcanoes": EruptionSpots
  };

  // Create the map object with options
  const map = L.map("map-points", {
    center: [20.73, -174.0059],
    zoom: 3,
    layers: [lightmap, EruptionSpots]
  });

  // Create a layer control of basemaps and overlay maps
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(map);
}

function createPoints(response) {

  // Pull the volcano property off of response.data
  const volcanoes = response.eruptions;

  // Initialize an array to hold bike markers
  const volcanoArray = [];

  // Loop through the volcano array
  volcanoes.forEach(spot => {
    // For each station, create a marker and bind a popup with the volcano's name
    const VolcanoItem = L.marker([spot.latitude, spot.longitude])
      .bindPopup("<h3>" + spot.volcano_name + "<h3><h3>Type: " + spot.primary_volcano_type + "</h3>");

    // Add the item to the volcano array
    VolcanoArray.push(VolcanoItem);
  })

  // Create a layer group made from the volcano array
  createMap(L.layerGroup(VolcanoArray));
}


// Perform an API call 
d3.json("http://127.0.0.1:5000/api/volcanoes").then(createPoints);
