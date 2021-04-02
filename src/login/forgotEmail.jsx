import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import api_link from "../config.json";
class ForgotEmail extends Component {
  state = { data: {}, matchError: false, visible: 0 };
  handleChange = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data });
  };
  showpassword = () => {
    if (this.state.visible === 0) {
      this.setState({ visible: 1 });
    } else {
      this.setState({ visible: 0 });
    }
  };
  updatePassword = async () => {
    const data = { ...this.state.data };
    if (data.password !== data.confirmPassword) {
      this.setState({ matchError: true });
    } else {
      this.setState({ matchError: false });
      try {
        const response = await axios.put(
          api_link.API_LINK + `resetpassword/${this.props.match.params.id}`,
          { password: data.password }
        );
        //console.log(response);
        if (response.data.status === 200) {
          // toast.success("Password Updated Successfully", {
          //   position: "top-center",
          //   autoClose: 3000,
          //   hideProgressBar: true,
          //   closeOnClick: true,
          //   pauseOnHover: true,
          //   draggable: true,
          //   progress: undefined,
          // });
          setTimeout(() => (window.location.href = "/passwordreset"), 2000);
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
      } catch (e) {
        //console.log(e);
      }
    }
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
                  <div className="form-content" style={{ padding: "30px" }}>
                    <img
                      src="https://img.icons8.com/ios/96/000000/lock-2.png"
                      alt="img"
                    />
                    <h1 className="">Reset Password</h1>
                    {/* <p
                      className=""
                      style={{
                        fontSize: "2vh",
                        marginBottom: "5px",
                        textAlign: "initial",
                      }}
                    >
                      Enter your registered Email.
                    </p> */}
                    <label className="text-dark">
                      <b>New Password</b>
                    </label>
                    <div class="input-group mb-4">
                      <input
                        type={this.state.visible === 1 ? "text" : "password"}
                        class="form-control"
                        name="password"
                        onChange={this.handleChange}
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
                        className="feather feather-eye"
                        onClick={this.showpassword}
                        style={{
                          position: "absolute",
                          left: "90%",
                          top: "12px",
                        }}
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    </div>
                    <label className="text-dark">
                      <b>Confirm Password</b>
                    </label>
                    <div class="input-group mb-4">
                      <input
                        type="password"
                        class="form-control"
                        placeholder=""
                        name="confirmPassword"
                        onChange={this.handleChange}
                      />
                    </div>
                    {this.state.matchError ? (
                      <div class="alert alert-danger" role="alert">
                        Password Missmatch!
                      </div>
                    ) : null}
                    <button
                      class="btn btn-block btn-lg"
                      type="button"
                      style={{
                        marginBottom: "1px",
                        backgroundColor: "rgb(207, 101, 181)",
                        borderColor: "rgb(207, 101, 181)",
                        color: "white",
                      }}
                      onClick={() => this.updatePassword()}
                    >
                      Reset Password
                    </button>

                    {/* <div className="d-flex" style={{ fontSize: "2vh" }}>
                      <hr style={{ margin: "0px", width: "50%" }}></hr>
                      <b>OR</b>
                      <hr style={{ margin: "0px", width: "50%" }}></hr>
                    </div> */}

                    {/* <p style={{ textAlign: "left" }}>Create a new Account!</p> */}
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

export default ForgotEmail;
