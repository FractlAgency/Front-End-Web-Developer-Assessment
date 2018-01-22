// $(function () {
//   $('[data-toggle="tooltip"]').tooltip();
// })


let populationData;
let dataIsReady = false;

// return array of all states in svg element
const stateList = document.querySelectorAll('path');


d3.csv("https://raw.githubusercontent.com/FractlAgency/Front-End-Web-Developer-Assessment/master/data-states.csv", function(error, data) {
    if (error) throw error;
    console.log(data);
    populationData = data;
    setColors();
});


const usMap = document.querySelector('svg');
usMap.addEventListener('mouseover', (event) => {
    if (event.target.tagName === 'path') {
        let usState = event.target;
        usState.style.fill = 'blue';
        usState.addEventListener('mouseout', (event) => {
        usState.style.fill = '';
        });
    }
});

// return a decimal number representing a state's population percent
const getPopulationPercent = function(stateAbbv) {
    for (const i in populationData) {
        if(populationData[i]['State Abbv'] === stateAbbv) {
            const percentage = parseInt(populationData[i]['Percent of Population'].slice(0,2)) / 100;
            return percentage.toString();
        }
    }
}



// loop through each state image giving each a background color corresponding to their % of population data
var setColors = function() {
    stateList.forEach(function(state) {
        if(state.id !== 'frames') {
            state.style.fill = 'rgb(25,170,217)';
            state.style.fillOpacity = getPopulationPercent(state.id);
        }
        // else if (state.id === ) {
        //
        // }
    });
}







// for(let i = 0; i < stateList.length; i++) {
//     if (stateList[i].id !== 'frames') {
//         stateList[i].style.fillOpacity = getPopulationPercent(stateList[i].id);
//     }
// }

// stateList.forEach((state) => {
// 	if(state.id !== 'frames') {
//         state.style.fillOpacity = getPopulationPercent(state.id);
// 	}
//
// });
