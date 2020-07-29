import React, { Component } from "react";
import { ListItem } from "./ListItem";
import axios from "axios";
import "./List.css";

export class List extends Component {
  state = {
    data: []
  };

  handleClick = (el) => {
    this.props.onChange(el);
  };

  componentDidMount() {
    axios
      .get("https://vps04.inmation.eu:8002/api/v2/read", {
        headers: {
          authorization:
            "Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsiaW5tYXRpb24gV2ViIEFQSSJdLCJleHAiOjE1OTY0NDI0MDYsImlhdCI6MTU5NTI0MjQwNiwiaW5fcHJmIjpbIlJlYWN0VGVzdCJdLCJpbl91c3IiOiJSZWFjdFRlc3QiLCJpc3MiOiJpbm1hdGlvbiBXZWIgQVBJIiwibmJmIjoxNTk1MjQyNDA2LCJzdWIiOiJSZWFjdFRlc3QifQ.Kvnjwm8CByw7pko3HuIMBKOADS1NP44ubxt5V6rm6Vs"
        },
        params: {
          identifier: "/System/Core/Examples/Assignment"
        }
      })
      .then((data) => {
        const dt = data.data.data[0]["v"];
        this.setState({ data: dt });
      })
      .catch((err) => console.log("An error occured: ", err));
  }

  render() {
    const listItems = this.state.data.map((el) => (
      <ListItem key={el.Name} el={el} onSelect={this.handleClick} />
    ));

    return (
      <div>
        <ul>{listItems}</ul>
      </div>
    );
  }
}
