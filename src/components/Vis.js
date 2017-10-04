import React, { Component } from "react";
import { RadialChart } from "react-vis";

class Vis extends Component {
  render() {
    const myData = [
      {
        angle: 1
      },
      {
        angle: 2,
        label: "Super Custom label"
      },
      {
        angle: 10,
        label: "Alt Label"
      },
      {
        angle: 3
      },
      {
        angle: 5,
        subLabel: "Sub Label only"
      }
    ];
    let { data } = this.props;
    return (
      <div>
        <RadialChart showLabels={true} data={data} width={500} height={500} />
      </div>
    );
  }
}

export default Vis;
