import React, { Component } from "react";
import api_link from "../../config.json";
import { Link } from "react-router-dom";
import reverseDate from "./../../utils/reverse-date";
import ToolTipComponent from "./../../utils/tooltipComponent";
class ApprovedAds extends Component {
  state = { due: [1] };
  handlestringLength = (string) => {
    return string;
  };
  render() {
    return (
      <div>
        <div className="row sales">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 layout-spacing ">
            <div
              className="widget widget-table-one example"
              style={{ maxheight: "48vh" }}
            >
              <div className="text-success mt-2 mb-2">
                <b>
                  Approved ADS{" "}
                  <span className="badge badge-success">
                    {this.props.approved.length}
                  </span>
                </b>
              </div>
              <div className="widget-content">
                <div className="table-responsive d-flex">
                  {this.props.approved && this.props.approved.length > 0 ? (
                    <table className="table" style={{ textAlign: "center" }}>
                      <thead>
                        <tr>
                          <th>
                            <div className="th-content">Ad</div>
                          </th>

                          <th>
                            <div className="th-content">Title</div>
                          </th>
                          <th>
                            <div className="th-content th-heading">
                              Description
                            </div>
                          </th>
                          {/* <th>
                            <div className="th-content">Link</div>
                          </th> */}
                          <th>
                            <div className="th-content">Views</div>
                          </th>
                          <th>
                            <div className="th-content">Clicks</div>
                          </th>

                          <th>
                            <div className="th-content">Ad Created At</div>
                          </th>
                          <th>
                            <div className="th-content">View Insights</div>
                          </th>
                          <th>
                            <div className="th-content">Status</div>
                          </th>
                          <th>
                            <div className="th-content">Action</div>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.props.approved &&
                          this.props.approved.map((pointer) => (
                            <tr>
                              <td>
                                {pointer.type && pointer.type === "video" ? (
                                  <Link to="#">
                                    <video
                                      mute
                                      loop
                                      style={{ height: "90px", width: "90px" }}
                                      data-toggle="modal"
                                      data-target="#showAdView"
                                      onClick={() =>
                                        this.setState({
                                          stuffToShow: pointer.file,
                                          stuffToShowType: pointer.type,
                                        })
                                      }
                                    >
                                      {" "}
                                      <source
                                        src={`${api_link.GET_IMAGE}${pointer.file}`}
                                        type="video/mp4"
                                      />
                                    </video>
                                  </Link>
                                ) : (
                                  <Link to="#">
                                    <div className="td-content customer-name">
                                      <img
                                        data-toggle="modal"
                                        data-target="#showAdView"
                                        src={
                                          api_link.GET_IMAGE + `${pointer.file}`
                                        }
                                        onClick={() =>
                                          this.setState({
                                            stuffToShow: pointer.file,
                                            stuffToShowType: pointer.type,
                                          })
                                        }
                                        style={{
                                          width: "70px",
                                          height: "70px",
                                        }}
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
                                <div className="td-content product-brand">
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
                                  <i className="fas fa-chart-line"></i> View
                                  Insights
                                </Link>
                              </td>

                              <td>
                                <div className="td-content">
                                  {" "}
                                  <span className="badge outline-badge-success">
                                    Approved
                                  </span>
                                </div>
                              </td>
                              <td>
                                <button
                                  className="btn btn-outline-danger "
                                  onClick={() =>
                                    this.props.blockAds(pointer._id)
                                  }
                                >
                                  Block Ad
                                </button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  ) : (
                    <div
                      className="m-auto "
                      style={{
                        verticalAlign: "middle",
                        fontSize: "35px",
                        fontWeight: "500",
                      }}
                    >
                      No Approved Ads To Display
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/**Modal */}
        <div
          className="modal fade"
          id="showAdView"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
          data-backdrop="static"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">
                  Your Ad View
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
                      loop
                      mute
                      style={{ height: "32vh", width: "32vh" }}
                      controls
                      onClick={(e) => e.preventDefault()}
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
                  className="btn btn-primary"
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

export default ApprovedAds;
