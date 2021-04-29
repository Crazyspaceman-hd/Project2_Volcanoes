// Empty JS for your own code to be here
const lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox/light-v10",
  accessToken: API_KEY
});


// Initialize all of the LayerGroups we'll be using
const layers = {
    CALDERA: new L.LayerGroup(),
    COMPLEX: new L.LayerGroup(),
    COMPOUND: new L.LayerGroup(),
    CRATER_ROWS: new L.LayerGroup(),
    FISSURE_VENTS: new L.LayerGroup(),
    LAVA_CONE: new L.LayerGroup(),
    LAVA_DOME: new L.LayerGroup(),
    MAARS: new L.LayerGroup(),
    PYROCLASTIC_CONE: new L.LayerGroup(),
    PYROCLASTIC_SHIELD: new L.LayerGroup(),
    SHIELD: new L.LayerGroup(),
    STRATOVOLCANO: new L.LayerGroup(),
    SUBGLACIAL: new L.LayerGroup(),
    SUBMARINE: new L.LayerGroup(),
    TUFF_CONE: new L.LayerGroup(),
  };
  
  // Create the map with our layers
  const map = L.map("map-id", {
    center: [36.49, 177.64],
    zoom: 3,
    layers: [
      layers.CALDERA,
      layers.COMPLEX,
      layers.COMPOUND,
      layers.CRATER_ROWS,
      layers.FISSURE_VENTS,
      layers.LAVA_CONE,
      layers.LAVA_DOME,
      layers.MAARS,
      layers.PYROCLASTIC_CONE,
      layers.PYROCLASTIC_SHIELD,
      layers.SHIELD,
      layers.STRATOVOLCANO,
      layers.SUBGLACIAL,
      layers.SUBMARINE,
      layers.TUFF_CONE,
    ]
  });
  
  // Add our 'lightmap' tile layer to the map
  lightmap.addTo(map);
  
  // Create an overlays object to add to the layer control
  const overlays = {
    "Calderas": layers.CALDERA,
    "Complexes": layers.COMPLEX,
    "Compounds": layers.COMPOUND,
    "Crater Rows": layers.CRATER_ROWS,
    "Fissure Vents": layers.FISSURE_VENTS,
    "Lava Cone": layers.LAVA_CONE,
    "Lava Dome": layers.LAVA_DOME,
    "Maars": layers.MAARS,
    "Pyroclastic Cone": layers.PYROCLASTIC_CONE,
    "Pyroclastic Shield": layers.PYROCLASTIC_SHIELD,
    "Shield": layers.SHIELD,
    "Stratovolcano": layers.STRATOVOLCANO,
    "Subglacial": layers.SUBGLACIAL,
    "Submarine": layers.SUBMARINE,
    "Tuff Cone": layers.TUFF_CONE,
  };
  
  // Create a control for our layers, add our overlay layers to it
  L.control.layers(null, overlays).addTo(map);
  
  // Create a legend to display information about our map
  const info = L.control({
    position: "bottomright"
  });
  
  // When the layer control is added, insert a div with the class of "legend"
  info.onAdd = function() {
    const div = L.DomUtil.create("div", "legend");
    return div;
  };
  // Add the info legend to the map
  info.addTo(map);
  
  // Initialize an object containing icons for each layer group
  const icons = {
    CALDERA: L.ExtraMarkers.icon({
      icon: "ion-settings",
      iconColor: "white",
      markerColor: "yellow",
      shape: "star"
    }),
    COMPLEX: L.ExtraMarkers.icon({
      icon: "ion-settings",
      iconColor: "white",
      markerColor: "red",
      shape: "circle"
    }),
    COMPOUND: L.ExtraMarkers.icon({
      icon: "ion-settings",
      iconColor: "white",
      markerColor: "blue-dark",
      shape: "penta"
    }),
    CRATER_ROWS: L.ExtraMarkers.icon({
      icon: "ion-settings",
      iconColor: "white",
      markerColor: "orange",
      shape: "circle"
    }),
    FISSURE_VENTS: L.ExtraMarkers.icon({
      icon: "ion-settings",
      iconColor: "white",
      markerColor: "green",
      shape: "circle"
    }),
    LAVA_CONE: L.ExtraMarkers.icon({
      icon: "ion-settings",
      iconColor: "white",
      markerColor: "yellow",
      shape: "star"
    }),
    LAVA_DOME: L.ExtraMarkers.icon({
      icon: "ion-settings",
      iconColor: "white",
      markerColor: "red",
      shape: "circle"
    }),
    MAARS: L.ExtraMarkers.icon({
      icon: "ion-settings",
      iconColor: "white",
      markerColor: "blue-dark",
      shape: "penta"
    }),
    PYROCLASTIC_CONE: L.ExtraMarkers.icon({
      icon: "ion-settings",
      iconColor: "white",
      markerColor: "orange",
      shape: "circle"
    }),
    PYROCLASTIC_SHIELD: L.ExtraMarkers.icon({
      icon: "ion-settings",
      iconColor: "white",
      markerColor: "green",
      shape: "circle"
    }),
    SHIELD: L.ExtraMarkers.icon({
      icon: "ion-settings",
      iconColor: "white",
      markerColor: "yellow",
      shape: "star"
    }),
    STRATOVOLCANO: L.ExtraMarkers.icon({
      icon: "ion-settings",
      iconColor: "white",
      markerColor: "red",
      shape: "circle"
    }),
    SUBGLACIAL: L.ExtraMarkers.icon({
      icon: "ion-settings",
      iconColor: "white",
      markerColor: "blue-dark",
      shape: "penta"
    }),
    SUBMARINE: L.ExtraMarkers.icon({
      icon: "ion-settings",
      iconColor: "white",
      markerColor: "orange",
      shape: "circle"
    }),
    TUFF_CONE: L.ExtraMarkers.icon({
      icon: "ion-settings",
      iconColor: "white",
      markerColor: "green",
      shape: "circle"
    })
  };
  //Link Volcano JSON file
  //Promise.all([d3.json("https://gbfs.citibikenyc.com/gbfs/en/station_information.json"), d3.json("https://gbfs.citibikenyc.com/gbfs/en/station_status.json")]).then(([infoRes, statusRes]) => {
  
    const updatedAt = infoRes.last_updated;
    const stationStatus = statusRes.data.stations;
    const stationInfo = infoRes.data.stations;
  
    // Create an object to keep of the number of markers in each layer
    const stationCount = {
      CALDERA: 0,
      COMPLEX: 0,
      COMPOUND: 0,
      CRATER_ROWS: 0,
      FISSURE_VENTS: 0,
      LAVA_CONE: 0,
      LAVA_DOME: 0,
      MAARS: 0,
      PYROCLASTIC_CONE: 0,
      PYROCLASTIC_SHIELD: 0,
      SHIELD: 0,
      STRATOVOLCANO: 0,
      SUBGLACIAL: 0,
      SUBMARINE: 0,
      TUFF_CONE: 0
    };
  
    // Initialize a stationStatusCode, which will be used as a key to access the appropriate layers, icons, and station count for layer group
    let stationStatusCode;
  
    // Loop through the stations (they're the same size and have partially matching data)
    for (let i = 0; i < stationInfo.length; i++) {
  
      // Create a new station object with properties of both station objects
      const station = Object.assign({}, stationInfo[i], stationStatus[i]);
      // If a station is listed but not installed, it's coming soon
      if (!station.is_installed) {
        stationStatusCode = "COMING_SOON";
      }
      // If a station has no bikes available, it's empty
      else if (!station.num_bikes_available) {
        stationStatusCode = "EMPTY";
      }
      // If a station is installed but isn't renting, it's out of order
      else if (station.is_installed && !station.is_renting) {
        stationStatusCode = "OUT_OF_ORDER";
      }
      // If a station has less than 5 bikes, it's status is low
      else if (station.num_bikes_available < 5) {
        stationStatusCode = "LOW";
      }
      // Otherwise the station is normal
      else {
        stationStatusCode = "NORMAL";
      }
  
      // Update the station count
      stationCount[stationStatusCode]++;
      // Create a new marker with the appropriate icon and coordinates
      const newMarker = L.marker([station.lat, station.lon], {
        icon: icons[stationStatusCode]
      });
  
      // Add the new marker to the appropriate layer
      newMarker.addTo(layers[stationStatusCode]);
  
      // Bind a popup to the marker that will  display on click. This will be rendered as HTML
      newMarker.bindPopup(`${station.name}<br> 
                          Capacity: ${station.capacity}<br>
                          ${station.num_bikes_available} Bikes Available`);
    }
  
    // Call the updateLegend function, which will... update the legend!
    updateLegend(updatedAt, stationCount);
  });
  
  // Update the legend's innerHTML with the last updated time and station count
  function updateLegend(time, stationCount) {
    document.querySelector(".legend").innerHTML = [
      `<p>Updated: ${moment.unix(time).format("h:mm:ss A")}</p>`,
      `<p class="out-of-order">Out of Order Stations: ${stationCount.OUT_OF_ORDER}</p>`,
      `<p class="coming-soon">Stations Coming Soon: ${stationCount.COMING_SOON}</p>`,
      `<p class="empty">Empty Stations: ${stationCount.EMPTY}</p>`,
      `<p class="low">Low Stations: ${stationCount.LOW}</p>`,
      `<p class="healthy">Healthy Stations: ${stationCount.NORMAL}</p>`
    ].join("");
  }
  



  function createMap(bikeStations) {

    // Create the tile layer that will be the background of our map
    const lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "mapbox/light-v10",
      accessToken: API_KEY
    });
  
    // Create a baseMaps object to hold the lightmap layer
    const baseMaps = {
      "Light Map": lightmap
    };
  
    // Create an overlayMaps object to hold the bikeStations layer
    const overlayMaps = {
      "Bike Stations": bikeStations
    };
  
    // Create the map object with options
    const map = L.map("map-id", {
      center: [40.73, -74.0059],
      zoom: 12,
      layers: [lightmap, bikeStations]
    });
  
    // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(map);
  }
  
  function createPoints(response) {
  
    // Pull the "stations" property off of response.data
    const stations = response.data.stations;
  
    // Initialize an array to hold bike markers
    const bikeMarkers = [];
  
    // Loop through the stations array
    stations.forEach(station => {
      // For each station, create a marker and bind a popup with the station's name
      const bikeMarker = L.marker([station.lat, station.lon])
        .bindPopup("<h3>" + station.name + "<h3><h3>Capacity: " + station.capacity + "</h3>");
  
      // Add the marker to the bikeMarkers array
      bikeMarkers.push(bikeMarker);
    })
  
    // Create a layer group made from the bike markers array, pass it into the createMap function
    createMap(L.layerGroup(bikeMarkers));
  }
  
  
  // Perform an API call to the Citi Bike API to get station information. Call createMarkers when complete
  d3.json("https://gbfs.citibikenyc.com/gbfs/en/station_information.json").then(createPoints);
  