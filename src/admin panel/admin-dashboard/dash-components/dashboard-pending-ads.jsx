import React, { Component } from "react";
import axios from "axios";
import api_link from "../../../config.json";
import { Link } from "react-router-dom";
import BackButton from "./../../../utils/backButton";
import $ from "jquery";
import decrypt from "./../../../utils/Encryption/Decrypt";
import encrypt from "./../../../utils/Encryption/Encrypt";
import { ToastContainer, toast } from "react-toastify";
import endpoint from "./../../../utils/endpoint";
import token from "./../../../utils/token";
class DashboardPendingAds extends Component {
  state = {
    adsToBeApproved: [],
  };
  async componentDidMount() {
    const token = localStorage.getItem("token");
    var response = await axios.get(api_link.API_LINK + "admin/dashboard", {
      headers: { Authorization: token },
    });
    response["data"] = JSON.parse(decrypt(response["data"]["resp"]));
    this.setState({
      adsToBeApproved: response["data"]["ads"],
    });
    // console.log(response);
    this.setState({ show: true });
    if (this.state.adsToBeApproved.length > 0) {
      $(document).ready(function () {
        $("#adsToBeApprove").dataTable({});
      });
    }
  }
  getData = async () => {
    var response = await axios.get(endpoint + "admin/dashboard", {
      headers: { Authorization: token },
    });
    response["data"] = JSON.parse(decrypt(response["data"]["resp"]));
    this.setState({
      adsToBeApproved: response["data"]["ads"],
    });
  };
  async block(id) {
    const token = localStorage.getItem("token");
    var obj = {
      id: id,
    };
    obj = encrypt(JSON.stringify(obj));
    try {
      const response1 = await axios.put(
        api_link.API_LINK + "notice/block-id",
        {
          name: obj,
        },
        {
          headers: { Authorization: token },
        }
      );
      response1["data"] = JSON.parse(decrypt(response1["data"]["resp"]));
      if (response1["data"]["status"] === 200) {
        toast.success("AD Blocked", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error("Error On Blocking", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      // console.log(response1);
      this.getData();
    } catch (e) {
      // console.log(e);
      toast.error("Error", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }
  approveAD = async (id) => {
    const token = localStorage.getItem("token");
    var obj = {
      id: id,
    };
    obj = encrypt(JSON.stringify(obj));
    try {
      var response1 = await axios.put(
        api_link.API_LINK + "notice/unblock-id",
        {
          name: obj,
        },
        {
          headers: { Authorization: token },
        }
      );
      // console.log(response1);
      response1["data"] = JSON.parse(decrypt(response1["data"]["resp"]));
      if (response1["data"]["status"] === 200) {
        toast.success("AD Approved", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error("Error On Approving", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      // console.log(response1);
      this.getData();
    } catch (err) {
      // console.log(err);
    }
  };
  render() {
    return (
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
                    Ads Request For Approval{" "}
                  </h3>
                </div>
              </div>
            </div>
            <div class="row analytics layout-top-spacing">
              <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 layout-spacing">
                <div class="widget widget-table-one">
                  <div class="widget-heading">
                    <Link to="/en-admin/dashboard-pending-ads">
                      {" "}
                      <h5 class="">
                        Total Requests :{" "}
                        <span
                          className="badge badge-secondary"
                          style={{ fontSize: "1.5vh" }}
                        >
                          {this.state.adsToBeApproved.length}
                        </span>
                      </h5>
                    </Link>
                  </div>

                  <div class="widget-content">
                    <div
                      class="table-responsive example"
                      style={{ maxHeight: "60vh" }}
                    >
                      <table class="table" id="adsToBeApprove">
                        <thead>
                          <tr>
                            <th>
                              <div class="th-content">Ad File</div>
                            </th>
                            <th>
                              <div class="th-content">Title</div>
                            </th>
                            <th>
                              <div class="th-content">Description</div>
                            </th>

                            <th>
                              <div class="th-content">Status</div>
                            </th>
                            <th style={{ textAlign: "center" }}>
                              <div class="th-content">Action</div>
                            </th>
                          </tr>
                        </thead>
                        {this.state.adsToBeApproved < 1 ? (
                          <div className="text-center"> {null}</div>
                        ) : (
                          <tbody>
                            {this.state.adsToBeApproved &&
                              this.state.adsToBeApproved.map((pointer) => (
                                <tr>
                                  <td>
                                    <div class="td-content customer-name">
                                      {pointer.type === "video" ? (
                                        <video
                                          autoPlay
                                          loop
                                          muted
                                          style={{
                                            height: "70px",
                                            width: "70px",
                                          }}
                                          data-toggle="modal"
                                          data-target="#pendingAdView"
                                          onClick={() =>
                                            this.setState({
                                              stuffToShow: pointer.file,
                                              stuffToShowType: pointer.type,
                                            })
                                          }
                                        >
                                          {" "}
                                          <source
                                            src={
                                              api_link.GET_IMAGE +
                                              `${pointer.file}`
                                            }
                                            type="video/mp4"
                                          />
                                        </video>
                                      ) : (
                                        <Link to="#">
                                          <div class="td-content customer-name">
                                            <img
                                              data-toggle="modal"
                                              data-target="#pendingAdView"
                                              src={
                                                api_link.GET_IMAGE +
                                                `${pointer.file}`
                                              }
                                              onClick={() =>
                                                this.setState({
                                                  stuffToShow: pointer.file,
                                                  stuffToShowType: pointer.type,
                                                })
                                              }
                                              style={{
                                                width: "60px",
                                                height: "60px",
                                              }}
                                              alt="avatar"
                                            />
                                          </div>
                                        </Link>
                                      )}
                                    </div>
                                  </td>
                                  <td>
                                    <div class="td-content product-brand">
                                      {pointer.title}
                                    </div>
                                  </td>
                                  <td>
                                    <div class="td-content">
                                      {pointer.description}
                                    </div>
                                  </td>

                                  <td>
                                    <div class="td-content">
                                      <span class="badge badge-warning">
                                        {pointer.status === "Pending" &&
                                          "Pending"}
                                      </span>
                                    </div>
                                  </td>
                                  <td style={{ textAlign: "center" }}>
                                    <button
                                      className="btn btn-md btn-primary mr-2"
                                      onClick={() =>
                                        this.props.history.push(
                                          "/en-admin/publisher-detail/" +
                                            pointer.user_id
                                        )
                                      }
                                    >
                                      Show Advertiser
                                    </button>
                                    <button
                                      className="btn btn-md btn-secondary mr-2"
                                      onClick={() =>
                                        this.approveAD(pointer._id)
                                      }
                                    >
                                      Approve
                                    </button>
                                    <button
                                      className="btn btn-md btn-danger"
                                      onClick={() => this.block(pointer._id)}
                                    >
                                      Block
                                    </button>
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
        <div
          class="modal fade"
          id="pendingAdView"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">
                  Your Ad View
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body" style={{ textAlign: "center" }}>
                <div className="text-center">
                  {this.state.stuffToShowType &&
                  this.state.stuffToShowType === "video" ? (
                    <video
                      data-toggle="modal"
                      data-target="#pendingAdView"
                      loop
                      mute
                      style={{ height: "40vh", width: "40vh" }}
                      controls
                      id="video"
                    >
                      {" "}
                      <source
                        src={api_link.GET_IMAGE + `${this.state.stuffToShow}`}
                        type="video/mp4"
                      />
                    </video>
                  ) : (
                    <img
                      data-toggle="modal"
                      data-target="#showAdView2"
                      src={api_link.GET_IMAGE + `${this.state.stuffToShow}`}
                      style={{ height: "40vh", width: "40vh" }}
                      alt="avatar"
                    />
                  )}
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-primary"
                  data-dismiss="modal"
                  onClick={() => this.stopVideo()}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
  stopVideo = () => {
    if (this.state.stuffToShowType === "video") {
      var video = document.getElementById("video");
      if (!video.muted) {
        video.muted = true;
      }
      video.pause();
    }
  };
}

export default DashboardPendingAds;
