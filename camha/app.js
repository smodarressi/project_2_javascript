
// function buildMetadata(sample) {
//   var url = `/metadata/${sample}`;
//   d3.json(url).then(function(sample){
var submit = d3.select("#submit-button");
    submit.on("click", function() {
    $("#kims-table tbody").empty()
    d3.event.preventDefault();
    // if {
      var inputElement = d3.select("#inputWinery");
      var inputValue = inputElement.property("value");
        console.log(inputValue);
      var filteredData = tableData.filter(tableData => tableData.Name === inputValue);
        console.log(filteredData);
    // }
    // else if {
    //   var inputElement = d3.select("#inputWinery", "#inputCity");
    //   var inputValue = inputElement.property("value");
    //     console.log(inputValue);
    //   var filteredData = tableData.filter(tableData => tableData.datetime === inputValue);
    //     console.log(filteredData);
    // }
    // else {

    // }
  filteredData.forEach((entry) => {
    var tbody = d3.select("tbody");
    var row = tbody.append("tr");
        Object.entries(entry).forEach(([key, value]) => {
      var cell = row.append("td");
        cell.text(value);
    });
  });
});
// });
// };

// function optionChanged(newSample) {
//   // Fetch new data each time a new sample is selected
//   buildCharts(newSample);
//   buildMetadata(newSample);
// }
// a
// // Initialize the dashboard
// init();