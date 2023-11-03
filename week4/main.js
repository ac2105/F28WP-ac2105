var mycity = [
    {
        "Name": "Dubai",
        "Country": "UAE",
        "Place": "Burj Khalifa"
    },
    {
        "Name": "Milan",
        "Country": "Italy",
        "Place": "Duomo Di Milano"
    },
    {
        "Name": "Cape Town",
        "Country": "South Africa",
        "Place": "Table Mountain"   
    }
]

var cityContainer = document.getElementById("city-info");
var btn = document.getElementById("btn");
btn.addEventListener("click", function(){
    var ourRequest = new XMLHttpRequest();
    ourRequest.open('GET', 'https://ac2105.github.io/F28WP-ac2105/week4/cities1.json');
    ourRequest.onload = function() {
        var ourData = JSON.parse(ourRequest.responseText);
        renderHTML(ourData);
    };
    ourRequest.send();
});

function renderHTML(data){
    var htmlString = "";
    for (i=0; i<data.length; i++){
    htmlString += "<p>" + data[i].name + " is a city in " + data[i].country + ",</br>Where you can enjoy indoor places like: " ;
    for (ii = 0; ii < data[i].places.indoor.length; ii++) {
    // Loop through the indoor places of the current city.
    if (ii == 0) {
    htmlString += data[i].places.indoor[ii];
    } else {
    htmlString += ", and " + data[i].places.indoor[ii];
    }
    }
    htmlString += '. & enjoy outdoor places like: ';
    // Loop through the outdoor places of the current city.
    for (ii = 0; ii < data[i].places.outdoor.length; ii++) {
    if (ii == 0) {
    htmlString += data[i].places.outdoor[ii];
    } else {
    htmlString += " and " + data[i].places.outdoor[ii];
    }
    }
    htmlString += '.</p>';
    }
    cityContainer.insertAdjacentHTML('beforeend' , htmlString);
    }