import React, { Component } from "react";
import { ToastContainer } from "react-toastify";

class PasswordReset extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <body className="" style={{ backgroundColor: "mintcream" }}>
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
                    <h1 className="">Password Changed Successfully!</h1>
                    <p
                      className=""
                      style={{ fontSize: "2vh", marginBottom: "5px" }}
                    >
                      You can use your new password to log in.
                    </p>
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

export default PasswordReset;
