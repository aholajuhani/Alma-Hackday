import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default class Nav extends Component {
  render() {
    return (
      <ul className="nav nav-pills nav-stacked">
        <li role="presentation" className="active">
          <NavLink exact to="/">
            Home
          </NavLink>
        </li>
      </ul>
    );
  }
}
