import React from 'react';
import PropTypes from 'prop-types';

import { gradient, multiColor } from 'util/colors';
import SingleState from './SingleState';
import data from "util/data-states-dimensions";
import dataStates from "util/data-states";
import objectByState from "util/objectByState";
import calculateMinMax from "util/calculateMinMax";

class UsaMap extends React.Component {

  clickHandler = (stateAbbreviation) => {
    this.props.onClick(stateAbbreviation);
  };

  fillStateColor = (state) => {
    if (this.props.customize && this.props.customize[state] && this.props.customize[state].fill) {
      return this.props.customize[state].fill;
    }

    return this.props.defaultFill;
  };

  stateClickHandler = (state) => {
    if (this.props.customize && this.props.customize[state] && this.props.customize[state].clickHandler) {
      return this.props.customize[state].clickHandler;
    }
    return this.clickHandler;
  }


  buildPaths = () => {
    const { handleHover, colorType } = this.props;
    let paths = [];
    const allStates = objectByState(dataStates);
    const { min } = calculateMinMax(dataStates); // percent of populations lower and upper bounds
    // let counter = 0;

    for (let stateKey in data) {
      const percentOfPopulation = parseInt(allStates[stateKey]["Percent of Population"].slice(0, 2), 10);
      // console.log(percentOfPopulation);
      const useColor = colorType === 'gradient' ? gradient : multiColor;
      const path = <SingleState handleHover={handleHover} population={allStates[stateKey]["Percent of Population"]} key={stateKey} dimensions={data[stateKey]["dimensions"]} state={stateKey} fill={useColor[percentOfPopulation - min]} onClickState={this.stateClickHandler(stateKey)} />
      // const path = <SingleState handleHover={handleHover} population={allStates[stateKey]["Percent of Population"]} key={stateKey} dimensions={data[stateKey]["dimensions"]} state={stateKey} fill={COLORS[counter]} onClickState={this.stateClickHandler(stateKey)} />
      paths.push(path);
      // counter++;
    };
    return paths;
  };

  render() {
    return (
      <svg className="us-state-map" xmlns="http://www.w3.org/2000/svg" width={this.props.width} height={this.props.height} viewBox="0 0 959 593">
        <title>{this.props.title}</title>
        <g className="outlines">
          {this.buildPaths()}
        </g>
      </svg>
    );
  }
}


UsaMap.propTypes = {
  onClick: PropTypes.func.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  title: PropTypes.string,
  defaultFill: PropTypes.string,
  customize: PropTypes.object
};

UsaMap.defaultProps = {
  onClick: () => { },
  width: window.innerWidth - 325,
  height: window.innerHeight - 325,
  defaultFill: "#D3D3D3",
  title: "US states map",
  customize: {}
};

export default UsaMap;