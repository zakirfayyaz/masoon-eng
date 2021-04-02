import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import api_link from "../config.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";

class SignUp extends Component {
  state = { visible: 0, data: { roll: "User" }, creditCardShow: false };
  componentDidMount() {
    document.getElementById("firstname").focus();
  }
  handleSubmit = async (e) => {
    e.preventDefault();
    var fd = new FormData();
    const data = this.state.data;
    data["email"] = data["email"].toLowerCase();
    for (var key in data) {
      fd.append(key, data[key]);
    }

    try {
      const response = await axios.post(api_link.API_LINK + "register", fd);
      //console.log(response);
      var message = response["data"]["message"];
      var status = response["data"]["status"];

      if (response["status"] === 200) {
        if (status === 200 || status === 201) {
          toast.success("☑️ Account Created successfully", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setTimeout(() => this.props.history.push("/signin"), 3000);
          localStorage.setItem("Role", "User");
        } else if (status === 400) {
          toast.dark("❌ " + message, {
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

      // if (status === 200) {
      //   if (message === "User registered successfully") {
      //     toast.success("☑️ Account Created successfully", {
      //       position: "top-center",
      //       autoClose: 3000,
      //       hideProgressBar: true,
      //       closeOnClick: true,
      //       pauseOnHover: true,
      //       draggable: true,
      //       progress: undefined,
      //     });
      //     setTimeout(() => this.props.history.push("/signin"), 3000);
      //     localStorage.setItem("Role", "User");
      //   }
      // } else if (status === 400) {
      //   if (message === "Password not matched") {
      //     toast.dark("❌ Password not matched", {
      //       position: "top-center",
      //       autoClose: 3000,
      //       hideProgressBar: true,
      //       closeOnClick: true,
      //       pauseOnHover: true,
      //       draggable: true,
      //       progress: undefined,
      //     });
      //   } else if (
      //     message === "password length must be at least 8 characters"
      //   ) {
      //     toast.dark("❌ Password length must be 8 or above", {
      //       position: "top-center",
      //       autoClose: 3000,
      //       hideProgressBar: true,
      //       closeOnClick: true,
      //       pauseOnHover: true,
      //       draggable: true,
      //       progress: undefined,
      //     });
      //   } else if (message === "User already register with this email") {
      //     toast.dark("❌ User already register with this email", {
      //       position: "top-center",
      //       autoClose: 3000,
      //       hideProgressBar: true,
      //       closeOnClick: true,
      //       pauseOnHover: true,
      //       draggable: true,
      //       progress: undefined,
      //     });
      //   }
      // } else if (status === "matched") {
      //   toast.dark(message, {
      //     position: "top-center",
      //     autoClose: 3000,
      //     hideProgressBar: true,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      //     draggable: true,
      //     progress: undefined,
      //   });
      // }
    } catch (e) {
      //console.log(e);
      window.alert("Error Connecting Server");
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
    //console.log(data);
  };
  ConfirmPassword = () => {
    var key = document.getElementById("confirm password").value;
    if (this.state.data.password !== key) {
      this.setState({ confirmpassword: 0 });
    } else {
      this.setState({ confirmpassword: 1 });
    }
  };
  render() {
    return (
      <React.Fragment>
        <body
          className="form"
          style={{ backgroundRepeat: "no-repeat", backgroundSize: "cover" }}
        >
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
          <div className="container">
            <div className="row">
              <div className="col-md-6 m-auto" style={{ textAlign: "center" }}>
                <Link to="#">
                  <img
                    src="/assets/img/masoon-white.png"
                    className="navbar-logo"
                    alt="logo"
                  />
                </Link>
              </div>
            </div>
          </div>
          <div className="form-container outer bg-gradient-danger">
            <div className="form-form" style={{ marginBottom: "40px" }}>
              <div className="form-form-wrap">
                <div className="form-container">
                  <div
                    className="form-content"
                    style={{ background: "#000000b3" }}
                  >
                    <h1 className="text-white">Sign Up</h1>
                    <h5 className="text-white">Registering as User</h5>

                    <form className="text-left" onSubmit={this.handleSubmit}>
                      <div className="form">
                        <div
                          id="username-field"
                          className="field-wrapper input"
                        >
                          <label htmlFor="username" className="text-white">
                            FIRSTNAME
                          </label>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-user"
                          >
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                          </svg>
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
                        <div
                          id="username-field"
                          className="field-wrapper input"
                        >
                          <label htmlFor="username" className="text-white">
                            LASTNAME
                          </label>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-user"
                          >
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                          </svg>
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
                        <div
                          id="username-field"
                          className="field-wrapper input"
                        >
                          <label htmlFor="username" className="text-white">
                            EMAIL
                          </label>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-user"
                          >
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                          </svg>
                          <input
                            id="username"
                            name="email"
                            required
                            type="email"
                            className="form-control"
                            placeholder="johndoe@email.com"
                            onChange={this.handleChange}
                          />
                        </div>
                        {/*Phone Field*/}
                        <div
                          id="username-field"
                          className="field-wrapper input"
                        >
                          <label htmlFor="username" className="text-white">
                            PHONE
                          </label>
                          <PhoneInput
                            // country={"pk"}
                            name="phone_number"
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
                        {/*Phone Field ENDS*/}

                        <div
                          id="password-field"
                          className="field-wrapper input mb-2"
                        >
                          <div className="d-flex justify-content-between">
                            <label htmlFor="password" className="text-white">
                              PASSWORD
                            </label>
                            {/* <a
                                                            href="auth_pass_recovery_boxed.html"
                                                            className="forgot-pass-link"
                                                        >
                                                            Forgot Password?
                                                        </a> */}
                          </div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-lock"
                          >
                            <rect
                              x="3"
                              y="11"
                              width="18"
                              height="11"
                              rx="2"
                              ry="2"
                            ></rect>
                            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                          </svg>
                          <input
                            id="password"
                            name="password"
                            type={
                              this.state.visible === 1 ? "text" : "password"
                            }
                            className="form-control"
                            placeholder="Password"
                            onChange={this.handleChange}
                          />
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            id="toggle-password"
                            className="feather feather-eye"
                            onClick={this.showpassword}
                          >
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                          </svg>
                        </div>
                        <div
                          id="password-field"
                          className="field-wrapper input mb-2"
                        >
                          <div className="d-flex justify-content-between">
                            <label htmlFor="password" className="text-white">
                              CONFIRM PASSWORD
                            </label>
                          </div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-lock"
                          >
                            <rect
                              x="3"
                              y="11"
                              width="18"
                              height="11"
                              rx="2"
                              ry="2"
                            ></rect>
                            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                          </svg>

                          <input
                            id="confirm password"
                            name="confirmPassword"
                            type="password"
                            className="form-control"
                            placeholder="Confirm Password"
                            onChange={this.handleChange}
                          />
                        </div>
                        {this.state.confirmpassword === 0 ? (
                          <div className="alert alert-danger" role="alert">
                            Passwords don't match
                          </div>
                        ) : null}
                        {this.state.confirmpassword === 1 ? (
                          <div className="alert alert-success" role="alert">
                            Passwords matched!
                          </div>
                        ) : null}
                        {this.state.creditCardShow === true ? (
                          <div
                            id="password-field"
                            className="field-wrapper input mb-2"
                          >
                            <div className="d-flex justify-content-between">
                              <label htmlFor="password">Credit Card No. </label>
                              {/* <a
                                                            href="auth_pass_recovery_boxed.html"
                                                            className="forgot-pass-link"
                                                        >
                                                            Forgot Password?
                                                        </a> */}
                            </div>

                            <input
                              id="creditcardno"
                              name="creditcardno"
                              type="text"
                              className="form-control"
                              placeholder="xxxx"
                              onChange={this.handleChange}
                            />
                          </div>
                        ) : null}
                        <div className="d-sm-flex justify-content-between">
                          <div className="field-wrapper">
                            <button
                              type="submit"
                              className="btn"
                              style={{
                                background: "rgb(207 101 181)",
                                borderColor: "rgb(207 101 181)",
                                color: "white",
                              }}
                              value=""
                            >
                              Create Account
                            </button>
                          </div>
                        </div>

                        {/* <div class="social">
                                                    <a
                                                        href="javascript:void(0);"
                                                        className="btn social-fb"
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="24"
                                                            height="24"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            className="feather feather-facebook"
                                                        >
                                                            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                                                        </svg>
                                                        <span className="brand-name">
                                                            Facebook
                                                        </span>
                                                    </a>
                                                </div> */}

                        <p className="signup-link text-white">
                          Already Registered ?{" "}
                          <Link to="/signin" className="text-white">
                            Sign In
                          </Link>
                        </p>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="footer-wrapper bg-transparent"
              style={{ justifyContent: "center", position: "relative" }}
            >
              <div class="footer-section f-section-1 bg-transparent">
                <p class="text-white">
                  Copyright © 2020{" "}
                  <a
                    target="_blank"
                    href="https://cdoxs.com"
                    rel="noopener noreferrer"
                  >
                    <span className="text-white">CDOXS</span>
                  </a>
                  , All rights reserved.
                </p>
              </div>
              <div class="footer-section f-section-2"></div>
            </div>
          </div>
        </body>
      </React.Fragment>
    );
  }
}

export default SignUp;
