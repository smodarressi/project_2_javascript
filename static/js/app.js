
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

 
function init() {
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