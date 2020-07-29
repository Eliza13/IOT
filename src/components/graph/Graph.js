import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";

export class Graph extends Component {
  state = {
    data: {
      labels: [],
      datasets: [
        {
          data: [],
          fill: false,
          borderColor: "rgba(75,192,192,1)",
          label: "Dataset"
        }
      ]
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.el !== this.props.el) {
      const elm = this.props.el;
      this.makeAPIRequest(elm);
    }
  }

  makeAPIRequest = (elm) => {
    axios
      .get("https://vps04.inmation.eu:8002/api/v2/readhistoricaldata", {
        headers: {
          authorization:
            "Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsiaW5tYXRpb24gV2ViIEFQSSJdLCJleHAiOjE1OTY0NDI0MDYsImlhdCI6MTU5NTI0MjQwNiwiaW5fcHJmIjpbIlJlYWN0VGVzdCJdLCJpbl91c3IiOiJSZWFjdFRlc3QiLCJpc3MiOiJpbm1hdGlvbiBXZWIgQVBJIiwibmJmIjoxNTk1MjQyNDA2LCJzdWIiOiJSZWFjdFRlc3QifQ.Kvnjwm8CByw7pko3HuIMBKOADS1NP44ubxt5V6rm6Vs"
        },
        params: {
          start_time: this.getStartTime(2),
          end_time: new Date().toISOString(),
          identifier: `${elm.Path}`
        }
      })
      .then((response) => {
        const graphData = response.data.data.items[0].intervals;
        const x = [];
        const y = [];
        graphData.forEach((element) => {
          x.push(element.T);
          y.push(element.V);
        });
        this.setState({
          data: {
            ...this.state.data,
            labels: x,
            datasets: [{ ...this.state.data.datasets[0], data: y }]
          }
        });
      })
      .catch((err) => console.log("An error occured: ", err));
  };

  getStartTime = (hours) => {
    const date = new Date();
    date.setHours(date.getHours() - hours);
    return date.toISOString();
  };

  render() {
    const { data } = this.state;
    return (
      <div>
        <Line data={data} />
      </div>
    );
  }
}
