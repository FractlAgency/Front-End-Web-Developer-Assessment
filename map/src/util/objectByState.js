/**
 * Converts the data array to an object with the
 * state abbreviation as the property for each state
 * @param {Array} arr
 * @return {Object} result 
*/
const objectByStateAbbr = arr => {
  let result = {};
  for (let item of arr) {
    result[item["State Abbv"]] = item;
  }
  return result;
}

export default objectByStateAbbr;