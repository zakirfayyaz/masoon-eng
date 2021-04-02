import React, { Component } from "react";
import api_link from ".././../config.json";
import axios from "axios";
import AdDetailTable from "./adDetailTable";
import SecondAdDetail from "./secondAdDetail";
import AdExpiredTable from "./adExpiredTable";
// import { Link } from "react-router-dom";
import decrypt from "./../../utils/Encryption/Decrypt";
import { trackPromise } from "react-promise-tracker";
import { usePromiseTracker } from "react-promise-tracker";
import Loader from "react-promise-loader";
class AdDetails extends Component {
  state = { blocked: [], running: [], expired: [] };
  componentDidMount = async () => {
    this.getData();
  };
  render() {
    return (
      <React.Fragment>
        <Loader
          promiseTracker={usePromiseTracker}
          color={"#5c1ac3"}
          background={"rgb(255, 255, 255)"}
        />
        <div id="content" className="main-content">
          <div className="layout-px-spacing">
            <div className="page-header">
              <div className="page-title">
                <h3>ADS Details</h3>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 col-12 layout-top-spacing">
                <div className="statbox widget box box-shadow">
                  <div className="widget-header"></div>
                  <div className="widget-content widget-content-area icon-pill">
                    <div className="row">
                      <div className="col-md-12">
                        <ul
                          className="nav nav-pills mb-3 mt-3 d-flex justify-content-center text-center"
                          id="icon-pills-tab"
                          role="tablist"
                        >
                          <li className="nav-item mt-1 mr-1">
                            <a
                              className="nav-link active btn-outline-secondary"
                              id="icon-pills-home-tab"
                              data-toggle="pill"
                              href="#running"
                              role="tab"
                              aria-controls="icon-pills-home"
                              aria-selected="true"
                              style={{
                                padding: "0.6rem 4rem",
                                // fontSize: "2vh",
                                width: "100%",
                              }}
                            >
                              Running{" "}
                              <span className="badge badge-light">
                                {this.state.running.length}
                              </span>
                            </a>
                          </li>

                          <li className="nav-item mr-1 mt-1">
                            <a
                              className="nav-link btn-outline-secondary"
                              id="icon-pills-contact-tab"
                              data-toggle="pill"
                              href="#expired"
                              role="tab"
                              aria-controls="icon-pills-contact"
                              aria-selected="false"
                              style={{
                                padding: "0.6rem 4rem",
                                // fontSize: "2vh",
                                width: "100%",
                              }}
                            >
                              {" "}
                              Expired{" "}
                              <span className="badge badge-light">
                                {this.state.expired.length}
                              </span>
                            </a>
                          </li>
                          <li className="nav-item mt-1">
                            <a
                              className="nav-link btn-outline-secondary"
                              id="icon-pills-contact-tab"
                              data-toggle="pill"
                              href="#blocked"
                              role="tab"
                              aria-controls="icon-pills-contact"
                              aria-selected="false"
                              style={{
                                padding: "0.6rem 4rem",
                                // fontSize: "2vh",
                              }}
                            >
                              {" "}
                              Blocked{" "}
                              <span className="badge badge-light">
                                {this.state.blocked.length}
                              </span>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="tab-content" id="icon-pills-tabContent">
                      <div
                        className="tab-pane fade show active"
                        id="running"
                        role="tabpanel"
                        aria-labelledby="icon-pills-home-tab"
                      >
                        {/*Active*/}
                        <div className="table-responsive mb-4 mt-4 ">
                          <AdDetailTable ads={this.state.running} />
                        </div>
                      </div>
                      <div
                        className="tab-pane fade"
                        id="expired"
                        role="tabpanel"
                        aria-labelledby="icon-pills-contact-tab"
                      >
                        {/*InActive*/}
                        <div className="table-responsive mb-4 mt-4">
                          <AdExpiredTable ads={this.state.expired} />
                        </div>
                      </div>
                      <div
                        className="tab-pane fade"
                        id="blocked"
                        role="tabpanel"
                        aria-labelledby="icon-pills-contact-tab"
                      >
                        {/*Blocked*/}
                        <div className="table-responsive mb-4 mt-4">
                          <SecondAdDetail
                            ads={this.state.blocked}
                            getData={this.getData}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-wrapper">
            <div className="footer-section f-section-1">
              <p className="">
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
            <div className="footer-section f-section-2">
              <p className="">
                Coded with{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="feather feather-heart"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </p>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
  getData = async () => {
    const token = localStorage.getItem("token");

    var response = await await trackPromise(
      axios.get(api_link.API_LINK + "publisher/ads-list", {
        headers: { Authorization: token },
      })
    );
    response["data"] = JSON.parse(decrypt(response.data.resp));
    // console.log(response);
    const total_ads = response["data"]["ads"];
    // total_ads.map((ads) => console.log(ads.status));
    const blocked = [];
    const running = [];
    const expired = [];
    // const pending = [];
    total_ads.filter((ads) => {
      if (ads.status === "Blocked") {
        blocked.push(ads);
      } else if (ads.status === "Approved") {
        running.push(ads);
      } else if (ads.status === "Expired") {
        expired.push(ads);
      }
    });

    // for (var i = 0; i < blocked; i++) {
    //   if (blocked[i].status === "Expired") {
    //     expired.push(blocked[i]);
    //   }
    // }
    this.setState({ blocked, running, expired });
  };
}

export default AdDetails;
