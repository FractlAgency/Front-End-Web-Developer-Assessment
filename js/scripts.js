// $(function () {
//   $('[data-toggle="tooltip"]').tooltip();
// })


let populationData;
d3.csv("https://raw.githubusercontent.com/FractlAgency/Front-End-Web-Developer-Assessment/master/data-states.csv", function(error, data) {
    if (error) throw error;
    console.log(data);
    populationData = data;
});


// const usMap = document.querySelector('svg');
// usMap.addEventListener('mouseover', (event) => {
//     if (event.target.tagName === 'path') {
//         let usState = event.target;
//         usState.style.fill = 'blue';
//         console.log(usState.id);
//
//         usState.addEventListener('mouseout', (event) => {
//             usState.style.fill = '';
//
//         });
//     }
//
// });

// return a decimal number representing a state's population percent
const getPopulationPercent = (stateAbbv) => {
    for (let i in populationData) {
        if(populationData[i]['State Abbv'] === stateAbbv) {
            return Number(populationData[i]['Percent of Population'].slice(0,2)) / 100;
        }
    }
}

// return array of all states in svg element
const stateList = document.querySelectorAll('path');

// loop through each state image giving each a background color corresponding to their % of population data
stateList.forEach((state) => {
	if(state.id !== 'frames') {
		state.style.fill = 'rgb(42,130,206)';
        state.style.fillOpacity = getPopulationPercent(state.id);
        console.log('changed the opacity');
	}

});

// stateList.forEach((state) => {
// 	if(state.id !== 'frames') {
//         state.style.fillOpacity = getPopulationPercent(state.id);
// 	}
//
// });
