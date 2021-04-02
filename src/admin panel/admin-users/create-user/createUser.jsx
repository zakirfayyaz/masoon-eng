import React, { Component } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import axios from "axios";
import api_link from "../../../config.json";
import { ToastContainer, toast } from "react-toastify";
import BackButton from "./../../../utils/backButton";
import encrypt from "./../../../utils/Encryption/Encrypt";
import decrypt from "./../../../utils/Encryption/Decrypt";

class CreateUser extends Component {
  state = { data: {} };

  handleChange = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data });
    // console.log(data);
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    // var fd = new FormData();
    const data = this.state.data;
    data["email"] = data["email"].toLowerCase();
    if (
      data["phone_number"] ||
      data["phone_number"] === "" ||
      data["phone_number"] == null ||
      data["phone_number"] === undefined
    ) {
      // for (var key in data) {
      //   fd.append(key, data[key]);
      // }
      var obj = data;
      obj = encrypt(JSON.stringify(obj));

      try {
        var response = await axios.post(
          api_link.API_LINK + "admin/create-user",
          { name: obj },
          { headers: { Authorization: token } }
        );
        // console.log(response);
        response["data"] = JSON.parse(decrypt(response["data"]["resp"]));
        if (response["data"]["status"] === 200) {
          toast.success(response["data"]["message"], {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setTimeout(() => (window.location.href = "/en-admin/aUsers"), 3000);
        } else {
          toast.error(response["data"]["message"], {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      } catch (e) {
        // console.log(e);
      }
    } else {
      toast.error("Provide Phone Number", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  render() {
    return (
      <>
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
        <div id="content" class="main-content">
          <div class="layout-px-spacing">
            <div class="">
              <div className="row">
                <div className="col-md-12">
                  <div class="page-header">
                    <div class="page-title">
                      <div className="d-flex justify-content-between">
                        <BackButton />
                        <h3 style={{ paddingTop: "8px" }}>Register New User</h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <React.Fragment>
                <div class="row layout-top-spacing">
                  <div className="col-md-8 m-auto">
                    <div
                      class="widget widget-table-one"
                      style={{ marginTop: "40px" }}
                    >
                      <div class="widget-heading">
                        <h5 class=""> Creation Form</h5>
                      </div>

                      <div class="widget-content">
                        <form
                          className="text-left"
                          onSubmit={this.handleSubmit}
                        >
                          <div className="form">
                            <div className="row">
                              <div
                                id="username-field"
                                className="field-wrapper input col-12"
                              >
                                <label htmlFor="username" className="text-dark">
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
                              <div
                                id="username-field"
                                className="field-wrapper input col-12"
                              >
                                <label htmlFor="username" className="text-dark">
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
                            <div className="row">
                              <div
                                id="username-field"
                                className="field-wrapper input col-12"
                              >
                                <label htmlFor="username" className="text-dark">
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
                                />
                              </div>
                              {/*Phone Field*/}
                              <div
                                id="username-field"
                                className="field-wrapper input col-12"
                              >
                                <label htmlFor="username" className="text-dark">
                                  PHONE
                                </label>
                                <PhoneInput
                                  country={"sa"}
                                  required
                                  name="phone_number"
                                  id="phone"
                                  defaultMask="... ... ..."
                                  placeholder=" 989 798 089"
                                  value={this.state.phone}
                                  //onChange={(phone) => this.setState({ phone })}
                                  onChange={(phone) => {
                                    var update = { ...this.state.data };
                                    phone = phone.substring(0, 13);
                                    update.phone_number = String("+" + phone);
                                    this.setState({ data: update });
                                  }}
                                />
                              </div>
                              {/*Phone Field ENDS*/}
                            </div>
                            <div className="row">
                              <div
                                id="password-field"
                                className="field-wrapper input mb-2 col-12"
                              >
                                <div className="d-flex justify-content-between">
                                  <label
                                    htmlFor="password"
                                    className="text-dark"
                                  >
                                    PASSWORD
                                  </label>
                                </div>

                                <input
                                  id="password"
                                  name="password"
                                  type={
                                    this.state.visible === 1
                                      ? "text"
                                      : "password"
                                  }
                                  className="form-control"
                                  placeholder="Password"
                                  required
                                  onChange={this.handleChange}
                                />
                              </div>
                              <div
                                id="password-field"
                                className="field-wrapper input mb-2 col-12"
                              >
                                <div className="d-flex justify-content-between">
                                  <label
                                    htmlFor="password"
                                    className="text-dark"
                                  >
                                    CONFIRM PASSWORD
                                  </label>
                                </div>

                                <input
                                  id="confirm password"
                                  name="confirmPassword"
                                  type="password"
                                  required
                                  className="form-control"
                                  placeholder="Confirm Password"
                                  onChange={this.handleChange}
                                />
                              </div>
                            </div>
                            <div className="m-3 col-md-5 m-auto mt-2">
                              <div className="">
                                <button
                                  type="submit"
                                  className="btn btn-secondary btn-lg btn-block"
                                >
                                  Create Account
                                </button>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </React.Fragment>
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
      </>
    );
  }
}

export default CreateUser;
