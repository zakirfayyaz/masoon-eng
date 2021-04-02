import React, { Component, Suspense } from "react";
import { trackPromise } from "react-promise-tracker";
import { usePromiseTracker } from "react-promise-tracker";
import Loader from "react-promise-loader";
import axios from "axios";
import api_link from "../../config.json";
import { Link } from "react-router-dom";
import "./test.css";
import { ToastContainer, toast } from "react-toastify";
// import IncomeRelatedGraph from "./incomeRelatedGraph/income-related-graph";

// import IncomeRelatedPie from "./incomeRelatedGraph/income-related-pie";
// import IncomeRelatedPie2 from "./incomeRelatedGraph/income-related-pie2";

import $ from "jquery";
import endpoint from "./../../utils/endpoint";
import decrypt from "./../../utils/Encryption/Decrypt";

import encrypt from "./../../utils/Encryption/Encrypt";
const IncomeRelatedGraph = React.lazy(() =>
  import("./incomeRelatedGraph/income-related-graph")
);
const IncomeRelatedPie = React.lazy(() =>
  import("./incomeRelatedGraph/income-related-pie")
);
const IncomeRelatedPie2 = React.lazy(() =>
  import("./incomeRelatedGraph/income-related-pie2")
);

class AdminUsers extends Component {
  state = {
    Useremail: "",
    bodyLang: "en",
    Userid: "",
    Userlanguage: "",
    users: [],
    recieverEmail: "",
    data: {},
    active: [],
    pending: [],
    deleteUser: "",
    active_search: [],
    pending_search: [],
    spending: [],
    months: [
      "Select Month",
      "january",
      "february",
      "march",
      "april",
      "may",
      "june",
      "july",
      "august",
      "september",
      "october",
      "november",
      "december",
    ],
    per_saving_vs_income: 0,
    per_saving_vs_budget: 0,
  };

  reverseDate(str) {
    return str.split("-").reverse().join("/");
  }
  getUsers = async () => {
    const token = localStorage.getItem("token");
    var response = await trackPromise(
      axios.get(api_link.API_LINK + "admin/users", {
        headers: { Authorization: token },
      })
    );
    response["data"] = JSON.parse(decrypt(response["data"]["resp"]));
    const users = response["data"]["users"];
    this.setState({
      users: users,
      active: response["data"]["active"],
      pending: response["data"]["pending"],
    });
  };
  async componentDidMount() {
    const date = new Date();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const token = localStorage.getItem("token");
    let response = await trackPromise(
      axios.get(endpoint + "admin/users", {
        headers: { Authorization: token },
      })
    );
    response["data"] = JSON.parse(decrypt(response["data"]["resp"]));
    // var users = response["data"]["users"];

    var response1 = await axios.get(
      api_link.API_LINK + "income/spendings/overall/admin",
      { headers: { Authorization: token } }
    );
    // console.log(response1);
    response1["data"] = JSON.parse(decrypt(response1["data"]["resp"]));
    this.setState({
      spending: response1.data,
      // users: users,
      active: response["data"]["active"],
      pending: response["data"]["pending"],
    });
    // console.log(response);
    if (this.state.active.length > 0) {
      $(document).ready(function () {
        $("#mydatatable").dataTable({});
        $("#mydatatable2").dataTable({});
      });
    }

    try {
      let response = await axios.get(
        api_link.API_LINK +
          `income/all/savings/budget/all/${this.state.months[month]}/${year}`,
        { headers: { Authorization: token } }
      );
      response["data"] = JSON.parse(decrypt(response["data"]["resp"]));
      // console.log("Overall Data", response);
      const data = response["data"]["savings"];
      var per_SVI = 0;
      var per_SVB = 0;
      var total_saving = 0;
      if (data.length > 0) {
        for (var i = 0; i < data.length; i++) {
          total_saving += data[i]["saving"];
        }
        var sum_of_expense = 0;
        for (let k = 0; k < data.length; k++) {
          sum_of_expense += data[k].expense;
        }
        per_SVI = parseFloat(
          ((response.data.total_income - sum_of_expense) /
            response.data.total_income) *
            100
        ).toFixed(2);
        per_SVB = parseFloat(
          (total_saving / response.data.total_budget) * 100
        ).toFixed(2);
        this.setState({
          per_saving_vs_income: per_SVI,
          per_saving_vs_budget: per_SVB,
        });
      } else {
        this.setState({
          per_saving_vs_income: 0,
          per_saving_vs_budget: 0,
        });
      }
    } catch (e) {
      // console.log("Errorororor", e);
    }
  }

