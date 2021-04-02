import React, { Component } from "react";
import { trackPromise } from "react-promise-tracker";
import { usePromiseTracker } from "react-promise-tracker";
import Loader from "react-promise-loader";
import axios from "axios";
import api_link from "../../config.json";
import "./test.css";
class UserTransactionDetail extends Component {
  state = { transactions: [] };

  async componentDidMount() {
    const token = localStorage.getItem("token");
    // console.log(this.props.match.params.userid);
    const response = await trackPromise(
      axios.get(
        api_link.API_LINK +
          "admin/transactions/" +
          this.props.match.params.userid,
        {
          headers: { Authorization: token },
        }
      )
    );
    // console.log(response);
    this.setState({ transactions: response["data"]["users"] });
  }
  render() {
    return (
      <div id="content" class="main-content">
        <div class="layout-px-spacing">
          <div class="page-header">
            <div class="page-title">
              <span
                style={{ cursor: "pointer" }}
                onClick={() => this.props.history.push("/en-admin/aOrders")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="48"
                  height="48"
                  viewBox="0 0 172 172"
                  style={{ fill: "rgb(0, 0, 0)" }}
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
                    style={{ mixBlendMode: " normal" }}
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
                      ></path>{" "}
                    </g>
                  </g>
                </svg>
              </span>
              <h3>Transaction Detail for {this.props.match.params.username}</h3>
            </div>
          </div>
          <div class="row layout-top-spacing" id="cancel-row">
            <div class="col-xl-12 col-lg-12 col-sm-12  layout-spacing">
              <div
                class="widget-content widget-content-area br-6 example"
                style={{
                  maxHeight: "70vh",
                }}
              >
                <Loader
                  promiseTracker={usePromiseTracker}
                  color={"#5c1ac3"}
                  background={"rgb(255, 255, 255)"}
                />
                <div class="table-responsive mb-4 mt-4 ">
                  {this.state.transactions.length > 0 ? (
                    <table
                      id="html5-extension"
                      class="table table-hover non-hover"
                      style={{
                        width: "100%",
                        textAlign: "center",
                        fontWeight: "900",
                      }}
                    >
                      <thead>
                        <tr>
                          <th>Merchant</th>
                          <th>Transaction Amount</th>
                          <th>Transaction date</th>
                          <th>Category</th>
                          <th>Type</th>
                          <th>Payment Type</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.transactions.map((pointer) => (
                          <tr>
                            <td>{pointer.merchant}</td>
                            <td>{pointer.amount}</td>
                            <td>
                              {pointer.date.substring(
                                0,
                                pointer.date.indexOf("T")
                              )}
                            </td>
                            <td>{pointer.category_id}</td>
                            <td>{pointer.type}</td>
                            <td>{pointer.payment_type}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div className="col-md-10 m-auto text-center">
                      <h4 className="mt-2">{null}</h4>
                    </div>
                  )}
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
    );
  }
}

export default UserTransactionDetail;
