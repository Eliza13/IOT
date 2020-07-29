import React, { Component } from "react";
import { Graph } from "./components/graph/Graph";
import { List } from "./components/list/List";
import "./App.css";

export class App extends Component {
  state = {
    elSelected: null
  };

  onSelect = (el) => {
    this.setState({ elSelected: el });
  };

  render() {
    const { elSelected } = this.state;

    return (
      <div className="App">
        <div>
          <List onChange={this.onSelect}></List>
        </div>
        <div className="App-graph">
          <Graph el={elSelected}></Graph>
        </div>
      </div>
    );
  }
}

export default App;
