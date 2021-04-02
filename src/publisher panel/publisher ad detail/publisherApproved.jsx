import React, { Component } from "react";
import { Link } from "react-router-dom";
import api_link from "../../config.json";
import errorImage from "./../../Global Image/errorImage";
class PublisherApproved extends Component {
  state = {};
  render() {
    return (
      <div>
        <div class="row sales">
          <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 layout-spacing ">
            <div
              class="widget widget-table-one example"
              style={{ maxheight: "48vh" }}
            >
              <div className="text-success mt-2 mb-2">
                <b>Approved ADS</b>{" "}
                <span className="badge badge-success">
                  {this.props.approved && this.props.approved.length}
                </span>
              </div>
              <div class="widget-content">
                <div class="table-responsive d-flex">
                  {this.props.approved && this.props.approved.length > 0 ? (
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
                          <th>
                            <div class="th-content">Link</div>
                          </th>
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
                            <div class="th-content">Status</div>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.props.approved &&
                          this.props.approved.map((pointer) => (
                            <tr>
                              <td>
                                {pointer.type === "video" ? (
                                  <video
                                    autoPlay
                                    muted
                                    loop
                                    style={{ height: "80px", width: "80px" }}
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
                              <td>{pointer.description}</td>
                              <td>
                                <a
                                  href={pointer.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  active
                                >
                                  Show Link
                                </a>
                              </td>
                              <td>{pointer.views.length}</td>
                              <td>{pointer.clicks.length}</td>

                              <td>
                                <div class="td-content product-brand">
                                  {pointer.createdAt === undefined
                                    ? null
                                    : pointer.createdAt.substring(
                                        0,
                                        pointer.createdAt.indexOf("T")
                                      )}
                                </div>
                              </td>

                              <td>
                                <div class="td-content">
                                  {" "}
                                  <span class="badge outline-badge-success">
                                    Approved
                                  </span>
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
                      <img
                        src={errorImage}
                        style={{ height: "70px" }}
                        alt="error"
                      />{" "}
                      No Data To Display
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/**Modal */}
        <div
          class="modal fade"
          id="showAdView"
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
                {this.state.stuffToShowType &&
                this.state.stuffToShowType === "video" ? (
                  <div className="text-center">
                    <video
                      data-toggle="modal"
                      data-target="#showAdView2"
                      autoPlay
                      muted
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

export default PublisherApproved;
