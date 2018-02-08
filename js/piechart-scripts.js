let genderData;
const filterContainer = document.querySelector('.filter');
const graphList = document.querySelectorAll('.graph');

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

    const ctx3 = document.getElementById('chart3').getContext('2d');
    let chart3 = new Chart(ctx3, {
        // The type of chart we want to create
        type: 'doughnut',

        // The data for our dataset
        data: {
            labels: ["Ready", "Somewhat Ready", "Not Ready"],
            datasets: [{
                label: "Gender Preparedness",
                backgroundColor: ['#FF6083', '#3BA5EC', '#FFCB52'],
                borderColor: '#fff',
                data: [getValue(0, 'Percent Value'),
                        getValue(1, 'Percent Value'),
                        getValue(2, 'Percent Value')]
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

    const ctx4 = document.getElementById('chart4').getContext('2d');
    let chart4 = new Chart(ctx4, {
        // The type of chart we want to create
        type: 'doughnut',

        // The data for our dataset
        data: {
            labels: ["Ready", "Somewhat Ready", "Not Ready"],
            datasets: [{
                label: "Gender Preparedness",
                backgroundColor: ['#FF6083', '#3BA5EC', '#FFCB52'],
                borderColor: '#fff',
                data: [getValue(3, 'Percent Value'),
                        getValue(4, 'Percent Value'),
                        getValue(5, 'Percent Value')]
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
    return genderData[objNum][key];

}


filterContainer.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        const gender = e.target.dataset.gender;
        for (let i = 0; i < graphList.length; i++) {
            if (graphList[i].dataset.gender === gender) {
                graphList[i].style.display = 'block';
            }
            else {
                graphList[i].style.display = 'none';
            }
        }

    }

});
