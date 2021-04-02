import React, { Component } from "react";
import axios from "axios";
// import api_link from "../../../config.json";
import { trackPromise } from "react-promise-tracker";
import BackButton from "./../../../utils/backButton";
import $ from "jquery";
import { Link } from "react-router-dom";
import decrypt from "./../../../utils/Encryption/Decrypt";
import endpoint from "./../../../utils/endpoint";
import token from "./../../../utils/token";
import encrypt from "./../../../utils/Encryption/Encrypt";
import { ToastContainer, toast } from "react-toastify";
class DashboardPendingPublisherTable extends Component {
  state = {
    show: false,
    pending_publishers: [],
    requests: [],
  };
  approve = async (package_id, user_package_id) => {
    // console.log(package_id, user_package_id);
    const token = localStorage.getItem("token");
    const obj = {
      user_package_id: user_package_id,
      package_id: package_id,
    };
    const encrypted = encrypt(JSON.stringify(obj));
    var response = await trackPromise(
      axios.put(
        endpoint + "notice/user-packages/approve-id",
        {
          name: encrypted,
        },
        {
          headers: { Authorization: token },
        }
      )
    );
    response["data"] = JSON.parse(decrypt(response.data.resp));
    if (response.data.status === 200) {
      toast.success("Approved", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error("Error Approving", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    this.getData();
  };
  getData = async () => {
    const response2 = await trackPromise(
      axios.get(endpoint + "admin/dashboard", {
        headers: { Authorization: token },
      })
    );
    response2["data"] = JSON.parse(decrypt(response2["data"]["resp"]));
    // console.log(response2);
    this.setState({
      requests: response2["data"].recent_package_requests,
    });
  };
  reject = async (package_id, user_package_id) => {
    // console.log(package_id, user_package_id);
    const token = localStorage.getItem("token");
    var obj = {
      user_package_id: user_package_id,
      package_id: package_id,
    };
    obj = encrypt(JSON.stringify(obj));
    var response = await trackPromise(
      axios.put(
        endpoint + "notice/user-packages/suspend-id",
        {
          name: obj,
        },
        {
          headers: { Authorization: token },
        }
      )
    );
    response["data"] = JSON.parse(decrypt(response.data.resp));
    if (response.data.status === 200) {
      toast.success("Rejected", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error("Error Rejecting", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    // console.log(response);
    this.getData();
  };
  async componentDidMount() {
    this.getData();

    this.setState({ show: true });
    setTimeout(() => {
      if (this.state.requests.length > 0) {
        $(document).ready(function () {
          $("#pendingpublishers").dataTable({});
        });
      }
    }, 1000);
  }
  reverseDate(str) {
    return str.split("-").reverse().join("/");
  }
  render() {
    return this.state.show === true ? (
      <React.Fragment>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <div id="content" class="main-content">
          <div class="layout-px-spacing">
            <div class="page-header">
              <div class="page-title">
                <div className="d-flex justify-content-between">
                  <BackButton onClick={() => window.history.go(-1)} />
                  <h3 style={{ paddingTop: "8px" }}>
                    Pending Advertisers Packages Requests
                  </h3>
                </div>
              </div>
            </div>
            <div class="row analytics layout-top-spacing">
              <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 layout-spacing">
                <div class="widget widget-table-one">
                  <div class="widget-heading">
                    <h5 class="">
                      Total Pending :{" "}
                      <span className="badge badge-secondary">
                        {this.state.requests.length}
                      </span>
                    </h5>
                  </div>

                  <div class="widget-content">
                    <div
                      class="table-responsive example"
                      style={{ maxheight: "35vh" }}
                    >
                      <table
                        class="table"
                        style={{ textAlign: "center" }}
                        id="pendingpublishers"
                      >
                        <thead>
                          <tr>
                            <th>
                              <div class="th-content">User Name</div>
                            </th>
                            <th>
                              <div class="th-content">Requested Date</div>
                            </th>
                            <th>
                              <div class="th-content">Package_type</div>
                            </th>

                            <th>
                              <div class="th-content">Status</div>
                            </th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        {this.state.requests < 1 ? (
                          <div className="text-center"> {null}</div>
                        ) : (
                          <tbody>
                            {this.state.requests.map((pointer) => (
                              <tr>
                                <td>
                                  <div class="td-content customer-name">
                                    {pointer.user_name}
                                  </div>
                                </td>
                                <td>
                                  <div class="td-content product-brand">
                                    {this.reverseDate(
                                      pointer.createdAt.substring(
                                        0,
                                        pointer.createdAt.indexOf("T")
                                      )
                                    )}
                                  </div>
                                </td>
                                <td>
                                  <div class="td-content">
                                    {pointer.package_name}
                                  </div>
                                </td>

                                <td>
                                  <div class="td-content">
                                    {pointer.status === "Pending" ? (
                                      <span class="badge outline-badge-danger">
                                        Pending
                                      </span>
                                    ) : (
                                      <span class="badge outline-badge-secondary">
                                        Approved
                                      </span>
                                    )}
                                  </div>
                                </td>
                                <td>
                                  <button
                                    type="button"
                                    class="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                  >
                                    {" "}
                                    More
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
                                      class="feather feather-chevron-down"
                                    >
                                      <polyline points="6 9 12 15 18 9"></polyline>
                                    </svg>
                                  </button>
                                  <div
                                    class="dropdown-menu"
                                    style={{ willChange: "transform" }}
                                  >
                                    <Link
                                      className="dropdown-item"
                                      to="#"
                                      onClick={() =>
                                        this.props.history.push(
                                          "/en-admin/publisher-detail/" +
                                            pointer.user_id
                                        )
                                      }
                                    >
                                      Show Advertiser Detail
                                      <i class="fas fa-angle-right text-white"></i>
                                    </Link>
                                    <Link
                                      class="dropdown-item"
                                      to="#"
                                      onClick={() =>
                                        this.approve(
                                          pointer.package_id,
                                          pointer._id
                                        )
                                      }
                                    >
                                      Approve Request
                                    </Link>
                                    <Link
                                      class="dropdown-item"
                                      to={`#`}
                                      onClick={() =>
                                        this.reject(
                                          pointer.package_id,
                                          pointer._id
                                        )
                                      }
                                    >
                                      Reject Request
                                    </Link>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        )}
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
    ) : null;
  }
}

export default DashboardPendingPublisherTable;