  handleChange = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data });
    // console.log(this.state.data);
  };
  handleMonthChange = (event) => {
    // var selectedMonth = event.currentTarget.value;
    // console.log(selectedMonth);
  };
  // suspend = async (id) => {
  //   const token = localStorage.getItem("token");
  //   try {
  //     const resp = await axios.put(
  //       api_link.API_LINK + "admin/users/suspend/" + id,
  //       { headers: { Authorization: token } }
  //     );
  //     if (resp["data"]["status"] === 200) {
  //       toast.dark("✅ User Suspended", {
  //         position: "top-center",
  //         autoClose: 2000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //       });
  //     }
  //     console.log(resp);

  //     const response = await axios.get(api_link.API_LINK + "admin/users", {
  //       headers: { Authorization: token },
  //     });
  //     const users = response["data"]["users"];
  //     this.setState({ users: users });
  //   } catch (e) {
  //     console.log(e);

  //     toast.error("😐 Error Suspending User", {
  //       position: "top-center",
  //       autoClose: 2000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //     });
  //   }
  // };
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
      this.getUsers();
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
  sendMail = async () => {
    const token = localStorage.getItem("token");
    var obj = {
      email: this.state.Useremail,
      message: this.state.data["body"],
      subject: this.state.data["subject"],
      user_id: this.state.Userid,
    };
    // const fd = new FormData();
    // fd.append("email", this.state.Useremail);
    // fd.append("message", this.state.data["body"]);
    // fd.append("subject", this.state.data["subject"]);
    // console.log(this.state.data);
    obj = encrypt(JSON.stringify(obj));
    try {
      var response = await axios.post(
        api_link.API_LINK + "admin/notification-id",
        { name: obj },
        { headers: { Authorization: token } }
      );
      // console.log(response);
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

  render() {
    return (
      <React.Fragment>
        {/*Modal*/}

        <div
          class="modal fade"
          id="composeMailModal101"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">
                  Message User
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
                <form className="mt-3 mb-3">
                  <label for="email" className="text-dark">
                    <b>Reciever Email</b>
                  </label>
                  <div class="row">
                    <div class="col-md-12">
                      <div class="d-flex mb-4 mail-form">
                        <input
                          type="email"
                          id="m-subject"
                          value={this.state.Useremail}
                          class="form-control"
                        />
                      </div>
                    </div>
                  </div>

                  <label for="email" className="text-dark">
                    <b>Subject</b>
                  </label>
                  <div class="d-flex mb-4 mail-subject">
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
                  <label for="email" className="text-dark">
                    <b>Body Language</b>
                  </label>
                  <div className="">
                    <label class="radio-inline" style={{ fontSize: "2vh" }}>
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
                      class="radio-inline ml-5"
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
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-md-success"
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
                  class="btn btn-md-danger"
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
        {/*Modal Ends*/}
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
        <Loader
          promiseTracker={usePromiseTracker}
          color={"#5c1ac3"}
          background={"rgb(255, 255, 255)"}
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
                <div className="d-flex justify-content-between">
                  {/* <BackButton onClick={() => window.history.go(-1)} /> */}
                  <h3>Users Detail</h3>
                </div>
              </div>
            </div>
            <div className="row mt-4">
              <div class="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12 layout-spacing mt-2 m-auto">
                <div class="d-flex justify-content-between widget-account-invoice-six layout-spacing">
                  <div class="mt-2">
                    <span class="text-white" style={{ fontSize: "20px" }}>
                      % Saving Vs Income
                    </span>
                  </div>
                  <div class="">
                    <p
                      class="text-white "
                      style={{
                        fontSize: "20px",
                        marginTop: "8px",
                        marginBottom: "0px",
                      }}
                    >
                      <b> {this.state.per_saving_vs_income}</b>
                    </p>
                  </div>
                </div>
              </div>
              <div class="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12 layout-spacing mt-2 m-auto">
                <div class="d-flex justify-content-between widget-account-invoice-six layout-spacing">
                  <div class="mt-2">
                    <span class="text-white" style={{ fontSize: "20px" }}>
                      % Saving Vs Budget
                    </span>
                  </div>
                  <div class="">
                    <p
                      class="text-white "
                      style={{
                        fontSize: "20px",
                        marginTop: "8px",
                        marginBottom: "0px",
                      }}
                    >
                      <b> {this.state.per_saving_vs_budget} </b>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="row layout-spacing">
              <div className="col-12 col-lg-12 col-md-12 mt-3">
                <Suspense fallback={<div></div>}>
                  <IncomeRelatedGraph />
                </Suspense>
              </div>
              <div className="col-12 col-lg-6 col-md-12 mt-3">
                <Suspense fallback={<div></div>}>
                  <IncomeRelatedPie />
                </Suspense>
              </div>
              <div className="col-12 col-lg-6 col-md-12 mt-3">
                <Suspense fallback={<div></div>}>
                  <IncomeRelatedPie2 />
                </Suspense>
              </div>
            </div>
            <div class="row">
              {/* Content */}

              <div class="col-lg-12 col-12 layout-top-spacing">
                <div class="widget box box-shadow" style={{ padding: "20px" }}>
                  <div class="widget-header text-right">
                    <button
                      class="btn btn-secondary mb-2"
                      style={{
                        padding: "0.6rem 4rem",
                        fontSize: "14px",
                      }}
                      onClick={() =>
                        this.props.history.push("/en-admin/create-user")
                      }
                    >
                      {" "}
                      <i class="fas fa-plus"></i> Create User
                    </button>
                  </div>
                  <div class="widget-content widget-content-area icon-pill">
                    <div className="row">
                      <div className="col-md-12">
                        <ul
                          class="nav nav-pills mb-3 mt-3 d-flex justify-content-center text-center"
                          id="icon-pills-tab"
                          role="tablist"
                        >
                          <li class="nav-item">
                            <a
                              class="nav-link active btn-outline-secondary mr-1 mt-1"
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
                              onClick={() => {
                                this.setState({
                                  refresh: false,
                                });
                              }}
                            >
                              {" "}
                              Active Users{" "}
                              <span class="badge badge-light">
                                {this.state.active.length}
                              </span>
                            </a>
                          </li>

                          <li class="nav-item ">
                            <a
                              class="nav-link  btn-outline-secondary mt-1"
                              id="icon-pills-contact-tab"
                              data-toggle="pill"
                              href="#icon-pills-contact"
                              role="tab"
                              aria-controls="icon-pills-contact"
                              aria-selected="false"
                              style={{
                                padding: "0.6rem 4rem",
                                // fontSize: "2vh",
                                // width: "99%",
                              }}
                              onClick={() => {
                                this.setState({
                                  refresh: true,
                                });
                              }}
                            >
                              {" "}
                              Inactive Users{" "}
                              <span class="badge badge-light">
                                {this.state.pending.length}
                              </span>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div class="tab-content" id="icon-pills-tabContent">
                      <div
                        class="tab-pane fade show active"
                        id="icon-pills-home"
                        role="tabpanel"
                        aria-labelledby="icon-pills-home-tab"
                      >
                        {/*Active*/}
                        <div class="table-responsive mb-4 mt-4">
                          <table
                            id="mydatatable2"
                            class="table table-hover non-hover"
                          >
                            <thead>
                              <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Mobile Number</th>
                                <th>Joined date</th>

                                <th>Contact User</th>

                                <th>Action</th>
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
                                    {pointer.firstname} {pointer.lastname}
                                  </td>
                                  <td style={{ fontWeight: "900" }}>
                                    {pointer.email}
                                  </td>
                                  <td style={{ fontWeight: "900" }}>
                                    {pointer.phone_number}
                                  </td>
                                  <td style={{ fontWeight: "900" }}>
                                    {this.reverseDate(
                                      pointer.createdAt.substring(
                                        0,
                                        pointer.createdAt.indexOf("T")
                                      )
                                    )}
                                  </td>

                                  <td>
                                    <Link
                                      to="#"
                                      className="btn btn-secondary"
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
                                      <i class="fa fa-envelope"></i> Message{" "}
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
                                          className="dropdown-item"
                                          to={`/en-admin/user-Detail/${pointer._id}`}
                                        >
                                          Show Detail{" "}
                                          <i class="fas fa-angle-right text-white"></i>
                                        </Link>
                                        <Link
                                          class="dropdown-item"
                                          to={`/en-admin/edit-created-user/${pointer._id}`}
                                        >
                                          Edit User
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
                                          data-target="#deleteUser"
                                        >
                                          Delete User
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
                        class="tab-pane fade"
                        id="icon-pills-contact"
                        role="tabpanel"
                        aria-labelledby="icon-pills-contact-tab"
                      >
                        {/*InActive*/}
                        <div class="table-responsive mb-4 mt-4">
                          <table
                            id="mydatatable"
                            class="table table-hover non-hover"
                            style={{ width: "100%" }}
                          >
                            <thead>
                              <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone Number</th>
                                <th>Joined date</th>

                                <th>Contact User</th>
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
                                    {pointer.firstname} {pointer.lastname}
                                  </td>
                                  <td style={{ fontWeight: "900" }}>
                                    {pointer.email}
                                  </td>
                                  <td style={{ fontWeight: "900" }}>
                                    {pointer.phone_number}
                                  </td>
                                  <td style={{ fontWeight: "900" }}>
                                    {this.reverseDate(
                                      pointer.createdAt.substring(
                                        0,
                                        pointer.createdAt.indexOf("T")
                                      )
                                    )}
                                  </td>

                                  <td>
                                    <Link
                                      to="#"
                                      className="btn btn-secondary"
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
                                      <i class="fa fa-envelope"></i> Message{" "}
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
                                          className="dropdown-item"
                                          to={`/en-admin/user-Detail/${pointer._id}`}
                                        >
                                          Show Detail{" "}
                                          <i class="fas fa-angle-right text-white"></i>
                                        </Link>
                                        <Link
                                          class="dropdown-item"
                                          to={`/en-admin/edit-created-user/${pointer._id}`}
                                        >
                                          Edit User
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
          <div
            class="modal fade"
            id="deleteUser"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalCenterTitle"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLongTitle">
                    Remove User
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
                    <h3>Are you sure you want to remove this user ? </h3>
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
