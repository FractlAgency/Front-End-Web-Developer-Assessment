const genderAgeData = {
  menAge1: {
    ready: 0.04,
    somewhat: 0.33,
    not: 0.63
  },
  menAge2: {
    ready: 0.12,
    somewhat: 0.36,
    not: 0.52
  },
  womenAge1: {
    ready: 0.08,
    somewhat: 0.33,
    not: 0.59
  },
  womenAge2: {
    ready: 0.18,
    somewhat: 0.53,
    not: 0.29
  }
};

function drawCharts() {
  for (let category in genderAgeData) {
    const percent = genderAgeData[category];

    google.charts.load('current', { packages: ['corechart'] });
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
      // Define the chart to be drawn.
      const data = new google.visualization.DataTable();
      data.addColumn('string', 'Preparedness');
      data.addColumn('number', 'Percentage');
      data.addRows([
        ['Ready', percent.ready],
        ['Somewhat ready', percent.somewhat],
        ['Not ready', percent.not]
      ]);

      const options = {
        backgroundColor: '#f8f9fa',
        colors: ['#7FB3D5', '#2980B9', '#1A5276'],
        fontName: 'Helvetica',
        fontSize: 14,
        is3D: true,
        chartArea: { left: 10, top: 0, width: '95%', height: '100%' }
      };

      // Instantiate and draw the chart.
      const container = document.getElementById(category);
      container.style.display = 'block';
      const chart = new google.visualization.PieChart(container);

      // Hide charts for men on page load
      if (category === 'menAge1' || category === 'menAge2') {
        google.visualization.events.addListener(chart, 'ready', () => {
          container.style.display = 'none';
        });
      }
      chart.draw(data, options);
    }
  }
}
