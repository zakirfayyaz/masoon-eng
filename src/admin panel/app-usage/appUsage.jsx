import React, { Component, Suspense } from "react";
// import RecentlyActiveGraph from "./recentlyActiveGraph";
// import RecentActive from "./reActiveGraph";
// import DailyRegistration from "./dailyRegistration";
import api_link from "../../config.json";
import axios from "axios";
import RatingsTable from "./app-usage-components/rating-table";
import decrypt from "./../../utils/Encryption/Decrypt";
const DailyRegistration = React.lazy(() => import("./dailyRegistration"));
class AppUsage extends Component {
  state = {
    active_users: [],
    offline_users: [],
    online_users: [],
    ratings: "",
  };
  componentDidMount = async () => {
    const date = new Date();
    const year = date.getFullYear();

    const mon = date.getMonth() + 1;
    const month = mon > 10 ? mon : "0" + mon;
    const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    const current = year + "-" + month + "-" + day;
    //console.log(year, month, day, current);
    // //console.log(day, month, year);
    const token = localStorage.getItem("token");
    let response = await axios.get(
      api_link.API_LINK + "admin/users/active/all/0/" + current,
      { headers: { Authorization: token } }
    );
    response["data"] = JSON.parse(decrypt(response.data.resp));
    // console.log(response);
    const recieved = response["data"];
    this.setState({
      total_active: recieved.total_active,
      total_offline: recieved.total_offline,
      total_online: recieved.total_online,
      active_users: recieved.active_Users,
      offline_users: recieved.offine_Users,
      online_users: recieved.online_Users,
    });
  };
  filterDailyUsage = async ({ currentTarget: input }) => {
    const date = input.value;
    const token = localStorage.getItem("token");
    let response = await axios.get(
      api_link.API_LINK + "admin/users/active/all/0/" + date,

      { headers: { Authorization: token } }
    );
    // //console.log(response);
    response["data"] = JSON.parse(decrypt(response.data.resp));
    const recieved = response["data"];
    this.setState({
      total_active: recieved.total_active,
      total_offline: recieved.total_offline,
      total_online: recieved.total_online,
    });
  };
  render() {
    return (
      <div id="content" class="main-content">
        <div class="layout-px-spacing">
          <div class="page-header">
            <div class="page-title">
              <h3>App Usage Detail</h3>
            </div>
          </div>

          <div class="row layout-spacing pt-2">
            {/* Content */}
            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 layout-spacing mt-2 m-auto">
              <div
                class="d-flex justify-content-between widget-account-invoice-six layout-spacing"
                style={{ cursor: "pointer" }}
                onClick={() =>
                  this.props.history.push("/en-admin/header-detail/1")
                }
              >
                <div class="mt-2">
                  <span class="text-white" style={{ fontSize: "14px" }}>
                    <i class="fas fa-user"></i> Active Users
                  </span>
                </div>
                <div class="mt-1">
                  <p
                    class="text-white"
                    style={{
                      fontSize: "14px",
                      marginTop: "5px",
                      marginBottom: "0px",
                    }}
                  >
                    {this.state.total_active}
                  </p>
                </div>
              </div>
            </div>
            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 layout-spacing mt-2 m-auto">
              <div
                class="d-flex justify-content-between widget-account-invoice-five layout-spacing"
                style={{ cursor: "pointer" }}
                onClick={() =>
                  this.props.history.push("/en-admin/header-detail/2")
                }
              >
                <div class="mt-2">
                  <span class="text-white" style={{ fontSize: "14px" }}>
                    <i class="fas fa-wifi"></i> Online Users
                  </span>
                </div>
                <div class="mt-1">
                  <p
                    class="text-white "
                    style={{
                      fontSize: "14px",
                      marginTop: "5px",
                      marginBottom: "0px",
                    }}
                  >
                    {this.state.total_online}
                  </p>
                </div>
              </div>
            </div>
            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 layout-spacing mt-2 m-auto">
              <div
                class="d-flex justify-content-between widget-account-invoice-six layout-spacing"
                style={{ cursor: "pointer" }}
                onClick={() =>
                  this.props.history.push("/en-admin/header-detail/3")
                }
              >
                <div class="mt-2">
                  <span class="text-white" style={{ fontSize: "14px" }}>
                    <i class="fas fa-ban pr-1"></i>Offline Users
                  </span>
                </div>
                <div class="mt-1">
                  <p
                    class="text-white "
                    style={{
                      fontSize: "14px",
                      marginTop: "5px",
                      marginBottom: "0px",
                    }}
                  >
                    {this.state.total_offline}
                  </p>
                </div>
              </div>
            </div>
            {/*Counts Ends Here*/}
          </div>
          <div className="row">
            <div class="col-xl-6 col-md-12  layout-spacing ">
              <div class="widget widget-chart-two" style={{ height: "452px" }}>
                <div class="widget-heading">
                  <h5 class="">Daily Usage </h5>
                  {/* <input
                    className="form-control col-4 ml-auto"
                    type="date"
                    onChange={this.filterDailyUsage}
                  /> */}
                </div>
                <div class="widget-content">
                  <Suspense fallback={<div></div>}>
                    <DailyRegistration
                      total_active={this.state.total_active}
                      total_online={this.state.total_online}
                      total_offline={this.state.total_offline}
                    />
                  </Suspense>
                </div>
              </div>
            </div>
            {/* <div class="col-xl-7 col-md-6 layout-spacing ">
              <div
                class="widget widget-chart-two"
                style={{ maxheight: "356px" }}
              >
                <div class="widget-heading">
                  <h5 class="">Recent Active </h5>
                </div>
                <div class="widget-content">
                  <RecentActive />
                </div>
              </div>
            </div> */}
            {/* <div class="col-xl-6 col-md-6 layout-spacing ">
              <div
                class="widget widget-chart-two"
                style={{ maxheight: "356px" }}
              >
                <div class="widget-heading">
                  <h5 class="">Daily Active </h5>
                </div>
                <div class="widget-content">
                 
                  <RecentlyActiveGraph />
                </div>
              </div>
            </div> */}

            <div class="col-xl-6 col-md-12 layout-spacing ">
              <RatingsTable />
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
    );
  }
}

export default AppUsage;
