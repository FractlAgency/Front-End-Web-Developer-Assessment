
//Method 1 from csv//
//not getting dimension //

// google.charts.load('current', {
//     callback: function () {
//       $.get("data/data-states.csv", function(csvString) {
//         var csvData = $.csv.toArrays(csvString, {onParseValue: $.csv.hooks.castToScalar}); 
  
//         var data = new google.visualization.arrayToDataTable(csvData);
  
//         var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));
        
//         var options = {
//             region: 'US',
//             resolution:'provinces',
//             dimensions: 'Percent of Population',
//             colors: ['e8b9ab','#e95122'],
//             tooltip: {
//             isHtml: true},
//             }

//             var view = new google.visualization.DataView(data);
//             view.setColumns([0, {
//             type: 'string',
//             label: 'Total Staff',
//             calc: function (dt, row) {
//                 return {
//                     v: dt.getValue(row, 1),
//                     f: 'State:' + dt.getFormattedValue(row, 1) + ' Percent of Population: ' + dt.getFormattedValue(row, 2) + ' Median Household Income: ' + dt.getFormattedValue(row, 3) + ' Percent of Income: ' + dt.getFormattedValue(row, 4)
//                 }
//             }
//             }]);    
            
//         chart.draw(view, options);   
//       });
//     },
//     packages: ['geochart']
//   });


//Method 2 ajax //
// error when using ajax 
// just save till issue is resolved

function drawStatesMap() {
        // var options = {region: 'US', resolution: 'provinces'};
        var options = {
            region: 'US',
            resolution:'provinces',
            tooltip: {
                isHtml: true},
            };      
         
       
        var dimension = "Percent of Population";
        $.ajax({
          url: "data/state.json",
          dataType: "JSON"
        }).done(function(data) {
                var statesArray = [["State", "Median Household Income" +"Percent of Income"]];

                $.each(data.states, function() {
                    var stateitem = [this.State, this[dimension]];
                    statesArray.push(stateitem);
                });

          var statesData = google.visualization.arrayToDataTable(statesArray);
          var chart = new google.visualization.GeoChart(document.getElementById('regions_div1'));
          chart.draw(statesData, options);
          $("h3").append(" Sorted by  "+options);
        });
}
google.load('visualization', '1', {'packages': ['geochart']});
google.setOnLoadCallback(drawStatesMap);



