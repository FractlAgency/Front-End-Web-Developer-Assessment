/**
 * Calculate the minimum and maximum`Percent of Population`
 * from the provided array
 * @param {Array} arr
 * @return {Object} 
*/

const calculateMinMax = arr => {
  let populations = [];
  for (let obj of arr) {
    const statePopulation = parseInt(obj["Percent of Population"].slice(0, 2), 10);
    populations.push(statePopulation);
  }
  return {
    min: Math.min(...populations),
    max: Math.max(...populations)
  }
}

export default calculateMinMax;