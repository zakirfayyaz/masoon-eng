import React, { Component, Suspense } from "react";
import { trackPromise } from "react-promise-tracker";
import { usePromiseTracker } from "react-promise-tracker";
import Loader from "react-promise-loader";
import axios from "axios";
import api_link from "../../config.json";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import usermd from "../default-user.jpg";
// import SavingVsIncomeGraph from "./graphs-spending-saving/saving-vs-income-graph";
// import SavingVsBudgetGraph from "./graphs-spending-saving/saving-vs-budget-graph";
// import SavingVsIncomeLine from "./graphs-spending-saving/saving-vs-income-line";
import BackButton from "./../../utils/backButton";
import reverseDate from "./../../utils/reverse-date";
import encrypt from "./../../utils/Encryption/Encrypt";
import decrypt from "./../../utils/Encryption/Decrypt";
import errorImage from "./../../Global Image/errorImage";
const SavingVsIncomeGraph = React.lazy(() =>
  import("./graphs-spending-saving/saving-vs-income-graph")
);
const SavingVsBudgetGraph = React.lazy(() =>
  import("./graphs-spending-saving/saving-vs-budget-graph")
);
const SavingVsIncomeLine = React.lazy(() =>
  import("./graphs-spending-saving/saving-vs-income-line")
);

