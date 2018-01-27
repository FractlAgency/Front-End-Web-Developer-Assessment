let populationData;

// array of elements representing all state shapes on the US map diagram
const stateShapeList = document.querySelectorAll('path');

// DC circle shape element
const DcEl = document.querySelector('#DC2');

// select dropdown menu
const selectEl = document.querySelector('select');

let tooltipName = document.querySelector('.js-tooltip-name');
let percentOfPopulation = document.querySelector('.js-pop-percent');
let medHouseIncome = document.querySelector('.js-med-house-income');
let percentOfIncome = document.querySelector('.js-percent-income');

// data filter form
const filterForm = document.querySelector('#data-filter');

let currentUsaState = stateShapeList[0];

// parse data from .csv file and assign it to a variable
d3.csv("https://raw.githubusercontent.com/FractlAgency/Front-End-Web-Developer-Assessment/master/data-states.csv", function(error, data) {
    if (error) throw error;
    console.log(data);
    populationData = data;
    setStateColors('Percent of Population');
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
    return data;
}

// calculate a state shapes fill-opacity value for a given statistic
const calculateOpacity = {
    percentOfPopulation: (stateAbbv, key) => {
        return (1 - Number(getStateInfo(stateAbbv, key).slice(0,2)) / 100).toString();
    },

    percentOfIncome: (stateAbbv, key) => {
        return (1 - Number(getStateInfo(stateAbbv, key).slice(0,1)) / 4).toString();
    }
};

// give each state shape element a fill color corresponding to the current data filter
const setStateColors = (statistic, color = 'rgb(25,170,217)') => {
    stateShapeList.forEach(state => {
        if(state.id !== 'frames') {
            // select colors to represent "% of Population" filter
            if (statistic === 'Percent of Population') {
                if (state.id === 'DC1') {
                    state = DcEl;
                    state.style.fillOpacity = calculateOpacity.percentOfPopulation('DC', statistic);
                }
                else state.style.fillOpacity = calculateOpacity.percentOfPopulation(state.id, statistic);
            }
            // select colors to represent "% of Income" filter
            else if (statistic === 'Percent of Income') {
                if (state.id === 'DC1') {
                    state = DcEl;
                    state.style.fillOpacity = calculateOpacity.percentOfIncome('DC', statistic);
                }
                // else state.style.fillOpacity = (1 - Number(getStateInfo(state.id, 'Percent of Population').slice(0,2)) / 100).toString();
                else state.style.fillOpacity = calculateOpacity.percentOfIncome(state.id, statistic);
            }
            state.style.fill = color;
        }
    });
}

// const test = () => {
//     let totalIncome = 0;
//     for (let i = 0; i < populationData.length; i++) {
//         totalIncome += Number(populationData[i]['Median Household Income'].split('').filter(char => char !== '$' && char !== ',').join(''));
//     }
//     console.log(totalIncome)
// }

// change color theme of map after selecting a differnt radio button filter
filterForm.addEventListener('change', (event) => {
    const radioBtn = event.target;
    let statistic;
    console.log(radioBtn);
    let color = radioBtn.dataset.color;
    switch (color) {
        case 'blue':
            statistic = 'Percent of Population'
            color = 'rgb(25,170,217)';
            break;
        case 'green':
            statistic = 'Percent of Income'
            color = 'rgb(25,192,135)';
            break;
        // case 'red':
        //     color = 'rgb(219,69,94)'
        //     break;
        default:
            console.log('Could not find correct data color');
    }
    setStateColors(statistic, color);

});


// highlights alaska state shape when page loads
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
