import React, { Component } from "react";
import { Link } from "react-router-dom";
import api_link from "../../config.json";
import reverseDate from "./../../utils/reverse-date";
import ToolTipComponent from "./../../utils/tooltipComponent";
class PendingAds extends Component {
  state = { due: [1] };
  render() {
    return (
      <div>
        <div class="row sales">
          <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 layout-spacing ">
            <div
              class="widget widget-table-one example"
              style={{ maxheight: "48vh" }}
            >
              <div className="text-warning mt-2 mb-2">
                <b>
                  Pending ADS{" "}
                  <span className="badge badge-warning">
                    {this.props.pending.length}
                  </span>
                </b>
              </div>
              <div class="widget-content">
                <div class="table-responsive d-flex">
                  {this.props.pending && this.props.pending.length > 0 ? (
                    <table class="table" style={{ textAlign: "center" }}>
                      <thead>
                        <tr>
                          <th>
                            <div class="th-content">Ad</div>
                          </th>

                          <th>
                            <div class="th-content">Title</div>
                          </th>
                          <th>
                            <div class="th-content th-heading">Description</div>
                          </th>
                          {/* <th>
                            <div class="th-content">Link</div>
                          </th> */}
                          <th>
                            <div class="th-content">Views</div>
                          </th>
                          <th>
                            <div class="th-content">Clicks</div>
                          </th>

                          <th>
                            <div class="th-content">Ad Created At</div>
                          </th>
                          <th>
                            <div className="th-content">View Insights</div>
                          </th>
                          <th>
                            <div class="th-content">Status</div>
                          </th>
                          <th>
                            <div class="th-content">Action</div>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.props.pending &&
                          this.props.pending.map((pointer) => (
                            <tr>
                              <td>
                                {pointer.type === "video" ? (
                                  <video
                                    data-toggle="modal"
                                    data-target="#showAdView2"
                                    autoPlay
                                    loop
                                    muted
                                    style={{ height: "80px", width: "80px" }}
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
                                        data-target="#showAdView2"
                                        src={
                                          api_link.GET_IMAGE + `${pointer.file}`
                                        }
                                        style={{
                                          width: "70px",
                                          height: "70px",
                                        }}
                                        onClick={() =>
                                          this.setState({
                                            stuffToShow: pointer.file,
                                            stuffToShowType: pointer.type,
                                          })
                                        }
                                        alt="avatar"
                                      />
                                    </div>
                                  </Link>
                                )}
                              </td>
                              <td>{pointer.title}</td>
                              <td>
                                <ToolTipComponent
                                  string={pointer.description}
                                />
                              </td>
                              {/* <td>
                                <a
                                  href={pointer.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  active
                                >
                                  Show Link
                                </a>
                              </td> */}
                              <td>{pointer.views.length}</td>
                              <td>{pointer.clicks.length}</td>

                              <td>
                                <div class="td-content product-brand">
                                  {reverseDate(
                                    pointer.createdAt === undefined
                                      ? null
                                      : pointer.createdAt.substring(
                                          0,
                                          pointer.createdAt.indexOf("T")
                                        )
                                  )}
                                </div>
                              </td>
                              <td>
                                <Link
                                  to={`/en-admin/individual-ad-insight/${pointer._id}`}
                                  className="btn btn-secondary"
                                >
                                  <i class="fas fa-chart-line"></i> View
                                  Insights
                                </Link>
                              </td>
                              <td>
                                <div class="td-content">
                                  {" "}
                                  <span class="badge outline-badge-warning">
                                    Pending
                                  </span>
                                </div>
                              </td>
                              <td>
                                <div class="td-content">
                                  {" "}
                                  <button
                                    className="btn btn-outline-success"
                                    onClick={() =>
                                      this.props.approveAds(pointer._id)
                                    }
                                  >
                                    Approve
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  ) : (
                    <div
                      class="m-auto "
                      style={{
                        verticalAlign: "middle",
                        fontSize: "35px",
                        fontWeight: "500",
                      }}
                    >
                      No Pending Ads To Display
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="modal fade"
          id="showAdView2"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
          data-backdrop="static"
        >
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">
                  AD View
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
                {this.state.stuffToShowType &&
                this.state.stuffToShowType === "video" ? (
                  <div>
                    <video
                      data-toggle="modal"
                      data-target="#showAdView2"
                      autoPlay
                      loop
                      muted
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
      </div>
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

export default PendingAds;
