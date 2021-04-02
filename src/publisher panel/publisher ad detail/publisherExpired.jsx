import React, { Component } from "react";
import { Link } from "react-router-dom";
import api_link from "../../config.json";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import decrypt from "./../../utils/Encryption/Decrypt";
import encrypt from "./../../utils/Encryption/Encrypt";
import errorImage from "./../../Global Image/errorImage";
class PublisherExpiredAds extends Component {
  state = { remaining_ads: [] };
  async componentDidMount() {
    const token = localStorage.getItem("token");
    let response = await axios.get(api_link.API_LINK + "notice/remaining-ads", {
      headers: { Authorization: token },
    });
    // //console.log(response);
    response["data"] = JSON.parse(decrypt(response.data.resp));
    this.setState({ remaining_ads: response["data"]["remaining_ads_count"] });
  }
  requestRestore = async (id) => {
    const token = localStorage.getItem("token");
    if (this.state.remaining_ads === 0) {
      alert(
        "You have already reached your posting limit , this request can't proceed!"
      );
    } else {
      let response = await axios.put(
        api_link.API_LINK + "notice/renew-ad-id",
        { name: encrypt(JSON.stringify({ ad_id: id })) },
        { headers: { Authorization: token } }
      );
      //console.log(response);
      response["data"] = JSON.parse(decrypt(response.data.resp));
      if (response["data"]["status"] === 200) {
        toast.success("Requested for renewal", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => window.location.reload(), 3000);
      }
    }
  };
  render() {
    return (
      <div>
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
        <div class="row sales">
          <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 layout-spacing ">
            <div
              class="widget widget-table-one example"
              style={{ maxheight: "48vh" }}
            >
              <div className="text-danger mt-2 mb-2">
                <b>Expired ADS</b>{" "}
                <span className="badge badge-danger">
                  {this.props.expired && this.props.expired.length}
                </span>
              </div>
              <div class="widget-content">
                <div class="table-responsive d-flex">
                  {this.props.expired && this.props.expired.length > 0 ? (
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
                          <th>
                            <div class="th-content">Action</div>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.props.expired &&
                          this.props.expired.map((pointer) => (
                            <tr>
                              <td>
                                {pointer.type === "video" ? (
                                  <video
                                    data-toggle="modal"
                                    data-target="#showAdView4"
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
                                        data-target="#showAdView4"
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
                                  <span class="badge outline-badge-dark">
                                    Expired
                                  </span>
                                </div>
                              </td>
                              <td>
                                {" "}
                                <div class="td-content">
                                  <button
                                    className="btn btn-outline-primary"
                                    onClick={() =>
                                      this.requestRestore(pointer._id)
                                    }
                                    disabled={
                                      this.props.status === "Expired"
                                        ? true
                                        : false
                                    }
                                  >
                                    Request Restore
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
          id="showAdView4"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
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
                  <div className="text-center">
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

export default PublisherExpiredAds;
