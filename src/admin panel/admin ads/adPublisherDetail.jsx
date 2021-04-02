import React, { Component } from "react";
import { Link } from "react-router-dom";
import userMd from "../default-user.jpg";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import { trackPromise } from "react-promise-tracker";
import { usePromiseTracker } from "react-promise-tracker";
import Loader from "react-promise-loader";
import axios from "axios";
import api_link from "../../config.json";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import BackButton from "./../../utils/backButton";
import reverseDate from "./../../utils/reverse-date";
import encrypt from "./../../utils/Encryption/Encrypt";
import decrypt from "./../../utils/Encryption/Decrypt";
class AdPublisherDetail extends Component {
  state = {
    data: {},
    user_package: [],
    bodyLang: "en",
    editProfile: false,
    profileData: {},
  };
  async componentDidMount() {
    const token = localStorage.getItem("token");
    var obj = { user_id: this.props.match.params.user_id };
    // console.log(obj);
    obj = encrypt(JSON.stringify(obj));
    let response = await trackPromise(
      axios.put(
        api_link.API_LINK + "admin/users-id",
        {
          name: obj,
        },
        {
          headers: { Authorization: token },
        }
      )
    );
    response["data"] = JSON.parse(decrypt(response.data.resp));
    const users = response["data"]["users"];
    this.setState({
      data: users,
    });
    const profileData = { ...this.state.profileData };
    profileData["language"] = response["data"]["users"].language;
    profileData["firstname"] = response["data"]["users"].firstname;
    profileData["lastname"] = response["data"]["users"].lastname;
    profileData["phone_number"] = response["data"]["users"].phone_number;
    profileData["email"] = response["data"]["users"].email;
    this.setState({ profileData });
    // console.log(response);
    var obj1 = { user_id: this.props.match.params.user_id };
    obj1 = encrypt(JSON.stringify(obj1));
    try {
      let response = await axios.put(
        api_link.API_LINK + "admin/users/publisher-id",
        {
          name: obj1,
        },
        { headers: { Authorization: token } }
      );
      response["data"] = JSON.parse(decrypt(response.data.resp));
      // console.log("Publisher Package", response);
      this.setState({
        user_package: response["data"]["publisher_package"],
      });
    } catch (e) {
      // console.log(e);
    }
  }
  getUser = async () => {
    const token = localStorage.getItem("token");
    var obj = { user_id: this.props.match.params.user_id };
    obj = encrypt(JSON.stringify(obj));
    let response = await trackPromise(
      axios.put(
        api_link.API_LINK + "admin/users-id/",
        {
          name: obj,
        },
        {
          headers: { Authorization: token },
        }
      )
    );
    response["data"] = JSON.parse(decrypt(response.data.resp));
    const users = response["data"]["users"];
    this.setState({
      data: users,
    });
  };
  handleChange = ({ currentTarget: input }) => {
    const mail = { ...this.state.mail };
    mail[input.name] = input.value;
    this.setState({ mail });
    // console.log(this.state.mail);
  };
  sendMail = async (id) => {
    const token = localStorage.getItem("token");
    // const fd = new FormData();
    // fd.append("from", "admin@gmail.com");
    // fd.append("email", this.state.recieverEmail);
    // fd.append("status", 1);
    // fd.append("message", this.state.mail["body"]);
    // fd.append("subject", this.state.mail["subject"]);
    // console.log(this.state.data);
    var obj = {
      user_id: id,
      email: this.state.data.email,
      body: this.state.mail["body"],
      subject: this.state.mail["subject"],
    };
    // console.log(obj);
    obj = encrypt(JSON.stringify(obj));
    try {
      var response = await axios.post(
        api_link.API_LINK + "admin/notification-id",
        { name: obj },
        { headers: { Authorization: token } }
      );
      // console.log(response);
      response["data"] = JSON.parse(decrypt(response["data"]["resp"]));
      const status = response["data"]["status"];
      const message = response["data"]["message"];
      if (status === 200) {
        toast.success(message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        document.getElementById("subject").value = "";
        document.getElementById("body").value = "";
      } else {
        toast.error(message, {
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
      // toast.error(' ☹️ Error Sending Message', {
      //     position: "top-center",
      //     autoClose: 5000,
      //     hideProgressBar: true,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      //     draggable: true,
      //     progress: undefined,
      //     });
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
    // const token = localStorage.getItem("token");
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
        const response = await axios.put(
          api_link.API_LINK + "auth/update/pub/" + this.state.data._id,
          this.state.profileData,
          { headers: { Authorization: token } }
        );
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
          const response = await trackPromise(
            axios.get(
              api_link.API_LINK +
                "admin/users/" +
                this.props.match.params.user_id,
              {
                headers: { Authorization: token },
              }
            )
          );
          const users = response["data"]["users"];
          this.setState({
            data: users,
          });
          this.setState({ editProfile: false });
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
  suspend = async (id) => {
    const token = localStorage.getItem("token");
    var obj = {
      user_id: id,
    };
    obj = encrypt(JSON.stringify(obj));
    try {
      let resp = await axios.put(
        api_link.API_LINK + "admin/users/suspend-id",
        { name: obj },
        { headers: { Authorization: token } }
      );
      resp["data"] = JSON.parse(decrypt(resp.data.resp));
      if (resp["data"]["status"] === 200) {
        toast.dark("✅ Marked As Unpaid", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      // console.log(resp);

      this.getUser();
    } catch (e) {
      // console.log(e);

      toast.error("😐 Error Suspending Publisher", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  activate = async (id) => {
    const token = localStorage.getItem("token");
    var obj = { user_id: id };
    obj = encrypt(JSON.stringify(obj));
    try {
      let resp = await axios.put(
        api_link.API_LINK + "admin/users/approve-id",
        { name: obj },
        { headers: { Authorization: token } }
      );
      resp["data"] = JSON.parse(decrypt(resp.data.resp));
      if (resp["data"]["status"] === 200) {
        toast.dark("✅ Marked As Paid", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      // console.log(resp);
      this.getUser();
    } catch (e) {
      // console.log(e);
      toast.error("😐 Error", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  approveRequest = async (package_id, user_package_id) => {
    // console.log(package_id, user_package_id);
    const token = localStorage.getItem("token");
    if (this.state.data.status === "Approved") {
      var obj = { user_package_id: user_package_id, package_id: package_id };
      obj = encrypt(JSON.stringify(obj));
      await trackPromise(
        axios.put(
          api_link.API_LINK + "notice/user-packages/approve-id",
          {
            name: obj,
          },
          {
            headers: { Authorization: token },
          }
        )
      );
      // console.log(response);
      toast.dark("Request Approved", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      try {
        this.getUser();
        var obj1 = { user_id: this.props.match.params.user_id };
        obj1 = encrypt(JSON.stringify(obj1));
        try {
          let response = await axios.put(
            api_link.API_LINK + "admin/users/publisher-id",
            {
              name: obj1,
            },
            { headers: { Authorization: token } }
          );
          response["data"] = JSON.parse(decrypt(response.data.resp));
          // console.log("Advertiser Package", response);
          this.setState({
            user_package: response["data"]["publisher_package"],
          });
        } catch (e) {
          // console.log(e);
        }
      } catch (e) {}
    } else {
      toast.dark("Advertiser's Payment Status is Pending", {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  changeLanguage = async (e) => {
    const token = localStorage.getItem("token");
    // const value = e.currentTarget.value;
    // console.log(value);
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
        <Loader
          promiseTracker={usePromiseTracker}
          color={"#5c1ac3"}
          background={"rgb(255, 255, 255)"}
        />
        <div
          className="modal fade"
          id="composeMailModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">
                  Message User
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
              <div className="modal-body">
                <form className="mt-3 mb-3">
                  <label for="email" className="text-dark">
                    <b>Reciever Email</b>
                  </label>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="d-flex mb-4 mail-form">
                        <input
                          type="email"
                          id="m-subject"
                          value={this.state.data.email}
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>

                  <label for="email" className="text-dark">
                    <b>Subject</b>
                  </label>
                  <div className="d-flex mb-4 mail-subject">
                    <div className="w-100">
                      <input
                        type="text"
                        id="m-subject"
                        placeholder="Subject"
                        className="form-control"
                        name="subject"
                        onChange={this.handleChange}
                      />
                      <span
                        className="validation-text"
                        style={{
                          display: "none",
                        }}
                      ></span>
                    </div>
                  </div>
                  <label for="email" className="text-dark">
                    <b>Body Language</b>
                  </label>
                  <div className="">
                    <label className="radio-inline" style={{ fontSize: "2vh" }}>
                      <input
                        type="radio"
                        name="optradio"
                        className="mr-2"
                        value="en"
                        onClick={() => this.setState({ bodyLang: "en" })}
                        defaultChecked
                      />
                      English
                    </label>
                    <label
                      className="radio-inline ml-5"
                      style={{ fontSize: "2vh" }}
                    >
                      <input
                        type="radio"
                        name="optradio"
                        value="ar"
                        onClick={() => this.setState({ bodyLang: "ar" })}
                        className="mr-2"
                      />
                      Arabic
                    </label>
                  </div>
                  <label for="email" className="text-dark">
                    <b>Body</b>
                  </label>

                  <div className="row">
                    <div className="col-md-12">
                      <textarea
                        row="10"
                        style={{
                          width: "100%",
                          height: "125px",
                          fontSize: "16px",
                          textAlign:
                            this.state.bodyLang === "en" ? "left" : "right",
                        }}
                        name="body"
                        onChange={this.handleChange}
                      ></textarea>
                    </div>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-md-success"
                  style={{
                    backgroundColor: "#8dbf42",
                    borderColor: "#8dbf42",
                    color: "white",
                  }}
                  onClick={() => this.sendMail(this.props.match.params.user_id)}
                  data-dismiss="modal"
                >
                  Send Message
                </button>
                <button
                  type="button"
                  className="btn btn-md-danger"
                  data-dismiss="modal"
                  style={{
                    backgroundColor: "#e7515a",
                    borderColor: "#e7515a",
                    color: "white",
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>

        <div id="content" className="main-content">
          <div className="layout-px-spacing">
            <div className="page-header">
              <div className="page-title">
                <div className="d-flex justify-content-between">
                  <BackButton />
                  <h3 style={{ paddingTop: "8px" }}>Advertiser Profile</h3>
                </div>
              </div>
            </div>

            <div className="row layout-spacing">
              {/* Content */}
              <div className="col-xl-5 col-lg-5 col-md-12 col-sm-12 layout-top-spacing">
                <div className="user-profile layout-spacing">
                  <div
                    className="widget-content widget-content-area"
                    style={{ height: "619px" }}
                  >
                    {this.state.editProfile === false ? (
                      <>
                        <div className="d-flex justify-content-between">
                          <h3 className=""> Info</h3>
                          <Link
                            to="#"
                            className="mt-2 edit-profile"
                            onClick={() => this.setState({ editProfile: true })}
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
                              className="feather feather-edit-3"
                            >
                              <path d="M12 20h9"></path>
                              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                            </svg>
                          </Link>
                        </div>
                        <div className="text-center user-info">
                          <img
                            style={{
                              display: "block",
                              marginLeft: "auto",
                              marginRight: "auto",
                              height: "22vh",
                              width: "22vh",
                            }}
                            src={
                              this.state.data.profile_image
                                ? `${api_link.GET_IMAGE}` +
                                  `${this.state.data["profile_image"]}`
                                : userMd
                            }
                            alt="avatar"
                          />
                          <p className="">
                            {this.state.data.firstname}{" "}
                            {this.state.data.lastname}
                          </p>
                        </div>
                        <div className="user-info-list">
                          <div className="">
                            <ul className="contacts-block list-unstyled">
                              <li className="contacts-block__item">
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
                                  className="feather feather-coffee"
                                >
                                  <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                                  <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                                  <line x1="6" y1="1" x2="6" y2="4"></line>
                                  <line x1="10" y1="1" x2="10" y2="4"></line>
                                  <line x1="14" y1="1" x2="14" y2="4"></line>
                                </svg>{" "}
                                Advertiser
                              </li>
                              <li className="contacts-block__item">
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
                                  className="feather feather-calendar"
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
                              {/* <li className="contacts-block__item">
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
                              className="feather feather-map-pin"
                            >
                              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                              <circle cx="12" cy="10" r="3"></circle>
                            </svg>
                            Pakistan
                          </li> */}
                              <li className="contacts-block__item">
                                <a
                                  href="mailto:example@mail.com"
                                  style={{ fontSize: "12px" }}
                                >
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
                                    className="feather feather-mail"
                                  >
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                    <polyline points="22,6 12,13 2,6"></polyline>
                                  </svg>
                                  {this.state.data.email}
                                </a>
                              </li>
                              <li className="contacts-block__item">
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
                                  className="feather feather-phone"
                                >
                                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                                </svg>{" "}
                                {this.state.data.phone_number}
                              </li>
                              <li className="contacts-block__item">
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
                                  className="feather feather-file-text"
                                >
                                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                  <polyline points="14 2 14 8 20 8"></polyline>
                                  <line x1="16" y1="13" x2="8" y2="13"></line>
                                  <line x1="16" y1="17" x2="8" y2="17"></line>
                                  <polyline points="10 9 9 9 8 9"></polyline>
                                </svg>{" "}
                                {this.state.data.language === "en"
                                  ? "English"
                                  : "Arabic"}
                              </li>
                              {/* <li className="contacts-block__item">
                              <ul className="list-inline">
                                <li className="list-inline-item">
                                  <div className="social-icon">
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
                                      className="feather feather-facebook"
                                    >
                                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                                    </svg>
                                  </div>
                                </li>
                                <li className="list-inline-item">
                                  <div className="social-icon">
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
                                      className="feather feather-twitter"
                                    >
                                      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                                    </svg>
                                  </div>
                                </li>
                                <li className="list-inline-item">
                                  <div className="social-icon">
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
                                      className="feather feather-linkedin"
                                    >
                                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                                      <rect
                                        x="2"
                                        y="9"
                                        width="4"
                                        height="12"
                                      ></rect>
                                      <circle cx="4" cy="4" r="2"></circle>
                                    </svg>
                                  </div>
                                </li>
                              </ul>
                            </li>
                          */}
                            </ul>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div>
                        {/*Edit Profile*/}
                        <div className="d-flex justify-content-between">
                          <h3 className=""> Edit Profile</h3>
                          <Link
                            to="#"
                            className="mt-3 btn btn-danger"
                            onClick={() =>
                              this.setState({ editProfile: false })
                            }
                            style={{ padding: "2px 10px", borderRadius: "50%" }}
                          >
                            {" "}
                            x
                          </Link>
                        </div>
                        <form>
                          <div className="row">
                            <div className="col">
                              <label for="exampleInputEmail1">First Name</label>
                              <input
                                type="text"
                                className="form-control"
                                name="firstname"
                                defaultValue={this.state.data.firstname}
                                onChange={this.handleProfileChange}
                              />
                            </div>
                            <div className="col">
                              <label for="exampleInputEmail1">Last Name</label>
                              <input
                                type="text"
                                className="form-control"
                                name="lastname"
                                defaultValue={this.state.data.lastname}
                                onChange={this.handleProfileChange}
                              />
                            </div>
                          </div>
                          <div className="form-group">
                            <label for="exampleInputEmail1">
                              Email address
                            </label>
                            <input
                              type="email"
                              className="form-control"
                              id="exampleInputEmail1"
                              aria-describedby="emailHelp"
                              defaultValue={this.state.data.email}
                              onChange={this.handleProfileChange}
                              name="email"
                            />
                          </div>
                          <div className="form-group">
                            <label for="exampleInputPassword1">
                              Phone Number
                            </label>
                            <PhoneInput
                              country={"sar"}
                              name="phone_number"
                              id="phone"
                              value={this.state.data.phone_number}
                              //onChange={(phone) => this.setState({ phone })}
                              defaultMask="... ... ..."
                              placeholder=" 9 897 987 089"
                              onChange={(phone) => {
                                var update = { ...this.state.data };
                                phone = phone.substring(0, 13);
                                update.phone_number = String("+" + phone);
                                this.setState({ data: update });
                              }}
                            />
                          </div>
                          <div className="form-group">
                            <label for="exampleInputPassword1">
                              Select Language
                            </label>

                            <div className="text-center">
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  id="inlineCheckbox1"
                                  onChange={this.handleProfileChange}
                                  value="en"
                                  name="language"
                                  defaultChecked={
                                    this.state.data.language &&
                                    this.state.data.language === "en"
                                  }
                                />
                                <label
                                  className="form-check-label"
                                  for="inlineCheckbox1"
                                  style={{ fontSize: "2vh" }}
                                >
                                  English
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  id="inlineCheckbox1"
                                  onChange={this.handleProfileChange}
                                  value="ar"
                                  name="language"
                                  defaultChecked={
                                    this.state.data.language &&
                                    this.state.data.language === "ar"
                                  }
                                />
                                <label
                                  className="form-check-label"
                                  for="inlineCheckbox2"
                                  style={{ fontSize: "2vh" }}
                                >
                                  العربية
                                </label>
                              </div>
                            </div>
                          </div>

                          <button
                            type="submit"
                            className="btn btn-secondary"
                            onClick={this.updateAdvertiserProfile}
                          >
                            Save Changes
                          </button>
                        </form>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="col-xl-7 col-lg-7 col-md-12 col-sm-12 layout-top-spacing">
                <div className="row">
                  <div
                    className="col-lg-6 col-md-6 col-sm-12"
                    style={{ marginBottom: "25px" }}
                  >
                    <div
                      className="widget widget-card-two"
                      style={{ paddingBottom: "35px" }}
                    >
                      <div className="widget-content">
                        <div className="media">
                          <div className="w-img">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              x="0px"
                              y="0px"
                              width="48"
                              height="48"
                              viewBox="0 0 172 172"
                              style={{ fill: "#000000" }}
                            >
                              <g
                                fill="none"
                                fill-rule="nonzero"
                                stroke="none"
                                stroke-width="1"
                                stroke-linecap="butt"
                                stroke-linejoin="miter"
                                stroke-miterlimit="10"
                                stroke-dasharray=""
                                stroke-dashoffset="0"
                                font-family="none"
                                font-weight="none"
                                font-size="none"
                                text-anchor="none"
                                style={{ mixBlendMode: "normal" }}
                              >
                                <path
                                  d="M0,172v-172h172v172z"
                                  fill="none"
                                ></path>
                                <g>
                                  <path
                                    d="M157.66667,86c0,39.57792 -32.08875,71.66667 -71.66667,71.66667c-39.57792,0 -71.66667,-32.08875 -71.66667,-71.66667c0,-39.57792 32.08875,-71.66667 71.66667,-71.66667c39.57792,0 71.66667,32.08875 71.66667,71.66667z"
                                    fill="#5c1ac3"
                                  ></path>
                                  <path
                                    d="M78.83333,78.83333h14.33333v39.41667h-14.33333zM94.95833,59.125c0,4.94142 -4.01692,8.95833 -8.95833,8.95833c-4.94142,0 -8.95833,-4.01692 -8.95833,-8.95833c0,-4.94142 4.01692,-8.95833 8.95833,-8.95833c4.94142,0 8.95833,4.01692 8.95833,8.95833z"
                                    fill="#ffffff"
                                  ></path>
                                </g>
                              </g>
                            </svg>
                          </div>
                          <div className="media-body">
                            <h5>Payment Status</h5>
                            {/* <p className="meta-date-time">Bronx, NY</p> */}
                          </div>
                        </div>

                        <div className="card-bottom-section">
                          <h5>Mark New Status</h5>
                          <div style={{ marginBottom: "20px" }}>
                            <span
                              style={{ fontSize: "14px", fontWeight: "900" }}
                            >
                              The current payment is marked as{" "}
                              {this.state.data.status === "Approved" ? (
                                <b>PAID</b>
                              ) : (
                                <b>UNPAID</b>
                              )}{" "}
                            </span>{" "}
                          </div>
                          {this.state.data.status === "Approved" ? (
                            <button
                              className="btn btn-lg btn-danger"
                              style={{ marginTop: "20px" }}
                              onClick={() => this.suspend(this.state.data._id)}
                            >
                              Mark as UNPAID
                            </button>
                          ) : (
                            <button
                              className="btn  btn-md btn-secondary"
                              style={{ marginTop: "20px" }}
                              onClick={() => this.activate(this.state.data._id)}
                            >
                              Mark as PAID
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="col-lg-6 col-md-6 col-sm-12 "
                    style={{ marginBottom: "25px" }}
                  >
                    <div
                      className="widget widget-card-two"
                      style={{ paddingBottom: "35px" }}
                    >
                      <div className="widget-content">
                        <div className="media">
                          <div className="w-img">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              x="0px"
                              y="0px"
                              width="48"
                              height="48"
                              viewBox="0 0 172 172"
                              style={{ fill: "#000000" }}
                            >
                              <g
                                fill="none"
                                fill-rule="nonzero"
                                stroke="none"
                                stroke-width="1"
                                stroke-linecap="butt"
                                stroke-linejoin="miter"
                                stroke-miterlimit="10"
                                stroke-dasharray=""
                                stroke-dashoffset="0"
                                font-family="none"
                                font-weight="none"
                                font-size="none"
                                text-anchor="none"
                                style={{ mixBlendMode: "normal" }}
                              >
                                <path
                                  d="M0,172v-172h172v172z"
                                  fill="none"
                                ></path>
                                <g>
                                  <path
                                    d="M86,14.33333c-39.58041,0 -71.66667,32.08626 -71.66667,71.66667c0,39.58041 32.08626,71.66667 71.66667,71.66667c39.58041,0 71.66667,-32.08626 71.66667,-71.66667c0,-39.58041 -32.08626,-71.66667 -71.66667,-71.66667z"
                                    fill="#5c1ac3"
                                  ></path>
                                  <path
                                    d="M122.19883,125.41667c5.72258,0 10.3845,-4.66192 10.3845,-10.3845v-43.731c0,-5.72258 -4.66192,-10.3845 -10.3845,-10.3845h-72.39767c-5.72258,0 -10.3845,4.66192 -10.3845,10.3845v43.72742c0,5.72617 4.66192,10.38808 10.3845,10.38808"
                                    fill="#1976d2"
                                  ></path>
                                  <path
                                    d="M122.19883,53.75h-72.39767c-5.72258,0 -10.3845,4.66192 -10.3845,10.3845v43.72742c0,5.72617 4.66192,10.38808 10.3845,10.38808h72.39408c5.72617,0 10.38808,-4.66192 10.38808,-10.3845v-43.731c0,-5.72258 -4.66192,-10.3845 -10.3845,-10.3845z"
                                    fill="#eceff1"
                                  ></path>
                                  <path
                                    d="M42.28692,56.96783c-1.79167,1.79167 -2.87025,4.31075 -2.87025,6.8155l46.58333,32.96667l46.58333,-32.96308c0,-2.50475 -1.07858,-5.02383 -2.87025,-6.8155l-43.71308,31.18575z"
                                    fill="#90a4ae"
                                  ></path>
                                </g>
                              </g>
                            </svg>
                          </div>
                          <div className="media-body">
                            <h5>Contact Advertiser</h5>
                            {/* <p className="meta-date-time">Bronx, NY</p> */}
                          </div>
                        </div>

                        <div className="card-bottom-section">
                          <h5>New Message</h5>
                          <div style={{ marginBottom: "40px" }}>
                            <span
                              style={{ fontSize: "14px", fontWeight: "900" }}
                            >
                              Send a Private Message to this Advertiser
                            </span>{" "}
                          </div>
                          <button
                            data-toggle="modal"
                            data-target="#composeMailModal"
                            className="btn btn-secondary btn-lg"
                          >
                            Send Message
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="col-md-6 col-sm-6"
                    style={{ marginTop: "20px" }}
                  >
                    <div
                      className="widget widget-card-two"
                      style={{ paddingBottom: "35px" }}
                    >
                      <div className="widget-content">
                        <div className="media">
                          <div className="w-img">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              x="0px"
                              y="0px"
                              width="48"
                              height="48"
                              viewBox="0 0 172 172"
                              style={{ fill: "#000000" }}
                            >
                              <g
                                fill="none"
                                fill-rule="nonzero"
                                stroke="none"
                                stroke-width="1"
                                stroke-linecap="butt"
                                stroke-linejoin="miter"
                                stroke-miterlimit="10"
                                stroke-dasharray=""
                                stroke-dashoffset="0"
                                font-family="none"
                                font-weight="none"
                                font-size="none"
                                text-anchor="none"
                                style={{ mixBlendMode: "normal" }}
                              >
                                <path
                                  d="M0,172v-172h172v172z"
                                  fill="none"
                                ></path>
                                <g>
                                  <path
                                    d="M135.93017,46.58333c0,1.98158 -1.59817,3.58333 -3.57617,3.58333h-114.4445c-1.978,0 -3.57617,-1.60175 -3.57617,-3.58333v-25.08333c0,-1.98158 1.59817,-3.58333 3.57617,-3.58333h114.4445c1.978,0 3.57617,1.60175 3.57617,3.58333z"
                                    fill="#5c1ac3"
                                  ></path>
                                  <path
                                    d="M14.33333,35.83333h121.59683v103.91667h-121.59683z"
                                    fill="#bbdefb"
                                  ></path>
                                  <path
                                    d="M84.38033,132.58333c0,0 16.01392,-21.5 35.76167,-21.5c19.74775,0 35.76167,21.5 35.76167,21.5c0,0 -16.01392,21.5 -35.76167,21.5c-19.74775,0 -35.76167,-21.5 -35.76167,-21.5z"
                                    fill="#ffffff"
                                  ></path>
                                  <path
                                    d="M120.142,111.08333c19.75133,0 35.76167,21.5 35.76167,21.5c0,0 -16.01392,21.5 -35.76167,21.5c-19.74775,0 -35.76167,-21.5 -35.76167,-21.5c0,0 16.01392,-21.5 35.76167,-21.5M120.142,103.91667c-23.0695,0 -40.75325,23.38483 -41.495,24.381l-3.18917,4.28567l3.19275,4.28567c0.73817,0.99617 18.42192,24.381 41.49142,24.381c23.0695,0 40.75683,-23.38483 41.495,-24.381l3.19633,-4.28567l-3.19633,-4.28567c-0.73817,-0.99617 -18.42192,-24.381 -41.495,-24.381z"
                                    fill="#90a4ae"
                                  ></path>
                                  <path
                                    d="M85.36575,111.08333h-31.69458v7.16667h24.13017c1.99592,-2.13925 4.54367,-4.63325 7.56442,-7.16667zM110.89342,97.77125v-1.02125h-57.21867v7.16667h41.85692c4.59742,-2.67317 9.74308,-4.91992 15.36175,-6.14542zM53.67475,82.41667h57.22225v7.16667h-57.22225zM53.67475,68.08333h57.22225v7.16667h-57.22225zM53.67475,53.75h57.22225v7.16667h-57.22225zM39.3665,53.75h7.15233v7.16667h-7.15233zM39.3665,68.08333h7.15233v7.16667h-7.15233zM39.3665,111.08333h7.15233v7.16667h-7.15233zM39.3665,82.41667h7.15233v7.16667h-7.15233zM39.3665,96.75h7.15233v7.16667h-7.15233z"
                                    fill="#5c1ac3"
                                  ></path>
                                  <path
                                    d="M120.142,114.66667c-9.87531,0 -17.88083,8.02156 -17.88083,17.91667c0,9.8951 8.00552,17.91667 17.88083,17.91667c9.87531,0 17.88083,-8.02156 17.88083,-17.91667c0,-9.8951 -8.00552,-17.91667 -17.88083,-17.91667z"
                                    fill="#5c1ac3"
                                  ></path>
                                  <path
                                    d="M120.142,125.431c-3.95012,0 -7.15233,3.20221 -7.15233,7.15233c0,3.95012 3.20221,7.15233 7.15233,7.15233c3.95012,0 7.15233,-3.20221 7.15233,-7.15233c0,-3.95012 -3.20221,-7.15233 -7.15233,-7.15233z"
                                    fill="#9b59b6"
                                  ></path>
                                </g>
                              </g>
                            </svg>
                          </div>
                          <div className="media-body">
                            <h5>Advertisement Detail</h5>
                            {/* <p className="meta-date-time">Bronx, NY</p> */}
                          </div>
                        </div>

                        <div className="card-bottom-section">
                          <h5>All Ads</h5>
                          <div style={{ marginBottom: "40px" }}>
                            <span
                              style={{ fontSize: "14px", fontWeight: "900" }}
                            >
                              View Overall AD Detail by this Advertiser
                            </span>{" "}
                          </div>
                          <button
                            className="btn btn-lg btn-secondary"
                            onClick={() =>
                              this.props.history.push(
                                "/en-admin/user-Ad/" +
                                  this.state.data._id +
                                  "/" +
                                  this.state.data.firstname +
                                  " " +
                                  this.state.data.lastname
                              )
                            }
                          >
                            View Detail
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="col-md-6 col-sm-6"
                    style={{ marginTop: "20px" }}
                  >
                    <div
                      className="widget widget-card-two"
                      style={{ paddingBottom: "35px" }}
                    >
                      <div className="widget-content">
                        <div className="media">
                          <div className="w-img">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              x="0px"
                              y="0px"
                              width="48"
                              height="48"
                              viewBox="0 0 172 172"
                              style={{ fill: "#000000" }}
                            >
                              <g
                                fill="none"
                                fill-rule="nonzero"
                                stroke="none"
                                stroke-width="1"
                                stroke-linecap="butt"
                                stroke-linejoin="miter"
                                stroke-miterlimit="10"
                                stroke-dasharray=""
                                stroke-dashoffset="0"
                                font-family="none"
                                font-weight="none"
                                font-size="none"
                                text-anchor="none"
                                style={{ mixBlendMode: "normal" }}
                              >
                                <path
                                  d="M0,172v-172h172v172z"
                                  fill="none"
                                ></path>
                                <g>
                                  <path
                                    d="M132.58333,64.5h21.5v86h-21.5zM103.91667,93.16667h21.5v57.33333h-21.5zM75.25,78.83333h21.5v71.66667h-21.5zM46.58333,114.66667h21.5v35.83333h-21.5zM17.91667,100.33333h21.5v50.16667h-21.5z"
                                    fill="#5c1ac3"
                                  ></path>
                                  <g fill="#9b59b6">
                                    <path d="M28.66667,46.58333c-5.93706,0 -10.75,4.81294 -10.75,10.75c0,5.93706 4.81294,10.75 10.75,10.75c5.93706,0 10.75,-4.81294 10.75,-10.75c0,-5.93706 -4.81294,-10.75 -10.75,-10.75zM57.33333,53.75c-5.93706,0 -10.75,4.81294 -10.75,10.75c0,5.93706 4.81294,10.75 10.75,10.75c5.93706,0 10.75,-4.81294 10.75,-10.75c0,-5.93706 -4.81294,-10.75 -10.75,-10.75zM86,28.66667c-5.93706,0 -10.75,4.81294 -10.75,10.75c0,5.93706 4.81294,10.75 10.75,10.75c5.93706,0 10.75,-4.81294 10.75,-10.75c0,-5.93706 -4.81294,-10.75 -10.75,-10.75zM114.66667,35.83333c-5.93706,0 -10.75,4.81294 -10.75,10.75c0,5.93706 4.81294,10.75 10.75,10.75c5.93706,0 10.75,-4.81294 10.75,-10.75c0,-5.93706 -4.81294,-10.75 -10.75,-10.75zM143.33333,21.5c-5.93706,0 -10.75,4.81294 -10.75,10.75c0,5.93706 4.81294,10.75 10.75,10.75c5.93706,0 10.75,-4.81294 10.75,-10.75c0,-5.93706 -4.81294,-10.75 -10.75,-10.75z"></path>
                                    <path d="M140.10833,25.8l-26.15833,13.25833l-29.74167,-7.525l-28.66667,25.08333l-25.08333,-6.09167l-3.58333,13.61667l32.25,8.24167l28.66667,-25.08333l27.59167,6.80833l31.175,-15.40833z"></path>
                                  </g>
                                </g>
                              </g>
                            </svg>
                          </div>
                          <div className="media-body">
                            <h5>Advertisement Insights</h5>
                            {/* <p className="meta-date-time">Bronx, NY</p> */}
                          </div>
                        </div>

                        <div className="card-bottom-section">
                          <h5>Detailed View</h5>
                          <div style={{ marginBottom: "40px" }}>
                            <span
                              style={{ fontSize: "14px", fontWeight: "900" }}
                            >
                              Advertiser's Ads Insights and Analytics
                            </span>{" "}
                          </div>
                          <button
                            className="btn btn-lg btn-secondary"
                            onClick={() =>
                              this.props.history.push(
                                "/en-admin/publishers-ad-insights/" +
                                  this.props.match.params.user_id +
                                  "/" +
                                  this.state.data.firstname +
                                  " " +
                                  this.state.data.lastname
                              )
                            }
                          >
                            View Insights
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div className="widget widget-table-one ">
                  <div className="widget-heading">
                    <h5 className="">Ad Package Detail</h5>
                  </div>

                  <div className="widget-content">
                    <div
                      className="table-responsive d-flex"
                      style={{ maxheight: "35vh" }}
                    >
                      {this.state.user_package.length > 0 ? (
                        <table
                          className="table"
                          style={{ textAlign: "center" }}
                        >
                          <thead>
                            <tr>
                              <th>
                                <div className="th-content"></div>
                              </th>
                              <th>
                                <div className="th-content">Package Name</div>
                              </th>
                              <th>
                                <div className="th-content">Ads Posted</div>
                              </th>
                              <th>
                                <div className="th-content">Started At</div>
                              </th>

                              <th>
                                <div className="th-content">Expires At</div>
                              </th>
                              <th>
                                <div className="th-content">Status</div>
                              </th>
                              <th>
                                <div
                                  className="th-content"
                                  style={{ textAlign: "center" }}
                                >
                                  Action
                                </div>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.user_package &&
                              this.state.user_package.map((pointer) => (
                                <tr>
                                  <td>
                                    <div className="td-content product-brand">
                                      <img
                                        src="https://img.icons8.com/plasticine/100/000000/membership-card.png"
                                        alt="xxx"
                                      />
                                    </div>
                                  </td>
                                  <td>
                                    <div className="td-content product-brand">
                                      {pointer.package_name}
                                    </div>
                                  </td>
                                  <td>
                                    <div className="td-content">
                                      {pointer.total_ads}
                                    </div>
                                  </td>

                                  <td>
                                    <div className="td-content">
                                      {reverseDate(
                                        pointer.approvedAt
                                          ? pointer.approvedAt.substring(
                                              0,
                                              pointer.approvedAt.indexOf("T")
                                            )
                                          : "Nan"
                                      )}
                                    </div>
                                  </td>
                                  <td>
                                    <div className="td-content">
                                      {reverseDate(
                                        pointer.expiresAt
                                          ? pointer.expiresAt.substring(
                                              0,
                                              pointer.expiresAt.indexOf("T")
                                            )
                                          : "Nan"
                                      )}
                                    </div>
                                  </td>
                                  <td>
                                    <div className="td-content">
                                      {pointer.status === "Approved" ? (
                                        <span className="badge outline-badge-secondary">
                                          Approved
                                        </span>
                                      ) : null}
                                      {pointer.status === "Pending" ? (
                                        <span className="badge outline-badge-danger">
                                          Pending
                                        </span>
                                      ) : null}
                                      {pointer.status === "Expired" ? (
                                        <span className="badge outline-badge-dark">
                                          Expired
                                        </span>
                                      ) : null}
                                    </div>
                                  </td>
                                  <td>
                                    <div
                                      className="td-content"
                                      style={{ textAlign: "center" }}
                                    >
                                      {pointer.status === "Approved" ? (
                                        <button
                                          className="btn btn-secondary"
                                          disabled
                                        >
                                          Approve Package
                                        </button>
                                      ) : null}
                                      {pointer.status === "Pending" ? (
                                        <button
                                          className="btn btn-secondary"
                                          onClick={() =>
                                            this.approveRequest(
                                              pointer.package_id,
                                              pointer._id
                                            )
                                          }
                                        >
                                          Approve Package
                                        </button>
                                      ) : null}
                                      {pointer.status === "Expired" ? (
                                        <span
                                          className="badge badge-dark"
                                          disabled
                                        >
                                          Notify This User
                                        </span>
                                      ) : null}
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
                          No Ad Package Detail
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="footer-wrapper">
            <div className="footer-section f-section-1">
              <p className="">
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
            <div className="footer-section f-section-2"></div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default AdPublisherDetail;
