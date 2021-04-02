import React, { Component } from "react";
import api_link from "../../../config.json";
import axios from "axios";
import { Link } from "react-router-dom";
import BackButton from "./../../../utils/backButton";
import ToolTipComponent from "./../../../utils/tooltipComponent";
import $ from "jquery";
import decrypt from "./../../../utils/Encryption/Decrypt";
class DashboardPopularAds extends Component {
  state = { most_popular_ads: [] };
  async componentDidMount() {
    const token = localStorage.getItem("token");
    const response = await axios.get(api_link.API_LINK + "admin/dashboard", {
      headers: { Authorization: token },
    });
    response["data"] = JSON.parse(decrypt(response["data"]["resp"]));
    const most_popular_ads = response["data"]["most_popular_ads"];

    const sorted_most_popular = []
      .concat(most_popular_ads)
      .sort((a, b) => (a.clicks.length < b.clicks.length ? 1 : -1))
      .slice(0, 5);
    this.setState({
      most_popular_ads: sorted_most_popular.slice(0, 5),
    });
    // console.log(response);
    if (this.state.most_popular_ads.length > 0) {
      $(document).ready(function () {
        $("#popularAds").dataTable({});
      });
    }
  }
  reverseDate(str) {
    return str.split("-").reverse().join("/");
  }
  render() {
    return (
      <React.Fragment>
        <div id="content" class="main-content">
          <div class="layout-px-spacing">
            <div class="page-header">
              <div class="page-title">
                <div className="d-flex justify-content-between">
                  <BackButton onClick={() => window.history.go(-1)} />
                  <h3 style={{ paddingTop: "8px" }}>Most Popular Ads</h3>
                </div>
              </div>
            </div>
            <div class="row analytics layout-top-spacing">
              <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 layout-spacing">
                <div class="widget widget-table-two">
                  <div class="widget-heading">
                    <h5 class="">
                      Total Ads :{" "}
                      <span className="badge badge-secondary">
                        {this.state.most_popular_ads.length}
                      </span>
                    </h5>
                  </div>

                  <div class="widget-content">
                    <div class="table-responsive">
                      <table class="table" id="popularAds">
                        <thead>
                          <tr>
                            <th>
                              <div class="th-content">Ad file</div>
                            </th>
                            <th>
                              <div class="th-content">Ad Title</div>
                            </th>
                            <th>
                              <div class="th-content">Ad Description</div>
                            </th>
                            {/* <th>
                              <div class="th-content">Ad Link</div>
                            </th> */}
                            <th>
                              <div class="th-content">Creation Date</div>
                            </th>
                            <th>
                              <div class="th-content">Expiry Date</div>
                            </th>
                            <th>
                              <div class="th-content">Clicks</div>
                            </th>
                            {/* <th>
                              <div class="th-content">Views</div>
                            </th> */}
                            <th>
                              <div class="th-content">Type</div>
                            </th>
                            <th>
                              <div class="th-content">Status</div>
                            </th>
                            <th>
                              <div
                                class="th-content"
                                style={{ textAlign: "center" }}
                              >
                                Other
                              </div>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.most_popular_ads.map((pointer) => (
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
                                      data-target="#pendingPageAdView"
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
                                          api_link.GET_IMAGE + `${pointer.file}`
                                        }
                                        type="video/mp4"
                                      />
                                    </video>
                                  ) : (
                                    <Link to="#">
                                      <div class="td-content customer-name">
                                        <img
                                          data-toggle="modal"
                                          data-target="#pendingPageAdView"
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
                                  <ToolTipComponent
                                    string={pointer.description}
                                  />
                                </div>
                              </td>
                              {/* <td>
                                <div class="td-content">
                                  <Link to={pointer.link}>Click To View</Link>
                                </div>
                              </td> */}
                              <td>
                                <div class="td-content">
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
                                  {this.reverseDate(
                                    pointer.expiresAt.substring(
                                      0,
                                      pointer.expiresAt.indexOf("T")
                                    )
                                  )}
                                </div>
                              </td>
                              <td>
                                <div class="td-content">
                                  <span class="badge badge-secondary">
                                    {pointer.clicks.length}
                                  </span>
                                </div>
                              </td>
                              {/* <td>
                                <div class="td-content">
                                  <span class="badge badge-secondary">
                                    {pointer.views}
                                  </span>
                                </div>
                              </td> */}
                              <td>
                                <div class="td-content">
                                  <span class="badge outline-badge-success">
                                    {pointer.type === "video"
                                      ? "Video"
                                      : "Image"}
                                  </span>
                                </div>
                              </td>
                              <td>
                                <div class="td-content">
                                  {pointer.status === "Approved" ? (
                                    <span class="badge outline-badge-success">
                                      Approved
                                    </span>
                                  ) : null}
                                  {pointer.status === "Pending" ? (
                                    <span class="badge outline-badge-warning">
                                      Pending
                                    </span>
                                  ) : null}
                                  {pointer.status === "Blocked" ? (
                                    <span class="badge outline-badge-danger">
                                      Blocked
                                    </span>
                                  ) : null}
                                  {pointer.status === "Expired" ? (
                                    <span class="badge outline-badge-dark">
                                      Expired
                                    </span>
                                  ) : null}
                                </div>
                              </td>
                              <td>
                                <div class="td-content">
                                  <button
                                    className="btn btn-outline-secondary"
                                    onClick={() =>
                                      this.props.history.push(
                                        "/en-admin/publisher-detail/" +
                                          pointer.user_id
                                      )
                                    }
                                  >
                                    Show Advertiser
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
        <div
          class="modal fade"
          id="pendingPageAdView"
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
                      data-target="#pendingPageAdView"
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

export default DashboardPopularAds;
