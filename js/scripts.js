let populationData;

d3.csv("https://raw.githubusercontent.com/FractlAgency/Front-End-Web-Developer-Assessment/master/data-states.csv",    function(error, data) {
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
