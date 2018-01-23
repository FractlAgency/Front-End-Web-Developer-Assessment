let width = 960;
let height = 600;

let svg = d3.select('body')
  .append('svg')
  .attr('width', width)
  .attr('height', height);

let projection = d3.geoAlbersUsa()
  .scale(1000)
  .translate([width / 2, height / 2]);

let path = d3.geoPath()
  .projection(projection);

let div = d3.select('body')
  .append('div')
  .attr('class', 'tooltip')
  .style('opacity', 0);

d3.csv('data-states.csv', (error, data) => {
  if (error) throw error;

  d3.json('us.json', (error, us) => {
    if (error) throw error;

    let allGeoStates = topojson.feature(us, us.objects.usStates).features;

    data.forEach((state) => {
      allGeoStates.forEach((geoState) => {
        if (state['State Abbv'] === geoState.properties.STATE_ABBR) {
          geoState.properties.info = state;
        }
      });
    });

    svg.append('g')
      .selectAll('path')
      .data(topojson.feature(us, us.objects.usStates).features)
      .enter().append('path')
      .attr('d', path)
      .attr('class', 'states')
      .attr('class', (d) => { return d.properties.STATE_ABBR })
      .attr('opacity', (d) => { return parseFloat(d.properties.info['Percent of Population']) / 100 })
      .on('mouseover', function (d) {
        let splitName = d.properties.info['State'].split(' ');
        splitName.forEach((string, i) => {
          splitName[i] = string.charAt(0).toUpperCase() + string.slice(1);
        });
        
        let name = splitName.join(' ');
        let medianIncome = d.properties.info['Median Household Income'];
        let percentIncome = d.properties.info['Percent of Income'];
        let percentPopulation = d.properties.info['Percent of Population'];

        div.transition()
          .duration(200)
          .style("opacity", .9);
        div.html(`
          <h1>${name}</h1>
          <table>
            <tr>
              <td>Percent of Population: </td>
              <td>${percentPopulation}</td>
            </tr>
            <tr>
              <td>Median Household Income: </td>
              <td>${medianIncome}</td>
            </tr>
            <tr>
              <td>Percent of Income: </td>
              <td>${percentIncome}</td>
            </tr>
          </table>
        `)
          .style("left", (d3.event.pageX) + "px")
          .style("top", (d3.event.pageY - 28) + "px");
      })
      .on('mouseout', (d) => {
        div.transition()
          .duration(500)
          .style('opacity', 0);
      })

    svg.append('path')
      .attr('class', 'state-borders')
      .attr('d', path(topojson.mesh(us, us.objects.usStates, function (a, b) { return a !== b; })));

  });
});