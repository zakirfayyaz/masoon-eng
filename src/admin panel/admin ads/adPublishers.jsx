import React, { Component } from "react";
import { Link } from "react-router-dom";
import { trackPromise } from "react-promise-tracker";
import axios from "axios";
import api_link from "../../config.json";
import { ToastContainer, toast } from "react-toastify";
import reverseDate from "./../../utils/reverse-date";
import "datatables.net-dt/js/dataTables.dataTables";
// import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import decrypt from "./../../utils/Encryption/Decrypt";
import encrypt from "./../../utils/Encryption/Encrypt";
class AdPublishers extends Component {
  state = {
    Useremail: "",
    bodyLang: "en",
    Userid: "",
    Userlanguage: "",
    transactions: [],
    active: [],
    pending: [],
    active_search: [],
    pending_search: [],
    data: {},
  };
  deleteUser = async (id) => {
    const token = localStorage.getItem("token");
    var obj = {
      user_id: id,
    };
    obj = encrypt(JSON.stringify(obj));
    var response = await axios.post(
      api_link.API_LINK + "truncate",
      { name: obj },
      {
        headers: { Authorization: token },
      }
    );
    // console.log(response);
    response["data"] = JSON.parse(decrypt(response.data.resp));
    if (response.data.status === 200) {
      toast.success("User Deleted ", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      this.getAdvertiser();
    } else {
      toast.error("😐 Error Removing User", {
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
  getAdvertiser = async () => {
    const token = localStorage.getItem("token");
    let response = await trackPromise(
      axios.get(api_link.API_LINK + "admin/users", {
        headers: { Authorization: token },
      })
    );
    response["data"] = JSON.parse(decrypt(response.data.resp));
    const active = response["data"]["publishers_approved"];

    const pending = response["data"]["publishers_pending"];
    this.setState({
      active: active,
      pending: pending,
    });
  };
  componentDidMount = async () => {
    const token = localStorage.getItem("token");
    let response = await trackPromise(
      axios.get(api_link.API_LINK + "admin/users", {
        headers: { Authorization: token },
      })
    );
    response["data"] = JSON.parse(decrypt(response.data.resp));
    const active = response["data"]["publishers_approved"];

    const pending = response["data"]["publishers_pending"];
    this.setState({
      active: active,
      pending: pending,
    });
    if (this.state.active.length > 0) {
      $(document).ready(function () {
        $("#mydatatable").dataTable({});
        $("#mydatatable2").dataTable({});
      });
    }
  };

  sendMail = async () => {
    const token = localStorage.getItem("token");

    var obj = {
      email: this.state.Useremail,
      message: this.state.data["body"],
      subject: this.state.data["subject"],
      user_id: this.state.Userid,
    };
    obj = encrypt(JSON.stringify(obj));
    try {
      const response = await axios.post(
        api_link.API_LINK + "admin/notification-id",
        { name: obj },
        { headers: { Authorization: token } }
      );
      response["data"] = JSON.parse(decrypt(response["data"]["resp"]));
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
  handleChange = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data });
    console.log(this.state.data);
  };
  // reverseDate(str) {
  //   return str.split("-").reverse().join("/");
  // }
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
        <div
          className="modal fade"
          id="composeMailModal101"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">
                  Message User
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form className="mt-3 mb-3">
                  <label for="email" className="text-dark">
                    <b>Reciever Email</b>
                  </label>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="d-flex mb-4 mail-form">
                        <input
                          type="email"
                          id="m-subject"
                          value={this.state.Useremail}
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>

                  <label for="email" className="text-dark">
                    <b>Subject</b>
                  </label>
                  <div className="d-flex mb-4 mail-subject">
                    <div className="w-100">
                      <input
                        type="text"
                        id="m-subject"
                        placeholder="Subject"
                        className="form-control"
                        name="subject"
                        onChange={this.handleChange}
                      />
                      <span
                        className="validation-text"
                        style={{
                          display: "none",
                        }}
                      ></span>
                    </div>
                  </div>
                  <label for="email" className="text-dark">
                    <b>Body Language</b>
                  </label>
                  <div className="">
                    <label className="radio-inline" style={{ fontSize: "2vh" }}>
                      <input
                        type="radio"
                        name="optradio"
                        className="mr-2"
                        value="en"
                        onClick={() => this.setState({ bodyLang: "en" })}
                        defaultChecked
                      />
                      English
                    </label>
                    <label
                      className="radio-inline ml-5"
                      style={{ fontSize: "2vh" }}
                    >
                      <input
                        type="radio"
                        name="optradio"
                        value="ar"
                        onClick={() => this.setState({ bodyLang: "ar" })}
                        className="mr-2"
                      />
                      Arabic
                    </label>
                  </div>
                  <label for="email" className="text-dark">
                    <b>Body</b>
                  </label>

                  <div className="row">
                    <div className="col-md-12">
                      <textarea
                        row="10"
                        style={{
                          width: "100%",
                          height: "125px",
                          fontSize: "16px",
                          textAlign:
                            this.state.bodyLang === "en" ? "left" : "right",
                        }}
                        name="body"
                        onChange={this.handleChange}
                      ></textarea>
                    </div>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-md-success"
                  style={{
                    backgroundColor: "#8dbf42",
                    borderColor: "#8dbf42",
                    color: "white",
                  }}
                  onClick={() => {
                    this.sendMail();
                    this.setState({
                      Useremail: "",
                      Userid: "",
                      Userlanguage: "",
                    });
                  }}
                  data-dismiss="modal"
                >
                  Send Message
                </button>
                <button
                  type="button"
                  className="btn btn-md-danger"
                  data-dismiss="modal"
                  onClick={() => {
                    this.setState({ Useremail: "", Userid: "" });
                  }}
                  style={{
                    backgroundColor: "#e7515a",
                    borderColor: "#e7515a",
                    color: "white",
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>

        <div id="content" className="main-content">
          <div className="layout-px-spacing">
            <div className="page-header">
              <div className="page-title">
                <h3>Advertisers</h3>
              </div>
              <div className="ml-auto" style={{ textAlign: "right" }}>
                <button
                  className="btn btn-secondary btn-lg"
                  onClick={() =>
                    this.props.history.push("/en-admin/register-publisher")
                  }
                >
                  <i className="fas fa-plus"></i> Register Advertiser
                </button>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 col-12 layout-top-spacing">
                <div className="statbox widget box box-shadow">
                  <div className="widget-header"></div>
                  <div className="widget-content widget-content-area icon-pill">
                    <div className="row">
                      <div className="col-md-12">
                        <ul
                          className="nav nav-pills mb-3 mt-3 d-flex justify-content-center text-center"
                          id="icon-pills-tab"
                          role="tablist"
                        >
                          <li className="nav-item">
                            <a
                              className="nav-link active btn-outline-secondary  mr-1 mt-1"
                              id="icon-pills-home-tab"
                              data-toggle="pill"
                              href="#icon-pills-home"
                              role="tab"
                              aria-controls="icon-pills-home"
                              aria-selected="true"
                              style={{
                                padding: "0.6rem 4rem",
                                // fontSize: "2vh",
                                width: "99%",
                              }}
                            >
                              {" "}
                              Active{" "}
                              <span className="badge badge-light">
                                {this.state.active.length}
                              </span>
                            </a>
                          </li>

                          <li className="nav-item ">
                            <a
                              className="nav-link btn-outline-secondary mt-1"
                              id="icon-pills-contact-tab"
                              data-toggle="pill"
                              href="#icon-pills-contact"
                              role="tab"
                              aria-controls="icon-pills-contact"
                              aria-selected="false"
                              style={{
                                padding: "0.6rem 4rem",
                                // fontSize: "2vh",
                              }}
                            >
                              {" "}
                              Inactive{" "}
                              <span className="badge badge-light">
                                {this.state.pending.length}
                              </span>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="tab-content" id="icon-pills-tabContent">
                      <div
                        className="tab-pane fade show active"
                        id="icon-pills-home"
                        role="tabpanel"
                        aria-labelledby="icon-pills-home-tab"
                      >
                        {/*Active*/}
                        <div className="table-responsive mb-4 mt-4">
                          <table
                            id="mydatatable"
                            className="table table-hover non-hover"
                            style={{ width: "100%" }}
                          >
                            <thead>
                              <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone Number</th>
                                <th>Joined date</th>
                                {/* <th>Language Selected</th>
                                <th>Payment Status</th>
                                <th>Pending Requests</th> */}
                                <th>Contact</th>
                                <th style={{ textAlign: "center" }}>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {this.state.active.map((pointer) => (
                                <tr>
                                  <td>
                                    <div className="d-flex">
                                      <div className="usr-img-frame mr-2 rounded-circle">
                                        <img src="https://img.icons8.com/color/48/000000/circled-user-male-skin-type-7--v2.png" />
                                      </div>
                                    </div>
                                  </td>
                                  <td style={{ fontWeight: "900" }}>
                                    {pointer.name}
                                  </td>
                                  <td style={{ fontWeight: "900" }}>
                                    {pointer.email}
                                  </td>
                                  <td style={{ fontWeight: "900" }}>
                                    {pointer.phone_number}
                                  </td>
                                  <td style={{ fontWeight: "900" }}>
                                    {reverseDate(
                                      pointer.createdAt.substring(
                                        0,
                                        pointer.createdAt.indexOf("T")
                                      )
                                    )}
                                  </td>
                                  {/* <td style={{ fontWeight: "900" }}>
                                        {pointer.language === "en"
                                          ? "English"
                                          : "Arabic"}
                                      </td>
                                      <td>
                                        {pointer.status === "Approved" ? (
                                          <div className="td-content">
                                            <span className="badge outline-badge-success">
                                              Active
                                            </span>
                                          </div>
                                        ) : (
                                          <div className="td-content">
                                            <span className="badge outline-badge-danger">
                                              Pending
                                            </span>
                                          </div>
                                        )}
                                      </td>
                                      <td style={{ textAlign: "center" }}>
                                        {" "}
                                        <button
                                          className="btn btn-md btn-secondary"
                                          style={{ fontSize: "15px" }}
                                          onClick={() =>
                                            this.props.history.replace(
                                              "/en-admin/user-Ad/" +
                                                pointer._id +
                                                "/" +
                                                pointer.name
                                            )
                                          }
                                        >
                                          {pointer.count}
                                        </button>
                                      </td> */}
                                  <td>
                                    <Link
                                      to="#"
                                      className="btn btn-primary"
                                      data-toggle="modal"
                                      data-target="#composeMailModal101"
                                      onClick={() =>
                                        this.setState({
                                          Useremail: pointer.email,
                                          Userid: pointer._id,
                                          Userlanguage: pointer.language,
                                        })
                                      }
                                    >
                                      <i className="fa fa-envelope"></i> Message{" "}
                                    </Link>
                                  </td>
                                  <td style={{ textAlign: "center" }}>
                                    <div class="input-group-prepend">
                                      <button
                                        type="button"
                                        class="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split"
                                        data-toggle="dropdown"
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                      >
                                        {" "}
                                        More
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
                                        style={{ willChange: "transform" }}
                                      >
                                        <Link
                                          to={`/en-admin/publisher-detail/${pointer._id}`}
                                          class="dropdown-item"
                                        >
                                          Show Detail{" "}
                                          <i className="fas fa-angle-right text-white"></i>
                                        </Link>

                                        <Link
                                          class="dropdown-item"
                                          to={`#`}
                                          onClick={
                                            () =>
                                              this.setState({
                                                deleteUser: pointer._id,
                                              })
                                            // this.deleteUser(pointer._id)
                                          }
                                          data-toggle="modal"
                                          data-target="#deleteAdvertiser"
                                        >
                                          Delete Advertiser
                                        </Link>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div
                        className="tab-pane fade"
                        id="icon-pills-contact"
                        role="tabpanel"
                        aria-labelledby="icon-pills-contact-tab"
                      >
                        {/*InActive*/}
                        <div className="table-responsive mb-4 mt-4">
                          <table
                            id="mydatatable2"
                            className="table table-hover non-hover"
                            style={{ width: "100%" }}
                          >
                            <thead>
                              <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone Number</th>
                                <th>Joined date</th>
                                {/* <th>Language Selected</th>
                                <th>Payment Status</th>
                                <th>Pending Requests</th> */}
                                <th>Contact</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {this.state.pending.map((pointer) => (
                                <tr>
                                  <td>
                                    <div className="d-flex">
                                      <div className="usr-img-frame mr-2 rounded-circle">
                                        <img src="https://img.icons8.com/color/48/000000/circled-user-male-skin-type-7--v2.png" />
                                      </div>
                                    </div>
                                  </td>
                                  <td style={{ fontWeight: "900" }}>
                                    {pointer.name}
                                  </td>
                                  <td style={{ fontWeight: "900" }}>
                                    {pointer.email}
                                  </td>
                                  <td style={{ fontWeight: "900" }}>
                                    {pointer.phone_number}
                                  </td>
                                  <td style={{ fontWeight: "900" }}>
                                    {reverseDate(
                                      pointer.createdAt.substring(
                                        0,
                                        pointer.createdAt.indexOf("T")
                                      )
                                    )}
                                  </td>
                                  {/* <td style={{ fontWeight: "900" }}>
                                        {pointer.language === "en"
                                          ? "English"
                                          : "Arabic"}
                                      </td>
                                      <td>
                                        {pointer.status === "Approved" ? (
                                          <div className="td-content">
                                            <span className="badge outline-badge-success">
                                              PAID
                                            </span>
                                          </div>
                                        ) : (
                                          <div className="td-content">
                                            <span className="badge outline-badge-danger">
                                              UNPAID
                                            </span>
                                          </div>
                                        )}
                                      </td>
                                      <td style={{ textAlign: "center" }}>
                                        {" "}
                                        <button
                                          className="btn btn-md btn-secondary"
                                          style={{ fontSize: "15px" }}
                                          onClick={() =>
                                            this.props.history.replace(
                                              "/en-admin/user-Ad/" +
                                                pointer._id +
                                                "/" +
                                                pointer.name
                                            )
                                          }
                                        >
                                          {pointer.count}
                                        </button>
                                      </td> */}
                                  <td>
                                    <Link
                                      to="#"
                                      className="btn btn-primary"
                                      data-toggle="modal"
                                      data-target="#composeMailModal101"
                                      onClick={() =>
                                        this.setState({
                                          Useremail: pointer.email,
                                          Userid: pointer._id,
                                          Userlanguage: pointer.language,
                                        })
                                      }
                                    >
                                      <i className="fa fa-envelope"></i> Message{" "}
                                    </Link>
                                  </td>
                                  <td>
                                    <div class="input-group-prepend">
                                      <button
                                        type="button"
                                        class="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split"
                                        data-toggle="dropdown"
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                      >
                                        {" "}
                                        More
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
                                        style={{ willChange: "transform" }}
                                      >
                                        <Link
                                          to={`/en-admin/publisher-detail/${pointer._id}`}
                                          class="dropdown-item"
                                        >
                                          Show Detail{" "}
                                          <i className="fas fa-angle-right text-white"></i>
                                        </Link>

                                        <Link
                                          class="dropdown-item"
                                          to={`#`}
                                          onClick={
                                            () =>
                                              this.setState({
                                                deleteUser: pointer._id,
                                              })
                                            // this.deleteUser(pointer._id)
                                          }
                                          data-toggle="modal"
                                          data-target="#deleteAdvertiser"
                                        >
                                          Delete Advertiser
                                        </Link>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
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
        <div
          class="modal fade"
          id="deleteAdvertiser"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">
                  Remove Advertiser
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <p>
                  <h3>Are you sure you want to remove this Advertiser ? </h3>
                </p>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-warning"
                  style={{ color: "white", backgroundColor: "#e2a03f" }}
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  class="btn btn-secondary"
                  style={{ color: "white", backgroundColor: "#5c1ac3" }}
                  onClick={() => this.deleteUser(this.state.deleteUser)}
                  data-dismiss="modal"
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default AdPublishers;
