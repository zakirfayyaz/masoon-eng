import React, { Component } from "react";
import BackButton from "./../../utils/backButton";
import axios from "axios";
import api_link from "../../config.json";
import { ToastContainer, toast } from "react-toastify";
import reverseDate from "./../../utils/reverse-date";
import encrypt from "./../../utils/Encryption/Encrypt";
import decrypt from "./../../utils/Encryption/Decrypt";
class EnquiryHistory extends Component {
  state = { chats: [] };
  componentDidMount = async () => {
    this.getData();
    this.scroll();
  };
  getData = async () => {
    const id = this.props.match.params.id;
    const token = localStorage.getItem("token");
    var obj = encrypt(
      JSON.stringify({
        id: id,
      })
    );
    let response = await axios.put(
      `${api_link.API_LINK}conversations/chats-id`,
      { name: obj },
      { headers: { Authorization: token } }
    );
    // console.log(response);
    response["data"] = JSON.parse(decrypt(response.data.resp));
    this.setState({ chats: response.data.chats });
  };
  scroll() {
    // window
    //   .$(".example")
    //   .animate({ scrollTop: window.$(".example").offset().top }, 1000);
    window
      .$(".examples")
      .animate({ scrollTop: window.$(".examples").offset().top });
    // var chatWindow = document.getElementById("example");
    // var xH = chatWindow.scrollHeight;
    // console.log(chatWindow);
    // chatWindow.scrollTo(0, xH);
  }
  replyToEnquiry = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const id = this.props.match.params.id;
    const value = document.getElementById("enquiry").value;
    if (value === undefined || value == null || value === "") {
      toast.error("Message Cannot be sent Empty", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      // console.log();
      var obj = encrypt(
        JSON.stringify({ id: id, subject: "Reply To Enquiry", message: value })
      );
      let response = await axios.post(
        `${api_link.API_LINK}conversations/admin-id`,
        { name: obj },
        {
          headers: { Authorization: token },
        }
      );
      response["data"] = JSON.parse(decrypt(response.data.resp));
      // console.log("CONZOLE", response["data"]);
      if (response.data.status === 200) {
        this.getData();
        document.getElementById("enquiry").value = "";
      } else {
        toast.error(response.data.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
    this.scroll();
  };
  render() {
    return (
      <div id="content" class="main-content">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <div class="m-4">
          <div class="page-header">
            <div class="page-title">
              <div className="d-flex justify-content-between">
                <BackButton />
                <h3 style={{ paddingTop: "8px" }}>Conversation</h3>
              </div>
            </div>
          </div>

          <div class="chat-section mt-2" style={{ paddingBottom: "0px" }}>
            <div class="row">
              <div class="col-xl-12 col-lg-12 col-md-12">
                <div class="chat-system">
                  <div
                    class="chat-box"
                    style={{
                      height: "calc(100vh - 266px)",
                      width: "100% !important",
                    }}
                  >
                    <div class="chat-box-inner" style={{ height: "100%" }}>
                      <div
                        class="chat-meta-user chat-active ps ps--active-y"
                        style={{ backgroundColor: "#c1c1c16e" }}
                      >
                        <div class="current-chat-user-name">
                          <span>
                            {/* <img
                              src="assets/img/profile-21.jpeg"
                              alt="dynamic-image"
                            /> */}
                            <span class="name">
                              {this.props.match.params.name}
                            </span>
                          </span>
                        </div>
                      </div>
                      <div class="chat-conversation-box">
                        <div>
                          <div
                            class="chat active-chat"

                            // style={{ height: "65vh" }}
                          >
                            <div className="examples" id="example">
                              {this.state.chats.map((pointer) => (
                                <>
                                  {pointer.roll === "User" && (
                                    <div>
                                      <div class="bubble you">
                                        {pointer.message}
                                        <br></br>
                                        <span style={{ fontSize: "12px" }}>
                                          {reverseDate(
                                            pointer.createdAt.substring(
                                              0,
                                              pointer.createdAt.indexOf("T")
                                            )
                                          )}
                                        </span>
                                      </div>
                                    </div>
                                  )}

                                  {pointer.roll === "Admin" && (
                                    <div>
                                      {" "}
                                      <div class="bubble me">
                                        {pointer.message}
                                        <br></br>
                                        <span style={{ fontSize: "12px" }}>
                                          {reverseDate(
                                            pointer.createdAt.substring(
                                              0,
                                              pointer.createdAt.indexOf("T")
                                            )
                                          )}
                                        </span>
                                      </div>
                                    </div>
                                  )}
                                </>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="chat-footer chat-active">
                        <div class="chat-input">
                          <form class="chat-form">
                            <div className="d-flex">
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
                                class="feather feather-message-square"
                              >
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                              </svg>
                              <input
                                type="text"
                                id="enquiry"
                                class="mail-write-box form-control"
                                placeholder="Message"
                              />
                              <button
                                className="btn btn-secondary"
                                style={{ height: "50px", borderRadius: "50%" }}
                                onClick={this.replyToEnquiry}
                                type="button"
                              >
                                <i class="fas fa-paper-plane"></i>
                              </button>
                            </div>
                          </form>
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

export default EnquiryHistory;
