import React, { Component } from "react";
import axios from "axios";
import api_link from "../../../config.json";
import { Link } from "react-router-dom";
import reverseDate from "./../../../utils/reverse-date";
import BackButton from "./../../../utils/backButton";
import decrypt from "./../../../utils/Encryption/Decrypt";
class InsightsCVITable extends Component {
  state = { heading: "", ads: 0 };
  async componentDidMount() {
    const id = parseInt(this.props.match.params.id);
    const date = new Date();
    const year = date.getFullYear();
    const m = date.getMonth() + 1;
    const month = m < 10 ? "0" + m : m;
    const token = localStorage.getItem("token");
    //console.log("Pages CVI", month, year);
    const response = await axios.get(
      api_link.API_LINK +
        `admin/users/publisher/ad-insights/all/${month}/${year}`,
      {
        headers: { Authorization: token },
      }
    );
    //console.log(response);
    response["data"] = JSON.parse(decrypt(response.data.resp));
    const ads = response["data"]["ads_with_insights_counts"];
    this.setState({
      ads,
    });
    // if (this.state.ads.length > 0) {
    //   $(document).ready(function () {
    //     $("#CVITable").dataTable({});
    //   });
    // }
    // const sortByImpression = []
    //   .concat(ads)
    //   .sort((a, b) => (a.total_impressions < b.total_impressions ? 1 : -1));

    // const sortByClicks = []
    //   .concat(ads)
    //   .sort((a, b) => (a.total_clicks < b.total_clicks ? 1 : -1));
    // const sortByViews = []
    //   .concat(ads)
    //   .sort((a, b) => (a.total_views < b.total_views ? 1 : -1));
    // //console.log(sortByImpression, sortByClicks, sortByViews);
    if (id === 1) {
      this.setState({ heading: "Impressions" });
    } else if (id === 2) {
      this.setState({ heading: "Clicks" });
    } else if (id === 3) {
      this.setState({ heading: "Views" });
    }
  }
  render() {
    return (
      <React.Fragment>
        <div id="content" class="main-content">
          <div class="layout-px-spacing">
            <div class="page-header">
              <div class="page-title">
                <div className="d-flex justify-content-between">
                  <BackButton />
                  <h3 style={{ paddingTop: "8px" }}>
                    {this.state.heading} Details
                  </h3>
                </div>
              </div>
            </div>

            <div class="row layout-spacing">
              <div
                class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 layout-spacing"
                style={{ paddingTop: "20px" }}
              >
                <div class="widget widget-table-one">
                  <div class="widget-heading">
                    <h5 class="">
                      Total :{" "}
                      <span className="badge badge-secondary">
                        {this.state.ads.length}
                      </span>
                    </h5>
                  </div>

                  <div class="widget-content">
                    <div
                      class="table-responsive example"
                      id="CVITable"
                      // style={{ height: "60vh" }}
                    >
                      <table class="table" style={{ textAlign: "center" }}>
                        <thead>
                          <tr>
                            <th>
                              <div class="th-content">Ad File</div>
                            </th>
                            <th>
                              <div class="th-content">Title</div>
                            </th>
                            <th>
                              <div class="th-content">Created At</div>
                            </th>

                            <th>
                              <div class="th-content">Link</div>
                            </th>
                            <th>
                              <div class="th-content">Package</div>
                            </th>
                            <th>
                              <div class="th-content">{this.state.heading}</div>
                            </th>
                          </tr>
                        </thead>
                        {this.state.ads < 1 ? (
                          <div className="text-center"> </div>
                        ) : (
                          <tbody>
                            {this.state.ads &&
                              this.state.ads.map((pointer) => (
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
                                          data-target="#insightdetailview"
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
                                              data-target="#insightdetailview"
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
                                      {reverseDate(
                                        pointer.createdAt.substring(
                                          0,
                                          pointer.createdAt.indexOf("T")
                                        )
                                      )}
                                    </div>
                                  </td>

                                  <td>
                                    <div class="td-content">
                                      <a href={`\\${pointer.link}`}>
                                        Click To Visit
                                      </a>
                                    </div>
                                  </td>
                                  <td>
                                    <span className="badge outline-badge-secondary">
                                      {pointer.user_package}
                                    </span>
                                  </td>
                                  <td>
                                    <div class="td-content">
                                      {this.state.heading === "Impressions" && (
                                        <span
                                          className="badge badge-secondary"
                                          style={{ fontSize: "2vh" }}
                                        >
                                          {pointer.total_impressions}
                                        </span>
                                      )}
                                      {this.state.heading === "Clicks" && (
                                        <span
                                          className="badge badge-secondary"
                                          style={{ fontSize: "2vh" }}
                                        >
                                          {pointer.total_clicks}
                                        </span>
                                      )}
                                      {this.state.heading === "Views" && (
                                        <span
                                          className="badge badge-secondary"
                                          style={{ fontSize: "2vh" }}
                                        >
                                          {pointer.total_views}
                                        </span>
                                      )}
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
            <div class="footer-section f-section-2"></div>
          </div>
        </div>

        <div
          class="modal fade"
          id="insightdetailview"
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
                      data-target="#insightdetailview"
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

export default InsightsCVITable;
