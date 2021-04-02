import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import api_link from "../../config.json";
import decrypt from "./../../utils/Encryption/Decrypt";
import token from "./../../utils/token";
import endpoint from "./../../utils/endpoint";
import encrypt from "./../../utils/Encryption/Encrypt";
class AdvertiserInAppNotification extends Component {
  state = { messages: [] };
  componentDidMount = async () => {
    this.getNotifications();
  };
  getNotifications = async () => {
    const token = localStorage.getItem("token");

    let response1 = await axios.get(api_link.API_LINK + "user/notification", {
      headers: { Authorization: token },
    });
    response1["data"] = JSON.parse(decrypt(response1.data.resp));
    //console.log(response1);
    const notifications = response1["data"]["notifications"].reverse();

    var unread_notifications = 0;
    var unread_messages = 0;
    for (var i = 0; i < notifications.length; i++) {
      if (notifications[i].status !== "Read") {
        unread_notifications++;
      }
    }

    this.setState({
      //   public_messages: public_messages,
      messages: notifications,
      unread_notifications,
      unread_messages,
    });
  };
  markRead = async (id) => {
    let response = await axios.put(
      endpoint + "user/notification/read-id",
      { name: encrypt(JSON.stringify({ id: id })) },
      { headers: { Authorization: token } }
    );
    response["data"] = JSON.parse(decrypt(response.data.resp));
    if (response.data.status === 200) {
      this.getNotifications();
    }
  };
  render() {
    return (
      <>
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
                    <h5>Subject : </h5>
                    <p>
                      <h6>{this.state.subject ? this.state.subject : null}</h6>
                    </p>
                    <br></br>
                    <h5>Message : </h5>
                    <p>{this.state.body ? this.state.body : null}</p>
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
                <h3>Notifications</h3>
              </div>
            </div>

            <div class="row layout-top-spacing">
              <div class="col-xl-12 col-lg-12 col-md-12">
                <div class="row">
                  <div class="col-xl-12  col-md-12">
                    <div class="mail-box-container">
                      <div class="mail-overlay"></div>

                      <div
                        class="tab-title"
                        style={{ paddingTop: "0px", width: "15%" }}
                      >
                        <div class="row">
                          <div class="col-md-12 col-sm-12 col-12 mail-categories-container">
                            <div class="mail-sidebar-scroll ps">
                              <ul
                                class="nav nav-pills d-block"
                                id="pills-tab"
                                role="tablist"
                              >
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
                                    <span class="nav-names">Notifications</span>
                                    {/* <span class="mail-badge badge">
                                      {this.state.messages.length}
                                    </span> */}
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div
                        id="mailbox-inbox"
                        class="accordion mailbox-inbox example"
                        style={{ overflowY: "scroll" }}
                      >
                        <div
                          class="message-box example"
                          style={{ height: "auto" }}
                        >
                          {this.state.messages.map((pointer) => (
                            <div
                              data-toggle="modal"
                              data-target="#exampleModalCenter"
                              onClick={() =>
                                this.setState({
                                  body: pointer.body,
                                  subject: pointer.subject,
                                  date: pointer.date,
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
                                      onClick={() => this.markRead(pointer._id)}
                                      style={{
                                        backgroundColor:
                                          pointer.status === "Unread"
                                            ? "#2196f324"
                                            : "#fff",
                                      }}
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
                                            <img
                                              src="assets/img/90x90.jpg"
                                              class="user-profile"
                                              alt="avatar"
                                            />
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
                                                </svg>{" "}
                                                <span
                                                  class="mail-title"
                                                  data-mailTitle="Promotion Page"
                                                >
                                                  {pointer.subject}
                                                </span>
                                                {" - "}
                                                {pointer.body}
                                              </p>

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

                                  {/* <div class="d-flex">
                                                <input
                                                    type="file"
                                                    class="form-control-file"
                                                    id="mail_File_attachment"
                                                    multiple="multiple"
                                                />
                                            </div> */}

                                  <p
                                    style={{
                                      fontSize: "2.5vh",
                                    }}
                                  >
                                    <b>Body : </b>
                                  </p>
                                  {/* <div
                                                id="editor-container"
                                                class="ql-container ql-snow"
                                            >
                                                <div
                                                    class="ql-editor ql-blank"
                                                    data-gramm="false"
                                                    contenteditable="true"
                                                    
                                                >
                                                    
                                                </div>
                                                <div
                                                    class="ql-clipboard"
                                                    contenteditable="true"
                                                    tabindex="-1"
                                                ></div>
                                                <div class="ql-tooltip ql-hidden">
                                                    <a
                                                        class="ql-preview"
                                                        target="_blank"
                                                        href="about:blank"
                                                    ></a>
                                                    <input
                                                        type="text"
                                                        data-formula="e=mc^2"
                                                        data-link="https://quilljs.com"
                                                        data-video="Embed URL"
                                                    />
                                                    <a class="ql-action"></a>
                                                    <a class="ql-remove"></a>
                                                </div>
                                            </div> */}
                                  <div className="row">
                                    <div className="col-md-12">
                                      <textarea
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
      </>
    );
  }
}

export default AdvertiserInAppNotification;
