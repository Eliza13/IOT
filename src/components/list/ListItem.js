import React, { Component } from "react";
import "./List.css";

export class ListItem extends Component {
  handleClick = () => {
    this.props.onSelect(this.props.el);
  }

  render() {
    return <li onClick={() => this.handleClick()}>{this.props.el.Name}</li>;
  }
}
