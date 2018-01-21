let populationData;

d3.csv("http://download1588.mediafire.com/007xq7uwnn2g/r78ri0qz65tvhkn/data-states.csv",    function(error, data) {
        if (error) throw error;
        console.log(data);
        populationData = data;


});


let usMap = document.querySelector('svg');
usMap.addEventListener('mouseover', (event) => {
    if (event.target.tagName === 'path') {
        let usState = event.target;
        usState.style.fill = 'blue';
        console.log(usState.id);

        usState.addEventListener('mouseout', (event) => {
            usState.style.fill = '';

        });
    }

});

document.querySelector('svg').style.width = '100';
