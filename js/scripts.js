// variable the .csv data will be stored in
let populationData;

// array of elements representing all state shapes on the US map diagram
const stateList = document.querySelectorAll('path');

// DC circle shape element
const dcEl = document.querySelector('#DC2');

// select dropdown menu
const selectEl = document.querySelector('select');

const stateMap = document.querySelector('.svg-container');

// variable for keeping track of the currently highlighted state
let currentState = '';

// elements for tooltip values (mobile and desktop)
const tooltipAbbv = document.querySelectorAll('.js-tooltip-abbv');
const tooltipName = document.querySelectorAll('.js-tooltip-name')
const percentOfPopulation = document.querySelectorAll('.js-pop-percent');
const medHouseIncome = document.querySelectorAll('.js-med-house-income');

// tooltip element for desktop devices
const tooltip = document.querySelector('.infotip--desktop');

// data filter form
const filterForm = document.querySelector('#data-filter');

// text representing current filter for "Top 5 States" section
let cardSubtitle = document.querySelector('.js-card-subtitle');

// names for the Top 5 states
const firstCardItem = document.querySelector('.js-card-item-first');
const secondCardItem = document.querySelector('.js-card-item-second');
const thirdCardItem = document.querySelector('.js-card-item-third');
const fourthCardItem = document.querySelector('.js-card-item-fourth');
const fifthCardItem = document.querySelector('.js-card-item-fifth');

// values for each of the Top 5 states
const firstCardValue = document.querySelector('.js-card-value-first');
const secondCardValue = document.querySelector('.js-card-value-second');
const thirdCardValue = document.querySelector('.js-card-value-third');
const fourthCardValue = document.querySelector('.js-card-value-fourth');
const fifthCardValue = document.querySelector('.js-card-value-fifth');

