let populationData;

// array of elements representing all state shapes on the US map diagram
const stateShapeList = document.querySelectorAll('path');

// actual DC shape element
const DcEl = document.querySelector('#DC2');

// select dropdown menu
const selectEl = document.querySelector('select');

let tooltipName = document.querySelector('.js-tooltip-name');
let percentOfPopulation = document.querySelector('.js-pop-percent');
let medHouseIncome = document.querySelector('.js-med-house-income');
let percentOfIncome = document.querySelector('.js-percent-income');

let currentUsaState = stateShapeList[0];

// parse data from .csv file and assign it to a variable
d3.csv("https://raw.githubusercontent.com/FractlAgency/Front-End-Web-Developer-Assessment/master/data-states.csv", function(error, data) {
    if (error) throw error;
    console.log(data);
    populationData = data;
    setStateColors();
    highlightInitialState();
});

// returns a particular statistic for a given state
const getStateInfo = (stateAbbv, key) => {
    let data;
    for (let i = 0; i < populationData.length; i++) {
        if (populationData[i]['State Abbv'] === stateAbbv) {
            data = populationData[i][key];
        }
    }
    switch (key) {
        case 'Percent of Population':
            data = Number(data.slice(0,2)) / 100;
            break;
        case 'Median Household Income':
            data = data.split('').filter(char => char !== '$' && char !== ',').join('');
            break;
        case 'Percent of Income':
            data = data.slice(0,1)
            break;
        default:
            console.log('Could not find correct category case');
    }
    return data;
}

// give each state shape element a fill color corresponding to their "% of population" data
const setStateColors = () => {
    stateShapeList.forEach(state => {
        if(state.id !== 'frames') {
            if (state.id === 'DC1') {
                state = DcEl;
                state.style.stroke = 'transparent';
            }
            else state.style.fillOpacity = (1 - getStateInfo(state.id, 'Percent of Population')).toString();
            state.style.fill = 'rgb(25,170,217)';
        }
    });
}

// highlights alaska state for when page loads
const highlightInitialState = () => {
    document.querySelector('#AK').style.stroke = '#d3d3d3';
    document.querySelector('#AK').style.strokeWidth = '3';
}

const updateTooltip = function(stateAbbv) {
    tooltipName.textContent = getStateInfo(stateAbbv, 'State Abbv');
    percentOfPopulation.textContent = getStateInfo(stateAbbv, 'Percent of Population');
    medHouseIncome.textContent = getStateInfo(stateAbbv, 'Median Household Income');
    percentOfIncome.textContent = getStateInfo(stateAbbv, 'Percent of Income');
}

// listen for change in value in select element
selectEl.addEventListener('change', function() {
    // loop through elements to find state with id matching abbv chosen in select menu and highlight its border color
    for (let i = 0; i < stateShapeList.length; i++) {
        const dcEl = document.querySelector('#DC2');
        if (stateShapeList[i].id === selectEl.value) {
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

            currentUsaState = stateShapeList[i];
            currentUsaState.style.stroke = '#d3d3d3';
            currentUsaState.style.strokeWidth = '3';
            updateTooltip(stateShapeList[i].id)

        }
        else if (selectEl.value === 'DC') {
            currentUsaState.style.stroke = '';
            currentUsaState.style.strokeWidth = '';
            currentUsaState = dcEl;
            dcEl.style.stroke = '#fff';
            dcEl.style.strokeWidth = '3';
            updateTooltip(stateShapeList[i].id.slice(0,2));
        }
    }
});
