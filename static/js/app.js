// Copy what was provided above and create dropdown list for IDs of person/participant
// Will need to create bins for the drop down options.  Years? year groupings?


function init(){
    d3.json("/api/vei").then(function(data){
        console.log(data)
        createPoints(data)
        const reformat = []
        data.forEach(d => {
          // get volcano name, country
          d.eruptions.forEach(e => {
            let this_object = {name: d.volcano_name, country: d.country, lat: d.latitude, long: d.longitude}
            // get each eruption vei, eruption number, start year
            this_object.vei = parseFloat(e.vei)
            this_object.eruption_number = e.eruption_number
            this_object.year = parseFloat(e.start_year)
            reformat.push(this_object)
          })
        })
        console.log(reformat)
        var vol_slice= reformat.sort(function(a, b){return b.vei-a.vei}).slice(0,10)
        const filtered =(volcano) => volcano.year >= 2000;
        vol_200= reformat.filter(filtered);
        console.log(vol_200)
    // samples_data.forEach(function(row){
    //     if (row.id === selected_id) {
    //     var volcano_name = row.volcano_name;
    //     var volcano_year = row.end_year;
    //     var volcano_vei  = row.volcano_vei;
     
    //     }
    // });        
    // ? how to get top volcano in each year?
    // var top_volcano_peryear = ?
        // var otu_labels = row.otu_labels;
        // var samp_vals = row.sample_values
        // console.log(samp_vals);

// 1. Will need a trace to create the plot. Additionally, cut to top 10.
// bar graph of all top 10 eruptions
// ? static graph?
    var trace1 = {
        x: vol_slice.map(d => d.name),
        y: vol_slice.map(d => d.vei),
        type: "bar",
        orientation: "v",
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
            title: `Top 10 Volcano Eruptions by size`,
            xaxis: { title: "Volucano Name"},
            yaxis: { title: "VEI Rating"},
            width: 500,
            height: 500
        };
        // Plot the chart
        Plotly.newPlot("bar", top_10_data, top_10_layout);


// 2. Histogram of largest eruption by year. Static graph?
// Create a bubble chart instead?

    // var trace2 = {
    //     x: volcano_year,
    //     y: vei_top_10,
    //     type: "scatter",
    //     orientation: "h",
    //     mode: 'markers',
    //     marker: {size:10},
    //     text: otu_labels,
    //     transforms: [{
    //         type: 'sort',
    //         target: 'y',
    //         order: 'descending'
    //     }],
    // };
    // // Create the array for the plot
    // var bubble_chart = [trace2];

    //   //3. Define layout
    //   var bubble_layout = {
    //     yaxis: {autorange: true},
    //     xaxis: {title: `fill in something here`, autorange: true}
    // };

    //     // bar graph of all top 10 eruptions
    //     var trace1 = {
    //         x: volcano_name,
    //         y: top_volcano_peryear,
    //         type: "scatter",
    //         mode: 'markers',
    //         marker: {size: volcano_vei, color: volcano_name},
    //         theme: 'seaborn',
    //         tranforms: [{type:'sort', target:'y', order:'descending'}]
    //     };

    //         // 4. Plot the chart to a div tag
    // Plotly.newPlot("bubble", bubble_chart, bubble_layout);

    });
}

init()

function createMap(EruptionSpots) {

    // Create the tile layer that will be the background of our map
    const lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 16,
      id: "mapbox/light-v10",
      accessToken: API_KEY
    });

    const satellite = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 16,
        id: "mapbox/satellite-streets-v11",
        accessToken: API_KEY
    });

    const outdoors = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 16,
        id: "mapbox/outdoors-v10",
        accessToken: API_KEY
    });
  
    // Create a baseMaps object to hold the lightmap layer
    const baseMap = {
        "Satellite": satellite,
        "Height Map": outdoors,
        "Light Map": lightmap        
    };
  
    // Create an overlayMaps object to hold the EruptionSpots layer
    const overlayMap = {
      "Volcanoes": EruptionSpots
    };
  
    // Create the map object with options
    const map = L.map("map-points", {
      center: [19.8968, -155.5828],
      zoom: 6,
      layers: [satellite, outdoors, lightmap, EruptionSpots]
    });
  
    // Create a layer control of basemaps and overlay maps
    L.control.layers(baseMap, overlayMap, {
      collapsed: false
    }).addTo(map);
  }
  
  function createPoints(response) {
  console.log(response)
    // Pull the volcano property off of response.data
    // const volcanoes = response.eruptions;
  
    // Initialize an array to hold bike markers
    const VolcanoArray = [];
  
    // Loop through the volcano array
    response.forEach(spot => {
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
//   d3.json("/api/volcanoes").then(createPoints);