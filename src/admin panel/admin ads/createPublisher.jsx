import React, { Component } from "react";
// import { Link } from "react-router-dom";
import "./createPublisher.css";
import axios from "axios";
import api_link from ".././../config.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import BackButton from "./../../utils/backButton";
import encrypt from "./../../utils/Encryption/Encrypt";
import decrypt from "./../../utils/Encryption/Decrypt";
class CreatePublisher extends Component {
  state = {
    visible: 0,
    data: { roll: "Publisher" },
    creditCardShow: false,
    passwordMatch: "",
    mailError: false,
  };
  componentDidMount() {
    document.getElementById("firstname").focus();
  }
  handleSubmit = async (e) => {
    e.preventDefault();
    // var fd = new FormData();
    // const data = this.state.data;
    // for (var key in data) {
    //   fd.append(key, data[key]);
    // }
    // const token = localStorage.getItem("token");
    var obj = this.state.data;
    obj = encrypt(JSON.stringify(obj));
    if (
      this.state.data["phone_number"] ||
      this.state.data["phone_number"] == null ||
      this.state.data["phone_number"] === "" ||
      this.state.data["phone_number"] === undefined
    )
      try {
        var response = await axios.post(api_link.API_LINK + "register", {
          name: obj,
        });
        // console.log(response);
        response["data"] = JSON.parse(decrypt(response.data.resp));
        var message = response["data"]["message"];
        var status = response["data"]["status"];
        if (status === 200) {
          if (message === "User registered successfully") {
            toast.success("☑️ Registered successfully", {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setTimeout(
              () => this.props.history.push("/en-admin/publishers"),
              3000
            );
            //   localStorage.setItem("Role", "User");
          }
        } else if (status === 400) {
          if (message === "Password not matched") {
            toast.dark("❌ Password not matched", {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          } else if (
            message === "password length must be at least 8 characters"
          ) {
            toast.dark("❌ Password length must be 8 or above", {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          } else if (message === "User already registered with this email") {
            toast.dark("❌ User already register with this email", {
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
      } catch (e) {
        // console.log(e);
        toast.dark(" Error Connecting Server", {
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
  showpassword = () => {
    if (this.state.visible === 0) {
      this.setState({ visible: 1 });
    } else {
      this.setState({ visible: 0 });
    }
  };
  handleChange = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data });
    // console.log(data);
  };
  ConfirmPassword = () => {
    var key = document.getElementById("confirm password").value;
    if (this.state.data.password !== key) {
      this.setState({ confirmpassword: 0 });
    } else {
      this.setState({ confirmpassword: 1 });
    }
  };
  passwordConfirm = ({ currentTarget: input }) => {
    // console.log(input.value);
    var value = input.value;
    if (value == null || value === undefined || value === "") {
      this.setState({ passwordMatch: false });
    } else if (value === this.state.data.password) {
      this.setState({ emailMatch: true });
    } else {
      this.setState({ emailMatch: false });
    }
  };
  validateEmail = ({ currentTarget: input }) => {
    var value = input.value;
    // console.log(value);
    const format = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (value === "" || value === undefined || value == null) {
      this.setState({ mailError: false });
    } else if (!value.match(format)) {
      this.setState({ mailError: true });
    } else {
      this.setState({ mailError: false });
    }
  };
  render() {
    return (
      <React.Fragment>
        <div id="content" className="main-content">
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
          <div className="layout-px-spacing">
            <div className="page-header">
              <div className="page-title">
                <div className="d-flex justify-content-between">
                  <BackButton />
                  <h3 style={{ paddingTop: "8px" }}>Register Advertiser</h3>
                </div>
              </div>
              {/* <div className="ml-auto" style={{ textAlign: "right" }}>
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    this.props.history.push("/en-admin/register-publisher")
                  }
                >
                  Add Publisher
                </button>
              </div> */}
            </div>
            <div className="row mt-5">
              <div className="col-lg-8 col-10 ml-auto mr-auto layout-top-spacing">
                <div className="statbox widget box box-shadow">
                  <div className="widget-content widget-content-area icon-pill">
                    <form className="text-left" onSubmit={this.handleSubmit}>
                      <div className="form">
                        <div className="row">
                          <div className="col-md-6">
                            <div
                              id="username-field"
                              className="field-wrapper input mt-3 mb-3"
                            >
                              <label
                                htmlFor="username"
                                style={{ color: "black", fontWeight: "700" }}
                              >
                                FIRSTNAME
                              </label>

                              <input
                                id="firstname"
                                name="firstname"
                                type="text"
                                required
                                className="form-control"
                                placeholder="John"
                                onChange={this.handleChange}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div
                              id="username-field"
                              className="field-wrapper input mt-3 mb-3"
                            >
                              <label
                                htmlFor="username"
                                style={{ color: "black", fontWeight: "700" }}
                              >
                                LASTNAME
                              </label>

                              <input
                                id="username1"
                                name="lastname"
                                required
                                type="text"
                                className="form-control"
                                placeholder="Doe"
                                onChange={this.handleChange}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <div
                              id="username-field"
                              className="field-wrapper input mt-3 mb-3"
                            >
                              <label
                                htmlFor="username"
                                style={{ color: "black", fontWeight: "700" }}
                              >
                                EMAIL
                              </label>

                              <input
                                id="username"
                                name="email"
                                required
                                type="email"
                                className="form-control"
                                placeholder="johndoe@email.com"
                                onChange={this.handleChange}
                                onKeyUp={this.validateEmail}
                              />
                            </div>
                            {this.state.mailError === true ? (
                              <div className="alert alert-danger" role="alert">
                                Invalid Email Format
                              </div>
                            ) : null}
                          </div>
                          <div className="col-md-6">
                            <div
                              id="username-field"
                              className="field-wrapper input mt-3 mb-3"
                            >
                              <label
                                htmlFor="username"
                                style={{ color: "black", fontWeight: "700" }}
                              >
                                PHONE
                              </label>
                              <PhoneInput
                                country={"sa"}
                                name="phone_number"
                                defaultMask="... ... ..."
                                required
                                id="phone"
                                value={this.state.phone}
                                //onChange={(phone) => this.setState({ phone })}
                                onChange={(phone) => {
                                  var update = { ...this.state.data };
                                  update.phone_number = String("+" + phone);
                                  this.setState({ data: update });
                                }}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <div
                              id="password-field"
                              className="field-wrapper input mt-3 mb-3"
                            >
                              <div className="d-flex justify-content-between">
                                <label
                                  htmlFor="password"
                                  style={{ color: "black", fontWeight: "700" }}
                                >
                                  PASSWORD
                                </label>
                              </div>

                              <input
                                id="password"
                                name="password"
                                type={
                                  this.state.visible === 1 ? "text" : "password"
                                }
                                className="form-control"
                                placeholder="Password"
                                required
                                onChange={this.handleChange}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div
                              id="password-field"
                              className="field-wrapper input mt-3 mb-3"
                            >
                              <div className="d-flex justify-content-between">
                                <label
                                  htmlFor="password"
                                  style={{ color: "black", fontWeight: "700" }}
                                >
                                  CONFIRM PASSWORD
                                </label>
                              </div>

                              <input
                                id="confirm password"
                                name="confirmPassword"
                                type="password"
                                className="form-control"
                                required
                                placeholder="Confirm Password"
                                onChange={this.handleChange}
                                onKeyUp={this.passwordConfirm}
                              />
                            </div>
                            {this.state.emailMatch === true ? (
                              <div className="alert alert-success" role="alert">
                                Password matched!
                              </div>
                            ) : this.state.emailMatch === false ? (
                              <div className="alert alert-danger" role="alert">
                                Password Mismatch
                              </div>
                            ) : null}
                          </div>
                        </div>

                        <div className="row mt-3 mb-3">
                          <div className="col-md-4 ml-auto mr-auto">
                            <div style={{ textAlign: "center" }}>
                              <div className="field-wrapper">
                                <button
                                  type="submit"
                                  className="btn btn-secondary btn-lg btn-block"
                                  value=""
                                >
                                  Register
                                </button>
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
            <div className="footer-section f-section-2">
              <p className="">
                Coded with{" "}
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
                  className="feather feather-heart"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </p>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default CreatePublisher;
