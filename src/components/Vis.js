import React, { Component } from "react";
import { RadialChart } from "react-vis";

class Vis extends Component {
  render() {
    let { data } = this.props;
    return (
      <div className="col-md-12">
        <RadialChart
          colorRange={["#ec6262", "#e1d276", "#99ea86", "#83d6b7", "#e4a8f9"]}
          showLabels={true}
          data={data}
          width={400}
          height={400}
        />
      </div>
    );
  }
}

export default Vis;
