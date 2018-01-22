const svg = d3
  .select('#map')
  .append('svg')
  // next two attributes make svg responsive
  .attr('preserveAspectRatio', 'xMinYMin meet')
  .attr('viewBox', '0 0 600 400');

const projection = d3.geoAlbersUsa().scale(660).translate([300, 200]);

const path = d3.geoPath().projection(projection);

// creating a layer to allow zooming and dragging
const zoomLayer = svg.append('g');
const zoomed = () => zoomLayer.attr('transform', d3.event.transform);
svg.call(d3.zoom().scaleExtent([1 / 2, 12]).on('zoom', zoomed));

// async read in of data
d3
  .queue()
  .defer(d3.json, 'us.json')
  .defer(d3.csv, 'map/data-states.csv')
  .await(ready);

function ready(error, us, stateData) {
  if (error) throw error;

  // data from data-states.csv turned into object with state abbv as keys
  const stateObj = {};
  stateData.forEach(state => {
    stateObj[state['State Abbv']] = state;
  });

  // take in a given data category and colors for map, find min and max
  const category = 'Percent of Population';
  const lowColor = '#D4EFDF';
  const highColor = '#145A32';

  const sorted = stateData.sort(
    (a, b) => parseInt(b[category]) - parseInt(a[category])
  );
  const max = parseInt(sorted[0][category]);
  const min = parseInt(sorted[sorted.length - 1][category]);

  d3.json('us.json', us => {
    function createTooltip(d) {
      const state = stateObj[d.properties.STATE_ABBR];

      return (document.getElementById('tooltip').innerHTML = createHtml(
        d,
        state
      ));
    }

    function createFill(d) {
      const state = stateObj[d.properties.STATE_ABBR];
      
      return d3.interpolate(lowColor, highColor)(
        (parseInt(state[category]) - min) / (max - min)
      );
    }

    function createHtml(d, state) {
      return (
        '<table class="table table-sm table-dark">' +
        '  <thead>' +
        '    <tr>' +
        '      <th scope="col">' + state['State'] + '</th>' +
        '    </tr>' +
        '  </thead>' +
        '  <tbody>' +
        '    <tr>' +
        '      <td>Percent of Population</td>' +
        '      <td>' + state['Percent of Population'] + '</td>' +
        '    </tr>' +
        '    <tr>' +
        '      <td>Median Household Income</td>' +
        '      <td>' + state['Median Household Income'] + '</td>' +
        '    </tr>' +
        '    <tr>' +
        '      <td>Percent of Income</td>' +
        '      <td>' + state['Percent of Income'] + '</td>' +
        '    </tr>' +
        '  </tbody>' +
        '</table>'
      );
    }
    // drawing, color filling, and adding tooltip to map
    zoomLayer
      .selectAll('.states')
      .data(topojson.feature(us, us.objects.usStates).features)
      .enter()
      .append('path')
      .attr('class', 'states')
      .attr('d', path)
      .on('mouseover', createTooltip)
      .on('mouseout', () => (document.getElementById('tooltip').innerHTML = ''))
      .style('fill', createFill);
  });
}