//Us Map

      google.charts.load('current', {
        'packages':['geochart'],
        // Note: you will need to get a mapsApiKey for your project.
        // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
        'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
      });
      google.charts.setOnLoadCallback(drawRegionsMap);

      function drawRegionsMap() {
        var data = google.visualization.arrayToDataTable([
          ['State', 'Percent of Population', {role: 'tooltip', p: {html: 'true'}}],

          ['Alaska',46,'Median Household Income:$75723<br>Percent of Income:2%'],
          ['Alabama',47,'Median Household Income:$47221<br>Percent of Income:3%'],
          ['Arkansas',44,'Median Household Income $45907<br>Percent of Income:3%'],
          ['Arizona',44,'Median Household Income:$57100<br>Percent of Income:2%'],
          ['California',46,'Median Household Income:$66637<br>Percent of Income:2%'],
          ['Colorado',52,'Median Household Income:$70566<br>Percent of Income:2%'],
          ['Connecticut',54,'Median Household Income:$75923<br>Percent of Income:2%'],
          ['Distric of Columbia',51,'Median Household Income:$70982<br>Percent of Income:2%'],
          ['Delaware',47,'Median Household Income:$58046<br>Percent of Income:3%'],
          ['Florida',42,'Median Household Income:$51176<br>Percent of Income:3%'],
          ['Georgia',49,'Median Household Income:$53527<br>Percent of Income:3%'],
          ['Hawaii',55,'Median Household Income:$53527<br>Percent of Income:1%'],
          ['Iowa',54,'Median Household Income:$53527<br>Percent of Income:2%'],
          ['Idaho',48,'Median Household Income:$56564<br>Percent of Income:2%'],
          ['Illinois',51,'Median Household Income:$56564<br>Percent of Income:2%'],
          ['Indiana', 52,'Median Household Income:$56094<br>Percent of Income:2%'],
          ['Kansas',53,'Median Household Income:$56810<br>Percent of Income:2%'],
          ['Kentucky',44,'Median Household Income:$45369<br>Percent of Income:3%'],
          ['Lousiana',42,'Median Household Income:$42196<br>Percent of Income:3%'],
          ['Massachussetts',54,'Median Household Income:$72266<br>Percent of Income:2%'],
          ['Maryland',54,'Median Household Income:$73760<br>Percent of Income:2%'],
          ['Maine',49,'Median Household Income:$50856<br>Percent of Income:3%'],
          ['Michigan',51,'Median Household Income:$57091<br>Percent of Income:2%'],
          ['Minnesota',55,'Median Household Income:$70218<br>Percent of Income:2%'],
          ['Missouri',51,'Median Household Income:$70218<br>Percent of Income:2%'],
          ['Mississippi',42,'Median Household Income:$41099<br>Percent of Income:2%'],
          ['Montana',43,'Median Household Income:$57075<br>Percent of Income:2%'],
          ['North Carolina',45,'Median Household Income:$53764<br>Percent of Income:2%'],
          ['North Dakota',55,'Median Household Income:$60184<br>Percent of Income:2%'],
          ['Nebraska',55,'Median Household Income:$59374<br>Percent of Income:2%'],
          ['New Hampshire',58,'Median Household Income:$76260<br>Percent of Income:2%'],
          ['New Jersey',55,'Median Household Income:$68468<br>Percent of Income:3%'],
          ['New Mexico',36,'Median Household Income:$48451<br>Percent of Income:3%'],
          ['Nevada',50,'Median Household Income:$55431<br>Percent of Income:2%'],
          ['New York',50,'Median Household Income:$61437<br>Percent of Income:2%'],
          ['Ohio',51,'Median Household Income:$53985<br>Percent of Income:2%'],
          ['Oklahoma',48,'Median Household Income:$50943<br>Percent of Income:2%'],
          ['Oregon',46,'Median Household Income:$59135<br>Percent of Income:2%'],
          ['Pennsylvania',53,'Median Household Income:$60979<br>Percent of Income:2%'],
          ['Rhode Island',51,'Median Household Income:$61528<br>Percent of Income:3%'],
          ['South Carolina',46,'Median Household Income:$54336<br>Percent of Income:3%'],
          ['South Dakota',49,'Median Household Income:$57450<br>Percent of Income:2%'],
          ['Tennessee',46,'Median Household Income:$51344<br>Percent of Income:2%'],
          ['Texas',49,'Median Household Income:$58146<br>Percent of Income:2%'],
          ['Utah',60,'Median Household Income:$67481<br>Percent of Income:2%'],
          ['Virginia',55,'Median Household Income:$66451<br>Percent of Income:2%'],
          ['Vermont',47,'Median Household Income:$60837<br>Percent of Income:2%'],
          ['Washington',49,'Median Household Income:$60837<br>Percent of Income:1%'],
          ['Wisconsin',56,'Median Household Income:$59817<br>Percent of Income:2%'],
          ['West Virginia',43,'Median Household Income:$44354<br>Percent of Income:3%'],
          ['Wyoming',55,'Median Household Income:$57829<br>Percent of Income:3%'],


        ]);

        var options = {
            region: 'US',
            resolution:'provinces',
            tooltip: {
                isHtml: true},
        };

        var chart = new google.visualization.GeoChart(document.getElementById('regions_div2'));

        chart.draw(data, options);
      }


//Using Highcharts to create pies
// women 19-27 data 
Highcharts.chart('women_pieChart1', {
    chart: {
        type: 'pie',
        options3d: {
            enabled: true,
            alpha: 45
        }
    },
    title: {
      text: 'State of preparedness of women'
    },
    subtitle: {
        text: 'ages 19-27'
    },
    plotOptions: {
        pie: {
            innerSize: 10,
            depth: 45
        }
    },
    series: [{
        name: 'percent value',
        data: [
            ['Ready', 0.8],
            ['Somewhat Ready', 0.33],
            ['Not Ready', 0.59]
        ]
    }]
});

