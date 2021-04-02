import React, { Component } from "react";
import "./loading.css";
class ChangingLanguage extends Component {
  state = {};
  componentDidMount() {
    localStorage.setItem("token", this.props.match.params.token);
    localStorage.setItem("Role", this.props.match.params.role);
    localStorage.setItem("lang", this.props.match.params.lang);

    setTimeout(() => {
      window.location.href = "/en-publisher/pDashboard";
    }, 1000);
  }
  render() {
    return <div class="loading">Loading&#8230;</div>;
  }
}

export default ChangingLanguage;
