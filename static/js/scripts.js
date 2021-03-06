
d3.json("/api/volcanoes", function(data) {
    console.log(data);
});


function initializedDropdown(){
    d3.json("/api/volcanoes").then(function(data){
        var year_list = data.names;

    samples_data.forEach(function(row){
        if (row.id === selected_id) {

        var volcano_name = row.volcano_name;
        var volcano_year = row.end_year;
        var volcano_vei  = row.volcano_vei;
     
        }
    });        
    // ? how to get top volcano in each year?
    // var top_volcano_peryear = ?
        // var otu_labels = row.otu_labels;
        // var samp_vals = row.sample_values
        // console.log(samp_vals);

// 1. Will need a trace to create the plot. Additionally, cut to top 10.
// bar graph of all top 10 eruptions
// ? static graph?
    var trace1 = {
        x: volcano_name.slice(0,10),
        y: vei_top_10.map(id => String(`OTU ${volcano_name}`)),
        type: "bar",
        orientation: "v",
        mode: 'markers',
        marker: {size:10},
        text: otu_labels,
        transforms: [{
            type: 'sort',
            target: 'y',
            order: 'descending'
        }],
    };
    // Create the array for the plot
    var top_10_data = [trace1];
    
    // Define horizontal plot layout
        var top_10_layout = {
            title: `Top 10 volcanos by size${volcano_name}`,
            xaxis: { title: "Volucano name"},
            yaxis: { title: "VEI rating"}
        };
        // Plot the chart
        Plotly.newPlot("bar", top_10_data, top_10_layout);


// 2. Histogram of largest eruption by year. Static graph?
// Create a bubble chart instead?

    var trace2 = {
        x: volcano_year,
        y: vei_top_10,
        type: "scatter",
        orientation: "h",
        mode: 'markers',
        marker: {size:10},
        text: otu_labels,
        transforms: [{
            type: 'sort',
            target: 'y',
            order: 'descending'
        }],
    };
    // Create the array for the plot
    var bubble_chart = [trace2];

      //3. Define layout
      var bubble_layout = {
        yaxis: {autorange: true},
        xaxis: {title: `fill in something here`, autorange: true}
    };

        // bar graph of all top 10 eruptions
        var trace1 = {
            x: volcano_name,
            y: top_volcano_peryear,
            type: "scatter",
            mode: 'markers',
            marker: {size: volcano_vei, color: volcano_name},
            theme: 'seaborn',
            tranforms: [{type:'sort', target:'y', order:'descending'}]
        };

            // 4. Plot the chart to a div tag
    Plotly.newPlot("bubble", bubble_chart, bubble_layout);

    });
}



function createMap(EruptionSpots) {

    // Create the tile layer that will be the background of our map
    const lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery ?? <a href=\"https://www.mapbox.com/\">Mapbox</a>",
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
  d3.json("/api/volcanoes").then(createPoints);