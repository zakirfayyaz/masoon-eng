import React, { Component } from "react";
import { Link } from "react-router-dom";
import api_link from "../../config.json";
import reverseDate from "./../../utils/reverse-date";
import ToolTipComponent from "./../../utils/tooltipComponent";
class BloackedAds extends Component {
  state = { due: [1] };
  render() {
    return (
      <div>
        <div className="row sales">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 layout-spacing ">
            <div
              className="widget widget-table-one example"
              style={{ maxheight: "48vh" }}
            >
              <div className="text-danger mt-2 mb-2">
                <b>
                  Blocked ADS{" "}
                  <span className="badge badge-danger">
                    {this.props.blocked.length}
                  </span>
                </b>
              </div>
              <div className="widget-content">
                <div className="table-responsive d-flex">
                  {this.props.blocked && this.props.blocked.length > 0 ? (
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
                        {this.props.blocked &&
                          this.props.blocked.map((pointer) => (
                            <tr>
                              <td>
                                {pointer.type === "video" ? (
                                  <video
                                    data-toggle="modal"
                                    data-target="#showAdView3"
                                    mute
                                    loop
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
                                    <div className="td-content customer-name">
                                      <img
                                        data-toggle="modal"
                                        data-target="#showAdView3"
                                        onClick={() =>
                                          this.setState({
                                            stuffToShow: pointer.file,
                                            stuffToShowType: pointer.type,
                                          })
                                        }
                                        src={
                                          api_link.GET_IMAGE + `${pointer.file}`
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
                                  <span className="badge outline-badge-danger">
                                    Blocked
                                  </span>
                                </div>
                              </td>
                              <td>
                                <div className="td-content">
                                  <button
                                    className="btn btn-outline-secondary"
                                    onClick={() =>
                                      this.props.unBlockAds(pointer._id)
                                    }
                                  >
                                    Unblock
                                  </button>
                                </div>
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
                      No Blocked Ads To Display
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="modal fade"
          id="showAdView3"
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

export default BloackedAds;
