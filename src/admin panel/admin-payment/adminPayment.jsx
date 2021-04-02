import React, { Component } from "react";
import { trackPromise } from "react-promise-tracker";
import { usePromiseTracker } from "react-promise-tracker";
import Loader from "react-promise-loader";
import api_link from "../../config.json";
import axios from "axios";
import "./test.css";
import { Link } from "react-router-dom";

class AdminPayment extends Component {
  state = { bills: [] };
  async componentDidMount() {
    const token = localStorage.getItem("token");
    const response = await trackPromise(
      axios.get(api_link.API_LINK + "admin/bills", {
        headers: { Authorization: token },
      })
    );
    // console.log(response);
    this.setState({ bills: response["data"]["users"] });
  }
  render() {
    return (
      <div id="content" class="main-content">
        <div class="layout-px-spacing">
          <div class="page-header">
            <div class="page-title">
              <h3>Bills</h3>
            </div>
          </div>
          <div class="row layout-top-spacing" id="cancel-row">
            <Loader
              promiseTracker={usePromiseTracker}
              color={"#5c1ac3"}
              background={"rgb(255, 255, 255)"}
            />
            <div class="col-xl-12 col-lg-12 col-sm-12  layout-spacing">
              <div
                class="widget-content widget-content-area br-6 example"
                style={{
                  maxHeight: "70vh",
                }}
              >
                {this.state.bills && this.state.bills.length > 0 ? (
                  <div class="table-responsive mb-4 mt-4">
                    <table
                      id="html5-extension"
                      class="table table-hover non-hover"
                      style={{ width: "100%" }}
                    >
                      <thead>
                        <tr>
                          <th>Image</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Status</th>
                          <th style={{ textAlign: "center" }}>
                            Total Bill Count
                          </th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.bills.map((pointer) => (
                          <tr>
                            <td>
                              <div class="d-flex">
                                <div class="usr-img-frame mr-2 rounded-circle">
                                  <img
                                    alt="avatar"
                                    class="img-fluid rounded-circle"
                                    src="/assets/img/90x90.jpg"
                                  />
                                </div>
                              </div>
                            </td>
                            <td style={{ fontWeight: "900" }}>
                              {pointer.name}
                            </td>
                            <td style={{ fontWeight: "900" }}>
                              {pointer.email}
                            </td>
                            <td>
                              <div class="td-content">
                                {pointer.status === "Pending" && (
                                  <span class="badge outline-badge-danger">
                                    Inactive
                                  </span>
                                )}
                                {pointer.status === "Approved" && (
                                  <span class="badge outline-badge-success">
                                    Active
                                  </span>
                                )}
                              </div>
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {" "}
                              <button
                                class="btn btn-md btn-secondary"
                                style={{ fontSize: "15px" }}
                              >
                                {pointer.count}
                              </button>
                            </td>

                            <td>
                              <Link
                                to="#"
                                onClick={() =>
                                  this.props.history.push(
                                    `/en-admin/aBillDetails/${pointer.name}/${pointer.id}`
                                  )
                                }
                                style={{ fontSize: "2vh" }}
                              >
                                View All{" "}
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  x="0px"
                                  y="0px"
                                  width="30"
                                  height="30"
                                  viewBox="0 0 30 30"
                                  style={{ fill: "#000000" }}
                                >
                                  <path d="M 9.9902344 3.9902344 A 1.0001 1.0001 0 0 0 9.2929688 5.7070312 L 18.585938 15 L 9.2929688 24.292969 A 1.0001 1.0001 0 1 0 10.707031 25.707031 L 20.707031 15.707031 A 1.0001 1.0001 0 0 0 20.707031 14.292969 L 10.707031 4.2929688 A 1.0001 1.0001 0 0 0 9.9902344 3.9902344 z"></path>
                                </svg>
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : null}
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
    );
  }
}

export default AdminPayment;
