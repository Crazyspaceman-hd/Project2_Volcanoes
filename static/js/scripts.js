
d3.json("http://127.0.0.1:5000/api/volcanoes", function(data) {
    console.log(data);
});




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