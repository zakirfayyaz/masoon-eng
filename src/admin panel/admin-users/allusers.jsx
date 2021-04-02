import React, { Component } from "react";
import { trackPromise } from "react-promise-tracker";
import { usePromiseTracker } from "react-promise-tracker";
import Loader from "react-promise-loader";
import axios from "axios";
import api_link from "../../config.json";
import { Link } from "react-router-dom";
import "./test.css";
import { ToastContainer, toast } from "react-toastify";

class AdminUsers extends Component {
  state = { users: [], recieverEmail: "", data: {} };
  componentDidMount = async () => {
    const token = localStorage.getItem("token");
    const response = await trackPromise(
      axios.get(api_link.API_LINK + "admin/users", {
        headers: { Authorization: token },
      })
    );
    const users = response["data"]["users"];
    this.setState({ users: users });
    // console.log(response);
  };
  handleChange = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data });
    // console.log(this.state.data);
  };
  suspend = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const resp = await axios.put(
        api_link.API_LINK + "admin/users/suspend/" + id,
        { headers: { Authorization: token } }
      );
      if (resp["data"]["status"] === 200) {
        toast.dark("✅ User Suspended", {
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

      const response = await axios.get(api_link.API_LINK + "admin/users", {
        headers: { Authorization: token },
      });
      const users = response["data"]["users"];
      this.setState({ users: users });
    } catch (e) {
      // console.log(e);

      toast.error("😐 Error Suspending User", {
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
  sendMail = async (id) => {
    const token = localStorage.getItem("token");
    const fd = new FormData();
    // fd.append("from", "admin@gmail.com");
    fd.append("email", this.state.recieverEmail);
    // fd.append("status", 1);
    fd.append("message", this.state.data["body"]);
    fd.append("subject", this.state.data["subject"]);
    // console.log(this.state.data);

    try {
      const response = await axios.post(
        api_link.API_LINK + "admin/notification/" + id,
        fd,
        { headers: { Authorization: token } }
      );
      // console.log(response);
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
  activate = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const resp = await axios.put(
        api_link.API_LINK + "admin/users/approve/" + id,
        { headers: { Authorization: token } }
      );

      if (resp["data"]["status"] === 200) {
        toast.dark("✅ User Activated", {
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
      const response = await axios.get(api_link.API_LINK + "admin/users", {
        headers: { Authorization: token },
      });
      const users = response["data"]["users"];
      this.setState({ users: users });
    } catch (e) {
      // console.log(e);
      toast.error("😐 Error Activating User", {
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
        <div
          class="modal fade"
          id="composeMailModal"
          tabindex="-1"
          role="dialog"
          style={{ display: "none" }}
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-body" style={{ height: "50vh" }}>
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
                  class="feather feather-x close"
                  data-dismiss="modal"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
                <div class="compose-box">
                  <div class="compose-content">
                    <form className="mt-3 mb-3">
                      <div class="row">
                        <div class="col-md-12">
                          <div class="d-flex mb-4 mail-form">
                            <p>From:</p>
                            <input
                              type="email"
                              id="m-subject"
                              value="admin@gmail.com"
                              class="form-control"
                            />
                          </div>
                        </div>
                      </div>

                      <div class="row">
                        <div class="col-md-12">
                          <div class="d-flex mb-4 mail-form">
                            <p>To:</p>

                            <input
                              type="email"
                              id="m-subject"
                              value={this.state.recieverEmail}
                              class="form-control"
                            />
                          </div>
                        </div>
                      </div>

                      <div class="d-flex mb-4 mail-subject">
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
                          class="feather feather-mail"
                        >
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                          <polyline points="22,6 12,13 2,6"></polyline>
                        </svg>
                        <div class="w-100">
                          <input
                            type="text"
                            id="m-subject"
                            placeholder="Subject"
                            class="form-control"
                            name="subject"
                            onChange={this.handleChange}
                          />
                          <span
                            class="validation-text"
                            style={{
                              display: "none",
                            }}
                          ></span>
                        </div>
                      </div>

                      <p style={{ fontSize: "2.5vh" }}>
                        <b>Body : </b>
                      </p>

                      <div className="row">
                        <div className="col-md-12">
                          <textarea
                            name="body"
                            row="10"
                            style={{
                              width: "100%",
                              height: "125px",
                            }}
                            name="body"
                            onChange={this.handleChange}
                          ></textarea>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button class="btn" data-dismiss="modal">
                  {" "}
                  <i class="flaticon-delete-1"></i> Discard
                </button>

                <button
                  id="btn-send"
                  class="btn"
                  data-dismiss="modal"
                  onClick={() => this.sendMail(this.state.recieverId)}
                >
                  {" "}
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>

        <div id="content" class="main-content">
          <div class="layout-px-spacing">
            <div class="page-header">
              <div class="page-title">
                <h3>Users</h3>
              </div>
            </div>
            <div class="row layout-top-spacing" id="cancel-row">
              <div class="col-xl-12 col-lg-12 col-sm-12  layout-spacing">
                <div
                  class="widget-content widget-content-area br-6 example"
                  style={{
                    maxHeight: "75vh",
                  }}
                >
                  <Loader
                    promiseTracker={usePromiseTracker}
                    color={"#5c1ac3"}
                    background={"rgb(255, 255, 255)"}
                  />
                  <div class="table-responsive mb-4 mt-4">
                    {this.state.users.length > 0 ? (
                      <table
                        // id="html5-extension"
                        class="table table-hover non-hover"
                        style={{ width: "100%", textAlign: "center" }}
                      >
                        <thead>
                          <tr>
                            {/* <th></th> */}
                            <th>Name</th>
                            <th>Email</th>

                            <th>Joined date</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.users.map((pointer) => (
                            <tr>
                              {/* <td>{pointer.id}</td> */}
                              <td>
                                <div class="d-flex">
                                  <div class="usr-img-frame mr-2 rounded-circle">
                                    <img
                                      alt="avatar"
                                      class="img-fluid rounded-circle"
                                      src="/assets/img/90x90.jpg"
                                    />
                                  </div>
                                </div>
                              </td>
                              <td style={{ fontWeight: "900" }}>
                                {pointer.firstname} {pointer.lastname}
                              </td>
                              <td style={{ fontWeight: "900" }}>
                                {pointer.email}
                              </td>
                              <td style={{ fontWeight: "900" }}>
                                {pointer.createdAt.substring(
                                  0,
                                  pointer.createdAt.indexOf("T")
                                )}
                              </td>
                              <td>
                                {pointer.status === "Approved" ? (
                                  <div class="td-content">
                                    <span class="badge outline-badge-success">
                                      Active
                                    </span>
                                  </div>
                                ) : (
                                  <div class="td-content">
                                    <span class="badge outline-badge-danger">
                                      Pending
                                    </span>
                                  </div>
                                )}
                              </td>

                              <td>
                                <div class="btn-group">
                                  <button
                                    type="button"
                                    class="btn btn-dark btn-sm"
                                  >
                                    Open
                                  </button>
                                  <button
                                    type="button"
                                    class="btn btn-dark btn-sm dropdown-toggle dropdown-toggle-split"
                                    id="dropdownMenuReference11"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                    data-reference="parent"
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
                                      class="feather feather-chevron-down"
                                    >
                                      <polyline points="6 9 12 15 18 9"></polyline>
                                    </svg>
                                  </button>
                                  <div
                                    class="dropdown-menu"
                                    aria-labelledby="dropdownMenuReference1"
                                  >
                                    {pointer.status === "Approved" && (
                                      <Link
                                        class="dropdown-item"
                                        to="#"
                                        onClick={() =>
                                          this.setState({
                                            recieverEmail: pointer.email,
                                            recieverId: pointer._id,
                                          })
                                        }
                                        data-toggle="modal"
                                        data-target="#composeMailModal"
                                      >
                                        Message
                                      </Link>
                                    )}
                                    {pointer.status === "Pending" ? (
                                      <Link
                                        class="dropdown-item"
                                        to="#"
                                        onClick={() =>
                                          this.activate(pointer._id)
                                        }
                                      >
                                        Active
                                      </Link>
                                    ) : null}
                                    {pointer.status === "Approved" ? (
                                      <Link
                                        class="dropdown-item"
                                        to="#"
                                        onClick={() =>
                                          this.suspend(pointer._id)
                                        }
                                      >
                                        Suspend
                                      </Link>
                                    ) : null}
                                    <Link class="dropdown-item" to="#">
                                      Remove User
                                    </Link>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <div className="col-md-10 m-auto text-center">
                        <h4 className="mt-2"></h4>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="footer-wrapper">
            <div class="footer-section f-section-1">
              <p class="">
                Copyright © 2020{" "}
                <a target="_blank" href="https://cdoxs.com">
                  CDOXS
                </a>
                , All rights reserved.
              </p>
            </div>
            <div class="footer-section f-section-2">
              <p class="">
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
                  class="feather feather-heart"
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

export default AdminUsers;
