import React, { Component } from "react";
import api_link from "../../config.json";
import axios from "axios";
import "./adminMessage.css";
import checkEmpty from "./../../utils/checkEmpty";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import decrypt from "./../../utils/Encryption/Decrypt";
import encrypt from "./../../utils/Encryption/Encrypt";

class AdminMessage extends Component {
  state = { data: {}, messages: [], show_public: 0, bodyLang: "en" };
  handleChange = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data });
    // console.log(this.state.data);
  };
  async componentDidMount() {
    this.getPublicMessage();
  }
  getPublicMessage = async () => {
    const token = localStorage.getItem("token");
    let response = await axios.get(
      api_link.API_LINK + "admin/public-messages",
      { headers: { Authorization: token } }
    );
    response["data"] = JSON.parse(decrypt(response.data.resp));
    // console.log(response);
    this.setState({ messages: response["data"]["messages"].reverse() });
  };
  sendPublicMail = async () => {
    const token = localStorage.getItem("token");
    // var fd = new FormData();
    // fd.append("from", "admin@gmail.com");
    // fd.append("status", 0);
    if (
      checkEmpty(this.state.data["body"]) ||
      checkEmpty(this.state.data["armessage"]) ||
      checkEmpty(this.state.data["subject"]) ||
      checkEmpty(this.state.data["arsubject"])
    ) {
      toast.error("Enter Complete details", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      // fd.append("message", this.state.data["body"]);
      // fd.append("armessage", this.state.data["armessage"]);
      // fd.append("subject", this.state.data["subject"]);
      // fd.append("arsubject", this.state.data["arsubject"]);
      var obj = {
        message: this.state.data["body"],
        armessage: this.state.data["armessage"],
        subject: this.state.data["subject"],
        arsubject: this.state.data["arsubject"],
      };
      obj = encrypt(JSON.stringify(obj));

      try {
        let response = await axios.post(
          api_link.API_LINK + "admin/message",
          { name: obj },
          { headers: { Authorization: token } }
        );
        // console.log(response);
        response["data"] = JSON.parse(decrypt(response.data.resp));
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
          this.getPublicMessage();
        } else {
          toast.warn(message, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      } catch (e) {
        // console.log(e);
      }
    }
  };
  render() {
    return (
      <div id="content" class="main-content">
        {/*Modal*/}
        <div
          class="modal fade"
          id="exampleModalCenter"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
          data-backdrop="static"
        >
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">
                  Mesage Detail
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
                <div>
                  <span>
                    <h6>
                      Sent on :{" "}
                      <span>
                        {" "}
                        {this.state.date ? (
                          <div>
                            {this.state.date.substring(
                              0,
                              this.state.date.indexOf("T")
                            )}{" "}
                            at{" "}
                            {this.state.date.substring(
                              this.state.date.indexOf("T") + 1,
                              this.state.date.indexOf(".")
                            )}
                          </div>
                        ) : null}
                      </span>
                    </h6>
                  </span>
                  <br></br>
                  <h5>Subject (en): </h5>
                  <p>
                    <h6>{this.state.subject ? this.state.subject : null}</h6>
                  </p>
                  <br></br>
                  <h5>Subject (ar): </h5>
                  <p className="text-right">
                    <h6>
                      {this.state.arsubject ? this.state.arsubject : null}
                    </h6>
                  </p>
                  <br></br>
                  <h5>Message (en) : </h5>
                  <p style={{ fontSize: "16px" }}>
                    {this.state.body ? this.state.body : null}
                  </p>
                  <br></br>
                  <h5>Message (ar) : </h5>
                  <p className="text-right" style={{ fontSize: "16px" }}>
                    {this.state.armessage ? this.state.armessage : null}
                  </p>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  data-dismiss="modal"
                  class="btn btn-primary"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
        {/*Modal Ends*/}
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
        <div class="layout-px-spacing">
          <div class="page-header">
            <div class="page-title">
              <h3>Mailbox</h3>
            </div>
          </div>

          <div class="row layout-top-spacing">
            <div class="col-xl-12 col-lg-12 col-md-12">
              <div class="row">
                <div class="col-xl-12  col-md-12">
                  <div class="mail-box-container">
                    <div class="mail-overlay"></div>

                    <div class="tab-title">
                      <div class="row">
                        <div class="col-md-12 col-sm-12 col-12 text-center mail-btn-container">
                          <Link
                            to="#"
                            id="btn-compose-mail"
                            class="btn"
                            data-toggle="modal"
                            data-target="#composeMailModal"
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
                              class="feather feather-plus"
                            >
                              <line x1="12" y1="5" x2="12" y2="19"></line>
                              <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                          </Link>
                        </div>
                        <div class="col-md-12 col-sm-12 col-12 mail-categories-container">
                          <div class="mail-sidebar-scroll ps">
                            <ul
                              class="nav nav-pills d-block"
                              id="pills-tab"
                              role="tablist"
                            >
                              {/* <li class="nav-item">
                                <a
                                  class="nav-link list-actions active"
                                  id="mailInbox"
                                  onClick={() =>
                                    this.setState({ show_public: 0 })
                                  }
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
                                    class="feather feather-inbox"
                                  >
                                    <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline>
                                    <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>
                                  </svg>{" "}
                                  <span class="nav-names">User Messages</span>{" "}
                                  <span class="mail-badge badge">2</span>
                                </a>
                              </li> */}
                              <li class="nav-item">
                                <Link
                                  to="#"
                                  class="nav-link list-actions"
                                  id="important"
                                  onClick={() =>
                                    this.setState({ show_public: 1 })
                                  }
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
                                    class="feather feather-star"
                                  >
                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                  </svg>{" "}
                                  <span class="nav-names">Public Messages</span>
                                  {/* <span class="mail-badge badge">
                                    {this.state.messages.length}
                                  </span> */}
                                </Link>
                              </li>
                            </ul>

                            <div
                              class="ps__rail-x"
                              style={{
                                left: "0px",
                                bottom: "0px",
                              }}
                            >
                              <div
                                class="ps__thumb-x"
                                tabindex="0"
                                style={{
                                  left: "0px",
                                  width: "0px",
                                }}
                              ></div>
                            </div>
                            <div class="ps__rail-y" style={{}}>
                              <div
                                class="ps__thumb-y"
                                tabindex="0"
                                style={{
                                  top: "0px",
                                  height: "0px",
                                }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row  d-lg-none  d-md-block">
                      <div className="col-md-5">
                        <Link
                          to="#"
                          id="btn-compose-mail"
                          class="btn btn-secondary mr-3 ml-3 mt-3"
                          data-toggle="modal"
                          data-target="#composeMailModal"
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
                            class="feather feather-plus"
                          >
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                          </svg>
                        </Link>
                      </div>
                    </div>
                    <div
                      id="mailbox-inbox"
                      class="mailbox-inbox example"
                      style={{ overflowY: "scroll" }}
                    >
                      <div class="message-box " style={{ height: "auto" }}>
                        {this.state.messages.map((pointer) => (
                          <div
                            data-toggle="modal"
                            data-target="#exampleModalCenter"
                            onClick={() =>
                              this.setState({
                                body: pointer.body,
                                subject: pointer.subject,
                                date: pointer.date,
                                armessage: pointer.armessage,
                                arsubject: pointer.arsubject,
                              })
                            }
                          >
                            {" "}
                            <div
                              id="unread-promotion-page"
                              class="mail-item mailInbox"
                            >
                              <div
                                class="animated animatedFadeInUp fadeInUp"
                                id="mailHeadingThree"
                              >
                                <div class="mb-0">
                                  <div
                                    class="mail-item-heading social collapsed"
                                    data-toggle="collapse"
                                    role="navigation"
                                    data-target="#mailCollapseThree"
                                    aria-expanded="false"
                                  >
                                    <div class="mail-item-inner">
                                      <div class="d-flex">
                                        <div class="n-chk text-center">
                                          {/* <label class="new-control new-checkbox checkbox-primary">
                                            <input
                                              type="checkbox"
                                              class="new-control-input inbox-chkbox"
                                            />
                                            <span class="new-control-indicator"></span>
                                          </label> */}
                                        </div>
                                        <div class="f-head">
                                          <img src="https://img.icons8.com/color/48/fa314a/circled-envelope.png" />
                                        </div>
                                        <div class="f-body">
                                          <div class="meta-mail-time">
                                            <p
                                              class="user-email"
                                              data-mailTo="allusers"
                                            >
                                              ADMIN
                                            </p>
                                          </div>
                                          <div class="meta-title-tag">
                                            <p class="mail-content-excerpt">
                                              {/* <svg
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
                                              </svg>{" "} */}
                                              <span
                                                class="mail-title"
                                                data-mailTitle="Promotion Page"
                                              >
                                                {pointer.subject}
                                              </span>
                                              {" - "}
                                              {pointer.body}
                                            </p>
                                            {/* <div class="tags">
                                              <span class="g-dot-primary"></span>
                                              <span class="g-dot-warning"></span>
                                              <span class="g-dot-success"></span>
                                              <span class="g-dot-danger"></span>
                                            </div> */}
                                            <p class="meta-time align-self-center">
                                              {pointer.date.substring(
                                                0,
                                                pointer.date.indexOf("T")
                                              )}{" "}
                                              at{" "}
                                              {pointer.date.substring(
                                                pointer.date.indexOf("T") + 1,
                                                pointer.date.indexOf(".")
                                              )}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/*Modal */}
                  <div
                    class="modal fade"
                    id="composeMailModal"
                    tabindex="-1"
                    role="dialog"
                    style={{ display: "none" }}
                    aria-hidden="true"
                  >
                    <div
                      class="modal-dialog modal-dialog-centered"
                      role="document"
                    >
                      <div class="modal-content">
                        <div class="modal-body">
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
                              <form>
                                <p
                                  style={{
                                    fontSize: "2.5vh",
                                  }}
                                >
                                  Subject (en)
                                </p>
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
                                <p
                                  style={{
                                    fontSize: "2.5vh",
                                  }}
                                >
                                  Subject (ar)
                                </p>
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
                                      placeholder="موضوع"
                                      class="form-control text-right"
                                      name="arsubject"
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

                                <p
                                  style={{
                                    fontSize: "2.5vh",
                                  }}
                                >
                                  Body (en) :
                                </p>

                                <div className="row">
                                  <div className="col-md-12">
                                    <textarea
                                      row="10"
                                      style={{
                                        width: "100%",
                                        height: "125px",
                                        textAlign: "left",
                                        fontSize: "16px",
                                      }}
                                      name="body"
                                      onChange={this.handleChange}
                                    ></textarea>
                                  </div>
                                </div>
                                <p
                                  style={{
                                    fontSize: "2.5vh",
                                  }}
                                >
                                  Body (ar) :
                                </p>

                                <div className="row">
                                  <div className="col-md-12">
                                    <textarea
                                      row="10"
                                      style={{
                                        width: "100%",
                                        height: "125px",
                                        textAlign: "right",
                                        fontSize: "16px",
                                      }}
                                      name="armessage"
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
                            onClick={this.sendPublicMail}
                          >
                            {" "}
                            Send
                          </button>
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
    );
  }
}

export default AdminMessage;
