import React, { Component } from "react";
import { Link } from "react-router-dom";
import api_link from "../../config.json";
import "datatables.net-dt/js/dataTables.dataTables";
// import "datatables.net-dt/css/jquery.dataTables.min.css";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import ToolTipComponent from "./../../utils/tooltipComponent";
import $ from "jquery";
import reverseDate from "./../../utils/reverse-date";
import encrypt from "./../../utils/Encryption/Encrypt";
import decrypt from "./../../utils/Encryption/Decrypt";
// import handlestringLength from "./../../utils/handle-string-length";
class SecondAdDetail extends Component {
  state = { actualAds: [] };
  handlestringLength = (string) => {
    const temp = [];
    var result = "";
    for (var letter in string) {
      temp.push(string[letter]);
    }
    if (temp.length > 10) {
      for (let i = 0; i < 10; i++) {
        result += temp[i];
      }
      return result + "...";
    } else {
      return string;
    }
  };
  componentDidMount() {
    setTimeout(() => {
      this.setState({ actualAds: this.props.ads });
      if (this.state.actualAds.length > 0) {
        $(document).ready(function () {
          $("#mydatatableblocked").dataTable({});
        });
      }
    }, 3000);
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
      this.props.getData();
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
        <table
          id="mydatatableblocked"
          className="table table-hover non-hover"
          style={{ width: "100%", textAlign: "center" }}
        >
          <thead>
            <tr>
              <th>AD</th>
              <th>Created</th>
              <th>Title</th>
              <th>Description</th>
              <th>Clicks</th>
              <th>Views</th>
              {/* <th>Link</th> */}
              <th>Expiry</th>
              <th>Status</th>
              <th style={{ textAlign: "center" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.props.ads.map((pointer) => (
              <tr>
                <td>
                  <div className="td-content customer-name">
                    {pointer.type === "video" ? (
                      <video
                        autoPlay
                        loop
                        muted
                        style={{
                          height: "70px",
                          width: "70px",
                          pointer: "cursor",
                        }}
                        data-toggle="modal"
                        data-target="#showSecondAdView101"
                        onClick={() =>
                          this.setState({
                            stuffToShow: pointer.file,
                            stuffToShowType: pointer.type,
                          })
                        }
                      >
                        {" "}
                        <source
                          src={api_link.GET_IMAGE + `${pointer.file}`}
                          type="video/mp4"
                        />
                      </video>
                    ) : (
                      <Link to="#">
                        <div className="td-content customer-name">
                          <img
                            data-toggle="modal"
                            data-target="#showSecondAdView101"
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
                  {pointer.createdAt &&
                    reverseDate(
                      pointer.createdAt.substring(
                        0,
                        pointer.createdAt.indexOf("T")
                      )
                    )}
                </td>
                <td>{pointer.title}</td>
                <td>
                  <ToolTipComponent string={pointer.description} />
                </td>
                <td>{pointer.clicks.length}</td>
                <td>{pointer.views.length}</td>
                {/* <td>
                      <Link to={pointer.Link}>Click Here</Link>
                    </td> */}
                <td>
                  {pointer.expiresAt &&
                    reverseDate(
                      pointer.expiresAt.substring(
                        0,
                        pointer.expiresAt.indexOf("T")
                      )
                    )}
                </td>
                <td>
                  {pointer.status === "Approved" ? (
                    <span className="badge badge-success">
                      {pointer.status}
                    </span>
                  ) : (
                    <span className="badge badge-warning">
                      {pointer.status}
                    </span>
                  )}
                </td>
                <td style={{ textAlign: "center" }}>
                  <button
                    type="button"
                    className="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split"
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
                      className="feather feather-chevron-down"
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </button>
                  <div
                    className="dropdown-menu"
                    style={{ willChange: "transform" }}
                  >
                    <Link
                      to={`#`}
                      // className="btn btn-outline-secondary mt-1 btn-sm"
                      onClick={() => this.approveAD(pointer._id)}
                      className="dropdown-item"
                    >
                      Approve Ad
                    </Link>
                    <Link
                      to={`/en-admin/publisher-detail/${pointer.user_id}`}
                      // className="btn btn-outline-secondary mt-1 btn-sm"
                      className="dropdown-item"
                    >
                      Show Advertiser
                    </Link>
                  </div>

                  {/* <button className="btn btn-outline-dark ml-2 mt-1">
                        Notify Publisher
                      </button> */}

                  {/* <Link
                        to={`/en-admin/publisher-detail/${pointer.user_id}`}
                        className="btn btn-outline-secondary ml-2 mt-1"
                      >
                        Show Advertiser
                      </Link> */}
                  {/* <Link
                        to={`/en-admin/publishers-ad-insights/${pointer.user_id}`}
                        className="btn btn-outline-warning ml-2 mt-1"
                      >
                        Show Insights
                      </Link> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div
          className="modal fade"
          id="showSecondAdView101"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
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
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
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

export default SecondAdDetail;
