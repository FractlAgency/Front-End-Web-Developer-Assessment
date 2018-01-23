import React, { Component } from 'react';
import Tooltip from 'components/Tooltip';

import './assets/App.css';
import dataStates from './util/data-states';
import USAMap from "components/UsaMap";
import objectByState from "util/objectByState";

class App extends Component {
  state = {
    showHover: {
      active: false
    },
    color: ''
  }

  setColor(type) {
    this.setState({ color: type });
  }

  handleClick = (event) => {
    // alert(event.target.dataset.name);
  };

  handleHover = (state) => {
    const allStates = objectByState(dataStates);
    this.setState({
      showHover: {
        active: true,
        [state]: true,
        data: allStates[state]
      }
    });

  }

  renderOnHover = (data) => {
    const upperCaseFirstLetter = data["State"].charAt(0).toUpperCase() + data["State"].slice(1);

    return (
      <div className="state-details">
        <h5>State: {upperCaseFirstLetter}</h5>
        <h5>Median Household Income: {data["Median Household Income"]}</h5>
        <h5>Percent of Income: {data["Percent of Income"]}</h5>
        <h5>Percent of Population: {data["Percent of Population"]}</h5>
      </div>
    )
  }

  renderNonSelected() {
    return (
      <div className="state-details">
        <h5>State:</h5>
        <h5>Median Household Income:</h5>
        <h5>Percent of Income:</h5>
        <h5>Percent of Population:</h5>
      </div>
    )
  }

  render() {
    return (
      <div className="root-container App">
        <header className="App-header">
          <Tooltip />
          <div>
            <button className="btn" onClick={this.setColor.bind(this, 'multiColor')}>Multi Color</button>
            <button className="btn" onClick={this.setColor.bind(this, 'gradient')}>Gradient</button>
          </div>
          {this.state.showHover.active ? this.renderOnHover(this.state.showHover.data) : this.renderNonSelected()}
        </header>

        <div className="map-container">
          <USAMap colorType={this.state.color} handleHover={this.handleHover} onClick={this.handleClick} />
        </div>
      </div>
    );
  }
}

export default App;

