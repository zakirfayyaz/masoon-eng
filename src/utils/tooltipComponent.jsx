import React, { Component } from "react";
import handlestringLength from "./handle-string-length";

class ToolTipComponent extends Component {
  state = {};
  render() {
    return (
      <div
        data-toggle="tooltip"
        data-placement="bottom"
        title={this.props.string}
      >
        {handlestringLength(this.props.string)}
      </div>
    );
  }
}

export default ToolTipComponent;
