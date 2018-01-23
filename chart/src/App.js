import React from 'react';
import { VictoryPie, VictoryLegend } from 'victory';
import './assets/App.css';
import { group1, group2 } from 'util/groups';

class Example extends React.Component {
  state = {
    active: 'Women'
  }

  setActive(type) {
    this.setState({ active: type });
  }

  filterByGender(group, gender) {
    return group.filter(item => item.Gender === gender.toLowerCase());
  }


  render() {
    const legendData = [
      { name: "Ready" }, { name: "Somewhat Ready" }, { name: "Not Ready" }
    ];

    return (

      <div className="App">
        <div>
          <button className="btn btn-green" onClick={this.setActive.bind(this, 'Women')}>Women</button>
          <button className="btn btn-gold" onClick={this.setActive.bind(this, 'Men')}>Men</button>
        </div>

        <div className="pie-container">
          <svg width={500} height={500} style={{ border: "1px solid #ccc" }}>
            <VictoryLegend standalone={false}
              colorScale={['#0088FE', '#00C49F', '#fea']}
              x={20} y={370}
              gutter={40}
              title="Age 19 to 27"
              centerTitle
              style={{ border: { stroke: "black" } }}
              data={legendData}
            />
            <VictoryPie standalone={false}
              animate={{
                duration: 800
              }}
              data={this.filterByGender(group1, this.state.active)}
              width={380} height={380}
              padding={{
                left: 120, bottom: 20, top: 20
              }}
              colorScale={['#0088FE', '#00C49F', '#fea']}
              labels={(d) => Math.ceil(d.y * 100) + '%'}
            />
          </svg>

          <svg width={500} height={500} style={{ border: "1px solid #ccc" }}>
            <VictoryLegend standalone={false}
              colorScale={['#0088FE', '#00C49F', '#fea']}
              x={300} y={370}
              gutter={40}
              title="Age 28 to 36"
              centerTitle
              style={{ border: { stroke: "black" } }}
              data={legendData}
            />
            <VictoryPie standalone={false}
              animate={{
                duration: 800
              }}
              data={this.filterByGender(group2, this.state.active)}
              width={380} height={380}
              padding={{
                left: 120, bottom: 20, top: 20
              }}
              colorScale={['#0088FE', '#00C49F', '#fea']}
              labels={(d) => Math.ceil(d.y * 100) + '%'}
            />
          </svg>
        </div>
      </div>
    );
  }
}

export default Example;