
// d3.json("http://127.0.0.1:5000/api/volcanoes", function(data) {
//     console.log(data);
// });


function initializedDropdown(){
    d3.json("http://127.0.0.1:5000/api/volcanoes").then(function(data){
        var year_list = data.names;

        samples_data.forEach(function(row){
            if (row.id === selected_id) {
                var volcano_name = row.volcano_name;
                var volcano_year = row.end_year;
                var volcano_vei  = row.volcano_vei;
            }
        });

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





























// // Empty JS for your own code to be here
// function getVolcano(number) {
//     d3.json('http://127.0.0.1:5000/api/volcanoes').then((data)=> {
//         console.log(data)

//     var volcanoes = data.volcano_number;
//     var volcanoName = data.volcano_name;
//     var country = data.country;
//     var elevation = data.elevation;
//     var eruptions = data.eruptions;
//     var vei = data.vei;
//     var volcanoType = data.primary_volcano_type;
//     var latitude = data.latitude;
//     var longitude = data.longitude;

    
//     console.log(volcanoes);
//     console.log(volcanoName);
//     console.log(country);
//     console.log(elevation);
//     console.log(eruptions);
//     console.log(vei);
//     console.log(volcanoType);
//     console.log(latitude);
//     console.log(longitude);


// })

// }

// getVolcano();