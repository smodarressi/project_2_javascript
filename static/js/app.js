
function builddata() {
  var url0 = `/allData`;
  d3.json(url0).then(function(url){
    var submit = d3.select("#submit-button");
    submit.on("click", function() {
    // $("#kims-table tbody").empty();
    d3.event.preventDefault();
      var selectElement = d3.select("#inputWineBeer");
      var selectValue = selectElement.property("value");
          console.log(selectValue);
      var selectElement1 = d3.select("#inputCity");
      var selectValue1 = selectElement1.property("value");
          console.log(selectValue1);
      var inputElement1 = d3.select("#inputWinery");
      var inputValue1 = inputElement1.property("value");
          console.log(inputValue1);

      if (selectValue !== 'Choose...' && inputValue1 !== null && selectValue1 !== 'Choose...') {
        var filteredData = url.filter(url => url.businesstype === selectValue && url.names.includes(inputValue1) && url.city === selectValue1)}
      else if (selectValue === 'Choose...' && inputValue1 !== null && selectValue1 !== 'Choose...') {
        var filteredData = url.filter(url => url.names.includes(inputValue1) && url.city === selectValue1)}
      else if (selectValue === 'Choose...' && inputValue1 === null && selectValue1 !== 'Choose...') {
        var filteredData = url.filter(url => url.city === selectValue1)}
      else if (selectValue !== 'Choose...' && inputValue1 === null && selectValue1 !== 'Choose...') {
        var filteredData = url.filter(url => url.businesstype === selectValue && url.city === selectValue1)}
      else if (selectValue === 'Choose...' && inputValue1 !== null && selectValue1 === 'Choose...') {
        var filteredData = url.filter(url => url.names.includes(inputValue1))};
      
      console.log(filteredData);
      
      /// MAP AREA
      marker_maker(filteredData);
      /// END MAP AREA  

      d3.select("tbody").text("");

      filteredData.forEach((entry) => {
        var tbody = d3.select("tbody");
        var row = tbody.append("tr");
          Object.entries(entry).forEach(([key, value]) => {
        var cell = row.append("td");
          cell.text(value);
      });
    });
   });
  });
}


/// MAP AREA
var mymap = L.map('sherwins-map').setView([37.524420, -122.265870], 5);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: API_KEY
}).addTo(mymap);



//idealy used after the submit button passes the information
function marker_maker(json_filtered){
  // to be changed to forEach once it is added to the filter
  json_filtered.forEach((data) => {
    // console.log(json_filtered[i]);
    console.log(data.businesstype);
    console.log(data.names);
    var marker_icon;
    if (data.businesstype === "Breweries"){
      marker_icon = {
        icon: L.AwesomeMarkers.icon({icon: 'beer', prefix: 'fa', markerColor: 'blue'})
      }
    }else if (data.businesstype === "Wineries"){
      marker_icon = {
        icon: L.AwesomeMarkers.icon({icon: 'glass-martini', prefix: 'fa', markerColor: 'darkred'})
      }
    }else{
      marker_icon = {
        icon : null
      }
    }
    // console.log(json_filtered[i]);
    console.log(data.long);
    // makes markers based on filtered data marker
    L.marker([data.lat,data.long], marker_icon).addTo(mymap)
      .bindPopup("<strong>Biz Name: </strong>" + data.names + "<br><strong>Address: </strong>" + data.address + "<br><strong>Zip: </strong>" 
      + data.zip + "<br><strong>Yelp Rating: </strong>" + data.yelprating + "<strong><br>Number of Yelp Reviews: </strong>" + data.numberofyelpreviews);

});
}

/// END MAP AREA


 
function init() {

  /// MAP AREA

  /// END MAP AREA

  // Grab a reference to the dropdown select element in city field
  var selector = d3.select("#inputCity");
  var url1 = `/city`;
  d3.json(url1).then((cityname) => {
    // console.log(cityname)
    cityname.forEach((city) => {
      selector
        .append("option")
        .text(city)
        .property("value", city);
    });
  });
  builddata();
};
// Initialize the dashboard
init();