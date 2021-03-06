import "./App.css";

import { BarChart, BarChartData } from "./BarChart";

import React from "react";

export interface IAppSate {
  data: BarChartData[];
}

export class App extends React.Component<{}, IAppSate> {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { x: 1, y: 1 },
        { x: 2, y: 2 },
        { x: 3, y: 3 },
      ],
    };
    this.handleAddClick = this.handleAddClick.bind(this);
    this.handleRemoveClick = this.handleRemoveClick.bind(this);
  }

  private handleAddClick() {
    this.setState({
      data: [
        { x: 1, y: 1 },
        { x: 2, y: 2 },
        { x: 3, y: 3 },
        { x: 4, y: 4 },
      ],
    });
  }

  private handleRemoveClick() {
    this.setState({
      data: [
        { x: 1, y: 1 },
        { x: 2, y: 2 },
      ],
    });
  }

  public render() {
    return (
      <div className="App">
        <BarChart data={this.state.data} />
        <div>
          <button onClick={this.handleAddClick}> Add data </button>
          <button onClick={this.handleRemoveClick}> Remove data </button>
        </div>
      </div>
    );
  }
}

export default App;
