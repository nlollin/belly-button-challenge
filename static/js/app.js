const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Fetch the data
d3.json(url).then(function(data) {
  console.log(data);

  // Sort the data for the horizontal bar chart
  let sortedData = data.sort((a, b) => b.values - a.values);
  let slicedData = sortedData.slice(0, 10);
  let reversedData = slicedData.reverse();

  // Create trace for the horizontal bar chart
  let trace1 = {
    x: reversedData.map(object => object.values),
    y: reversedData.map(object => `OTU ${object.otu_ids}`),
    text: reversedData.map(object => object.otu_labels),
    name: "Top 10 OTUs",
    type: "bar",
    orientation: "h"
  };

  // Data array for the horizontal bar chart
  let traceData = [trace1];

  // Layout for the horizontal bar chart
  let layout = {
    title: "Top 10 OTUs",
    margin: {
      l: 100,
      r: 100,
      t: 100,
      b: 100
    }
  };

  // Create trace for the bubble chart
  let trace2 = {
    x: data.otu_ids,
    y: data.values,
    text: data.otu_labels,
    mode: 'markers',
    marker: {
      size: data.values,
      color: data.otu_ids,
      colorscale: 'Earth'
    },
    name: "Bubble Chart"
  };

  // Data array for the bubble chart
  let traceData2 = [trace2];

  // Layout for the bubble chart
  let layout2 = {
    title: 'Sample OTU Bubble Chart',
    xaxis: { title: 'OTU ID' },
    yaxis: { title: 'Sample Values' },
    showlegend: false,
    height: 600,
    width: 1000
  };

  // Render the horizontal bar chart to the div tag with id "plot"
  Plotly.newPlot("plot", traceData, layout);

  // Render the bubble chart to a new div tag with id "bubble-plot"
  Plotly.newPlot("bubble-plot", traceData2, layout2);

  // Display sample metadata
  let metadataDiv = d3.select("#metadata");
  let metadata = data.metadata;

  Object.entries(metadata).forEach(([key, value]) => {
    metadataDiv.append("p").text(`${key}: ${value}`);
  });
});