// women 28-36 data 
Highcharts.chart('women_pieChart2', {
    chart: {
        type: 'pie',
        options3d: {
            enabled: true,
            alpha: 45
        }
    },
    title: {
      text: 'State of preparedness of women'
    },
    subtitle: {
        text: 'ages 28-36'
    },
    plotOptions: {
        pie: {
            innerSize: 10,
            depth: 45
        }
    },
    series: [{
        name: 'percent value',
        data: [
            ['Ready', 0.18],
            ['Somewhat Ready', 0.53],
            ['Not Ready', 0.29]
        ]
    }]
});

// men 19-27 data 
Highcharts.chart('men_pieChart1', {
    chart: {
        type: 'pie',
        options3d: {
            enabled: true,
            alpha: 45
        }
    },
    title: {
      text: 'State of preparedness of men'
    },
    subtitle: {
        text: 'ages 19-27'
    },
    plotOptions: {
        pie: {
            innerSize: 10,
            depth: 45
        }
    },
    series: [{
        name: 'percent value',
        // men 19-27 data 
        data: [
            ['Ready', 0.04],
            ['Somewhat Ready', 0.33],
            ['Not Ready', 0.63]
        ]
    }]
});

// men 28-36 data 
Highcharts.chart('men_pieChart2', {
    chart: {
        type: 'pie',
        options3d: {
            enabled: true,
            alpha: 45
        }
    },
    title: {
      text: 'State of preparedness of women'
    },
    subtitle: {
        text: 'ages 28-36'
    },
    plotOptions: {
        pie: {
            innerSize: 10,
            depth: 45
        }
    },
    series: [{
        name: 'percent value',
        // men 28-36 data 
        data: [
            ['Ready', 0.12],
            ['Somewhat Ready', 0.36],
            ['Not Ready', 0.52]
        ]
    }]
});


// women 19-27 data 
Highcharts.chart('women_pieChart1', {
    chart: {
        type: 'pie',
        options3d: {
            enabled: true,
            alpha: 45
        }
    },
    title: {
      text: 'State of preparedness of women'
    },
    subtitle: {
        text: 'ages 19-27'
    },
    plotOptions: {
        pie: {
            innerSize: 10,
            depth: 45
        }
    },
    series: [{
        name: 'percent value',
        data: [
            ['Ready', 0.8],
            ['Somewhat Ready', 0.33],
            ['Not Ready', 0.59]
        ]
    }]
});

// women 28-36 data 

Highcharts.chart('women_pieChart2', {
    chart: {
        type: 'pie',
        options3d: {
            enabled: true,
            alpha: 45
        }
    },
    title: {
      text: 'State of preparedness of women'
    },
    subtitle: {
        text: 'ages 28-36'
    },
    plotOptions: {
        pie: {
            innerSize: 10,
            depth: 45
        }
    },
    series: [{
        name: 'percent value',
        data: [
            ['Ready', 0.18],
            ['Somewhat Ready', 0.53],
            ['Not Ready', 0.29]
        ]
    }]
});

// men 19-27 data 
Highcharts.chart('men_pieChart1', {
    chart: {
        type: 'pie',
        options3d: {
            enabled: true,
            alpha: 45
        }
    },
    title: {
      text: 'State of preparedness of men'
    },
    subtitle: {
        text: 'ages 19-27'
    },
    plotOptions: {
        pie: {
            innerSize: 10,
            depth: 45
        }
    },
    series: [{
        name: 'percent value',
        // men 19-27 data 
        data: [
            ['Ready', 0.04],
            ['Somewhat Ready', 0.33],
            ['Not Ready', 0.63]
        ]
    }]
});

// men 28-36 data 
Highcharts.chart('men_pieChart2', {
    chart: {
        type: 'pie',
        options3d: {
            enabled: true,
            alpha: 45
        }
    },
    title: {
      text: 'State of preparedness of women'
    },
    subtitle: {
        text: 'ages 28-36'
    },
    plotOptions: {
        pie: {
            innerSize: 10,
            depth: 45
        }
    },
    series: [{
        name: 'percent value',
        // men 28-36 data 
        data: [
            ['Ready', 0.12],
            ['Somewhat Ready', 0.36],
            ['Not Ready', 0.52]
        ]
    }]
});
