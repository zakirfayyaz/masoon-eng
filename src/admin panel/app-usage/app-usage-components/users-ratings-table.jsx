import React, { Component } from "react";
import axios from "axios";
import api_link from "../../../config.json";
import Rating_Stars from "./stars";
import { Link } from "react-router-dom";
import BackButton from "./../../../utils/backButton";
import $ from "jquery";
import decrypt from "./../../../utils/Encryption/Decrypt";
class UserRatingsTable extends Component {
  state = { users: [] };
  componentDidMount = async () => {
    const rate = parseInt(this.props.match.params.rate);
    this.setState({ rate });
    const token = localStorage.getItem("token");
    const resp = await axios.get(api_link.API_LINK + "ratings", {
      headers: { Authorization: token },
    });
    // console.log(resp);
    resp["data"] = JSON.parse(decrypt(resp.data.resp));
    const ratings = resp["data"];
    if (rate === 1) {
      this.setState({
        users: ratings.one_star,
        count: ratings.one_star_total,
      });
    } else if (rate === 2) {
      this.setState({
        users: ratings.two_star,
        count: ratings.two_star_total,
      });
    } else if (rate === 3) {
      this.setState({
        users: ratings.three_star,
        count: ratings.three_star_total,
      });
    } else if (rate === 4) {
      this.setState({
        users: ratings.four_star,
        count: ratings.four_star_total,
      });
    } else if (rate === 5) {
      this.setState({
        users: ratings.five_star,
        count: ratings.five_star_total,
      });
    }
    if (this.state.users.length > 0) {
      $(document).ready(function () {
        $("#aloneRatings").dataTable();
      });
    }
  };
  render() {
    return (
      <React.Fragment>
        <div id="content" class="main-content">
          <div class="layout-px-spacing">
            <div class="page-header">
              <div class="page-title">
                <div className="d-flex justify-content-between">
                  <BackButton />
                  <h3 style={{ paddingTop: "8px" }}>
                    User With {this.state.rate} Stars Ratings
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
                      Total User Rated {this.state.rate} :{" "}
                      <span
                        className="badge badge-secondary"
                        style={{ fontSize: "2vh" }}
                      >
                        {this.state.count && this.state.count}
                      </span>
                    </h5>
                    <table class="table" id="aloneRatings">
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
                                  {Rating_Stars(this.state.rate)}
                                </div>
                              </td>
                              <td>
                                <Link
                                  to="#"
                                  data-toggle="modal"
                                  data-target="#Feedback"
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
          id="Feedback"
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
                <h6>{this.state.messageToShow && this.state.messageToShow}</h6>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default UserRatingsTable;
