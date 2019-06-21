function buildMetadata(sample) {
  // @TODO: Complete the following function that builds the metadata panel
  // Use `d3.json` to fetch the metadata for a sample
    // Use d3 to select the panel with id of `#sample-metadata`
  var url = `/metadata/${sample}`;
  d3.json(url).then(function(sampleResponse) {
    console.log(sampleResponse);

    var sampleEntries = Object.entries(sampleResponse)

    d3.select("#sample-metadata")
    // Use `.html("") to clear any existing metadata
    .html("")
    .selectAll("p")
    .data(sampleEntries)
    .enter()
    .append("p")
    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    .text(function([key, value]) {
      return `${key}: ${value}`})

  });





    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
}

function buildCharts(sample) {
  // @TODO: Use `d3.json` to fetch the sample data for the plots
  var url = `/samples/${sample}`;
  d3.json(url).then(function(sampleResponse) {
    console.log(sampleResponse);

  
    var otu_ids = sampleResponse["otu_ids"]
    var otu_labels = sampleResponse["otu_labels"]
    var sample_values = sampleResponse["sample_values"]
 
     // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
    pieDataArr = []

    sample_values.forEach(function(d, i) {
      pieDataArr.push([sample_values[i], otu_labels[i], otu_ids[i]])
    });

    var sorted_pieDataArr = pieDataArr.sort(function compareFunction(firstNum, secondNum) {
      return secondNum[0] - firstNum[0];
      });

    console.log(sorted_pieDataArr);

    var chart_sample_values = []
    var chart_otu_ids = []
    var chart_otu_labels = []

    sorted_pieDataArr.forEach(function(arr) {
      chart_sample_values.push(arr[0]),
      chart_otu_ids.push(arr[2]),
      chart_otu_labels.push(arr[1])
    });

    var data = [{
      values: chart_sample_values.slice(0,10),
      labels: chart_otu_ids.slice(0,10),
      hovertext: chart_otu_labels.slice(0,10),
      type: 'pie'
    }];
    
    var layout = {
      height: 700,
      width: 700
    };
    
    Plotly.newPlot('pie', data, layout);

    // @TODO: Build a Bubble Chart using the sample data

    var trace = {
      x: chart_otu_ids,
      y: chart_sample_values,
      mode: 'markers',
      type: 'scatter',
      name: 'Team B',
      text: chart_otu_labels,
      marker: { size: chart_sample_values,
        color: chart_otu_ids }
    };
    
    var data = [trace];
    
    var layout = {
      xaxis: {
        range: [0, Math.max(chart_otu_ids)]
      },
      yaxis: {
        range: [0, Math.max(chart_sample_values)*1.5]
      },
    };

    Plotly.newPlot('bubble', data, layout);
  });





}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
// buildMetadata(975);
