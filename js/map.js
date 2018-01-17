(function() {
    function tooltipHtml(n, d) { /* function to create html content string in tooltip div. */
        return "<h4>" + n + "</h4><table>" +
            "<tr><td>Median Household Income</td><td>" + (d.medianHouseholdIncome) + "</td></tr>" +
            "<tr><td>Percent of Population</td><td>" + (d.percentOfPopulation) + "</td></tr>" +
            "<tr><td>Percent of Income</td><td>" + (d.percentOfIncome) + "</td></tr>" +
            "</table>";
    }

    var sampleData = {}; /* Sample random data. */

    d3.csv("data-states.csv", function(data) {
        console.log(data);
        data.forEach(function(d) {
            var percentOfPopulation = parseInt(d["Percent of Population"]);
            sampleData[d["State Abbv"]] = {

                stateAbbv: d["State Abbv"],
                state: d["State"],
                medianHouseholdIncome: d["Median Household Income"],
                percentOfPopulation: d["Percent of Population"],
                percentOfIncome: d["Percent of Income"],
                color: d3.interpolate("black", "#99ffcc")(percentOfPopulation / 100)
            };
        });

        /* draw states on id #statesvg */
        uStates.draw("#statesvg", sampleData, tooltipHtml);

        d3.select(self.frameElement).style("height", "600px");
    });
})();