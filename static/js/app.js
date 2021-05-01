// Copy what was provided above and create dropdown list for IDs of person/participant
// Will need to create bins for the drop down options.  Years? year groupings?


function init(){
    d3.json("/api/vei").then(function(data){
        console.log(data)



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

init()