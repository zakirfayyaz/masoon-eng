import React, { Component } from "react";
import { usePromiseTracker } from "react-promise-tracker";
import Loader from "react-promise-loader";
import { trackPromise } from "react-promise-tracker";
import axios from "axios";
import api_link from "../../config.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
class PublisherAccounts extends Component {
  state = {
    accounts: [],
    account_type: [],
    data: { amount: "", name: "" },
    addManuallyButton: 0,
  };

  async componentDidMount() {
    var token = localStorage.getItem("token");
    const response = await trackPromise(
      axios.get(api_link.API_LINK + "accounts", {
        headers: { Authorization: token },
      })
    );
    var accounts = response["data"]["accounts"];
    this.setState({ accounts: accounts });
    //console.log(response);
  }
  handleChange = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data });
  };

  submit = async (e) => {
    var fd = new FormData();
    const data = this.state.data;
    for (var key in data) {
      fd.append(key, data[key]);
    }
    e.preventDefault(e);
    if (
      this.state.data.name == null ||
      this.state.data.name === "" ||
      this.state.data.name === undefined ||
      this.state.data.amount == null ||
      this.state.data.amount === "" ||
      this.state.data.amount === undefined ||
      this.state.data.account_number == null ||
      this.state.data.account_number === "" ||
      this.state.data.account_number === undefined
    ) {
      toast.error("Please Provide Required Field Information", {
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
        var token = localStorage.getItem("token");
        await trackPromise(
          axios.post(api_link.API_LINK + "accounts/add", fd, {
            headers: { Authorization: token },
          })
        );
        //console.log(resp);
        toast.success("Account Added Successfully", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        document.getElementById("name").value = "";
        document.getElementById("amount").value = "";
        document.getElementById("account_no").value = "";
      } catch (e) {
        toast.error("Error Adding Account", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
    //console.log(this.state.resp);
    const response = await trackPromise(
      axios.get(api_link.API_LINK + "accounts", {
        headers: { Authorization: token },
      })
    );
    var accounts = response["data"]["accounts"];
    this.setState({ accounts: accounts });
  };
  render() {
    // const pic = "/assets/img/bankicons/";
    return (
      <div id="content" class="main-content">
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
        <Loader
          promiseTracker={usePromiseTracker}
          color={"#5c1ac3"}
          background={"rgb(255, 255, 255)"}
        />
        <div class="layout-px-spacing">
          <div class="page-header">
            <div class="page-title">
              <h3>Accounts</h3>
            </div>
          </div>

          <div className="mt-5">
            <div className="row">
              <div className="col-md-9 m-auto">
                <form>
                  <div className="row">
                    <div class="col-sm-6 ">
                      <label class="dob-input text-dark">
                        <b>Account Name</b>
                      </label>
                      <div class="d-flex note-title">
                        <input
                          type="text"
                          name="name"
                          onChange={this.handleChange}
                          id="account_name"
                          class="form-control"
                          maxlength="25"
                          placeholder=""
                          value={this.state.data.name}
                        />
                      </div>
                    </div>
                    <div class="col-sm-6 ">
                      <label class="dob-input text-dark">
                        <b>Account Balance</b>
                      </label>
                      <div class="d-flex note-title">
                        <input
                          type="text"
                          name="amount"
                          onChange={this.handleChange}
                          id="amount"
                          class="form-control"
                          maxlength="25"
                          placeholder="XXXX"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div class="col-sm-6 ">
                      <label class="dob-input text-dark">
                        <b>Account Number</b>
                      </label>
                      <div class="d-flex note-title">
                        {/* <select
                          type="text"
                          name="account_type_id"
                          onChange={this.handleChange}
                          id="account_type_id"
                          class="form-control"
                        >
                          <option>...</option>
                          {this.state.account_type.map((pointer) => (
                            <option value={pointer.name}>{pointer.name}</option>
                          ))}
                        </select> */}
                        <input
                          type="text"
                          name="account_number"
                          onChange={this.handleChange}
                          id="account_no"
                          class="form-control"
                          maxlength="25"
                          placeholder="XXXX"
                        />
                      </div>
                    </div>
                    <div class="col-sm-6 mt-2">
                      <label
                        class="dob-input"
                        style={{
                          color: "white",
                        }}
                      >
                        <b>Account Type</b>
                      </label>
                      <button
                        className="btn btn-success btn-block"
                        onClick={this.submit}
                      >
                        Add Account
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div class="row sales pt-5">
              <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 layout-spacing">
                <div class="row sales">
                  <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 layout-spacing">
                    <div class="widget widget-table-two">
                      <div class="widget-content">
                        <div className="text-danger mt-2 mb-2">
                          <b>Account Detail</b>
                        </div>
                        <div class="table-responsive">
                          {this.state.accounts.length > 0 ? (
                            <table class="table">
                              <thead>
                                <tr>
                                  <th>
                                    <div class="th-content">Account Name</div>
                                  </th>
                                  <th>
                                    <div class="th-content">Account Number</div>
                                  </th>

                                  <th>
                                    <div class="th-content th-heading">
                                      Balance
                                    </div>
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {this.state.accounts.map((pointer) => (
                                  <tr>
                                    <td
                                      style={{
                                        fontSize: "2vh",
                                      }}
                                    >
                                      <div class="td-content customer-name">
                                        <img
                                          src="https://img.icons8.com/color/48/000000/refund-2--v1.png"
                                          alt="img"
                                        />
                                        {pointer.name}
                                      </div>
                                    </td>
                                    <td
                                      style={{
                                        fontSize: "2vh",
                                      }}
                                    >
                                      <div class="td-content">
                                        {pointer.account_number}
                                      </div>
                                    </td>
                                    <td
                                      style={{
                                        fontSize: "2vh",
                                      }}
                                    >
                                      <div class="td-content product-brand">
                                        <span className="text-success">
                                          {" "}
                                          {pointer.amount}
                                        </span>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          ) : (
                            <div className="text-center"></div>
                          )}
                        </div>
                      </div>
                    </div>
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
    );
  }
}

export default PublisherAccounts;
