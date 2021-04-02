import React, { Component } from "react";
import axios from "axios";
import api_link from "../../config.json";
import userImage from "../../admin panel/default-user.jpg";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import "./publisherProfile.css";
import arabicEndpoint from "./../../utils/arabicEndpoint";
import decrypt from "./../../utils/Encryption/Decrypt";
import encrypt from "./../../utils/Encryption/Encrypt";

class PublisherProfile extends Component {
  state = {
    data: [],
    passwordData: { passwordChange: 1 },
    passwordMessage: "",
    passwordStatus: 0,
    selectedFile: "",
    show: false,
  };
  componentDidMount = async () => {
    this.getProfile();
  };
  getProfile = async () => {
    const token = localStorage.getItem("token");

    //console.log(token);
    try {
      const response = await axios.get(api_link.API_LINK + "profile", {
        headers: { Authorization: token },
      });
      // //console.log(response);
      response["data"] = JSON.parse(decrypt(response.data.resp));
      const data = response["data"]["profile"];
      //console.log(data);
      this.setState({ data: data, passwordStatus: 0, passwordMessage: "" });
    } catch (e) {
      //console.log(e);
    }
    this.setState({ show: true });
  };
  uploadImage = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    var fd = new FormData();
    if (
      !this.state.selectedFile ||
      this.state.selectedFile === "" ||
      this.state.selectedFile == null
    ) {
      toast.error("Select a suitable image", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      fd.append("profile_image", this.state.selectedFile);

      try {
        let response = await axios.post(
          api_link.API_LINK + "profile/image",
          fd,
          {
            headers: { Authorization: token },
          }
        );
        //console.log(response);
        response["data"] = JSON.parse(decrypt(response["data"]["resp"]));

        const status = response["data"]["status"];

        if (status === 200) {
          // window.location.reload();
          toast.success("Profile Image Updated ", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          this.setState({ imagePreviewUrl: null });
          this.getProfile();
        }
        document.getElementById("image").value = "";
      } catch (e) {
        toast.error("Error Updating Picture", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };
  handleChange = ({ currentTarget: input }) => {
    const data = { ...this.state.passwordData };
    data[input.name] = input.value;
    this.setState({ passwordData: data });
    //console.log(this.state.passwordData);
  };
  fileupload = (event) => {
    this.setState({ selectedFile: event.target.files[0] });
    let reader = new FileReader();
    let file = event.target.files[0];

    reader.onloadend = () => {
      this.setState({
        imagePreviewUrl: reader.result,
      });
    };

    if (!file || file === "" || file == null) {
      window.$("#imagePreview").modal("hide");
    } else {
      //console.log("else running", file);
      window.$("#imagePreview").modal("show");
      reader.readAsDataURL(file);
    }
  };
  matchPassword = ({ currentTarget: input }) => {
    const passData = { ...this.state.passwordData };

    if (input.value === passData["newPassword"]) {
      passData["confirm_password"] = input.value;
      this.setState({
        passwordData: passData,
        passwordStatus: 1,
        passwordMessage: "Passwords Matched",
      });
    } else {
      this.setState({
        passwordStatus: 1,
        passwordMessage: "Passwords Not Matched",
      });
    }
  };
  updatePassword = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    //console.log(token);
    // var fd = new FormData();
    // const data = this.state.passwordData;
    // for (var key in data) {
    //   fd.append(key, data[key]);
    // }
    try {
      let response = await axios.put(
        api_link.API_LINK + "updatePassword",
        { name: encrypt(JSON.stringify(this.state.passwordData)) },
        { headers: { Authorization: token } }
      );
      // //console.log(response);
      response["data"] = JSON.parse(decrypt(response.data.resp));
      if (response["data"]["status"] === 200) {
        toast.success("Password Updated", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        document.getElementById("newPassword").value = "";
        document.getElementById("confirmPassword").value = "";
        document.getElementById("currentPassword").value = "";

        this.getProfile();
      } else {
        toast.success(response["data"]["message"], {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (e) {
      //console.log(e);
      toast.error("Error Password Updated", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  changeLanguage = async () => {
    const token = localStorage.getItem("token");
    // const value = document.getElementById("inlineCheckbox1").value;
    //console.log(value);
    const response = await axios.put(
      api_link.API_LINK + "language/change",
      {},
      { headers: { Authorization: token } }
    );
    if (response.data.status === 200) {
      toast.success("Language Changed", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      localStorage.setItem("lang", "ar");
      setTimeout(() => {
        window.location.href = `${arabicEndpoint}/changing-language/Publisher/${token}/ar`;
      }, 2000);
    }
  };
  render() {
    return (
      <React.Fragment>
        {this.state.show === true ? (
          <div id="content" class="main-content">
            {!this.state.data["profile_image"] ? (
              <div class="alert alert-warning" role="alert">
                Please Upload Your Profile Picture!
              </div>
            ) : (
              <span></span>
            )}
            {/*Image Upload*/}
            <div
              class="modal fade"
              id="imagePreview"
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
                      Image Preview
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
                  <div class="modal-body">
                    {this.state.imagePreviewUrl != null ? (
                      <img
                        style={{
                          display: "block",
                          marginLeft: "auto",
                          marginRight: "auto",
                          height: "30vh",
                          width: "30vh",
                        }}
                        // src={
                        //   this.state.data.profile_image
                        //     ? `${api_link.GET_IMAGE}` +
                        //       `${this.state.data["profile_image"]}`
                        //     : userImage
                        // }
                        src={this.state.imagePreviewUrl}
                        alt="profile"
                      />
                    ) : null}
                  </div>
                  <div
                    class="modal-footer"
                    style={{ textAlign: "center", display: "inline" }}
                  >
                    {/* <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button> */}
                    <div>
                      {" "}
                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-dismiss="modal"
                        style={{
                          color: "#fff !important",
                          backgroundColor: "#5c1ac3",
                          borderColor: "#5c1ac3",
                        }}
                        onClick={this.uploadImage}
                      >
                        Save changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*ImageUpload Ends*/}

            <ToastContainer
              position="top-center"
              autoClose={3000}
              hideProgressBar
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
            <div class="layout-px-spacing">
              <div class="page-header">
                <div class="page-title">
                  <h3>Profile</h3>
                </div>
              </div>

              <div class="row layout-spacing">
                {/* Content */}
                <div class="col-xl-4 col-lg-6 col-md-5 col-sm-12 layout-top-spacing">
                  <div class="user-profile layout-spacing">
                    <div
                      class="widget-content widget-content-area"
                      style={{ height: "630px" }}
                    >
                      <div class="d-flex justify-content-between">
                        <h3 class="">Info</h3>
                        <Link
                          to="#"
                          class="mt-2 edit-profile"
                          style={{ visibility: "hidden" }}
                        >
                          {" "}
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
                            class="feather feather-edit-3"
                          >
                            <path d="M12 20h9"></path>
                            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                          </svg>
                        </Link>
                      </div>
                      <div class="text-center user-info">
                        <div className="container">
                          <div
                            onClick={() =>
                              document.getElementById("image").click()
                            }
                          >
                            <img
                              src={
                                this.state.data.profile_image
                                  ? `${api_link.GET_IMAGE}` +
                                    `${this.state.data["profile_image"]}`
                                  : userImage
                              }
                              alt="Avatar"
                              class="image"
                              style={{
                                display: "block",
                                marginLeft: "auto",
                                marginRight: "auto",
                                height: "22vh",
                                width: "22vh",
                              }}
                            />
                            <div class="middle">
                              <div class="text">
                                <i class="fas fa-camera"></i> Change Picture
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* <img
                          style={{
                            display: "block",
                            marginLeft: "auto",
                            marginRight: "auto",
                            height: "22vh",
                            width: "22vh",
                          }}
                          src={
                            this.state.data["profile_image"]
                              ? `${api_link.GET_IMAGE}` +
                                `${this.state.data["profile_image"]}`
                              : userImage
                          }
                          alt="avatar"
                        /> */}

                        <p class="">
                          {this.state.data.firstname} {this.state.data.lastname}
                        </p>
                      </div>
                      <div class="user-info-list">
                        <div class="">
                          <ul class="contacts-block list-unstyled">
                            <li class="contacts-block__item">
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
                                class="feather feather-calendar"
                              >
                                <rect
                                  x="3"
                                  y="4"
                                  width="18"
                                  height="18"
                                  rx="2"
                                  ry="2"
                                ></rect>
                                <line x1="16" y1="2" x2="16" y2="6"></line>
                                <line x1="8" y1="2" x2="8" y2="6"></line>
                                <line x1="3" y1="10" x2="21" y2="10"></line>
                              </svg>
                              {this.state.data.createdAt}
                            </li>
                            {/* <li class="contacts-block__item">
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
                                                                class="feather feather-map-pin"
                                                            >
                                                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                                                <circle
                                                                    cx="12"
                                                                    cy="10"
                                                                    r="3"
                                                                ></circle>
                                                            </svg>
                                                            New York, USA
                                                        </li> */}
                            <li class="contacts-block__item">
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
                                class="feather feather-mail"
                              >
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                <polyline points="22,6 12,13 2,6"></polyline>
                              </svg>
                              <span
                                style={{
                                  fontSize: "1.5vh",
                                }}
                              >
                                {this.state.data.email}
                              </span>
                            </li>
                          </ul>
                          <div className="text-center mt-2">
                            <label
                              class="form-check-label "
                              for="inlineCheckbox1"
                              style={{ fontSize: "2vh" }}
                            >
                              <b className="text-secondary"> Select Language</b>
                            </label>
                          </div>
                          <div className="text-center">
                            <div class="form-check form-check-inline">
                              <input
                                class="form-check-input"
                                type="radio"
                                id="inlineCheckbox1"
                                // onChange={this.changeLanguage}
                                value="en"
                                name="language"
                                defaultChecked={
                                  this.state.data.language === "en"
                                    ? true
                                    : false
                                }
                              />
                              <label
                                class="form-check-label mt-0"
                                for="inlineCheckbox1"
                                style={{ fontSize: "2vh" }}
                              >
                                English
                              </label>
                            </div>
                            <div class="form-check form-check-inline">
                              <input
                                class="form-check-input"
                                type="radio"
                                id="inlineCheckbox1"
                                // onChange={this.changeLanguage}
                                value="ar"
                                name="language"
                                defaultChecked={
                                  this.state.data.language === "ar"
                                    ? true
                                    : false
                                }
                              />
                              <label
                                class="form-check-label mt-0"
                                for="inlineCheckbox2"
                                style={{ fontSize: "2vh" }}
                              >
                                العربية
                              </label>
                            </div>
                            <div className="text-center mt-2">
                              <button
                                className="btn btn-sm btn-secondary"
                                type="btn"
                                onClick={this.changeLanguage}
                              >
                                Update Language
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-xl-8 col-lg-6 col-md-7 col-sm-12 layout-top-spacing ">
                  <div
                    class="widget widget-card-two d-none"
                    style={{ height: "630px" }}
                    // style={{  }}
                  >
                    <div class="widget-content">
                      <div class="media">
                        <div class="media-body">
                          <h5>CHANGE PICTURE</h5>
                        </div>
                      </div>

                      <div class="card-bottom-section">
                        <div className="row text-center">
                          <div className="col-md-12">
                            <form
                              id="general-info"
                              class="section general-info"
                              style={{ marginBottom: "20px" }}
                            >
                              <div class="info">
                                {/* <h5 class="">Change Picture</h5> */}
                                <div class="row">
                                  <div className="col-md-8 m-auto">
                                    {this.state.imagePreviewUrl != null ? (
                                      <img
                                        style={{
                                          display: "block",
                                          marginLeft: "auto",
                                          marginRight: "auto",
                                          height: "15vh",
                                          width: "15vh",
                                        }}
                                        // src={
                                        //   this.state.data.profile_image
                                        //     ? `${api_link.GET_IMAGE}` +
                                        //       `${this.state.data["profile_image"]}`
                                        //     : userImage
                                        // }
                                        src={this.state.imagePreviewUrl}
                                        alt="profile"
                                      />
                                    ) : null}
                                    <div style={{ textAlign: "center" }}>
                                      <div
                                        class=""
                                        style={{ textAlign: "center" }}
                                      >
                                        <input
                                          type="file"
                                          id="image"
                                          class="form-control"
                                          data-max-file-size="2M"
                                          accept="image/x-png,image/gif,image/jpeg"
                                          onChange={this.fileupload}
                                          onClick={() =>
                                            this.setState({
                                              selectedFile: "",
                                              imagePreviewUrl: null,
                                            })
                                          }
                                        />
                                        <p
                                          class="mt-2"
                                          style={{
                                            cursor: "pointer",
                                          }}
                                          // onClick={this.uploadImage}
                                        >
                                          <button
                                            className="btn btn-sm btn-secondary"
                                            onClick={this.uploadImage}
                                          >
                                            <span style={{ fontSize: "14px" }}>
                                              {" "}
                                              Update
                                            </span>
                                          </button>
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    class="widget widget-card-two"
                    style={{ paddingBottom: "35px", height: "630px" }}
                  >
                    <div class="widget-content">
                      <div class="media">
                        <div class="media-body">
                          <h5>CHANGE PASSWORD</h5>
                          {/* <p class="meta-date-time">Bronx, NY</p> */}
                        </div>
                      </div>

                      <div class="card-bottom-section">
                        <div className="row">
                          <div className="col-md-8 m-auto">
                            <form
                              id="contact"
                              class="section contact"
                              style={{ marginBottom: "20px", padding: "15px" }}
                            >
                              <div class="info">
                                <h5 class="">Update Password</h5>
                                <div class="row">
                                  <div class="col-md-11 mx-auto">
                                    <div class="row">
                                      <div class="col-md-12">
                                        <div class="form-group">
                                          <div className="text-left">
                                            <label
                                              for="location"
                                              style={{
                                                color: "black",
                                                fontWeight: "700",
                                              }}
                                            >
                                              Current Password
                                            </label>
                                          </div>
                                          <input
                                            class="form-control mb-4"
                                            id="currentPassword"
                                            name="currentPassword"
                                            type="password"
                                            onChange={this.handleChange}
                                          />
                                        </div>
                                      </div>
                                      <div class="col-md-12">
                                        <div class="form-group">
                                          <div className="text-left">
                                            <label
                                              for="country"
                                              style={{
                                                color: "black",
                                                fontWeight: "700",
                                              }}
                                            >
                                              New Password
                                            </label>
                                          </div>
                                          <input
                                            class="form-control"
                                            id="newPassword"
                                            name="newPassword"
                                            type="password"
                                            onChange={this.handleChange}
                                          />
                                        </div>
                                      </div>
                                      <div class="col-md-12">
                                        <div class="form-group">
                                          <div className="text-left">
                                            <label
                                              for="address"
                                              style={{
                                                color: "black",
                                                fontWeight: "700",
                                              }}
                                            >
                                              Confirm Password
                                            </label>
                                          </div>
                                          <input
                                            class="form-control mb-4"
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            type="password"
                                            onChange={this.matchPassword}
                                          />
                                        </div>
                                        {this.state.passwordStatus === 1 ? (
                                          <div
                                            class="alert alert-info"
                                            role="alert"
                                          >
                                            {this.state.passwordMessage}
                                          </div>
                                        ) : null}
                                      </div>

                                      <div class="col-md-6 m-auto">
                                        <div class="form-group">
                                          <button
                                            className="btn btn-secondary btn-block"
                                            onClick={this.updatePassword}
                                            style={{
                                              marginTop: "30px",
                                            }}
                                          >
                                            Update{" "}
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
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
        ) : null}
      </React.Fragment>
    );
  }
}

export default PublisherProfile;
