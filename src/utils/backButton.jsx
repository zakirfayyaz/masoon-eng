import React, { Component } from "react";

class BackButton extends Component {
  state = {};
  render() {
    return (
      <>
        <span
          // className="btn btn-primary btn-block"
          style={{ cursor: "pointer" }}
          onClick={() => window.history.go(-1)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="48"
            height="48"
            viewBox="0 0 172 172"
            style={{ fill: "#000000" }}
          >
            <g
              fill="none"
              fill-rule="nonzero"
              stroke="none"
              stroke-width="1"
              stroke-linecap="butt"
              stroke-linejoin="miter"
              stroke-miterlimit="10"
              stroke-dasharray=""
              stroke-dashoffset="0"
              font-family="none"
              font-weight="none"
              font-size="none"
              text-anchor="none"
              style={{
                mixBlendMode: "normal",
              }}
            >
              <path d="M0,172v-172h172v172z" fill="none"></path>
              <g>
                <path
                  d="M136.16667,150.5c7.91558,0 14.33333,-6.41775 14.33333,-14.33333v-100.33333c0,-7.91558 -6.41775,-14.33333 -14.33333,-14.33333h-100.33333c-7.91558,0 -14.33333,6.41775 -14.33333,14.33333v100.33333c0,7.91558 6.41775,14.33333 14.33333,14.33333z"
                  fill="#5c1ac3"
                ></path>
                <path
                  d="M96.69983,46.36117l11.02592,11.05817l-28.36208,28.58067l28.36208,28.58425l-11.02592,11.05817l-39.3665,-39.64242z"
                  fill="#ffffff"
                ></path>
              </g>
            </g>
          </svg>
        </span>
      </>
    );
  }
}

export default BackButton;
