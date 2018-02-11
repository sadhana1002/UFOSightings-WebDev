function drawplot(category){
  var arr = aggregates[0][category]["num_sightings"];
  var sightings=arr.map(Number);
  console.log(sightings);

  var data = [{
      "y": sightings,
      "x": aggregates[0][category][category],
      type: "bar"
  }];

  var layout = {
    title: 'Distribution of '+category,
    xaxis: {
      title: category
    },
    yaxis: {
      title: 'Number of sightings'
    }
  };
    console.log("Plot")
    console.log(data);
    Plotly.newPlot('myDiv', data,layout);
}

drawplot("country")

   