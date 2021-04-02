import React, { Component } from "react";
import { trackPromise } from "react-promise-tracker";
import { usePromiseTracker } from "react-promise-tracker";
import Loader from "react-promise-loader";
import axios from "axios";
import api_link from "../../../config.json";
import BackButton from "./../../../utils/backButton";
import $ from "jquery";
import decrypt from "./../../../utils/Encryption/Decrypt";
class dashboardRevenueTable extends Component {
  state = { data: [] };
  async componentDidMount() {
    const token = localStorage.getItem("token");
    var response = await trackPromise(
      axios.get(api_link.API_LINK + "admin/users/publisher/revenue/all", {
        headers: { Authorization: token },
      })
    );
    response["data"] = JSON.parse(decrypt(response["data"]["resp"]));
    console.log(response);
    const data = response["data"]["getRevenueByUser_"];
    // console.log(data);
    this.setState({ data });
    setTimeout(() => {
      if (this.state.data.length > 0) {
        $(document).ready(function () {
          $("#revenueTable").dataTable({});
        });
      }
    }, 1000);
  }
  render() {
    return (
      <React.Fragment>
        <Loader
          promiseTracker={usePromiseTracker}
          color={"#5c1ac3"}
          background={"rgb(255, 255, 255)"}
        />
        <div id="content" class="main-content">
          <div class="layout-px-spacing">
            <div class="page-header">
              <div class="page-title">
                <div className="d-flex justify-content-between">
                  <BackButton onClick={() => window.history.go(-1)} />
                  <h3 style={{ paddingTop: "8px" }}>Revenue Detail</h3>
                </div>
              </div>
            </div>
            <div class="row analytics layout-top-spacing">
              <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 layout-spacing">
                <div class="widget widget-table-two">
                  <div class="widget-heading">
                    <h5 class="">
                      Total :{" "}
                      <span
                        className="badge badge-secondary"
                        style={{ fontSize: "1.5vh" }}
                      >
                        {this.state.data.length}
                      </span>
                    </h5>
                  </div>

                  <div class="widget-content">
                    <div
                      class="table-responsive "
                      style={{ maxheight: "65vh", overflow: "auto" }}
                    >
                      <table class="table" id="revenueTable">
                        <thead>
                          <tr>
                            <th>
                              <div class="th-content">Advertiser Name</div>
                            </th>
                            <th>
                              <div class="th-content">Advertiser Email</div>
                            </th>
                            <th>
                              <div class="th-content">Advertiser Contact</div>
                            </th>

                            <th>
                              <div class="th-content">Total Revenue</div>
                            </th>
                            <th style={{ textAlign: "center" }}>Action</th>
                          </tr>
                        </thead>

                        <tbody>
                          {this.state.data.map((pointer) => (
                            <tr>
                              <td>
                                <div class="td-content customer-name">
                                  {pointer.firstname + " " + pointer.lastname}
                                </div>
                              </td>
                              <td>
                                <div class="td-content product-brand">
                                  {pointer.email}
                                </div>
                              </td>
                              <td>
                                <div class="td-content">
                                  {pointer.phone_number}
                                </div>
                              </td>
                              <td>
                                <div class="td-content">
                                  <span
                                    className="badge badge-secondary"
                                    style={{ fontSize: "1.5vh" }}
                                  >
                                    {" "}
                                    {pointer.revenue.length < 1
                                      ? "0"
                                      : pointer.revenue[0]["amount"]}{" "}
                                    SR
                                  </span>
                                </div>
                              </td>
                              <td style={{ textAlign: "center" }}>
                                <div class="td-content">
                                  <button
                                    className="btn btn-primary mr-3 mt-2"
                                    onClick={() =>
                                      this.props.history.push(
                                        `/en-admin/publisher-detail/${pointer._id}`
                                      )
                                    }
                                  >
                                    Show Advertiser
                                  </button>
                                  <button
                                    className="btn btn-secondary mt-2"
                                    onClick={() =>
                                      this.props.history.push(
                                        `/en-admin/publishers-ad-insights/${pointer._id}/Analysis`
                                      )
                                    }
                                  >
                                    Show AD Insights
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
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
            <div class="footer-section f-section-2">
              <p class="">
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
                  class="feather feather-heart"
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
}

export default dashboardRevenueTable;
