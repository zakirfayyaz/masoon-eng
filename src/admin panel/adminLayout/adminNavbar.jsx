import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import api_link from "../../config.json";
import encrypt from "./../../utils/Encryption/Encrypt";
import decrypt from "./../../utils/Encryption/Decrypt";
class AdminNavbar extends Component {
  state = { hide_menu: false, unread_notifications: 0 };
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
      //console.log(resp);
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
  async componentDidMount() {
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
  }
  render() {
    return (
      <React.Fragment>
        <div class="header-container fixed-top">
          <header class="header navbar navbar-expand-sm">
            <ul
              className={
                this.state.hide_menu === true
                  ? "navbar-item flex-row d-none"
                  : "navbar-item flex-row"
              }
            >
              <li class="nav-item theme-logo">
                <Link to="/en-admin/aDashboard">
                  <img
                    src="/assets/img/masoon-logo.svg"
                    class="navbar-logo"
                    alt="logo"
                  />
                </Link>
              </li>
            </ul>

            <Link
              to="#"
              class="sidebarCollapse"
              onClick={() =>
                this.state.hide_menu === true
                  ? this.setState({ hide_menu: false })
                  : this.setState({ hide_menu: true })
              }
              data-placement="bottom"
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
              </svg>
            </Link>

            <ul class="navbar-item flex-row search-ul">
              <li class="nav-item align-self-center search-animated"></li>
            </ul>
            <ul class="navbar-item flex-row navbar-dropdown">
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
                  to="/en-admin/notifications"
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
              <li class="nav-item dropdown user-profile-dropdown  order-lg-0 order-1">
                <Link
                  to="#"
                  class="nav-link dropdown-toggle user"
                  id="userProfileDropdown"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <img
                    src="/assets/img/90x90.jpg"
                    alt="admin-profile"
                    class="img-fluid"
                  />
                </Link>
                <div
                  class="dropdown-menu position-absolute animated fadeInUp"
                  aria-labelledby="userProfileDropdown"
                  style={{ height: "13rem", minWidth: "13rem" }}
                >
                  <div class="user-profile-section">
                    <div class="media mx-auto">
                      <img
                        src="https://img.icons8.com/color/48/000000/administrator-male-skin-type-7.png"
                        alt="flag"
                      />
                      <div class="media-body">
                        <h5>{localStorage.getItem("username")}</h5>
                        <p>{localStorage.getItem("Role")}</p>
                      </div>
                    </div>
                  </div>
                  <div
                    class="dropdown-item"
                    style={{ paddingTop: "12px", paddingBottom: "12px" }}
                  >
                    <Link to="/en-admin/aProfile">
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
                        class="feather feather-user"
                      >
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>{" "}
                      <span>My Profile</span>
                    </Link>
                  </div>

                  <div
                    class="dropdown-item"
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
                        class="feather feather-log-out"
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

export default AdminNavbar;
