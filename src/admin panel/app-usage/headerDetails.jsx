import React, { Component } from "react";
import axios from "axios";
import api_link from "../../config.json";
import AppUsageUserDetailTable from "./app-usage-components/app-usage-user-details";
import BackButton from "./../../utils/backButton";
import decrypt from "./../../utils/Encryption/Decrypt";
class HeaderDetailsAppUsage extends Component {
  state = { heading: "", count: "", user_list: [], id: "" };
  componentDidMount = async () => {
    const date = new Date();
    const year = date.getFullYear();
    const mon = date.getMonth() + 1;
    const month = mon > 10 ? mon : "0" + mon;
    const day = date.getDay() < 10 ? "0" + date.getDay() : date.getDay();
    const current = year + "-" + month + "-" + day;
    const id = parseInt(this.props.match.params.id);
    this.setState({ id: id });
    const token = localStorage.getItem("token");
    let response = await axios.get(
      api_link.API_LINK + "admin/users/active/all/0/" + current,
      { headers: { Authorization: token } }
    );
    response["data"] = JSON.parse(decrypt(response.data.resp));
    // console.log(response);
    const recieved = response["data"];
    if (id === 1) {
      this.setState({
        heading: "Active Users Detail",
        count: recieved.total_active,
        user_list: recieved.active_Users,
      });
    } else if (id === 2) {
      this.setState({
        heading: "Online Users Detail",
        count: recieved.total_online,
        user_list: recieved.online_Users,
      });
    } else {
      this.setState({
        heading: "Offline Users Detail",
        count: recieved.total_offline,
        user_list: recieved.offine_Users,
      });
    }
  };
  render() {
    return (
      <React.Fragment>
        <div id="content" class="main-content">
          <div class="layout-px-spacing">
            <div class="page-header">
              <div class="page-title d-flex">
                <div className="d-flex justify-content-between">
                  <BackButton />
                  <h3 style={{ paddingTop: "8px" }}>{this.state.heading}</h3>
                </div>
              </div>
            </div>{" "}
            <div class="row layout-spacing mt-5">
              <div className="col-xl-12 col-12 layout-spacing">
                <AppUsageUserDetailTable
                  id={this.state.id}
                  count={this.state.count}
                  users={this.state.user_list}
                  props={this.props}
                />
              </div>
            </div>
          </div>
          <div class="footer-wrapper">
            <div class="footer-section f-section-1">
              <p class="">
                Copyright © 2020{" "}
                <a
                  target="_blank"
                  href="https://cdoxs.com"
                  rel="noopener noreferrer"
                >
                  CDOXS
                </a>
                , All rights reserved.
              </p>
            </div>
            <div class="footer-section f-section-2"></div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default HeaderDetailsAppUsage;