d3.csv("https://raw.githubusercontent.com/brandnk/Front-End-Web-Developer-Assessment/master/data-states-new.csv", function(error, data) {
    if (error) throw error;
    console.log(data);
    populationData = data;
    setStateColors('Percent of Population');
    highlightInitialState();
    setTop5('Percent of Population');
    setDesktopFunctionality();
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

// determines if input is a state shape element
const isStateEl = (element) => {
    if (element.tagName === 'path' && element.id !== 'frames') {
        return true;
    }
}

// calculate a state shapes fill-opacity value for a given statistic
const calculateOpacity = {
    percentOfPopulation: (stateAbbv, key) => {
        return (1 - Number(getStateInfo(stateAbbv, key).slice(0,-1)) / 15).toString();
    },
    medHouseIncome: (stateAbbv, key) => {
        const str = getStateInfo(stateAbbv, 'Median Household Income');
        const num = Number(str.split('').filter(char => char !== '$' && char !== ',').join(''));
        return 1 - (num / 86260); // NH has greatest value at $76,260
    }
};

// highlights the input state's border
const setBorderHighlight = (stateEl) => {
    if (stateEl.style.strokeWidth === '' || stateEl.style.strokeWidth === '0') {
        stateEl.style.stroke = '#d3d3d3';
        stateEl.style.strokeWidth = '3';
    } else {
        stateEl.style.stroke = 'transparent';
        stateEl.style.strokeWidth = '0';
    }
}

// highlights alaska state shape when page loads
const highlightInitialState = () => {
    if (window.innerWidth < 992) {
        currentState = document.querySelector('#AK');
        setBorderHighlight(currentState);
    }
}

// give each state shape element a fill color and opacity corresponding to the current data filter
const setStateColors = (statistic, color = 'rgb(25,152,217)') => {
    stateList.forEach(state => {
        if(state.id !== 'frames') {
            // select colors to represent "% of Population" filter
            if (statistic === 'Percent of Population') {
                if (state.id === 'DC1') {
                    state = dcEl;
                    state.style.fillOpacity = calculateOpacity.percentOfPopulation('DC', statistic);
                }
                else state.style.fillOpacity = calculateOpacity.percentOfPopulation(state.id, statistic);
            }
            // select colors to represent "% of Income" filter
            else if (statistic === 'Median Household Income') {
                if (state.id === 'DC1') {
                    state = dcEl;
                    state.style.fillOpacity = calculateOpacity.medHouseIncome('DC', statistic);
                }
                else state.style.fillOpacity = calculateOpacity.medHouseIncome(state.id, statistic);
            }
            state.style.fill = color;
        }
    });
}

// change color theme of map after selecting a different radio button filter
filterForm.addEventListener('change', (event) => {
    const radioBtn = event.target;
    cardSubtitle.textContent = radioBtn.nextElementSibling.textContent;
    let statistic;
    let color = radioBtn.dataset.color;
    switch (color) {
        case 'blue':
            statistic = 'Percent of Population'
            color = 'rgb(25,152,217)'; // original value: rgb(25,170,217)
            break;
        case 'green':
            statistic = 'Median Household Income'
            color = 'rgb(102,255,179)'; // original value: rgb(71,255,179)
            break;
        default:
            console.log('Could not find correct color');
    }
    setTop5(statistic);
    setStateColors(statistic, color);
});

const updateTooltip = function(stateAbbv, num) {
    tooltipAbbv[num].textContent = stateAbbv;
    tooltipName[num].textContent = getStateInfo(stateAbbv, 'State');
    percentOfPopulation[num].textContent = getStateInfo(stateAbbv, 'Percent of Population');
    medHouseIncome[num].textContent = getStateInfo(stateAbbv, 'Median Household Income');
}

// listen for when user selects an option in dropdown menu to highlight correct state and update tooltip
selectEl.addEventListener('change', function() {
    // loop through elements to find state with id matching abbv chosen in select menu and highlight its border
    for (let i = 0; i < stateList.length; i++) {
        if (stateList[i].id === selectEl.value || selectEl.value === 'DC') {
            // remove any present border highlighting from previously selected state
            setBorderHighlight(currentState);

            // enter details of newly selected state into tooltip
            updateTooltip(selectEl.value, 1);

            // assign state element chosen by user to currentState variable
            if (selectEl.value === 'DC') {
                currentState = dcEl;
            }
            // if user didn't select DC
            else currentState = stateList[i];

            // highlight the new state element's border
            setBorderHighlight(currentState);
        }
    }
});

const setTop5 = (statistic) => {
    const sortedArr = [];
    for (let i = 0; i < populationData.length; i++) {
        // add new array to sortedArr with statistic value and state name
        sortedArr.push([Number(populationData[i][statistic].split('').filter(char => char !== '$' && char !== ',' && char !== '%').join('')), populationData[i]['State']]);
    }
    // sort array in descending order relative to statistic value (greatest to least)
    sortedArr.sort((a,b) => {
        return b[0] - a[0];
    });
    // set the text of each of the Top 5 states
    firstCardItem.textContent = sortedArr[0][1];
    secondCardItem.textContent = sortedArr[1][1];
    thirdCardItem.textContent = sortedArr[2][1];
    fourthCardItem.textContent = sortedArr[3][1];
    fifthCardItem.textContent = sortedArr[4][1];
    if (statistic === 'Percent of Population') {
        // set value of each of the Top 5 states
        firstCardValue.textContent = `${sortedArr[0][0]}%`;
        secondCardValue.textContent = `${sortedArr[1][0]}%`;
        thirdCardValue.textContent = `${sortedArr[2][0]}%`;
        fourthCardValue.textContent = `${sortedArr[3][0]}%`;
        fifthCardValue.textContent = `${sortedArr[4][0]}%`;
    }
    // if statistic is for "Median Household Income"
    else {
        sortedArr.forEach((item, index, arr) => {
            // turn value to string and then add a comma
            arr[index][0] = arr[index][0].toString();
            arr[index][0] = arr[index][0].slice(0,2) + ',' + arr[index][0].slice(2);
        });
        firstCardValue.textContent = `$${sortedArr[0][0]}`;
        secondCardValue.textContent = `$${sortedArr[1][0]}`;
        thirdCardValue.textContent = `$${sortedArr[2][0]}`;
        fourthCardValue.textContent = `$${sortedArr[3][0]}`;
        fifthCardValue.textContent = `$${sortedArr[4][0]}`;
    }
}

const setPosition = (x, y) => {
    tooltip.style.left = `${x + 10}px`;
    tooltip.style.top = `${y + 10}px`;
}

const setDesktopFunctionality = () => {
    if (window.innerWidth >= 992) {
        stateList.forEach((item) => {
            if (isStateEl(item)) {
                if (item.id === 'DC1') item = dcEl;
                // highlight state border and let tooltip fade in when user puts cursor over mouse
                item.addEventListener('mouseenter', (e) => {
                    setBorderHighlight(item);
                    tooltip.style.opacity = '1';
                    if (item.id === 'DC2') {
                        updateTooltip('DC', 0);
                    } else updateTooltip(item.id, 0);
                    setPosition(e.clientX, e.clientY + window.scrollY);
                });
                // update tooltip's position as user moves mouse inside a state
                item.addEventListener('mousemove', (e) => {
                    setPosition(e.clientX, e.clientY + window.scrollY);
                });
                // let state border and tooltip to fade out when user takes cursor off state
                item.addEventListener('mouseleave', (e) => {
                    setBorderHighlight(item);
                    tooltip.style.opacity = '0';
                });
            }
        });
    }
}
