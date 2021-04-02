import React, { Component } from "react";
import axios from "axios";
import api_link from "../../config.json";
import { ToastContainer, toast } from "react-toastify";
import dummy from "./dummy.png";
import reverseDate from "./../../utils/reverse-date";
import decrypt from "./../../utils/Encryption/Decrypt";
class AdminEnquiries extends Component {
  state = { enquiries: [], mail_id: "", nonenquired: [], replied: false };
  componentDidMount = async () => {
    console.log(process.env);
    const token = localStorage.getItem("token");
    let response = await axios.get(api_link.API_LINK + "conversations", {
      headers: { Authorization: token },
    });
    response["data"] = JSON.parse(decrypt(response.data.resp));
    // console.log(response);
    // const enquire = response.data.userEmail;
    // var enquired = [];
    // var nonenquired = [];
    // for (var i = 0; i < enquire.length; i++) {
    //   if (enquire[i].reply) {
    //     enquired.push(enquire[i]);
    //   } else {
    //     nonenquired.push(enquire[i]);
    //   }
    // }
    // this.setState({ enquiries: enquired, nonenquired: nonenquired });
    this.setState({ enquiries: response.data.rooms });
  };
  handleChange = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data });
  };
  sendReply = async () => {
    const token = localStorage.getItem("token");
    // var fd = new FormData();
    // fd.append("mail_id", this.state.mail_id);
    // fd.append("message", this.state.data.message);
    const response = await axios.post(
      api_link.API_LINK + "ratings/contact/reply",
      {
        mail_id: this.state.mail_id,
        message: this.state.data.message,
      },
      {
        headers: { Authorization: token },
      }
    );
    // console.log(response);
    // if(data)
    if (response.data.status === 200) {
      toast.success("Replied To Enquiry", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => window.location.reload(), 2000);
    }
  };
  render() {
    return (
      <>
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
        <div id="content" class="main-content">
          <div class="p-3">
            <div class="page-header">
              <div class="page-title">
                <h3 className="d-flex justify-content-between">Enquiries </h3>
              </div>
            </div>

            <div class="row layout-top-spacing">
              <div class="col-xl-12 col-lg-12 col-md-12">
                <div class="mail-box-container">
                  <div class="mail-overlay"></div>

                  <div class="tab-title">
                    <div class="row">
                      <div class="col-md-12 col-sm-12 col-12 text-center">
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
                          class="feather feather-message-circle"
                        >
                          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                        </svg>
                        <h5 class="app-title">Enquiry List</h5>
                      </div>

                      <div class="todoList-sidebar-scroll ps">
                        <div class="col-md-12 col-sm-12 col-12 mt-4 pl-0">
                          <ul
                            class="nav nav-pills d-block"
                            id="pills-tab"
                            role="tablist"
                          >
                            <li class="nav-item">
                              <a
                                class="nav-link list-actions active"
                                id="all-list"
                                data-toggle="pill"
                                href="#pills-inbox"
                                role="tab"
                                aria-selected="true"
                                onClick={() =>
                                  this.setState({ replied: false })
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
                                  class="feather feather-list"
                                >
                                  <line x1="8" y1="6" x2="21" y2="6"></line>
                                  <line x1="8" y1="12" x2="21" y2="12"></line>
                                  <line x1="8" y1="18" x2="21" y2="18"></line>
                                  <line x1="3" y1="6" x2="3" y2="6"></line>
                                  <line x1="3" y1="12" x2="3" y2="12"></line>
                                  <line x1="3" y1="18" x2="3" y2="18"></line>
                                </svg>{" "}
                                Enquiries{" "}
                                {/* <span
                                  class="todo-badge badge"
                                  style={{
                                    padding: "2px 0px",
                                    height: "25px",
                                    width: "25px",
                                  }}
                                >
                                  {this.state.enquiries.length}
                                </span> */}
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div id="todo-inbox" class="accordion todo-inbox">
                    <div class="todo-box">
                      <div
                        id="ct"
                        class="todo-box-scroll ps ps--active-y example"
                        style={{
                          height: "auto",
                        }}
                      >
                        {this.state.enquiries.map((pointer) => (
                          <>
                            <div
                              class="todo-item all-list"
                              style={{ cursor: "pointer" }}
                              onClick={() =>
                                this.props.history.push(
                                  `/en-admin/conversation-history/${pointer.conversation_id}/${pointer.user_name}`,
                                  { user: pointer }
                                )
                              }
                            >
                              <div class="todo-item-inner">
                                <div class="n-chk text-center">
                                  <label class="new-control new-checkbox checkbox-primary">
                                    <img
                                      className="rounded-circle"
                                      style={{
                                        height: "50px",
                                        cursor: "default",
                                      }}
                                      alt="profile"
                                      src={
                                        pointer.profile_image == null
                                          ? dummy
                                          : `${api_link.GET_IMAGE}${pointer.profile_image}`
                                      }
                                    />
                                  </label>
                                </div>

                                <div class="todo-content">
                                  <h5
                                    class="todo-heading"
                                    // data-todoheading="Meeting with Shaun Park at 4:50pm"
                                  >
                                    {pointer.user_name}{" "}
                                    <span
                                      // data-toggle="modal"
                                      // data-target="#ViewMessage200"
                                      className="badge badge-primary"
                                      style={{ cursor: "pointer" }}
                                      onClick={() =>
                                        this.props.history.push(
                                          `/en-admin/conversation-history/${pointer.conversation_id}/${pointer.user_name}`,
                                          { user: pointer }
                                        )
                                      }
                                    >
                                      {" "}
                                      view
                                    </span>
                                    {pointer.unread_messages_count > 0 && (
                                      <span
                                        // data-toggle="modal"
                                        // data-target="#ViewMessage200"
                                        className="ml-3 badge badge-success"
                                        style={{ cursor: "pointer" }}
                                        onClick={() =>
                                          this.props.history.push(
                                            `/en-admin/conversation-history/${pointer.conversation_id}/${pointer.user_name}`,
                                            { user: pointer }
                                          )
                                        }
                                      >
                                        {" "}
                                        {pointer.unread_messages_count} new
                                        enquiry
                                      </span>
                                    )}
                                  </h5>
                                  <p class="meta-date">
                                    {reverseDate(
                                      pointer.time.substring(
                                        0,
                                        pointer.time.indexOf("T")
                                      )
                                    )}
                                  </p>
                                  <p class="todo-text">
                                    At:{" "}
                                    {pointer.time.substring(
                                      pointer.time.indexOf("T") + 1,
                                      pointer.time.lastIndexOf(":")
                                    )}
                                  </p>
                                  {/* <p class="todo-text">
                                    Replied :{" "}
                                    {pointer.reply ? pointer.reply : "None"}
                                  </p> */}
                                </div>

                                {/* <div class="priority-dropdown custom-dropdown-icon">
                                  <div class="dropdown p-dropdown">
                                    
                                  </div>
                                </div> */}
                              </div>
                            </div>
                          </>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*Modal*/}
        <div
          class="modal "
          id="ViewMessage200"
          tabindex="-1"
          role="dialog"
          aria-hidden="true"
          name="1234"
        >
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">
                  View Enquiry
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
              {this.state.replied === true ? (
                <div class="modal-body">
                  <form>
                    <div class="form-group">
                      <label for="exampleInputEmail1" className="text-dark">
                        <b>Enquiry</b>
                      </label>
                      <textarea
                        class="form-control"
                        value={this.state.setMessage}
                      />
                    </div>

                    <div class="form-group">
                      <label for="exampleInputPassword1" className="text-dark">
                        <b>Replied</b>
                      </label>
                      <textarea
                        class="form-control"
                        value={this.state.setReply}
                      />
                    </div>
                  </form>
                </div>
              ) : (
                <div class="modal-body">
                  <textarea
                    class="form-control"
                    value={this.state.setMessage}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        {/*MODAL TWO*/}
        <div
          class="modal fade"
          id="replyEnquiry100"
          tabindex="-1"
          role="dialog"
          style={{ display: "none" }}
        >
          <div class="modal-dialog modal-dialog-centered" role="document">
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
                  // onClick={() =>
                  //   (document.getElementById("task").value = "")
                  // }
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
                <div class="compose-box">
                  <div class="compose-content" id="addTaskModalTitle">
                    <h5 class="">Reply this Enquiry</h5>
                    <form>
                      <div class="row">
                        <div class="col-md-12">
                          <div class="d-flex mail-to mb-4">
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
                              class="feather feather-edit-3 flaticon-notes"
                            >
                              <path d="M12 20h9"></path>
                              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                            </svg>
                            <div class="w-100">
                              <textarea
                                id="task"
                                type="text"
                                class="form-control"
                                name="message"
                                onChange={this.handleChange}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  class="btn"
                  style={{ backgroundColor: "#5c1ac3", color: "white" }}
                  data-dismiss="modal"
                  onClick={this.sendReply}
                >
                  <i class="flaticon-cancel-12"></i> Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default AdminEnquiries;
