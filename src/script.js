// Load Access Token

mapboxgl.accessToken =
  "pk.eyJ1IjoiYXBhcm5hc2VzaGFkcmkiLCJhIjoiY2xjcTJsOGR0MDF3aTNwb3oxMXNyaTFtNSJ9.TAYgO7XJ4CrtEFjevPsCEQ";

const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
  center: [-4.29, 55.867],
  zoom: 11.8  
});

// Geocoder

const geocoder = new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
  mapboxgl: mapboxgl,
  marker: false,
  placeholder: "Search for stores from the directory", 
  proximity: {
    longitude: 55.867,
    latitude: -4.26
  }
});

map.addControl(geocoder, "top-right");

// Geolocation Controls

map.addControl(new mapboxgl.GeolocateControl({
  positionOptions: {
    enableHighAccuracy: true
   },
  showUserLocation: true,
  trackUserLocation: true,
  showUserHeading: true
}));

// Navigation Control

map.addControl(new mapboxgl.NavigationControl())

// Collapsible Buttons

var collapse1 = document.getElementsByClassName("collapse1");
var i;

for (i = 0; i < collapse1.length; i++) {
  collapse1[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } 
    else {
      content.style.display = "block";
    }
  });
}

var collapse2 = document.getElementsByClassName("collapse2");
var i;

for (i = 0; i < collapse2.length; i++) {
  collapse2[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } 
    else {
      content.style.display = "block";
    }
  });
}

var collapse3 = document.getElementsByClassName("collapse3");
var i;

for (i = 0; i < collapse3.length; i++) {
  collapse3[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } 
    else {
      content.style.display = "block";
    }
  });
}

// Load Data URL from Mapbox

const data_url =
  "https://api.mapbox.com/datasets/v1/aparnaseshadri/clda3ypz10kfu21oecw1ha0ec/features?access_token=pk.eyJ1IjoiYXBhcm5hc2VzaGFkcmkiLCJhIjoiY2xjcTJsOGR0MDF3aTNwb3oxMXNyaTFtNSJ9.TAYgO7XJ4CrtEFjevPsCEQ";

// Load Layer

map.on("load", () => {
  map.addLayer({
    id: "grocery",
    type: "symbol",
    source: {
      type: "geojson",
      data: data_url
    },
    layout: {
      "icon-image":"grocery-15",
      "icon-size" : 1.5,
      "icon-allow-overlap": true
    },
  });

// Default filter settings
  
  filterType = ["!=", ["get", "Type"], "placeholder"];
  filterRate = [">=", ["get", "Rate"]];
  
// Filter by Rating
  
  document.getElementById("slider").addEventListener("input", (event) => {
    const rate = parseFloat(event.target.value);
    filterRate = [">=", ["get", "Rate"], rate];
    map.setFilter("grocery", ["all", filterRate, filterType]);
    
  document.getElementById("Rate").innerText = rate;
  });
  
// Filter by Type  
  
  document.getElementById("filters").addEventListener("change", (event) => {
    const type = event.target.value;
    console.log(type);
    if (type == "all") {
      filterType = ["!=", ["get", "Type"], "placeholder"];
    } else if (type == "African") {
      filterType = ["==", ["get", "Type"], "African"];
    } else if (type == "Asian") {
      filterType = ["==", ["get", "Type"], "Asian"];
    } else if (type == "E. European") {
      filterType = ["==", ["get", "Type"], "E. European"];
    } else if (type == "Mexican") {
      filterType = ["==", ["get", "Type"], "Mexican"];
    } else if (type == "M. Eastern") {
      filterType = ["==", ["get", "Type"], "M. Eastern"];
    } else if (type == "S. Asian") {
      filterType = ["==", ["get", "Type"], "S. Asian"];
    } else {
      console.log("error");
    }
    map.setFilter("grocery", ["all", filterType]);
  });
  
    map.setFilter("grocery", ["all", filterRate, filterType]);
});

// Popup Functionality 

map.on('click', "grocery",(event) => {
  map.getCanvas().style.cursor = "pointer";
  const features = map.queryRenderedFeatures(event.point, {
    layers: ["grocery"]
});

  if (!features.length) {
    return;
  }
  const feature = features[0];
  
                            
const popup = new mapboxgl.Popup({ offset: [0, -15], className: "my-popup" }).setLngLat(feature.geometry.coordinates).setHTML(`<h2> ${feature.properties.Name}</h2>
<h3> Type: ${feature.properties.Type}</h3>
<a href= ${feature.properties.Link} target="_blank"> <h3> Address: ${feature.properties.Address}</h3></a>
<h3> ★: ${feature.properties.Rate}</h3>
<h3> Business Hours: </h3>
<p>  • Monday: ${feature.properties.Monday}</p>
<p>  • Tuesday: ${feature.properties.Tuesday}</p>
<p>  • Wednesday: ${feature.properties.Wednesday}</p>
<p>  • Thursday: ${feature.properties.Thursday}</p>
<p>  • Friday: ${feature.properties.Friday}</p>
<p>  • Saturday: ${feature.properties.Saturday}</p>
<p>  • Sunday: ${feature.properties.Sunday}</p>
`
    )
    .addTo(map);    
  });


// Additional Notes:
  // - link to google maps only works when R-click + open in new tab
  // - Find a way to keep "★ ≥" rate in the console