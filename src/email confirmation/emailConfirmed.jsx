import React, { Component } from "react";
import { usePromiseTracker } from "react-promise-tracker";
import Loader from "react-promise-loader";
import axios from "axios";
import api_link from "../config.json";
class EmailVerified extends Component {
  state = { status: null };
  componentDidMount = async () => {
    this.setState({ status: null });
    //console.log(this.props.match.params.id);
    try {
      const response = await axios.get(
        api_link.API_LINK + `confirmation/${this.props.match.params.id}`
      );
      console.log(response);
      if (response.data.status === 200) {
        setTimeout(() => this.setState({ status: "true" }), 1000);
      } else {
        setTimeout(() => this.setState({ status: "false" }), 1000);
      }
    } catch (e) {
      //console.log(e);
    }
  };
  render() {
    return (
      <>
        <React.Fragment>
          <Loader
            promiseTracker={usePromiseTracker}
            color={"#5c1ac3"}
            background={"rgb(255, 255, 255)"}
          />
          <body className="" style={{ backgroundColor: "mintcream" }}>
            {this.state.status == null && <></>}
            {this.state.status === "true" && (
              <div className="form-container outer bg-gradient-danger">
                <div className="form-form">
                  <div className="form-form-wrap">
                    <div className="form-container">
                      <div
                        className="form-content"
                        style={{
                          padding: "30px",
                          paddingRight: "15px",
                          borderRadius: "15px",
                        }}
                      >
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            x="0px"
                            y="0px"
                            width="144"
                            height="144"
                            viewBox="0 0 48 48"
                            style={{ fill: "#000000" }}
                          >
                            <path
                              fill="#c8e6c9"
                              d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"
                            ></path>
                            <path
                              fill="#4caf50"
                              d="M34.586,14.586l-13.57,13.586l-5.602-5.586l-2.828,2.828l8.434,8.414l16.395-16.414L34.586,14.586z"
                            ></path>
                          </svg>
                        </div>
                        <h1 className="">Email Verified!</h1>
                        <p
                          className=""
                          style={{ fontSize: "2vh", marginBottom: "5px" }}
                        >
                          Thank You, your email has been verified. Your account
                          is now active.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {this.state.status === "false" && (
              <div className="form-container outer bg-gradient-danger">
                <div className="form-form">
                  <div className="form-form-wrap">
                    <div className="form-container">
                      <div
                        className="form-content"
                        style={{
                          padding: "30px",
                          paddingRight: "15px",
                          borderRadius: "15px",
                        }}
                      >
                        <div>
                          <svg
                            viewBox="0 0 24 24"
                            width="100"
                            height="100"
                            stroke="#e7515a"
                            stroke-width="2"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="css-i6dzq1"
                          >
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                          </svg>
                        </div>
                        <h1 className="">Error Validating Email!</h1>
                        <p
                          className=""
                          style={{ fontSize: "2vh", marginBottom: "5px" }}
                        >
                          The email you are trying to verify is already verified
                          or this link could be expired
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </body>
        </React.Fragment>
      </>
    );
  }
}

export default EmailVerified;
