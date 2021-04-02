import React, { Component } from "react";
import { Link } from "react-router-dom";
import api_link from "../../../config.json";
import errorImage from "./../../../Global Image/errorImage";
class MostClickedTable extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div class="table-responsive d-flex" style={{ height: "500px" }}>
          {this.props.data && this.props.data.length > 0 ? (
            <table class="table">
              <thead>
                <tr>
                  <th>
                    <div class="th-content">Ad</div>
                  </th>
                  <th>
                    <div class="th-content">Title</div>
                  </th>
                  <th>
                    <div class="th-content th-heading">Clicks</div>
                  </th>
                  <th>
                    <div class="th-content th-heading">Created At</div>
                  </th>
                  <th>
                    <div class="th-content">Link</div>
                  </th>
                  <th>
                    <div class="th-content">Package </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {this.props.data &&
                  this.props.data.map((pointer) => (
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
                              data-target="#insightdetailview1010"
                              onClick={() =>
                                this.setState({
                                  stuffToShow: pointer.file,
                                  stuffToShowType: pointer.type,
                                })
                              }
                            >
                              {" "}
                              <source
                                src={api_link.GET_IMAGE + pointer.file}
                                type="video/mp4"
                              />
                            </video>
                          ) : (
                            <Link to="#">
                              <div class="td-content customer-name">
                                <img
                                  data-toggle="modal"
                                  data-target="#insightdetailview1010"
                                  src={api_link.GET_IMAGE + `${pointer.file}`}
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
                        <div class="td-content">
                          <span class="pricing">{pointer.title}</span>
                        </div>
                      </td>
                      <td>
                        <div class="td-content">
                          <span class="pricing">
                            <span
                              className="badge badge-secondary"
                              style={{ fontSize: "1.5vh" }}
                            >
                              {pointer.total_clicks}
                            </span>
                          </span>
                        </div>
                      </td>
                      <td>
                        <div class="td-content">
                          <span class="discount-pricing">
                            {pointer.createdAt.substring(
                              0,
                              pointer.createdAt.indexOf("T")
                            )}
                          </span>
                        </div>
                      </td>
                      <td>
                        <div class="td-content">
                          <Link to={pointer.link}>Click to Visit</Link>
                        </div>
                      </td>

                      <td>
                        <span className="badge outline-badge-secondary">
                          {pointer.user_package}
                        </span>
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
              <img src={errorImage} style={{ height: "70px" }} alt="error" /> No
              Data To Display
            </div>
          )}
        </div>
        <div
          class="modal fade"
          id="insightdetailview1010"
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
                  </div>
                ) : (
                  <img
                    src={api_link.GET_IMAGE + `${this.state.stuffToShow}`}
                    style={{ height: "40vh", width: "40vh" }}
                    alt="avatar"
                  />
                )}
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                  style={{ color: "white", backgroundColor: "#1b55e2" }}
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

export default MostClickedTable;
