let populationData;
let dataIsReady = false;

// return array of all states in svg element
const stateList = document.querySelectorAll('path');

const usaMap = document.querySelector('svg');


d3.csv("https://raw.githubusercontent.com/FractlAgency/Front-End-Web-Developer-Assessment/master/data-states.csv", function(error, data) {
    if (error) throw error;
    console.log(data);
    populationData = data;
    setColors();
});


const getStateInfo = function(stateAbbv) {
    for (let i = 0; i < populationData.length; i++) {
        if (populationData[i]['State Abbv'] === stateAbbv) {
            return populationData[i];
        }
    }
}

// usaMap.addEventListener('mouseover', function(event) {
//     if (event.target.tagName === 'path') {
//         let usState = event.target;
//         usState.style.fill = 'blue';
//         usState.addEventListener('mouseout', function(event) {
//         usState.style.fill = '';
//         });
//     }
// });

let currentUsaState = stateList[0];
const selectEl = document.querySelector('select');

document.querySelector('#AK').style.stroke = '#d3d3d3';
document.querySelector('#AK').style.strokeWidth = '3';


// listen for change in value in select element
selectEl.addEventListener('change', function() {
    // loop through elements to find state with id matching abbv chosen in select menu and highlight its border color
    for (let i = 0; i < stateList.length; i++) {
        const dcEl = document.querySelector('#DC2');
        if (stateList[i].id === selectEl.value) {
            // if (currentUsaState) {
            //     currentUsaState.style.stroke = '';
            //     currentUsaState.style.strokeWidth = '0';
            //     console.log('test')
            //     dcEl.style.stroke = '';
            //     dcEl.style.strokeWidth = '0';
            // }
            currentUsaState.style.stroke = 'transparent';
            currentUsaState.style.strokeWidth = '0';
            dcEl.style.stroke = '';
            dcEl.style.strokeWidth = '0';

            currentUsaState = stateList[i];
            currentUsaState.style.stroke = '#d3d3d3';
            currentUsaState.style.strokeWidth = '3';
            updateTooltip(stateList[i].id)

        }
        else if (selectEl.value === 'DC') {
            currentUsaState.style.stroke = '';
            currentUsaState.style.strokeWidth = '';
            currentUsaState = dcEl;
            dcEl.style.stroke = '#fff';
            dcEl.style.strokeWidth = '3';
            updateTooltip(stateList[i].id.slice(0,2));
        }
    }
});


// return a decimal number representing a state's population percent
const getPopPercent = function(stateAbbv) {
    for (const i in populationData) {
        if(populationData[i]['State Abbv'] === stateAbbv) {
            const percentage = parseInt(populationData[i]['Percent of Population'].slice(0,2)) / 100;
            return (1 - percentage).toString();
        }
    }
}



// loop through each state image giving each a background color corresponding to their % of population data
const setColors = function() {
    stateList.forEach(function(state) {
        if(state.id !== 'frames') {
            state.style.fill = 'rgb(25,170,217)';
            state.style.fillOpacity = getPopPercent(state.id);
            if (state.id === 'DC1') {
                const dcEl = state.nextElementSibling;
                dcEl.style.fill = 'rgb(25,170,217)';
                dcEl.style.fillOpacity = getPopPercent(state.id);
                document.querySelector('#DC2').style.strokeWidth = '0';
            }
        }
        // else if (state.id === ) {
        //
        // }
    });
}

let tooltipName = document.querySelector('.js-tooltip-name');
let percentOfPopulation = document.querySelector('.js-pop-percent');
let medHouseIncome = document.querySelector('.js-med-house-income');
let percentOfIncome = document.querySelector('.js-percent-income');

const updateTooltip = function(stateAbbv) {
    tooltipName.textContent = getStateInfo(stateAbbv)['State Abbv'];
    percentOfPopulation.textContent = getStateInfo(stateAbbv)['Percent of Population'];
    medHouseIncome.textContent = getStateInfo(stateAbbv)['Median Household Income'];
    percentOfIncome.textContent = getStateInfo(stateAbbv)['Percent of Income'];
}






// for(let i = 0; i < stateList.length; i++) {
//     if (stateList[i].id !== 'frames') {
//         stateList[i].style.fillOpacity = getPopPercent(stateList[i].id);
//     }
// }

// stateList.forEach((state) => {
// 	if(state.id !== 'frames') {
//         state.style.fillOpacity = getPopPercent(state.id);
// 	}
//
// });
