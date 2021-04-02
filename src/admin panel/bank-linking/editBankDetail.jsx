import React, { Component } from "react";
import axios from "axios";
import api_link from "../../config.json";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import reverseDate from "./../../utils/reverse-date";
import BackButton from "./../../utils/backButton";
import encrypt from "./../../utils/Encryption/Encrypt";
import decrypt from "./../../utils/Encryption/Decrypt";
class EditBankDetail extends Component {
  state = { account: [], bank_logo: "", data: {} };
  async componentDidMount() {
    this.retrieveAccount();
  }
  retrieveAccount = async () => {
    const token = localStorage.getItem("token");
    const bankId = this.props.match.params.id;
    var obj = { bank_id: bankId };
    obj = encrypt(JSON.stringify(obj));
    try {
      let response = await axios.put(
        api_link.API_LINK + "admin/account/retrieve-id",
        { name: obj },
        {
          headers: { Authorization: token },
        }
      );
      response["data"] = JSON.parse(decrypt(response.data.resp));
      // console.log(response);
      this.setState({ account: response["data"]["account"] });
      //console.log(response);
      this.setState({ show: true });
    } catch (e) {
      //console.log(e);
    }
  };
  fileupload = async (event) => {
    this.setState({
      bank_logo: event.target.files[0],
      imageUploadSelect: false,
    });

    event.preventDefault();

    let reader = new FileReader();
    let file = event.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result,
      });
    };

    reader.readAsDataURL(file);
  };
  uploadImage = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const bankId = this.props.match.params.id;
    var fd = new FormData();
    if (this.state.bank_logo === "") {
      toast.error("Please select an icon", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      fd.append("logo", this.state.bank_logo);
      fd.append("bank_id", encrypt(JSON.stringify({ id: bankId })));
      var response = await axios.put(
        api_link.API_LINK + "admin/account/update-logo-id",
        fd,
        { headers: { Authorization: token } }
      );
      response["data"] = JSON.parse(decrypt(response.data.resp));
      //console.log(response["data"]);
      if (response["data"]["status"] === 200) {
        toast.success("Icon Updated", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        try {
          this.retrieveAccount();
          document.getElementById("image").value = null;
        } catch (e) {
          //console.log(e);
        }
      }
    }
  };
  handleChange = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data });
    //console.log(this.state.data);
  };
  updateBankInfo = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const bankId = this.props.match.params.id;
    var data = this.state.data;
    data["bank_id"] = bankId;
    data = encrypt(JSON.stringify(data));
    // var fd = new FormData();
    // fd.append("logo", this.state.bank_logo);
    let response = await axios.put(
      api_link.API_LINK + "admin/account/update-id",
      { name: data },
      { headers: { Authorization: token } }
    );
    //console.log(response);
    response["data"] = JSON.parse(decrypt(response.data.resp));
    if (response["data"]["status"] === 200) {
      toast.success("Info Updated", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      try {
        this.retrieveAccount();
        this.setState({ show: true });
      } catch (e) {
        //console.log(e);
      }
    }
  };
  render() {
    return (
      <React.Fragment>
        {this.state.show === true ? (
          <div id="content" class="main-content">
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
                  <div className="d-flex justify-content-between">
                    <BackButton />
                    <h3 style={{ paddingTop: "8px" }}>Bank Edit Profile</h3>
                  </div>
                </div>
              </div>

              <div class="row layout-spacing">
                {/* Content */}
                <div class="col-xl-4 col-lg-6 col-md-5 col-sm-12 layout-top-spacing">
                  <div class="user-profile layout-spacing">
                    <div class="widget-content widget-content-area">
                      <div class="d-flex justify-content-between">
                        <h3 class="">Bank Info</h3>
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
                        <img
                          style={{
                            display: "block",
                            marginLeft: "auto",
                            marginRight: "auto",
                            height: "22vh",
                            width: "22vh",
                          }}
                          src={`${api_link.GET_IMAGE}${
                            this.state.account && this.state.account.logo
                          }`}
                          alt="avatar"
                        />

                        <p class="">
                          {this.state.account && this.state.account.name}
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
                              {reverseDate(
                                this.state.account &&
                                  this.state.account.createdAt.substring(
                                    0,
                                    this.state.account.createdAt.indexOf("T")
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
                                class="feather feather-globe"
                              >
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="2" y1="12" x2="22" y2="12"></line>
                                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                              </svg>
                              {/* <a
                                href={
                                  this.state.account && this.state.account.url
                                }
                                rel="noopener noreferrer"
                                target="_blank"
                                style={{ fontSize: "14px" }}
                              > */}{" "}
                              {this.state.account && this.state.account.url}
                              {/* </a> */}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-xl-8 col-lg-6 col-md-7 col-sm-12 layout-top-spacing">
                  <div
                    class="widget widget-card-two mb-3"
                    style={{ paddingBottom: "35px" }}
                  >
                    <div class="widget-content">
                      <div class="media">
                        <div class="media-body">
                          <h5>Update Icon</h5>
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

                  <hr></hr>
                  <div className="widget widget-card-two">
                    <div className="widget-content">
                      <form
                        id="contact"
                        class="section contact"
                        style={{ marginBottom: "20px" }}
                      >
                        <div class="info">
                          <h4 class="">Update Other Info</h4>
                          <div class="row">
                            <div class="col-md-11 mx-auto">
                              <div class="row">
                                <div class="col-md-6">
                                  <div class="form-group">
                                    <label for="country">Bank Name</label>
                                    <input
                                      class="form-control mb-4"
                                      id="bank_name"
                                      name="name"
                                      type="text"
                                      defaultValue={
                                        this.state.account &&
                                        this.state.account.name
                                      }
                                      onChange={this.handleChange}
                                    />
                                  </div>
                                </div>
                                <div class="col-md-6">
                                  <div class="form-group">
                                    <label for="address">Bank API Url</label>
                                    <input
                                      class="form-control"
                                      id="bank_api_url"
                                      name="url"
                                      type="text"
                                      defaultValue={
                                        this.state.account &&
                                        this.state.account.url
                                      }
                                      onChange={this.handleChange}
                                    />
                                  </div>
                                </div>
                                <div class="col-3 col-md-4 col-sm-6">
                                  <div class="form-group">
                                    <button
                                      className="btn btn-secondary btn-block"
                                      onClick={this.updateBankInfo}
                                    >
                                      Save Changes
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

export default EditBankDetail;
