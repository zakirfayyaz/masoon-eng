import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import api_link from "../config.json";
import arabicEndpoint from "./../utils/arabicEndpoint";
import encrypt from "./../utils/Encryption/Encrypt";
import decrypt from "./../utils/Encryption/Decrypt";
class PublisherNavbar extends Component {
  state = {
    messages: [],
    public_messages: [],
    personal: [],
    hide_menu: false,
    unread_notifications: 0,
  };
  logout = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("user_id");
    try {
      const resp = await axios.put(
        api_link.API_LINK + "admin/users/offline-id",
        {
          name: encrypt(JSON.stringify({ id: id })),
        },
        {
          headers: { Authorization: token },
        }
      );
      resp["data"] = JSON.parse(decrypt(resp.data.resp));
      localStorage.clear();
      sessionStorage.clear();
      setTimeout(() => {
        toast.error("Logging Out...", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        window.location.replace("/");
      }, 2000);
    } catch (err) {
      //console.log(err);
      localStorage.clear();
      sessionStorage.clear();
      setTimeout(() => {
        toast.error("Logging Out...", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        window.location.replace("/");
      }, 2000);
    }
  };
  changeLanguage = async (val) => {
    const token = localStorage.getItem("token");
    // const value = val;
    //console.log(value);
    const response = await axios.put(
      api_link.API_LINK + "language/change",
      { token: token },
      { headers: { Authorization: token } }
    );
    if (response.data.status === 200) {
      toast.success("Language Changed", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      // const lang = localStorage.getItem("lang");
      if (val === 1 && localStorage.getItem("lang") === "en") {
        localStorage.setItem("lang", "ar");
        setTimeout(() => {
          window.location.href = `${arabicEndpoint}/changing-language/Publisher/${token}/ar`;
        }, 2000);
        // //console.log(response.data.url);
      } else if (val === 0 && localStorage.getItem("lang") === "ar") {
        localStorage.setItem("lang", "en");

        setTimeout(() => {
          window.location.href = "/en-publisher/pDashboard";
        }, 2000);
      }
    }
  };
  componentDidMount = async () => {
    const token = localStorage.getItem("token");

    let response1 = await axios.get(api_link.API_LINK + "user/notification", {
      headers: { Authorization: token },
    });
    response1["data"] = JSON.parse(decrypt(response1.data.resp));
    // console.log(response1);
    var unread_notifications = 0;
    const notifications = response1["data"]["notifications"].reverse();
    for (var i = 0; i < notifications.length; i++) {
      if (notifications[i].status !== "Read") {
        unread_notifications++;
      }
    }
    this.setState({ unread_notifications });
  };
  render() {
    return (
      <React.Fragment>
        <div className="header-container fixed-top">
          <header className="header navbar navbar-expand-sm">
            <ul
              className={
                this.state.hide_menu === true
                  ? "navbar-item flex-row d-none"
                  : "navbar-item flex-row"
              }
            >
              <li className="nav-item theme-logo">
                <a href="/en-publisher/pDashboard">
                  <img
                    src="/assets/img/masoon-logo.svg"
                    className="navbar-logo"
                    alt="logo"
                  />
                </a>
              </li>
            </ul>

            <Link
              to="#"
              className="sidebarCollapse"
              dataPlacement="bottom"
              onClick={() =>
                this.state.hide_menu === true
                  ? this.setState({ hide_menu: false })
                  : this.setState({ hide_menu: true })
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
                className="feather feather-list"
              >
                <line x1="8" y1="6" x2="21" y2="6"></line>
                <line x1="8" y1="12" x2="21" y2="12"></line>
                <line x1="8" y1="18" x2="21" y2="18"></line>
                <line x1="3" y1="6" x2="3" y2="6"></line>
                <line x1="3" y1="12" x2="3" y2="12"></line>
                <line x1="3" y1="18" x2="3" y2="18"></line>
              </svg>
            </Link>

            <ul className="navbar-item flex-row search-ul"></ul>
            <ul className="navbar-item flex-row navbar-dropdown">
              <li class="nav-item dropdown language-dropdown more-dropdown">
                <div class="dropdown  custom-dropdown-icon">
                  <Link
                    class="dropdown-toggle btn"
                    to="#"
                    role="button"
                    id="customDropdown"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    {/* <img src="https://img.icons8.com/color/60/000000/language.png" /> */}

                    <span style={{ paddingRight: "5px" }}>
                      {localStorage.getItem("lang") === "en" ? (
                        <img
                          src="https://img.icons8.com/color/50/000000/great-britain.png"
                          alt="en"
                        />
                      ) : (
                        <img
                          src="https://img.icons8.com/color/50/000000/saudi-arabia.png"
                          alt="ar"
                        />
                      )}{" "}
                      Language
                    </span>
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
                  </Link>

                  <div
                    class="dropdown-menu dropdown-menu-right animated fadeInUp"
                    aria-labelledby="customDropdown"
                  >
                    <Link
                      class="dropdown-item"
                      to="#"
                      onClick={() => this.changeLanguage(0)}
                    >
                      <img
                        src="https://img.icons8.com/color/50/000000/great-britain.png"
                        alt="en"
                      />{" "}
                      English
                    </Link>
                    <Link
                      class="dropdown-item"
                      to="#"
                      onClick={() => this.changeLanguage(1)}
                    >
                      <img
                        src="https://img.icons8.com/color/48/000000/saudi-arabia.png"
                        alt="ar"
                      />{" "}
                      العربية
                    </Link>
                  </div>
                </div>
              </li>

              <li
                class="nav-item dropdown notification-dropdown"
                style={{ marginTop: "22px" }}
              >
                {/* <a
                  href="javascript:void(0);"
                  class="nav-link dropdown-toggle"
                  id="notificationDropdown"
                >
                 
                  <span class="badge badge-danger counter">9</span>
                </a> */}
                <Link
                  to="/en-publisher/aNotifications"
                  class="position-relative ml-2"
                >
                  <span>
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
                      class="feather feather-bell"
                    >
                      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                      <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                    </svg>
                  </span>
                  <span class="badge badge-secondary counter">
                    {this.state.unread_notifications}
                  </span>
                </Link>
              </li>
              <li className="nav-item dropdown user-profile-dropdown  order-lg-0 order-1">
                <Link
                  to="#"
                  className="nav-link dropdown-toggle user"
                  id="userProfileDropdown"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <img
                    src="/assets/img/90x90.jpg"
                    alt="admin-profile"
                    className="img-fluid"
                  />
                </Link>
                <div
                  className="dropdown-menu position-absolute animated fadeInUp"
                  aria-labelledby="userProfileDropdown"
                  style={{ height: "13rem", minWidth: "13rem" }}
                >
                  <div className="user-profile-section">
                    <div className="media mx-auto">
                      <img
                        src="/assets/img/90x90.jpg"
                        className="img-fluid mr-2"
                        alt="avatar"
                      />
                      <div className="media-body">
                        <h5>{localStorage.getItem("username")}</h5>
                        <p>{localStorage.getItem("Role")}</p>
                      </div>
                    </div>
                  </div>
                  <div
                    className="dropdown-item"
                    style={{ paddingTop: "12px", paddingBottom: "12px" }}
                  >
                    <Link to="/en-publisher/publisher-profile">
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
                        className="feather feather-user"
                      >
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>{" "}
                      <span>My Profile</span>
                    </Link>
                  </div>

                  <div
                    className="dropdown-item"
                    style={{ paddingTop: "12px", paddingBottom: "12px" }}
                  >
                    <Link
                      to="
                                            #"
                      onClick={this.logout}
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
                        className="feather feather-log-out"
                      >
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                        <polyline points="16 17 21 12 16 7"></polyline>
                        <line x1="21" y1="12" x2="9" y2="12"></line>
                      </svg>{" "}
                      <span>Log Out</span>
                    </Link>
                  </div>
                </div>
              </li>
            </ul>
          </header>
        </div>
      </React.Fragment>
    );
  }
}

export default PublisherNavbar;
