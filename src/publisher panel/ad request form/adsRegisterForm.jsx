import React, { Component } from "react";
import axios from "axios";
import api_link from "../../config.json";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import decrypt from "./../../utils/Encryption/Decrypt";
import encrypt from "./../../utils/Encryption/Encrypt";
class AdsRegisterForm extends Component {
  state = {
    adfile: "",
    show: "false",
    data: { link: "" },
    pricingSelect: false,
    imageUploadSelect: false,
    disapperImage: false,
    disapperVideo: false,
    publisherStatus: "",
    remaining_count: null,
    postButton: true,
  };
  componentDidMount = async () => {
    const token = localStorage.getItem("token");
    const publisherStatus = localStorage.getItem("publisherStatus");
    //console.log(publisherStatus);
    let resp1 = await axios.get(api_link.API_LINK + "notice/user-packages", {
      headers: { Authorization: token },
    });
    // //console.log(resp1);
    resp1["data"] = JSON.parse(decrypt(resp1.data.resp));
    this.setState({
      user_packages: resp1["data"]["user_Packages"],
      publisherStatus,
    });
    if (resp1["data"]["user_Packages"].length > 0) {
      this.setState({
        package_status: resp1["data"]["user_Packages"][0]["status"],
      });
    }

    try {
      let response = await axios.get(
        api_link.API_LINK + "notice/remaining-ads",
        {
          headers: { Authorization: token },
        }
      );
      // //console.log(response);
      response["data"] = JSON.parse(decrypt(response.data.resp));
      const remaining_count = response["data"]["remaining_ads_count"];
      this.setState({ remaining_count: remaining_count });
    } catch (e) {
      //console.log(e);
    }
    this.setState({ show: true });
  };
  fileupload = (event) => {
    this.setState({ adfile: event.target.files[0], imageUploadSelect: false });
    let type = "";
    if (
      event.target.files[0].name.substring(
        event.target.files[0].name.lastIndexOf(".") + 1
      ) === "gif"
    ) {
      type = "gif";
    } else {
      type = "image";
    }

    event.preventDefault();

    let reader = new FileReader();
    let file = event.target.files[0];
    var _URL = window.URL || window.webkitURL;

    if ((file = event.target.files[0])) {
      var img = new Image();
      var objectUrl = _URL.createObjectURL(file);

      img.onload = () => {
        // alert(img.width + " " + img.height);
        // setImage({ cImgHeight: this.height, cImgWidth: this.width });
        this.setState({ imgHeight: img.height, imgWidth: img.width });
        _URL.revokeObjectURL(objectUrl);
      };

      img.src = objectUrl;
    }

    setTimeout(() => this.viewImageDetails(), 1000);
    reader.onloadend = () => {
      this.setState({
        file: file,
        type: type,
        imagePreviewUrl: reader.result,
      });
    };

    reader.readAsDataURL(file);
  };
  viewImageDetails = async () => {
    if (
      parseInt(this.state.imgHeight && this.state.imgHeight) >
        parseInt(this.state.imgWidth && this.state.imgWidth) ||
      parseInt(this.state.imgHeight && this.state.imgHeight) ===
        parseInt(this.state.imgWidth && this.state.imgWidth)
    ) {
      this.setState({ postButton: true });
    } else {
      toast.error(
        "The image File is not suitable , please select an image width should not be greater than image height ",
        {
          position: "top-center",
          autoClose: 10000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
      this.setState({ postButton: false });
    }
  };
  fileupload2 = async (event) => {
    this.setState({ imagePreviewUrl: "" });

    if (event.target.files[0].size > 2000000) {
      toast.error("File Too large", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      document.getElementById("adFile").value = "";
      this.setState({
        adfile: "",
        imageUploadSelect: false,
        imagePreviewUrl: "",
      });
    } else {
      this.setState({
        adfile: event.target.files[0],
        type: "video",
        imageUploadSelect: true,
      });
      //console.log(event.target.files[0]);
      // event.preventDefault();

      let reader = new FileReader();
      let file = event.target.files[0];

      reader.onloadend = () => {
        this.setState({
          file: file,
          imagePreviewUrl: reader.result,
        });
      };

      reader.readAsDataURL(file);
    }
  };
  handleChange = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data });
    //console.log(this.state.data);
  };
  postRequest = async () => {
    if (
      (this.state.data.title &&
        this.state.data.description &&
        this.state.imagePreviewUrl) ||
      this.state.imagePreviewUrl != null ||
      this.state.imagePreviewUrl !== undefined
    ) {
      const fd = new FormData();
      fd.append("file", this.state.adfile);
      fd.append(
        "user_package_id",
        encrypt(JSON.stringify(this.state.user_packages[0]._id))
      );
      fd.append("type", encrypt(JSON.stringify(this.state.type)));
      const data = this.state.data;
      for (var key in data) {
        fd.append(key, encrypt(JSON.stringify(data[key])));
      }
      //console.log(fd);
      const token = localStorage.getItem("token");
      try {
        let response = await axios.post(api_link.API_LINK + "notice", fd, {
          headers: { Authorization: token },
        });
        // //console.log(response);
        response["data"] = JSON.parse(decrypt(response.data.resp));
        if (response["data"]["status"] === 200) {
          toast.success("Request Posted ", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setTimeout(() => {
            this.props.history.push("/en-publisher/advertisement-details");
          }, 3000);
        } else {
          toast.error("Error Posting Ad", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      } catch (e) {
        //console.log(e);
      }
    } else {
      toast.error("Please Provide the required details", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  setPackageId = (id) => {
    //console.log(id);
    this.setState({ packageId: id });
  };
  pageChange = () => {
    this.setState({ pricingSelect: true });
  };
  render() {
    return (
      <div id="content" class="main-content">
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

        <div class="">
          <div class="">
            <div
              className="row"
              style={{ marginLeft: "0px", marginRight: "0px" }}
            >
              <div className="col-md-12">
                <div class="page-header">
                  <div class="page-title">
                    <h3>Ad Posting Form</h3>
                  </div>
                </div>
              </div>
            </div>

            {(this.state.user_packages &&
              this.state.user_packages.length === 0) ||
            this.state.package_status === "Pending" ||
            this.state.package_status === "Expired" ? (
              <div
                class="jumbotron"
                style={{
                  marginLeft: "25px",
                  marginRight: "25px",
                  marginTop: "25px",
                }}
              >
                <h1 class="display-4">Package Alert!</h1>
                {this.state.package_status &&
                  this.state.package_status === "Pending" &&
                  this.state.publisherStatus === "Pending" && (
                    <h5 class="lead">
                      The package you selected is under approval. Kindly pay the
                      amount for the selected package to continue.
                    </h5>
                  )}
                {this.state.package_status &&
                  this.state.package_status === "Pending" &&
                  this.state.publisherStatus === "Approved" && (
                    <h5 class="lead">
                      The package you selected is under approval.
                    </h5>
                  )}
                {this.state.package_status &&
                  this.state.package_status === "Approved" &&
                  this.state.publisherStatus === "Pending" && (
                    <h5 class="lead">
                      The package you selected is under approval.
                    </h5>
                  )}

                {this.state.package_status &&
                  this.state.package_status === "Expired" && (
                    <div>
                      <h5 class="lead">
                        Your Current Package is Expired, Request a renewal or
                        Upgrade your package.
                      </h5>
                      <Link
                        to="/en-publisher/manage-packages"
                        className="btn btn-secondary"
                      >
                        Request Renewal
                      </Link>
                    </div>
                  )}
                {!this.state.package_status && (
                  <h5 class="lead">
                    We didn't found any Ad Package assigned to you.
                  </h5>
                )}

                {this.state.package_status &&
                  this.state.package_status === "Pending" &&
                  null}
                {!this.state.package_status && (
                  <p style={{ fontSize: "2vh" }}>
                    Please select an ad package of your choice and wait for the
                    approval request, after your request is approved you can
                    post ads accordingly.
                  </p>
                )}
                {!this.state.package_status && (
                  <p class="lead">
                    <Link
                      to="/en-publisher/manage-packages"
                      class="btn btn-primary btn-lg"
                      role="button"
                    >
                      Add Package
                    </Link>
                  </p>
                )}
              </div>
            ) : (
              this.state.user_packages &&
              this.state.user_packages.length > 0 && (
                <React.Fragment>
                  {this.state.remaining_count === 0 ? (
                    <div class="alert alert-danger" role="alert">
                      You have reached your posting limit , can't more ads.
                    </div>
                  ) : null}
                  {this.state.remaining_count === 1 ? (
                    <div class="alert alert-warning" role="alert">
                      You have remaining one Ad left to post
                    </div>
                  ) : null}
                  <div
                    className="row"
                    style={{
                      marginLeft: "0px",
                      marginRight: "0px",
                      height: "100vh",
                    }}
                  >
                    <div className=" col-xl-6 col-md-6 col-sm-12">
                      <div class="widget widget-table-one mt-3">
                        <div class="widget-content">
                          <div class="">
                            <div class="">
                              <h1 class="">Ad Request Form</h1>
                              <p class="">Add details about your ADS</p>

                              <form class="text-left" action="dashboard.html">
                                <div class="form">
                                  <div
                                    id="username-field"
                                    class="field-wrapper input"
                                  >
                                    <label for="username">Title</label>
                                    <input
                                      id="ad title"
                                      name="title"
                                      type="text"
                                      class="form-control"
                                      placeholder="Your AD title"
                                      onChange={this.handleChange}
                                    />
                                  </div>

                                  <div
                                    id="password-field"
                                    class="field-wrapper input mb-2"
                                  >
                                    <div class="d-flex justify-content-between">
                                      <label for="password">Description</label>
                                    </div>

                                    <textarea
                                      class="form-control"
                                      id="description"
                                      rows="3"
                                      name="description"
                                      placeholder="Describe your Ad"
                                      onChange={this.handleChange}
                                    ></textarea>
                                  </div>
                                  <div
                                    id="password-field"
                                    class="field-wrapper input mb-2"
                                  >
                                    {this.state.disapperImage ===
                                    true ? null : (
                                      <React.Fragment>
                                        <div class="d-flex justify-content-between">
                                          <label for="password">
                                            Upload Image AD File
                                          </label>
                                        </div>
                                        <form>
                                          <div class="form-group">
                                            <input
                                              type="file"
                                              class="form-control-file"
                                              id="exampleFormControlFile1"
                                              name="adFile"
                                              data-max-file-size="2M"
                                              accept="image/x-png,image/gif,image/jpeg"
                                              onChange={this.fileupload}
                                              onClick={() =>
                                                this.setState({
                                                  disapperVideo: true,
                                                })
                                              }
                                            />
                                          </div>
                                        </form>
                                      </React.Fragment>
                                    )}
                                    {this.state.disapperVideo ===
                                    true ? null : (
                                      <React.Fragment>
                                        {this.state.disapperImage === true ||
                                        this.state.disapperVideo ===
                                          true ? null : (
                                          <label
                                            for="password"
                                            style={{ fontSize: "2vh" }}
                                          >
                                            OR
                                          </label>
                                        )}
                                        <br></br>
                                        <label for="password">
                                          Upload Video Ad file
                                        </label>
                                        <form>
                                          <div class="form-group">
                                            <input
                                              type="file"
                                              class="form-control-file"
                                              id="adFile"
                                              name="adFile"
                                              data-max-file-size="2M"
                                              accept="video/mp4"
                                              onChange={this.fileupload2}
                                              onClick={() =>
                                                this.setState({
                                                  disapperImage: true,
                                                })
                                              }
                                            />
                                          </div>
                                        </form>
                                      </React.Fragment>
                                    )}
                                  </div>
                                  <div
                                    id="password-field"
                                    class="field-wrapper input mb-2"
                                  >
                                    <div class="d-flex justify-content-between">
                                      <label for="password">
                                        Link (optional)
                                      </label>
                                    </div>

                                    <input
                                      class="form-control"
                                      id="link"
                                      name="link"
                                      placeholder="Place Link here!"
                                      onChange={this.handleChange}
                                    />
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="m-auto col-md-8">
                                    <button
                                      type="button"
                                      className="btn btn-lg btn-block btn-secondary"
                                      onClick={this.postRequest}
                                      disabled={
                                        this.state.postButton === false ||
                                        this.state.remaining_count === 0
                                          ? true
                                          : false
                                      }
                                    >
                                      Post Request
                                    </button>
                                  </div>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {this.state.imagePreviewUrl ? (
                      <div className="col-xl-6 col-md-6 col-sm-12">
                        <div class="widget widget-table-one mt-3">
                          <div className="widget-content">
                            <h1 class="">Your AD Preview</h1>

                            <div style={{ textAlign: "center" }}>
                              {this.state.imageUploadSelect === false ? (
                                <img
                                  src={this.state.imagePreviewUrl}
                                  style={{
                                    width: "100%",
                                    height: "59vh",
                                  }}
                                  alt="img"
                                />
                              ) : (
                                <video
                                  autoPlay
                                  loop
                                  style={{
                                    height: "30vh",
                                    width: "50vh",
                                  }}
                                  controls
                                >
                                  {" "}
                                  <source
                                    src={this.state.imagePreviewUrl}
                                    type="video/mp4"
                                  />
                                </video>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </React.Fragment>
              )
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default AdsRegisterForm;
