function createParallelCoordinate(data){
  // default color function
  var blue_to_brown = 
    d3.scale
      .linear()
      .domain([0, 1000])
      .range(["steelblue", "brown"])
      .interpolate(d3.interpolateLab);
  var color = function(d) { 
    return blue_to_brown(d["Name"]); 
  };
  // create and initialize parallel coordinate
  var parcoords = 
    d3.parcoords()("#example")
      .color(color)
      .alpha(0.4);           
  parcoords
    .data(data)
    .hideAxis(["Name","StartRevision","EndRevision"])
    .smoothness(0)
    .nullValueSeparator("bottom")
    .render()
    .brushMode("1D-axes");
  // create data table, row hover highlighting 
  var grid = d3.divgrid(["Name","StartRevision","EndRevision"]);
  d3.select("#grid")
    .datum(data.slice(0,5))
    .call(grid)
    .selectAll(".row")
    // TODO
    .on('click', function(d) { alert(d["Name"])})
    .on({
      "mouseover": function(d) { parcoords.highlight([d]) },
      "mouseout": parcoords.unhighlight
    });
  // update data table on brush event 
  parcoords.on("brush", function(d) {
    d3.select("#grid")
      .datum(d.slice(0,20))
      .call(grid)
      .selectAll(".row")
      // TODO
      .on('click', function(d) { alert(d["Name"])})
      .on({
          "mouseover": function(d) { parcoords.highlight([d]) },
          "mouseout": parcoords.unhighlight
      });
  });
}