let genderData;
d3.csv("https://raw.githubusercontent.com/brandnk/Front-End-Web-Developer-Assessment/master/data-gender-age.csv", function(error, data) {
    if (error) throw error;
    console.log(data);
    genderData = data;


    const ctx1 = document.getElementById('chart1').getContext('2d');
    let chart1 = new Chart(ctx1, {
        // The type of chart we want to create
        type: 'doughnut',

        // The data for our dataset
        data: {
            labels: ["Ready", "Somewhat Ready", "Not Ready"],
            datasets: [{
                label: "Gender Preparedness",
                backgroundColor: ['#FF6083', '#3BA5EC', '#FFCB52'],
                borderColor: '#fff',
                data: [getValue(6, 'Percent Value'),
                        getValue(7, 'Percent Value'),
                        getValue(8, 'Percent Value')]
            }]
        },
        // Configuration options go here
        options: {
            legend: {
                labels: {
                    fontColor: "#fff"
                }
            }
        }
    });



    const ctx2 = document.getElementById('chart2').getContext('2d');
    let chart2 = new Chart(ctx2, {
        // The type of chart we want to create
        type: 'doughnut',

        // The data for our dataset
        data: {
            labels: ["Ready", "Somewhat Ready", "Not Ready"],
            datasets: [{
                label: "Gender Preparedness",
                backgroundColor: ['#FF6083', '#3BA5EC', '#FFCB52'],
                borderColor: '#fff',
                data: [getValue(9, 'Percent Value'),
                        getValue(10, 'Percent Value'),
                        getValue(11, 'Percent Value')]
            }]
        },
        // Configuration options go here
        options: {
            legend: {
                labels: {
                    fontColor: "#fff"
                }
            }
        }
    });
});


const getValue = (objNum, key) => {
    return genderData[objNum][key] * 100;

}