class UserDetail extends Component {
  state = {
    bodyLang: "en",
    data: [],
    userBanks: [],
    otherData: [],
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
  };
  async componentDidMount() {
    const token = localStorage.getItem("token");
    var obj = {
      user_id: this.props.match.params.user_id,
    };
    obj = encrypt(JSON.stringify(obj));
    var response = await trackPromise(
      axios.put(
        api_link.API_LINK + "admin/users-id",
        { name: obj },
        {
          headers: { Authorization: token },
        }
      )
    );
    response["data"] = JSON.parse(decrypt(response["data"]["resp"]));
    var bank_id = {
      user_id: this.props.match.params.user_id,
    };
    bank_id = encrypt(JSON.stringify(bank_id));
    var banks = await trackPromise(
      axios.put(
        api_link.API_LINK + "admin/users/banks-id",
        { name: bank_id },
        {
          headers: { Authorization: token },
        }
      )
    );
    // console.log(banks);
    banks["data"] = JSON.parse(decrypt(banks.data.resp));

    const users = response["data"]["users"];
    const otherData = response["data"];
    this.setState({
      data: users,
      userBanks: banks["data"]["banks"],
      otherData,
    });
    // console.log(response);

    const date = new Date();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const monthNumber = this.state.months[month];
    var sum_of_savings = 0;
    var sum_of_expense = 0;
    var obj2 = {
      month: monthNumber,
      year: year,
      user_id: this.props.match.params.user_id,
    };
    obj2 = encrypt(JSON.stringify(obj2));
    try {
      response = await axios.put(
        api_link.API_LINK + `income/savings/budget-id`,
        { name: obj2 },
        { headers: { Authorization: token } }
      );
      // console.log("Uzair", response)
      response["data"] = JSON.parse(decrypt(response["data"]["resp"]));
      // console.log("Uzair", response);
      const data = response["data"]["budget_with_savings"];

      if (data.length > 0) {
        for (let k = 0; k < data.length; k++) {
          sum_of_savings += data[k].saving;
        }

        for (let k = 0; k < data.length; k++) {
          sum_of_expense += data[k].expense;
        }
        const per_saving_vs_income = parseFloat(
          ((response.data.total_income - sum_of_expense) /
            response.data.total_income) *
            100
        ).toFixed(2);
        const per_saving_vs_budget = parseFloat(
          (sum_of_savings / response.data.total_budget) * 100
        ).toFixed(2);
        // console.log("SVI", data);
        this.setState({
          show: true,
          per_saving_vs_income,
          per_saving_vs_budget,
        });
      } else {
        const per_saving_vs_income = 0;
        const per_saving_vs_budget = 0;
        this.setState({
          show: true,
          per_saving_vs_income,
          per_saving_vs_budget,
        });
      }
    } catch (e) {
      // console.log(e);
    }
  }
  handleChange = ({ currentTarget: input }) => {
    const mail = { ...this.state.mail };
    mail[input.name] = input.value;
    this.setState({ mail });
    // console.log(this.state.mail);
  };
  reverseDate(str) {
    return str.split("-").reverse().join("/");
  }
  sendMail = async (id) => {
    const token = localStorage.getItem("token");
    // const fd = new FormData();

    // fd.append("email", this.state.recieverEmail);

    // fd.append("message", this.state.mail["body"]);
    // fd.append("subject", this.state.mail["subject"]);
    var obj = {
      email: this.state.data.email,
      message: this.state.mail["body"],
      subject: this.state.mail["subject"],
      user_id: id,
    };
    // console.log(obj);
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
        window.location.reload();
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
      // toast.error(" ☹️ Error Sending Message", {
      //   position: "top-center",
      //   autoClose: 5000,
      //   hideProgressBar: true,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      // });
    }
  };
  suspend = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const resp = await axios.put(
        api_link.API_LINK + "admin/users/suspend/" + id,
        {},
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

      const response = await axios.get(
        api_link.API_LINK + "admin/users/" + this.props.match.params.user_id,
        {
          headers: { Authorization: token },
        }
      );
      const users = response["data"]["users"];
      const otherData = response["data"];
      this.setState({ data: users, otherData });
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
  activate = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const resp = await axios.put(
        api_link.API_LINK + "admin/users/approve/" + id,
        {},
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
      const response = await axios.get(
        api_link.API_LINK + "admin/users/" + this.props.match.params.user_id,
        {
          headers: { Authorization: token },
        }
      );
      const users = response["data"]["users"];
      this.setState({ data: users });
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
                          value={this.state.data.email}
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
                  onClick={() => this.sendMail(this.props.match.params.user_id)}
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

        <div id="content" class="main-content">
          <div class="layout-px-spacing">
            <div class="page-header">
              <div class="page-title">
                <div className="d-flex justify-content-between">
                  <BackButton />
                  <h3 style={{ paddingTop: "8px" }}>Profile</h3>
                </div>
              </div>
            </div>

            <div class="row layout-spacing">
              {/* Content */}
              <div class="col-xl-4 col-lg-12 col-md-12 col-sm-12 layout-top-spacing">
                <div class="user-profile layout-spacing ">
                  <div
                    class="widget-content widget-content-area"
                    style={{ height: "645px" }}
                  >
                    <div class="d-flex justify-content-between">
                      <h3 class="">User Info</h3>
                      <Link
                        to="#"
                        class="mt-2 edit-profile"
                        style={{ visibility: "hidden" }}
                      >
                        {" "}
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
                          class="feather feather-edit-3"
                        >
                          <path d="M12 20h9"></path>
                          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                        </svg>
                      </Link>
                    </div>
                    <div class="text-center user-info">
                      <img
                        style={{
                          display: "block",
                          marginLeft: "auto",
                          marginRight: "auto",

                          height: "22vh",
                          width: "22vh",
                        }}
                        src={
                          this.state.data.profile_image
                            ? `${api_link.GET_IMAGE}` +
                              `${this.state.data["profile_image"]}`
                            : usermd
                        }
                        alt="avatar"
                      />
                      <p class="text-secondary">
                        {this.state.data.firstname} {this.state.data.lastname}
                      </p>
                    </div>
                    <div class="user-info-list">
                      <div class="">
                        <ul class="contacts-block list-unstyled">
                          <li class="contacts-block__item">
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
                              class="feather feather-coffee"
                            >
                              <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                              <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                              <line x1="6" y1="1" x2="6" y2="4"></line>
                              <line x1="10" y1="1" x2="10" y2="4"></line>
                              <line x1="14" y1="1" x2="14" y2="4"></line>
                            </svg>{" "}
                            {this.state.data.roll}
                          </li>
                          <li class="contacts-block__item">
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
                              class="feather feather-calendar"
                            >
                              <rect
                                x="3"
                                y="4"
                                width="18"
                                height="18"
                                rx="2"
                                ry="2"
                              ></rect>
                              <line x1="16" y1="2" x2="16" y2="6"></line>
                              <line x1="8" y1="2" x2="8" y2="6"></line>
                              <line x1="3" y1="10" x2="21" y2="10"></line>
                            </svg>
                            {this.state.data.createdAt &&
                              reverseDate(
                                this.state.data.createdAt.substring(
                                  0,
                                  this.state.data.createdAt.indexOf("T")
                                )
                              )}
                          </li>

                          <li class="contacts-block__item">
                            <a
                              href="mailto:example@mail.com"
                              style={{ fontSize: "12px" }}
                              className="text-secondary"
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
                                class="feather feather-mail"
                              >
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                <polyline points="22,6 12,13 2,6"></polyline>
                              </svg>
                              {this.state.data.email}
                            </a>
                          </li>
                          <li class="contacts-block__item">
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
                              class="feather feather-phone"
                            >
                              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                            </svg>{" "}
                            {this.state.data.phone_number}
                          </li>
                        </ul>
                        <div className="text-center">
                          <button
                            data-toggle="modal"
                            data-target="#composeMailModal"
                            className="btn btn-secondary btn-lg"
                          >
                            Send Message
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-xl-8 col-lg-12 col-md-12 col-sm-12 layout-top-spacing">
                <div className="row">
                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 layout-spacing mt-2 m-auto">
                    <div class="d-flex justify-content-between widget-account-invoice-six layout-spacing">
                      <div class="mt-2">
                        <span class="text-white" style={{ fontSize: "20px" }}>
                          % Saving Vs Income
                        </span>
                      </div>
                      <div class="mt-1" style={{ marginTop: "5px" }}>
                        <p class="text-white " style={{ fontSize: "20px" }}>
                          <b> {this.state.per_saving_vs_income}</b>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 layout-spacing mt-2 m-auto">
                    <div class="d-flex justify-content-between widget-account-invoice-six layout-spacing">
                      <div class="mt-2">
                        <span class="text-white" style={{ fontSize: "20px" }}>
                          % Saving Vs Budget
                        </span>
                      </div>
                      <div class="mt-1" style={{ marginTop: "5px" }}>
                        <p class="text-white " style={{ fontSize: "20px" }}>
                          <b> {this.state.per_saving_vs_budget} </b>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row ">
                  <div
                    className=" col-12 col-lg-12 col-sm-12 col-md-12 mt-3"
                    style={{ height: "500px" }}
                  >
                    <Suspense fallback={<div></div>}>
                      <SavingVsIncomeGraph
                        user_id={this.props.match.params.user_id}
                      />
                    </Suspense>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className=" col-12 col-lg-6 col-sm-12 col-md-12">
                <Suspense fallback={<div></div>}>
                  <SavingVsBudgetGraph
                    user_id={this.props.match.params.user_id}
                    selectedMonth={this.state.selectedMonth}
                  />
                </Suspense>
              </div>
              <div className=" col-12 col-lg-6 col-sm-12 col-md-12">
                <Suspense fallback={<div></div>}>
                  <SavingVsIncomeLine
                    user_id={this.props.match.params.user_id}
                    selectedMonth={this.state.selectedMonth}
                  />
                </Suspense>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div class="widget widget-table-two ">
                  <div class="widget-heading">
                    <h5 class="">Bank Linkage Detail</h5>
                  </div>

                  <div class="widget-content">
                    <div
                      class="table-responsive d-flex "
                      style={{ maxheight: "35vh" }}
                    >
                      {this.state.userBanks.length > 0 ? (
                        <table class="table " style={{ textAlign: "center" }}>
                          <thead>
                            <tr style={{ textAlign: "center" }}>
                              <th>
                                <div class="th-content">Bank Logo</div>
                              </th>
                              <th>
                                <div class="th-content">Bank Name</div>
                              </th>
                              <th>
                                <div class="th-content">Linked On</div>
                              </th>
                              {/* <th>
                                  <div class="th-content">Bank Status</div>
                                </th> */}
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.userBanks.map((pointer) => (
                              <tr>
                                <td>
                                  <img
                                    style={{ height: "12vh" }}
                                    src={`${api_link.GET_IMAGE}${pointer.bank_logo}`}
                                    alt="bank logo"
                                  />
                                </td>
                                <td>{pointer.bank_name}</td>
                                <td>
                                  {this.reverseDate(
                                    pointer.createdAt.substring(
                                      0,
                                      pointer.createdAt.indexOf("T")
                                    )
                                  )}
                                </td>
                                {/* <td>
                                    <span className="badge outline-badge-success">
                                      Active
                                    </span>
                                  </td> */}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      ) : (
                        <div
                          class="m-auto "
                          style={{
                            verticalAlign: "middle",
                            fontSize: "35px",
                            fontWeight: "500",
                          }}
                        >
                          <img
                            src={errorImage}
                            style={{ height: "70px" }}
                            alt="error"
                          />{" "}
                          No Bank Linkage Detail
                        </div>
                      )}
                    </div>
                  </div>
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
            <div class="footer-section f-section-2"></div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default UserDetail;
