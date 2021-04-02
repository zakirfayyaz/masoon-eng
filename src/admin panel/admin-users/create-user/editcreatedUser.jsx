import React, { Component } from "react";
import BackButton from "./../../../utils/backButton";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import axios from "axios";
import api_link from "../../../config.json";
import { ToastContainer, toast } from "react-toastify";
import encrypt from "./../../../utils/Encryption/Encrypt";
import decrypt from "./../../../utils/Encryption/Decrypt";

class EditCreatedUser extends Component {
  state = { data: {} };
  componentDidMount = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      api_link.API_LINK + `admin/users/${this.props.match.params.id}`,
      { headers: { Authorization: token } }
    );
    const user_detail = response["data"]["users"];
    const data = {};
    data.firstname = user_detail.firstname;
    data.lastname = user_detail.lastname;
    data.email = user_detail.email;
    data.phone_number = user_detail.phone_number;
    data.password = "";

    this.setState({ data });
    // console.log(user_detail);
  };
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
    data["user_id"] = this.props.match.params.id;
    // for (var key in data) {
    //   fd.append(key, data[key]);
    // }
    // ${this.props.match.params.id}
    var obj = data;
    obj = encrypt(JSON.stringify(obj));
    try {
      var response = await axios.put(
        api_link.API_LINK + `admin/edit-user`,
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
      toast.error("Error on updation!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      // window.alert("Error Connecting Server");
    }
  };
  render() {
    return (
      <div id="content" class="main-content">
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
        <div class="layout-px-spacing">
          <div class="">
            <div className="row">
              <div className="col-md-12">
                <div class="page-header">
                  <div class="page-title">
                    <div className="d-flex justify-content-between">
                      <BackButton />
                      <h3 style={{ paddingTop: "8px" }}>Edit User Detail</h3>
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
                    style={{ marginTop: "50px" }}
                  >
                    <div class="widget-heading">
                      <h5 class=""> Edit Details</h5>
                    </div>

                    <div class="widget-content">
                      <form className="text-left" onSubmit={this.handleSubmit}>
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
                                defaultValue={this.state.data.firstname}
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
                                defaultValue={this.state.data.lastname}
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
                                defaultValue={this.state.data.email}
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
                                name="phone_number"
                                id="phone"
                                value={this.state.data.phone_number}
                                defaultMask="... ... ..."
                                placeholder=" 989 987 808"
                                // value={this.state.phone}
                                //onChange={(phone) => this.setState({ phone })}
                                onChange={(phone) => {
                                  var update = { ...this.state.data };
                                  phone = phone.substring(0, 13);
                                  update.phone_number = String("+" + phone);
                                  this.setState({ data: update });
                                }}
                              />
                            </div>
                          </div>
                          <div className="row">
                            <div
                              id="username-field"
                              className="field-wrapper input col-12"
                            >
                              <label htmlFor="username" className="text-dark">
                                Password
                              </label>

                              <input
                                id="password"
                                name="password"
                                // required
                                type="text"
                                className="form-control"
                                onChange={this.handleChange}
                              />
                            </div>
                            <div class="col-md-5 m-auto text-center mt-3 pt-3">
                              <div className="">
                                <div className="">
                                  <button
                                    type="submit"
                                    className="btn btn-secondary btn-lg btn-block"
                                  >
                                    Save Changes
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
    );
  }
}

export default EditCreatedUser;
