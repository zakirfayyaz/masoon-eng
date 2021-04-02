import React, { Component } from "react";
import axios from "axios";
import api_link from "../../config.json";
import BankListTable from "./bankListTable";
import { ToastContainer, toast } from "react-toastify";
import decrypt from "./../../utils/Encryption/Decrypt";
import encrypt from "./../../utils/Encryption/Encrypt";

class BankLinking extends Component {
  state = {
    active: [],
    inactive: [],
    account_type: [],
    data: {},
    addManuallyButton: 0,
    selectedFile: "",
    show: false,
  };
  removeBank = async (id) => {
    const token = localStorage.getItem("token");
    var obj = {
      bank_id: id,
    };
    obj = encrypt(JSON.stringify(obj));
    try {
      var response = await axios.put(
        api_link.API_LINK + "admin/account/remove-id",
        { name: obj },
        {
          headers: { Authorization: token },
        }
      );
      // //console.log(response);
      response["data"] = JSON.parse(decrypt(response.data.resp));
      if (response["data"]["status"] === 200) {
        toast.dark("Bank Removed", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        try {
          this.getAccounts();
        } catch (e) {
          //console.log(e);
        }
      } else {
        toast.error("Error on Bank Removal", {
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
      //console.log(e);
    }
  };
  componentDidMount = async () => {
    this.getAccounts();
  };
  fileupload = (event) => {
    this.setState({ selectedFile: event.target.files[0] });
    //console.log(event.target.files[0]);
  };
  checkEmpty(val) {
    if (val == null || val === undefined || val === "") {
      return false;
    } else {
      return true;
    }
  }
  addNewBank = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    var fd = new FormData();
    fd.append("logo", this.state.selectedFile);
    fd.append("name", encrypt(JSON.stringify(this.state.data.name)));
    fd.append("url", encrypt(JSON.stringify(this.state.data.url)));

    if (
      !this.checkEmpty(this.state.data["name"]) ||
      !this.checkEmpty(this.state.selectedFile) ||
      !this.checkEmpty(this.state.data["url"])
    ) {
      toast.dark("Provide Complete Credentials", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      try {
        let response = await axios.post(
          api_link.API_LINK + "admin/account/add",
          fd,
          {
            headers: { Authorization: token },
          }
        );
        // //console.log(response);
        response["data"] = JSON.parse(decrypt(response.data.resp));
        if (response["data"]["status"] === 200) {
          toast.dark("New Bank Added! View Inactive Banks", {
            position: "top-center",
            autoClose: 6000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          this.getAccounts();
          document.getElementById("bank_name").value = "";
          document.getElementById("bank_api_url").value = "";
          document.getElementById("logo").value = "";
          try {
            const response = await axios.get(
              api_link.API_LINK + "admin/account/retrieve",
              {
                headers: { Authorization: token },
              }
            );
            var active = [];
            var inactive = [];
            var accounts = response["data"]["accounts"];
            for (var i = 0; i < accounts.length; i++) {
              if (accounts[i].status === "Active") {
                active.push(accounts[i]);
              } else {
                inactive.push(accounts[i]);
              }
            }
            this.setState({ active: active, inactive: inactive });
            //console.log(response);
          } catch (e) {
            //console.log(e);
          }
        } else {
          alert("Error on Adding Account");
        }
      } catch (e) {
        //console.log(e);
      }
    }
  };
  getAccounts = async () => {
    const token = localStorage.getItem("token");

    try {
      var response = await axios.get(
        api_link.API_LINK + "admin/account/retrieve",
        {
          headers: { Authorization: token },
        }
      );
      response["data"] = JSON.parse(decrypt(response.data.resp));
      var active = [];
      var inactive = [];
      var accounts = response["data"]["accounts"];
      for (var i = 0; i < accounts.length; i++) {
        if (accounts[i].status === "Active") {
          active.push(accounts[i]);
        } else {
          inactive.push(accounts[i]);
        }
      }
      this.setState({ active: active, inactive: inactive });
      //console.log(response);
    } catch (e) {
      //console.log(e);
    }
    this.setState({ show: true });
  };
  handleChange = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data });
  };
  markAsActive = async (id) => {
    const token = localStorage.getItem("token");
    var obj = {
      bank_id: id,
    };
    obj = encrypt(JSON.stringify(obj));
    try {
      await axios.put(
        api_link.API_LINK + "admin/account/activate-id",
        { name: obj },
        {
          headers: { Authorization: token },
        }
      );
      this.getAccounts();
    } catch (e) {
      //console.log(e);
    }
  };
  renderOnEdit = async (id) => {
    this.props.history.push("/en-admin/bank-linking/edit/" + id);
  };
  markAsInactive = async (id) => {
    const token = localStorage.getItem("token");
    var obj = {
      bank_id: id,
    };
    obj = encrypt(JSON.stringify(obj));
    try {
      await axios.put(
        api_link.API_LINK + "admin/account/deactivate-id",
        { name: obj },
        {
          headers: { Authorization: token },
        }
      );
      this.getAccounts();
    } catch (e) {
      //console.log(e);
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
        <div id="content" class="main-content">
          <div class="layout-px-spacing">
            <div class="page-header">
              <div class="page-title">
                <h3>Bank Linking & Details</h3>
              </div>
            </div>

            <div className="mt-5">
              <div className="row">
                <div className="col-md-9 m-auto">
                  <form>
                    <div className="row">
                      <div class="col-sm-6 ">
                        <label class="dob-input text-dark">
                          <b>Bank Name</b>
                        </label>
                        <div class="d-flex note-title">
                          <input
                            type="text"
                            name="name"
                            onChange={this.handleChange}
                            id="bank_name"
                            class="form-control"
                            maxlength="25"
                            placeholder=""
                          />
                        </div>
                      </div>
                      <div class="col-sm-6 ">
                        <label class="dob-input text-dark">
                          <b>Bank Api Url</b>
                        </label>
                        <div class="d-flex note-title">
                          <input
                            type="text"
                            name="url"
                            onChange={this.handleChange}
                            id="bank_api_url"
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
                          <b>Bank Icon</b>
                        </label>
                        <div class="d-flex note-title">
                          <input
                            type="file"
                            name="logo"
                            onChange={this.fileupload}
                            accept="image/x-png,image/gif,image/jpeg"
                            id="logo"
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
                          type="button"
                          className="btn btn-secondary btn-block"
                          onClick={this.addNewBank}
                        >
                          Add Bank
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>

              <div class="row sales pt-5">
                <div class="col-lg-12 col-12 layout-top-spacing">
                  <div class="">
                    <div class="widget-header"></div>
                    <div class="widget-content widget-content-area icon-pill">
                      <div className="row">
                        <div className="col-md-12">
                          <ul
                            class="nav nav-pills mb-3 mt-3 d-flex justify-content-center text-center"
                            id="icon-pills-tab"
                            role="tablist"
                          >
                            <li class="nav-item mt-1 mr-1">
                              <a
                                class="nav-link active btn-outline-secondary"
                                id="icon-pills-home-tab"
                                data-toggle="pill"
                                href="#icon-pills-home"
                                role="tab"
                                aria-controls="icon-pills-home"
                                aria-selected="true"
                                style={{
                                  padding: "0.6rem 4rem",
                                  // fontSize: "2vh",
                                  width: "100%",
                                }}
                              >
                                {" "}
                                Active{" "}
                                <span class="badge badge-light">
                                  {this.state.active.length}
                                </span>
                              </a>
                            </li>

                            <li class="nav-item mt-1">
                              <a
                                class="nav-link btn-outline-secondary"
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
                                <span class="badge badge-light">
                                  {" "}
                                  {this.state.inactive.length}
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
                          <BankListTable
                            accounts={this.state.active}
                            markAsInactive={this.markAsInactive}
                            markAsActive={this.markAsActive}
                            removeBank={this.removeBank}
                            renderOnEdit={this.renderOnEdit}
                          />
                        </div>
                        <div
                          class="tab-pane fade"
                          id="icon-pills-contact"
                          role="tabpanel"
                          aria-labelledby="icon-pills-contact-tab"
                        >
                          {/*InActive*/}
                          <BankListTable
                            accounts={this.state.inactive}
                            markAsActive={this.markAsActive}
                            markAsInactive={this.markAsInactive}
                            removeBank={this.removeBank}
                            renderOnEdit={this.renderOnEdit}
                          />
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
      </React.Fragment>
    );
  }
}

export default BankLinking;
