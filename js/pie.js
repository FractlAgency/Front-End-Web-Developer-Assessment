   (function() {

       var menFlag = false,
           womenFlag = false;
       var svg1 = d3.select("#ageGroup1"),
           width = +svg1.attr("width"),
           height = +svg1.attr("height"),
           radius = Math.min(width, height) / 2,
           g1 = svg1.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
       var svg2 = d3.select("#ageGroup2"),
           g2 = svg2.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");


       var color = d3.scaleOrdinal(["#cd3700", "#4af79c", "#0399D3"]);

       var pie = d3.pie()
           .sort(null)
           .value(function(d) {
               return d["Percent Value"];
           });

       var path = d3.arc()
           .outerRadius(radius - 10)
           .innerRadius(0);

       var label = d3.arc()
           .outerRadius(radius - 40)
           .innerRadius(radius - 40);
       var groupByGender,
           groupByAgeWomen,
           groupByAgeMen;


       d3.csv("data-gender-age.csv", function(d) {
           return d;
       }, function(error, data) {
           if (error) throw error;

           groupByGender = _.groupBy(data, "Gender");
           groupByAgeWomen = _.groupBy(groupByGender.women, "Age");
           groupByAgeMen = _.groupBy(groupByGender.men, "Age");

           drawPieChart(g1, groupByAgeWomen["19 to 27"]);
           drawPieChart(g2, groupByAgeWomen["28 to 36"]);
           womenFlag = true;


       });
       var chartOneload = document.getElementById("chartOne");
       chartOneload.addEventListener("click", function() {

           if (!menFlag && womenFlag) {
               g1.selectAll(".arc").remove();
               g2.selectAll(".arc").remove();
               drawPieChart(g1, groupByAgeMen["19 to 27"]);
               drawPieChart(g2, groupByAgeMen["28 to 36"]);
               menFlag = !menFlag;
               womenFlag = !womenFlag;
           }
       });
       var chartTwoload = document.getElementById("chartTwo");
       chartTwoload.addEventListener("click", function() {
           if (menFlag && !womenFlag) {
               g1.selectAll(".arc").remove();
               g2.selectAll(".arc").remove();

               drawPieChart(g1, groupByAgeWomen["19 to 27"]);
               drawPieChart(g2, groupByAgeWomen["28 to 36"]);
               menFlag = !menFlag;
               womenFlag = !womenFlag;

           }
       });


       function drawPieChart(g, groupByAgeWomen) {

           var arc = g.selectAll(".arc")
               .data(pie(groupByAgeWomen))
               .enter().append("g")
               .attr("class", "arc");

           arc.append("path")
               .attr("d", path)
               .attr("fill", function(d) {
                   return color(d.data.Preparedness);
               });

           arc.append("text")
               .attr("transform", function(d) {
                   return "translate(" + label.centroid(d) + ")";
               })
               .attr("dy", "0.35em")
               .text(function(d) {
                   return d.data.Preparedness;
               });

       }

   })();