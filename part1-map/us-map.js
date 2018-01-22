let width = 960;
let height = 600;

let svg = d3.select("body")
  .append('svg')
  .attr('width', width)
  .attr('height', height);

let projection = d3.geoAlbersUsa()
  .scale(1000)
  .translate([width / 2, height / 2]);

let path = d3.geoPath()
  .projection(projection);

d3.csv('data-states.csv', (error, data) => {
  if (error) throw error;

  d3.json("us.json", (error, us) => {
    if (error) throw error;
    
    svg.append("g")
      .attr("class", "states")
      .selectAll("path")
      .data(topojson.feature(us, us.objects.usStates).features)
      .enter().append("path")
      .attr("d", path);

    svg.append("path")
      .attr("class", "state-borders")
      .attr("d", path(topojson.mesh(us, us.objects.usStates, function (a, b) { return a !== b; })));

  });
});