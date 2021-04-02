import React from "react";
const Rating_Stars = (no) => {
  // no = no.toFixed(1);
  if (no === 1) {
    return (
      <React.Fragment>
        <span class="fa fa-star checked" style={{ color: "orange" }}></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
      </React.Fragment>
    );
  }
  if (no > 1 && no < 2) {
    //console.log("no > 1 && no < 2");
    return (
      <React.Fragment>
        <span class="fa fa-star checked" style={{ color: "orange" }}></span>
        <span
          class="fas fa-star-half-alt"
          aria-hidden="true"
          style={{ color: "orange" }}
        ></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
      </React.Fragment>
    );
  }
  if (no === 2) {
    return (
      <React.Fragment>
        <span class="fa fa-star checked" style={{ color: "orange" }}></span>
        <span class="fa fa-star checked" style={{ color: "orange" }}></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
      </React.Fragment>
    );
  }
  if (no > 2 && no < 3) {
    return (
      <React.Fragment>
        <span class="fa fa-star checked" style={{ color: "orange" }}></span>
        <span class="fa fa-star checked" style={{ color: "orange" }}></span>
        <i
          class="fas fa-star-half-alt"
          aria-hidden="true"
          style={{ color: "orange" }}
        ></i>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
      </React.Fragment>
    );
  }
  if (no === 3) {
    return (
      <React.Fragment>
        <span class="fa fa-star checked" style={{ color: "orange" }}></span>
        <span class="fa fa-star checked" style={{ color: "orange" }}></span>
        <span class="fa fa-star checked" style={{ color: "orange" }}></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
      </React.Fragment>
    );
  }
  if (no > 3 && no < 4) {
    return (
      <React.Fragment>
        <span class="fa fa-star checked" style={{ color: "orange" }}></span>
        <span class="fa fa-star checked" style={{ color: "orange" }}></span>
        <span class="fa fa-star checked" style={{ color: "orange" }}></span>
        <span
          class="fas fa-star-half-alt"
          aria-hidden="true"
          style={{ color: "orange" }}
        ></span>
        <span class="fa fa-star"></span>
      </React.Fragment>
    );
  }
  if (no === 4) {
    return (
      <React.Fragment>
        <span class="fa fa-star checked" style={{ color: "orange" }}></span>
        <span class="fa fa-star checked" style={{ color: "orange" }}></span>
        <span class="fa fa-star checked" style={{ color: "orange" }}></span>
        <span class="fa fa-star checked" style={{ color: "orange" }}></span>
        <span class="fa fa-star"></span>
      </React.Fragment>
    );
  }
  if ((no > 4) & (no < 5)) {
    return (
      <React.Fragment>
        <span class="fa fa-star checked" style={{ color: "orange" }}></span>
        <span class="fa fa-star checked" style={{ color: "orange" }}></span>
        <span class="fa fa-star checked" style={{ color: "orange" }}></span>
        <span class="fa fa-star checked" style={{ color: "orange" }}></span>
        <i
          class="fas fa-star-half-alt"
          aria-hidden="true"
          style={{ color: "orange" }}
        ></i>
      </React.Fragment>
    );
  }
  if (no === 5 || no > 5) {
    return (
      <React.Fragment>
        <span class="fa fa-star checked" style={{ color: "orange" }}></span>
        <span class="fa fa-star checked" style={{ color: "orange" }}></span>
        <span class="fa fa-star checked" style={{ color: "orange" }}></span>
        <span class="fa fa-star checked" style={{ color: "orange" }}></span>
        <span class="fa fa-star checked" style={{ color: "orange" }}></span>
      </React.Fragment>
    );
  }
};
export default Rating_Stars;
