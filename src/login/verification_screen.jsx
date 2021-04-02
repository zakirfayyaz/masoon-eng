import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import api_link from "../config.json";
import { toast } from "react-toastify";
import OtpInput from "react-otp-input";
import encrypt from "./../utils/Encryption/Encrypt";
import decrypt from "./../utils/Encryption/Decrypt";

class Verification_Screen extends Component {
  state = {
    expiryCounter: 60,
    data: [],
    resend: 0,
    countdown: 180,
    countStop: null,
    otp: "",
    timerOn: true,
  };
  handleChange1 = (otp) => this.setState({ otp });
  timer = () => {
    var remaining = 180;
    var x = setInterval(async () => {
      this.setState({ countStop: null });
      var m = Math.floor(remaining / 60);
      var s = remaining % 60;
      // //console.log("m", m, "S", s);
      if (s !== -1) {
        m = m < 10 ? "0" + m : m;
        s = s < 10 ? "0" + s : s;

        document.getElementById("countdown").innerHTML = m + ":" + s;
        remaining -= 1;
      } else {
        document.getElementById("countdown").innerHTML = "00 : 00";
        this.setState({ countStop: "00" });
        clearInterval(x);
        const token = localStorage.getItem("token");
        await axios.put(
          api_link.API_LINK + "expire/otp",
          {},
          {
            headers: { Authorization: token },
          }
        );
      }
    }, 1000);
  };
  requestOtp = async () => {
    await this.setState({ resend: 0 });
    //console.log("I am called");
    var token = localStorage.getItem("token");
    try {
      const response = await axios.get(api_link.API_LINK + "send", {
        headers: { Authorization: token },
      });
      //console.log(response["data"]["result"].request_id);
      const request_id = response["data"]["result"].request_id;
      localStorage.setItem("request_id", request_id);
    } catch (e) {
      //console.log(e);
    }
  };
  requestOtpAgain = async () => {
    // await this.setState({ resend: 0 });
    //console.log("I am called");
    var token = localStorage.getItem("token");
    try {
      await axios.post(
        api_link.API_LINK + "otp/email/send",
        {},
        {
          headers: { Authorization: token },
        }
      );
      //console.log(response);
    } catch (e) {
      //console.log(e);
    }
  };
  async componentDidMount() {
    //console.log(localStorage.getItem("Role"));
    localStorage.setItem("Role", this.props.match.params.type);
    localStorage.setItem("token", this.props.match.params.token);
    // this.countdown();
    setTimeout(() => this.timer(), 1000);
    // document.getElementById("first").focus();
  }
  countdown = () => {
    document.getElementById("countdown").innerHTML = 180;
    var countdown = this.state.countdown;

    var x = setInterval(async () => {
      this.setState({ countStop: null });
      countdown = countdown - 1;
      //console.log(countdown);
      if (countdown > 0 && countdown < 10) {
        document.getElementById("countdown").innerHTML = "0" + countdown;
      } else if (countdown > 10) {
        document.getElementById("countdown").innerHTML = countdown;
      } else if (countdown === 0) {
        document.getElementById("countdown").innerHTML = "00";
        this.setState({ countStop: "00" });
        const token = localStorage.getItem("token");
        await axios.put(
          api_link.API_LINK + "expire/otp",
          {},
          {
            headers: { Authorization: token },
          }
        );
        //console.log(expire);
        clearInterval(x);
      }
      // //console.log(countdown);
    }, 1000);
  };
  movetoPrevious = (nextFieldID, currentField) => {
    // //console.log("currentField", document.getElementById(currentField).value);
    // document.getElementById(currentField).focus();
    // document.getElementById(nextFieldID).value = "";
    // document.getElementById(currentField).value = 6;
    // //console.log("currentField", document.getElementById(currentField).value);
    // const value = document.getElementById(nextFieldID).value;
    // if (value === "") {
    //   document.getElementById(currentField).focus();
    // }
    // document.getElementById(currentField).focus();
    // var current = document.getElementById(currentField);
    // if (current.value.length >= current.maxLength) {
    //   document.getElementById(currentField).focus();
    // }
  };
  movetoNext = (currentField, nextFieldID) => {
    var current = document.getElementById(currentField);
    if (current.value.length >= current.maxLength) {
      document.getElementById(nextFieldID).focus();
    }
  };
  submitOTP = async (e) => {
    e.preventDefault();
    var token = localStorage.getItem("token");
    var string = this.state.otp;

    // for (var key in data) {
    //   string = string + data[key];
    // }

    if (string === "") {
      toast.dark("⚠ Enter OTP !", {
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
        var response = await axios.put(
          api_link.API_LINK + `otp/email-otp`,
          { name: encrypt(string) },
          {
            headers: { Authorization: token },
          }
        );

        response["data"] = JSON.parse(decrypt(response["data"]["resp"]));
        //console.log(response);

        var id = { id: this.props.match.params.id };
        id = encrypt(JSON.stringify(id));
        await axios.put(
          api_link.API_LINK + "admin/users/online-id",
          {
            name: id,
          },
          {
            headers: { Authorization: token },
          }
        );
        //console.log(resp);
        var lang = localStorage.getItem("lang");
        if (
          response.data.status === "Approved" ||
          response.data.status === "Pending"
        ) {
          localStorage.setItem("active", response.data.success.active);
          localStorage.setItem("user_id", response.data.success["user_id"]);
          localStorage.setItem("Role", this.props.match.params.type);
          if (this.props.match.params.type === "User") {
            window.location.href = "/en/uDashboard";
            localStorage.setItem("Role", this.props.match.params.type);
          } else if (this.props.match.params.type === "Admin") {
            window.location.href = "/en-admin/aDashboard";
            localStorage.setItem("Role", this.props.match.params.type);
          } else if (this.props.match.params.type === "Publisher") {
            if (lang === "en") {
              window.location.href = "/en-publisher/pDashboard";
            } else {
              window.location.href = "/ar-/advertiser-dashboard";
            }
            localStorage.setItem("Role", this.props.match.params.type);
          } else {
            window.location.reload();
            localStorage.setItem("Role", "null");
          }
        } else {
          toast.dark("⚠ Enter a Valid OTP !", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          try {
          } catch (e) {
            //console.log(e);
          }
        }
      } catch (e) {
        //console.log(e);
      }
    }
  };
  handleChange = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data });
  };
  render() {
    return (
      <React.Fragment>
        <body className="form">
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
          <div className="form-container outer bg-gradient-danger">
            <div className="form-form">
              <div className="form-form-wrap">
                <div className="form-container">
                  <div
                    className="form-content"
                    style={{ padding: "30px", paddingRight: "15px" }}
                  >
                    <h1 className="">Login Verification</h1>
                    <p
                      className=""
                      style={{ fontSize: "2vh", marginBottom: "5px" }}
                    >
                      Enter the OTP, we sent on your registered phone number to
                      continue.
                    </p>
                    <div style={{ width: "100%" }}> </div>
                    <form className="text-left" onSubmit={this.submitOTP}>
                      <div className="form">
                        <div
                          id="username-field"
                          className="field-wrapper input"
                        >
                          <label for="username" style={{ fontSize: "2vh" }}>
                            OTP CODE
                          </label>

                          {/* <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="feather feather-lock"
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
                          </svg> */}
                          <div className="text-right">
                            <div style={{ fontSize: "2vh" }}>
                              <b>
                                {" "}
                                <span id="countdown"></span>
                              </b>
                            </div>
                          </div>
                        </div>
                        <OtpInput
                          value={this.state.otp}
                          onChange={this.handleChange1}
                          numInputs={6}
                          shouldAutoFocus={true}
                          inputStyle={"form-control text-center w-75"}
                          containerStyle={"text-center"}
                        />
                        <div className="row pt-5 ">
                          {this.state.countStop === null ? (
                            <div className="col-md-5 m-auto">
                              <div className="d-sm-flex justify-content-between">
                                <div className="field-wrapper">
                                  <button
                                    type="submit"
                                    className="btn"
                                    value=""
                                    style={{
                                      color: "white",
                                      backgroundColor: "rgb(207, 101, 181)",
                                      borderColor: "rgb(207, 101, 181)",
                                    }}
                                  >
                                    Continue
                                  </button>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="col-md-5 m-auto">
                              <div className="d-sm-flex justify-content-between">
                                <div className="field-wrapper">
                                  <button
                                    type="button"
                                    className="btn btn-secondary"
                                    value=""
                                    // onClick={() => this.requestOtp()}
                                    onClick={() => {
                                      this.timer();
                                      this.requestOtpAgain();
                                      this.setState({ otp: "" });
                                    }}
                                  >
                                    Resend
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                          {/* <div className="col-md-4">
                            <div className="d-sm-flex justify-content-between">
                              <div className="field-wrapper">
                                <button
                                  type="submit"
                                  className="btn btn-secondary"
                                  value=""
                                >
                                  Resend
                                </button>
                              </div>
                            </div>
                          </div> */}
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </body>
      </React.Fragment>
    );
  }
}

export default Verification_Screen;
