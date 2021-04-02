import React, { Component } from "react";
// import { Link } from "react-router-dom";
import axios from "axios";
// import api_link from "../config.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import FacebookLogin from "react-facebook-login";
import arabicEndpoint from "./../utils/arabicEndpoint";
// import createCookie from "./../utils/handleCookie";
import endpoint from "./../utils/endpoint";
import encrypt from "./../utils/Encryption/Encrypt";
import decrypt from "./../utils/Encryption/Decrypt";

class SignIn extends Component {
  state = {
    loading: false,
    visible: 0,
    data: { status: 1 },
    isLoggedIn: false,
    userID: "",
    name: "",
    email: "",
    picture: "",
    mailError: false,
  };
  async componentDidMount() {
    localStorage.setItem("lang", "en");
    document.title = "Login";
    //console.log(api_link.API_LINK);
    document.getElementById("email").focus();
    try {
      const playerId = await window.OneSignal.getUserId();
      console.log(playerId);
      const data = { ...this.state.data };
      data["playerId"] = playerId;
      this.setState({ data: data });
    } catch (e) {
      //console.log("Error Catching PlayerId");
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const data = this.state.data;
    this.setState({ mailError: false });
    data["email"] = data["email"].toLowerCase();
    // const format = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const format = /(^(?!.*__.*)[a-z0-9]{4,253}(_?)[a-z0-9]+(?:\.[a-z0-9!#$%&*+\/=?^`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9]*[a-z0-9])?$)/gs;
    // var fd = new FormData();

    if (!data["email"].match(format)) {
      this.setState({ mailError: true });
    } else {
      this.setState({ mailError: false });
      // for (var key in data) {
      //   fd.append(key, data[key]);
      // }
      try {
        let encrypted = encrypt(JSON.stringify(data));
        // console.log(encrypted);
        const response = await axios.post(endpoint + "login", {
          name: encrypted,
        });
        // console.log(response);
        const responseParsed = JSON.parse(decrypt(response["data"]["resp"]));
        const responseData = responseParsed["success"];

        localStorage.setItem("token", "Bearer " + responseData["token"]);
        localStorage.setItem("username", responseData["user_name"]);
        localStorage.setItem("user_id", responseData["user_id"]);
        localStorage.setItem("Role", responseData["type"]);

        if (response["status"] === 200) {
          if (responseData["type"] === "Admin") {
            // localStorage.setItem("token", "Bearer " + responseData["token"]);
            // localStorage.setItem("username", responseData["user_name"]);
            // localStorage.setItem("user_id", responseData["user_id"]);
            // localStorage.setItem("Role", responseData["type"]);
            toast.info("✔️ Proceeding for Verification!", {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: true,
            });
            setTimeout(() => {
              // window.location.replace("/en-admin/aDashboard");
              this.props.history.replace(
                `/verification/${responseData["type"]}/${
                  responseData["user_id"]
                }/${"Bearer " + responseData["token"]}`
              );

              // this.props.history.replace("/en-admin/aDashboard");
            }, 2000);
          } else if (responseData["type"] === "Publisher") {
            const lang = responseData["lang"];
            localStorage.setItem("publisherStatus", responseParsed["status"]);
            localStorage.setItem("lang", responseData["lang"]);

            if (lang === "en") {
              localStorage.setItem("lang", "en");
              toast.info("✔️ Proceeding for Verification!", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: true,
              });

              setTimeout(() => {
                this.props.history.replace(
                  `/verification/${responseData["type"]}/${
                    responseData["user_id"]
                  }/${"Bearer " + responseData["token"]}`
                );
              }, 2000);
            } else if (lang === "ar") {
              localStorage.setItem("token", "Bearer " + responseData["token"]);
              localStorage.setItem("username", responseData["user_name"]);
              localStorage.setItem("user_id", responseData["user_id"]);
              localStorage.setItem("Role", responseData["type"]);
              localStorage.setItem("lang", "ar");
              toast.info("✔️ Proceeding for Verification!", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: true,
              });

              setTimeout(() => {
                window.location.href = `${arabicEndpoint}/ar-verify/${
                  responseData["type"]
                }/${responseData["user_id"]}/${
                  "Bearer " + responseData["token"]
                }`;
              }, 2000);
            }
          } else {
            toast.error(response.data.message, {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        } else {
          toast.dark("⚠️ ERROR ", {
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
        // console.log(JSON.parse(decrypt(e.response.data.resp)));
        toast.dark("⚠️ Invalid Username or Password", {
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
    // //console.log("Submitted");
    // this.props.history.push("/user-dashboard");
  };
  responseFacebook = () => {};
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
  };
  validateEmail = ({ currentTarget: input }) => {
    // var value = input.value;
    //console.log(value);
    // const format = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // if (value === "" || value === undefined || value == null) {
    //   this.setState({ mailError: false });
    // } else if (!value.match(format)) {
    //   this.setState({ mailError: true });
    // } else {
    //   this.setState({ mailError: false });
    // }
  };
  render() {
    return (
      <React.Fragment>
        <body
          className="form "
          style={{ backgroundRepeat: "no-repeat", backgroundSize: "cover" }}
        >
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
          {/* <div className="container">
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
          </div> */}
          <div className="row text-center">
            <div
              className="col-md-12 m-auto"
              style={{ position: "absolute", top: "4%", left: "0px" }}
            >
              <img
                src="/assets/img/masoon-white.png"
                className="ml-2 navbar-logo"
                style={{ height: "80px" }}
                alt="logo"
              />
            </div>
          </div>
          <div className="form-container outer bg-gradient-danger">
            <div className="form-form">
              <div className="form-form-wrap">
                <div className="form-container" style={{ minHeight: "100%" }}>
                  <div
                    className="form-content"
                    style={{
                      background: "#000000b3",
                      border: "1px solid black",
                    }}
                  >
                    <h1 className="text-white">Sign In</h1>
                    <p className="text-white">
                      Log in to your account to continue.
                    </p>

                    <form className="text-left" onSubmit={this.handleSubmit}>
                      <div className="form">
                        <div
                          id="username-field"
                          className="field-wrapper input"
                        >
                          <label for="username" className="text-white">
                            EMAIL
                          </label>
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
                            className="feather feather-user mt-1"
                          >
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                          </svg>
                          <input
                            id="email"
                            name="email"
                            type="text"
                            className="form-control"
                            onChange={this.handleChange}
                            placeholder="e.g johndoe@gmail.com"
                            onKeyUp={this.validateEmail}
                          />
                        </div>
                        {this.state.mailError === true ? (
                          <div class="alert alert-danger" role="alert">
                            Invalid Email Format
                          </div>
                        ) : null}

                        <div
                          id="password-field"
                          className="field-wrapper input mb-2"
                        >
                          <div className="d-flex justify-content-between">
                            <label for="password" className="text-white">
                              PASSWORD
                            </label>
                            {/* <a
                              href="/forgot-email"
                              className="forgot-pass-link text-white"
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
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            style={{ marginTop: "5px" }}
                            className="feather feather-lock  "
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
                            onChange={this.handleChange}
                            type={
                              this.state.visible === 1 ? "text" : "password"
                            }
                            className="form-control"
                            placeholder="Password"
                          />
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
                            id="toggle-password"
                            style={{ marginTop: "5px" }}
                            className="feather feather-eye "
                            onClick={this.showpassword}
                          >
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                          </svg>
                        </div>
                        <div className="d-sm-flex justify-content-between mt-5">
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
                              Log In
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            <div
              class="footer-wrapper bg-transparent"
              style={{ justifyContent: "center", position: "absolute" }}
            >
              <div class="footer-section f-section-1">
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
            </div>
          </div>
        </body>
      </React.Fragment>
    );
  }
}

export default SignIn;
