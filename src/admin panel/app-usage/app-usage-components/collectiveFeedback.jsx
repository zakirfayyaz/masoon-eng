import React, { Component } from "react";
import Rating_Stars from "./stars";
import { Link } from "react-router-dom";
import axios from "axios";
import api_link from "../../../config.json";
import BackButton from "./../../../utils/backButton";
import $ from "jquery";
import decrypt from "./../../../utils/Encryption/Decrypt";
class CollectiveFeedback extends Component {
  state = { users: [] };
  componentDidMount = async () => {
    const token = localStorage.getItem("token");
    const resp = await axios.get(api_link.API_LINK + "ratings", {
      headers: { Authorization: token },
    });
    //console.log(resp);
    resp["data"] = JSON.parse(decrypt(resp.data.resp));
    const ratings = resp["data"];

    this.setState({ users: ratings.collective_feedback });
    if (this.state.users.length > 0) {
      $(document).ready(function () {
        $("#collectiveFeedback").dataTable();
      });
    }
  };
  render() {
    return (
      <>
        <React.Fragment>
          <div id="content" class="main-content">
            <div class="layout-px-spacing">
              <div class="page-header">
                <div class="page-title">
                  <div className="d-flex justify-content-between">
                    <BackButton />
                    <h3 style={{ paddingTop: "8px" }}>
                      Collective User Feedback
                    </h3>
                  </div>
                </div>
              </div>

              <div class="row layout-spacing">
                {/* Content */}

                <div className="col-12 col-xl-12 layout spacing mt-5">
                  <div class="widget-content">
                    <div
                      class="table-responsive example"
                      style={{ maxHeight: "65vh" }}
                    >
                      <h5>
                        <span
                          className="badge badge-secondary"
                          style={{ fontSize: "2vh" }}
                        >
                          {this.state.users && this.state.users.count}
                        </span>
                      </h5>
                      <table class="table" id="collectiveFeedback">
                        <thead>
                          <tr>
                            <th></th>
                            <th>
                              <div class="th-content">Name</div>
                            </th>
                            <th>
                              <div class="th-content">Email</div>
                            </th>
                            <th>
                              <div class="th-content">Rated</div>
                            </th>
                            <th>
                              <div class="th-content">Feedback</div>
                            </th>
                            <th>
                              <div class="th-content">Action</div>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.users &&
                            this.state.users.map((pointer) => (
                              <tr>
                                <td>
                                  <div class="td-content customer-name">
                                    <img
                                      src="https://img.icons8.com/color/48/000000/gender-neutral-user.png"
                                      alt="avatar"
                                    />
                                  </div>
                                </td>
                                <td>
                                  <div class="td-content product-brand">
                                    {pointer.name}
                                  </div>
                                </td>
                                <td>
                                  <div class="td-content">{pointer.email}</div>
                                </td>
                                <td>
                                  <div class="td-content">
                                    {Rating_Stars(pointer.rating)}
                                  </div>
                                </td>
                                <td>
                                  <Link
                                    to="#"
                                    data-toggle="modal"
                                    data-target="#collectiveFeedback1"
                                    onClick={() =>
                                      this.setState({
                                        messageToShow: pointer.message,
                                      })
                                    }
                                  >
                                    Show Feedback
                                  </Link>
                                </td>
                                <td>
                                  <div class="td-content">
                                    <span
                                      class="badge outline-badge-dark"
                                      style={{ cursor: "pointer" }}
                                      onClick={() =>
                                        this.props.history.push(
                                          "/en-admin/user-Detail/" +
                                            pointer.user_id
                                        )
                                      }
                                    >
                                      Show Detail
                                    </span>
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
          {/* MOdal*/}
          <div
            class="modal fade"
            id="collectiveFeedback1"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalCenterTitle"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h3 class="modal-title" id="exampleModalLongTitle">
                    USER FEEDBACK
                  </h3>
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
                  <h6>
                    {this.state.messageToShow && this.state.messageToShow}
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      </>
    );
  }
}

export default CollectiveFeedback;
