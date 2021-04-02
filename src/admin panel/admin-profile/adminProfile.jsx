import React, { Component } from "react";
import axios from "axios";
import api_link from "../../config.json";
import { ToastContainer, toast } from "react-toastify";
import userImage from "../default-user.jpg";
import reverseDate from "./../../utils/reverse-date";
import { Link } from "react-router-dom";
import decrypt from "./../../utils/Encryption/Decrypt";
import encrypt from "./../../utils/Encryption/Encrypt";

import "./profile.css";
class AdminProfile extends Component {
  state = {
    data2: {},
    passwordData: { passwordChange: 1 },
    passwordMessage: "",
    passwordStatus: 0,
    selectedFile: "",
    data: [],
    editProfile: false,
    username: "",
    cashflow: "",
    profileData: {},
  };
  handleCashflowChange = async () => {
    const token = localStorage.getItem("token");
    var response = await axios.put(
      api_link.API_LINK + "admin/cashflow",
      {},
      {
        headers: { Authorization: token },
      }
    );
    response["data"] = JSON.parse(decrypt(response["data"]["resp"]));
    // console.log(response);
    if (response.data.status === 200) {
      this.getCashFlow();
    }
    // if (this.state.cashflow === true) {
    //   this.setState({ cashflow: false });
    // } else {
    //   this.setState({ cashflow: true });
    // }
  };
  componentDidMount = async () => {
    this.getProfileData();
    this.getCashFlow();
  };
  getCashFlow = async () => {
    const token = localStorage.getItem("token");
    var response = await axios.get(api_link.API_LINK + "admin/cashflow", {
      headers: { Authorization: token },
    });
    response["data"] = JSON.parse(decrypt(response["data"]["resp"]));
    // console.log(response);
    if (response["data"]["status"] === 200) {
      if (response["data"]["message"] === "false") {
        this.setState({ cashflow: false });
      } else {
        this.setState({ cashflow: true });
      }
    }
  };
  getProfileData = async () => {
    const token = localStorage.getItem("token");

    // console.log(token);
    try {
      let response = await axios.get(api_link.API_LINK + "profile", {
        headers: { Authorization: token },
      });
      response["data"] = JSON.parse(decrypt(response.data.resp));
      // console.log(response);
      const data = response["data"]["profile"];
      const profileData = { ...this.state.profileData };
      profileData["lastname"] = response["data"]["profile"].lastname;
      profileData["firstname"] = response["data"]["profile"].firstname;
      profileData["email"] = response["data"]["profile"].email;
      this.setState({ profileData });
      const username = data.firstname + " " + data.lastname;

      // console.log(data);
      this.setState({ editProfile: false, data: data, username: username });
    } catch (e) {
      // console.log(e);
    }
  };
  handleProfileChange = ({ currentTarget: input }) => {
    const data = { ...this.state.profileData };
    data[input.name] = input.value;
    this.setState({ profileData: data });
    // console.log(this.state.profileData);
  };
  updateAdvertiserProfile = async (e) => {
    e.preventDefault();
    const data = { ...this.state.profileData };
    const format = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!data["email"].match(format)) {
      toast.error("Invalid Email Format", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      try {
        const token = localStorage.getItem("token");
        let response = await axios.put(
          api_link.API_LINK + "auth/update/admin-id",
          {
            user_ID: encrypt(JSON.stringify({ id: this.state.data._id })),
            name: encrypt(JSON.stringify(this.state.profileData)),
          },
          { headers: { Authorization: token } }
        );
        response["data"] = JSON.parse(decrypt(response.data.resp));
        if (response["data"]["status"] === 200) {
          toast.success("Profile Updated", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          this.getProfileData();
        } else {
          toast.error(response["data"]["message"], {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      } catch (e) {
        // console.log(e);
      }
    }
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
      toast.error("Select an image to upload ", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      fd.append("profile_image", this.state.selectedFile);
      const response = await axios.post(
        api_link.API_LINK + "profile/image",
        fd,
        {
          headers: { Authorization: token },
        }
      );
      // console.log(response);
      response["data"] = JSON.parse(decrypt(response["data"]["resp"]));
      const status = response["data"]["status"];
      if (status === 200) {
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
        this.getProfileData();
      } else {
        toast.error("Error Updating Image", {
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
    // console.log(this.state.passwordData);
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
    // console.log(file);
    if (!file || file === "" || file == null) {
      window.$("#imagePreview").modal("hide");
    } else {
      // console.log("else running", file);
      window.$("#imagePreview").modal("show");
      reader.readAsDataURL(file);
    }
  };
  matchPassword = ({ currentTarget: input }) => {
    const passData = { ...this.state.passwordData };

    if (input.value === passData["newPassword"]) {
      passData["confirmPassword"] = input.value;
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
    // console.log(token);
    // for (var key in data) {
    //   fd.append(key, data[key]);
    // }
    try {
      const response = await axios.put(
        api_link.API_LINK + "updatePassword",
        { name: encrypt(JSON.stringify(this.state.passwordData)) },
        { headers: { Authorization: token } }
      );
      // console.log(response);
      response["data"] = JSON.parse(decrypt(response.data.resp));
      if (response["status"] === 200) {
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

          // const response2 = await axios.get(api_link.API_LINK + "profile", {
          //   headers: { Authorization: token },
          // });
          // console.log(response2);
          // const data = response2["data"]["profile"];
          // console.log(data);
          this.setState({ passwordStatus: 0, passwordMessage: "" });
        } else {
          toast.error(response["data"]["message"], {
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

          // const response2 = await axios.get(api_link.API_LINK + "profile", {
          //   headers: { Authorization: token },
          // });
          // console.log(response2);
          // const data = response2["data"]["profile"];
          // console.log(data);
          this.setState({ passwordStatus: 0, passwordMessage: "" });
        }
      }
    } catch (e) {
      // console.log(e);
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
  handleChange2 = ({ currentTarget: input }) => {
    const data2 = { ...this.state.data2 };
    data2[input.name] = input.value;
    this.setState({ data2 });
    // console.log(this.state.data2);
  };
  addCategory = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const fd = new FormData();
    fd.append("name", this.state.data2["category_name"]);

    try {
      await axios.post(api_link.API_LINK + "/admin/add-category", fd, {
        headers: { Authorization: token },
      });

      // console.log(response);
      document.getElementById("cat_name").value = "";
    } catch (e) {
      // console.log(e);
    }
  };
  render() {
    return this.state.data ? (
      <div id="content" class="main-content">
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
        <div
          class="modal fade"
          id="editAdminProfile"
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
                  <img
                    src="https://img.icons8.com/color/48/000000/customer-skin-type-7.png"
                    alt="img"
                  />{" "}
                  Update Profile
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
                <form>
                  <div class="form-group">
                    <label for="exampleInputPassword1">Name</label>
                    <input
                      type="text"
                      class="form-control"
                      id="exampleInputPassword1"
                      defaultValue={this.state.username}
                    />
                  </div>
                  <div class="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input
                      type="email"
                      class="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      defaultValue={this.state.data.email}
                    />
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" class="btn btn-primary">
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
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
                  style={{ height: "530px" }}
                >
                  {this.state.editProfile === false ? (
                    <>
                      {" "}
                      <div class="d-flex justify-content-between">
                        <h3 class="">Info</h3>
                        <span
                          class="mt-2 edit-profile"
                          onClick={() => this.setState({ editProfile: true })}
                          style={{ cursor: "pointer" }}
                          data-toggle="tooltip"
                          title="Edit Profile"
                        >
                          {" "}
                          <svg
                            // data-toggle="modal"
                            // data-target="#editAdminProfile"
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
                        </span>
                      </div>
                      <div class="text-center user-info">
                        <div class="container">
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

                        <p class="">
                          {this.state.data.firstname} {this.state.data.lastname}
                        </p>
                      </div>
                      <div class="user-info-list mt-4">
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
                              {this.state.data.createdAt &&
                                reverseDate(
                                  this.state.data.createdAt.substring(
                                    0,
                                    this.state.data.createdAt.indexOf("T")
                                  )
                                )}
                            </li>

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
                              {this.state.data.email}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </>
                  ) : (
                    //Edit Profile
                    <>
                      {" "}
                      <div class="d-flex justify-content-between">
                        <h3 class="">Edit Profile </h3>
                        <Link
                          to="#"
                          class="mt-3 btn btn-danger"
                          onClick={() => this.setState({ editProfile: false })}
                          style={{ padding: "2px 10px", borderRadius: "50%" }}
                        >
                          {" "}
                          x
                        </Link>
                      </div>
                      <form>
                        <div class="form-group">
                          <label for="exampleInputEmail1">First Name</label>
                          <input
                            type="text"
                            class="form-control"
                            name="firstname"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            defaultValue={this.state.data.firstname}
                            onChange={this.handleProfileChange}
                          />
                        </div>
                        <div class="form-group">
                          <label for="exampleInputEmail1">Last Name</label>
                          <input
                            type="text"
                            class="form-control"
                            id="exampleInputEmail1"
                            name="lastname"
                            defaultValue={this.state.data.lastname}
                            aria-describedby="emailHelp"
                            onChange={this.handleProfileChange}
                          />
                        </div>
                        <div class="form-group">
                          <label for="exampleInputPassword1">Email</label>
                          <input
                            type="email"
                            class="form-control"
                            name="email"
                            defaultValue={this.state.data.email}
                            id="exampleInputPassword1"
                            onChange={this.handleProfileChange}
                          />
                        </div>
                        <button
                          class="btn btn-secondary"
                          onClick={this.updateAdvertiserProfile}
                        >
                          Save Changes
                        </button>
                      </form>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div class="col-xl-8 col-lg-6 col-md-7 col-sm-12 layout-top-spacing">
              <div
                class="widget widget-card-two mb-3 d-none"
                style={{ paddingBottom: "35px" }}
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
                                    alt="preview"
                                  />
                                ) : null}
                                <div style={{ textAlign: "center" }}>
                                  <div class="" style={{ textAlign: "center" }}>
                                    <input
                                      type="file"
                                      id="image"
                                      class="form-control"
                                      data-max-file-size="2M"
                                      accept="image/x-png,image/gif,image/jpeg"
                                      // data-toggle="modal"
                                      // data-target="#imagePreview"
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
                class="widget widget-card-two mb-3 "
                style={{ paddingBottom: "35px" }}
              >
                <div class="widget-content">
                  <div class="media">
                    <div class="media-body">
                      <h5>Application Settings</h5>
                    </div>
                  </div>

                  <div class="card-bottom-section">
                    <div className="row text-center">
                      <div className="col-xl-8 col-md-12 col-sm-12 col-xs-12">
                        <div
                          style={{
                            fontSize: "16px",
                            fontWeight: "bold",
                            paddingTop: "12px",
                          }}
                        >
                          {" "}
                          Cashflow Section In Masoon Mobile Applications
                        </div>
                      </div>
                      <div className="col-xl-4 col-md-12 col-sm-12 col-xs-12 d-flex justify-content-between">
                        <label
                          className="text-dark"
                          style={{ fontWeight: "bold" }}
                        >
                          Disable
                        </label>
                        <label class="switch s-icons s-outline s-outline-secondary ml-2 mr-2">
                          {this.state.cashflow === true ? (
                            <input
                              type="checkbox"
                              checked={true}
                              data-toggle="modal"
                              data-target="#cashflowDialog"
                            />
                          ) : (
                            <input
                              type="checkbox"
                              checked={false}
                              data-toggle="modal"
                              data-target="#cashflowDialog"
                            />
                          )}
                          <span class="slider"></span>
                        </label>
                        <label
                          className="text-dark"
                          style={{ fontWeight: "bold" }}
                        >
                          Enable
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="widget widget-card-two" style={{ height: "545px" }}>
                <div class="widget-content">
                  <div class="media">
                    <div class="media-body">
                      <h5>CHANGE PASSWORD</h5>
                      {/* <p class="meta-date-time">Bronx, NY</p> */}
                    </div>
                  </div>

                  <div class="card-bottom-section">
                    <div className="row">
                      {/* <div className="col-md-3">
                        <p className="text-left pl-2">
                          <b>
                            {" "}
                            Changing your sign in password is an easy way to
                            keep your account secure.
                          </b>
                        </p>
                      </div> */}
                      <div className="col-md-8 m-auto">
                        <form
                          id="contact"
                          class="section contact"
                          style={{ marginBottom: "20px" }}
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
                                          for="country "
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
                                          for="address "
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
        <div
          class="modal fade"
          id="cashflowDialog"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">
                  Message
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
                {this.state.cashflow === true ? (
                  <h5>
                    Users will be not able to access cashflow section in their
                    mobile applications, do you really want to disable it?
                  </h5>
                ) : (
                  <h5>
                    Users will be able to access cashflow section in their
                    mobile applications, do you really want to enable it?
                  </h5>
                )}
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-danger"
                  data-dismiss="modal"
                  style={{ backgroundColor: "#e7515a", color: "white" }}
                >
                  Close
                </button>
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={this.handleCashflowChange}
                  style={{ backgroundColor: "#5c1ac3", color: "white" }}
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : null;
  }
}

export default AdminProfile;
