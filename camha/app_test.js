
function builddata() {
  var url = `/allData/`;
  d3.json(url).then(function(){
    var submit = d3.select("#submit-button");
    submit.on("click", function() {
    $("#kims-table tbody").empty()
    d3.event.preventDefault();
    if {
      var inputElement = d3.select("#inputWinery");
      var inputValue = inputElement.property("value");
          console.log(inputValue);
      var selectElement = d3.select("#inputCity");
      var selectValue = selectElement.property("value");
          console.log(selectValue);
    return  
      var filteredData = tableData.filter(tableData => tableData.names === selectValue || tableData.names.includes(selectValue) && tableData.city === selectValue);
          console.log(filteredData)
    
      filteredData.forEach((entry) => {
        var tbody = d3.select("tbody");
        var row = tbody.append("tr");
          Object.entries(entry).forEach(([key, value]) => {
        var cell = row.append("td");
          cell.text(value);
      });
    })
   }
    else if {
      var inputElement1 = d3.select("#inputWineBeer");
      var inputValue1 = inputElement1.property("value");
        console.log(inputValue1);
      var selectElement1 = d3.select("#inputCity");
      var selectValue1 = selectElement1.property("value");
        console.log(selectValue1);
    return  
      var filteredData1 = tableData.filter(tableData => tableData.businesstype === inputValue1 && tableData.city === selectValue1);
        console.log(filteredData1)  
      filteredData1.forEach((entry) => {
        var tbody = d3.select("tbody");
        var row = tbody.append("tr");
          Object.entries(entry).forEach(([key, value]) => {
        var cell = row.append("td");
          cell.text(value);
    });
  })
}
    else {

}

function optionChanged() {
  buildCharts();
  buildData();
}

// Initialize the dashboard
init();