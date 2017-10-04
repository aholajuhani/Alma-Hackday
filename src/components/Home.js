import React, { Component } from "react";
import { fetchRoute } from "../utils/hereApi";
import Vis from "./Vis";
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      departure: "Elielinaukio, Helsinki",
      destination: "Länsisatamankatu, Helsinki",
      time: "",
      distance: "",
      directions: [],
      data: []
    };
  }

  async updateStates() {
    let route = await fetchRoute(this.state.departure, this.state.destination);
    console.log("Route", route);
    try {
      let time = route.response.route[0].summary.travelTime;
      let distance = route.response.route[0].summary.distance;
      let directions = route.response.route[0].leg[0].maneuver;
      console.log("Directions:", directions);
      let array = [];
      directions.map((data, index) => {
        array.push({
          angle: Number((data.travelTime / 60).toFixed(0)) || 1,
          //radius: Number((data.travelTime / 60).toFixed(0)) || 1,
          label: `${index + 1}. ${(data.travelTime / 60).toFixed(0)} mins`
        });
      });

      console.log("Array", array);

      this.setState({
        time: (time / 60).toFixed(0),
        distance: (distance / 1000).toFixed(1),
        directions: directions.map(direction => {
          return direction;
        }),
        data: array
      });
    } catch (error) {
      console.warn(error);
      return null;
    }
  }

  componentDidMount() {
    this.updateStates();
  }

  handleSubmit = event => {
    event.preventDefault();
    this.updateStates();
  };

  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleError = error => {
    console.warn(error);
    return null;
  };

  render() {
    let {
      departure,
      destination,
      data,
      directions,
      time,
      distance
    } = this.state;

    return (
      <div>
        <h2>Transit App</h2>
        <form className="form" onSubmit={this.handleSubmit}>
          <div className="form-group col-xs-2">
            <label>From:</label>
            <input
              name="departure"
              value={departure}
              onChange={this.handleInputChange}
              type="text"
              required
              className="form-control"
              placeholder="Address, City, Country"
            />
          </div>
          <div className="form-group col-xs-2">
            <label>To:</label>
            <input
              name="destination"
              value={destination}
              onChange={this.handleInputChange}
              type="text"
              required
              className="form-control"
              placeholder="Address, City, Country"
            />
          </div>
          <div className="input-group">
            <button className="btn btn-success" type="Submit">
              Search
            </button>
          </div>
        </form>
        <div className="summary">
          {time && distance ? (
            <h3>
              The trip from {departure} to {destination} is {distance}km and
              takes about {time}mins
            </h3>
          ) : (
            <h1>Loading...</h1>
          )}
        </div>
        <ol>
          {directions.map(direction => {
            return (
              <li
                key={direction.id}
                dangerouslySetInnerHTML={{ __html: direction.instruction }}
              />
            );
          })}
        </ol>
        <div className="chart">
          <h3>Time estimation per step</h3>
          {data.length > 1 ? <Vis data={data} /> : <h1 />}
        </div>
      </div>
    );
  }
}
