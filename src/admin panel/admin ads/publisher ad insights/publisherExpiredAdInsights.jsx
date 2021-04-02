import React, { Component } from "react";
import api_link from "../../../config.json";
import axios from "axios";
import { Link } from "react-router-dom";
import BackButton from "./../../../utils/backButton";
import reverseDate from "./../../../utils/reverse-date";
import PAIGPieChart from "./publisher ad insights graphs/paigPieChart";
import ToolTipComponent from "./../../../utils/tooltipComponent";
import encrypt from "./../../../utils/Encryption/Encrypt";
import decrypt from "./../../../utils/Encryption/Decrypt";

class PublisherExpiredAdInsights extends Component {
  state = {
    total_clicks: 0,
    total_views: 0,
    total_impressions: 0,
    ad: {},
    showInsight: true,
  };
  componentDidMount = async () => {
    const id = this.props.match.params.id;
    const token = localStorage.getItem("token");
    let response = await axios.put(
      api_link.API_LINK + `notice/expired/ad-insights-id`,
      { name: encrypt(JSON.stringify({ id: id })) },
      { headers: { Authorization: token } }
    );
    response["data"] = JSON.parse(decrypt(response.data.resp));
    const ad = response.data.ad;
    const total_clicks = response.data.total_clicks;
    const total_views = response.data.total_views;
    const total_impressions = response.data.total_impressions;
    this.setState({ total_clicks, total_views, total_impressions, ad });
  };
  render() {
    return (
      <React.Fragment>
        <div id="content" className="main-content">
          <div
            className=""
            style={{ paddingBottom: "30px ", paddingLeft: "30px" }}
          >
            <div className="page-header">
              <div className="page-title">
                <div className="d-flex justify-content-between">
                  <BackButton />
                  <h3 style={{ paddingTop: "8px" }}>Expired Ad Insights</h3>
                </div>
              </div>
            </div>
          </div>
          <div
            className="row layout-spacing"
            style={{
              marginRight: "0px",
              marginLeft: "0px",
              marginTop: "10px",
            }}
          >
            <div className="col-md-12">
              {/* ADS*/}
              <div className="widget widget-table-one">
                <div className="widget-heading">
                  <Link to="/en-admin/dashboard-pending-ads">
                    {" "}
                    <h5 className="">Advertisement</h5>
                  </Link>
                </div>

                <div className="widget-content example">
                  <div
                    className="table-responsive "
                    style={{ maxheight: "40vh" }}
                  >
                    <table
                      className="table"
                      style={{ textAlign: "center" }}
                      id="mydatatabletotalads"
                    >
                      <thead>
                        <tr>
                          <th>
                            <div className="th-content">Ad File</div>
                          </th>
                          <th>
                            <div className="th-content">Title</div>
                          </th>
                          <th>
                            <div className="th-content">Description</div>
                          </th>

                          {/* <th>
                              <div className="th-content">Payment Status</div>
                            </th> */}
                          <th>
                            <div className="th-content">Status</div>
                          </th>
                          <th>
                            <div className="th-content">Created At</div>
                          </th>
                          <th>
                            <div className="th-content">Expires At</div>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <div className="td-content customer-name">
                              {this.state.ad.type === "video" ? (
                                <video
                                  autoPlay
                                  loop
                                  muted
                                  style={{
                                    height: "70px",
                                    width: "70px",
                                  }}
                                  data-toggle="modal"
                                  data-target="#insightShowAd"
                                  onClick={() =>
                                    this.setState({
                                      stuffToShow: this.state.ad.file,
                                      stuffToShowType: this.state.ad.type,
                                    })
                                  }
                                >
                                  {" "}
                                  <source
                                    src={
                                      api_link.GET_IMAGE +
                                      `${this.state.ad.file}`
                                    }
                                    type="video/mp4"
                                  />
                                </video>
                              ) : (
                                <Link to="#">
                                  <div className="td-content customer-name">
                                    <img
                                      data-toggle="modal"
                                      data-target="#insightShowAd"
                                      src={
                                        api_link.GET_IMAGE +
                                        `${this.state.ad.file}`
                                      }
                                      onClick={() =>
                                        this.setState({
                                          stuffToShow: this.state.ad.file,
                                          stuffToShowType: this.state.ad.type,
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
                            <div className="td-content product-brand">
                              {this.state.ad.title}
                            </div>
                          </td>
                          <td>
                            <div className="td-content">
                              <ToolTipComponent
                                string={this.state.ad.description}
                              />
                            </div>
                          </td>

                          <td>
                            <div className="td-content">
                              {this.state.ad.status === "Approved" ? (
                                <span className="badge outline-badge-success">
                                  Approved
                                </span>
                              ) : (
                                <span className="badge outline-badge-warning">
                                  Expired
                                </span>
                              )}
                            </div>
                          </td>
                          <td>
                            {this.state.ad.createdAt &&
                              reverseDate(
                                this.state.ad.createdAt.substring(
                                  0,
                                  this.state.ad.createdAt.indexOf("T")
                                )
                              )}
                          </td>
                          <td>
                            {this.state.ad.expiresAt &&
                              reverseDate(
                                this.state.ad.expiresAt.substring(
                                  0,
                                  this.state.ad.expiresAt.indexOf("T")
                                )
                              )}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            {this.state.showInsight === true ? (
              <div className="col-md-12 mt-5 mb-3">
                {/* ADS INSIGHTS*/}
                <div className="widget widget-table-one">
                  <div className="widget-heading">
                    <Link to="/en-admin/dashboard-pending-ads">
                      {" "}
                      <h5 className="">Overall Insight </h5>
                    </Link>
                  </div>

                  <div className="widget-content">
                    <div
                      className="table-responsive example"
                      style={{ maxheight: "65vh" }}
                    >
                      <div className="row">
                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 layout-spacing mt-2">
                          <div
                            className="d-flex justify-content-between widget-account-invoice-three"
                            style={{
                              background:
                                "linear-gradient(to right, #FFC133 0%, #FF973A 100%)",
                            }}
                          >
                            <div className="mt-2">
                              <span className="text-white">
                                <i className="fas fa-cloud-upload-alt"></i>{" "}
                                Impressions
                              </span>
                            </div>
                            <div className="mt-1">
                              <p className="text-white ">
                                {this.state.total_impressions &&
                                  this.state.total_impressions}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 layout-spacing mt-2">
                          <div className="d-flex justify-content-between widget-account-invoice-six layout-spacing">
                            <div className="mt-2">
                              <span className="text-white">
                                <i className="fas fa-mouse"></i> Clicks
                              </span>
                            </div>
                            <div className="mt-1">
                              <p className="text-white ">
                                {this.state.total_clicks &&
                                  this.state.total_clicks}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 layout-spacing mt-2">
                          <div
                            className="d-flex justify-content-between widget-account-invoice-three"
                            style={{
                              background:
                                "linear-gradient(to right, #FFC133 0%, #FF973A 100%)",
                            }}
                          >
                            <div className="mt-2">
                              <span className="text-white">
                                <i className="fas fa-eye"></i> Views
                              </span>
                            </div>
                            <div className="mt-1">
                              <p className="text-white ">
                                {this.state.total_views &&
                                  this.state.total_views}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div
                          className="col-md-4 m-auto"
                          style={{ textAlign: "center" }}
                        >
                          <PAIGPieChart
                            total_impressions={
                              this.state.total_impressions &&
                              this.state.total_impressions
                            }
                            total_clicks={
                              this.state.total_clicks && this.state.total_clicks
                            }
                            total_views={
                              this.state.total_views && this.state.total_views
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
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
            <div className="footer-section f-section-2"></div>
          </div>
        </div>
        <div
          className="modal fade"
          id="insightShowAd"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">
                  Modal title
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body" style={{ textAlign: "center" }}>
                {this.state.stuffToShowType &&
                this.state.stuffToShowType === "video" ? (
                  <div className="text-center">
                    <video
                      data-toggle="modal"
                      data-target="#showAdView2"
                      mute
                      loop
                      style={{ height: "32vh", width: "32vh" }}
                      controls
                      id="video"
                    >
                      {" "}
                      <source
                        src={api_link.GET_IMAGE + `${this.state.stuffToShow}`}
                        type="video/mp4"
                      />
                    </video>
                  </div>
                ) : (
                  <img
                    data-toggle="modal"
                    data-target="#showAdView2"
                    src={api_link.GET_IMAGE + `${this.state.stuffToShow}`}
                    style={{ height: "32vh", width: "32vh" }}
                    alt="avatar"
                  />
                )}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
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

export default PublisherExpiredAdInsights;
