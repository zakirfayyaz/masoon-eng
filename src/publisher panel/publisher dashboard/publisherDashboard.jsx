import React, { Component } from "react";
import api_link from "../../config.json";
import { trackPromise } from "react-promise-tracker";
import { usePromiseTracker } from "react-promise-tracker";
import Loader from "react-promise-loader";
import axios from "axios";
import decrypt from "./../../utils/Encryption/Decrypt";
import { Link } from "react-router-dom";
// import AdBlockDetect from "react-ad-block-detect";
import errorImage from "./../../Global Image/errorImage";
class PublisherDashboard extends Component {
  state = {
    pending_users_count: [],
  };
  async componentDidMount() {
    try {
      var token = localStorage.getItem("token");
      let publisherData = await trackPromise(
        axios.get(api_link.API_LINK + "publisher/dashboard", {
          headers: { Authorization: token },
        })
      );
      // //console.log(publisherData);
      publisherData["data"] = JSON.parse(decrypt(publisherData.data.resp));
      // console.log(publisherData);
      const blockedAdsArray = publisherData["data"]["ads"].filter(
        (ad) => ad.status === "Blocked"
      );

      const mv = publisherData["data"].ads;
      const mc = publisherData["data"].ads;
      var max_views = mv[0];
      var max_clicks = mc[0];
      for (let i = 0; i < mv.length; i++) {
        if (mv[i].views.length > max_views.views.length) {
          max_views = mv[i];
          //console.log(max_views);
        }
      }
      for (let i = 0; i < mc.length; i++) {
        if (mc[i].clicks.length > max_clicks.clicks.length) {
          //console.log(mc[i]);
          max_clicks = mc[i];
        }
      }
      const most_clicked = max_clicks;
      const most_viewed = max_views;

      const recent_ads = publisherData["data"]["ads"]
        .concat()
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);
      // console.log(recent_ads);
      let response = await trackPromise(
        axios.get(api_link.API_LINK + "notice/myposts", {
          headers: { Authorization: token },
        })
      );
      response["data"] = JSON.parse(decrypt(response.data.resp));
      const approved = response["data"]["Approved"].length;
      const blocked = response["data"]["Blocked"].length;
      const pending = response["data"]["Pending"].length;
      const expired = response["data"]["Expired"].length;

      const total = approved + blocked + pending + expired;
      this.setState({
        total,
        approved,
        blocked,
        pending,
        blockedAdsArray,
        most_clicked,
        most_viewed,
        recent_ads,
      });
    } catch (e) {
      //console.log(e);
    }
  }
  render() {
    return (
      <React.Fragment>
        <Loader
          promiseTracker={usePromiseTracker}
          color={"#5c1ac3"}
          background={"rgb(255, 255, 255)"}
        />
        <div id="content" class="main-content">
          <div class="layout-px-spacing">
            <div class="page-header">
              <div class="page-title">
                <h3>Dashboard</h3>
              </div>
            </div>
            <div class="row analytics layout-top-spacing">
              <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 layout-spacing">
                <div class="row widget-statistic">
                  <div class="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12 layout-spacing">
                    <div
                      class="widget widget-five"
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        this.props.history.push(
                          "/en-publisher/advertisement-details"
                        )
                      }
                    >
                      <div class="widget-content">
                        <div class="header">
                          <div class="header-body">
                            <h5>Ads Posted</h5>
                          </div>
                        </div>

                        <div class="w-content">
                          <div class="">
                            <p class="task-left">
                              {this.state.total && this.state.total}
                            </p>
                            <p class="task-completed">
                              includes
                              <span>
                                {" "}
                                {this.state.approved &&
                                  this.state.approved}{" "}
                              </span>
                              approved
                            </p>
                            <p>
                              and{" "}
                              <span class="text-secondary">
                                <b>
                                  {" "}
                                  {this.state.pending && this.state.pending}
                                </b>
                              </span>{" "}
                              pending
                            </p>
                            <p class="task-hight-priority">
                              and{" "}
                              <span>
                                {this.state.blocked && this.state.blocked}
                              </span>{" "}
                              blocked
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12 layout-spacing">
                    <div class="widget widget-five">
                      <div class="widget-content">
                        <div class="header">
                          <div class="header-body">
                            <h5>Ad with Most Clicks</h5>
                          </div>
                        </div>

                        <div class="w-content">
                          <div class="card component-card_4">
                            <div class="card-body">
                              {this.state.most_clicked == null ? (
                                <div class="user-profile">
                                  <img
                                    src="https://img.icons8.com/color/48/000000/buysellads.png"
                                    alt="AD"
                                    style={{
                                      cursor: "auto",
                                    }}
                                  />
                                </div>
                              ) : (
                                <div class="user-profile">
                                  {this.state.most_clicked &&
                                  this.state.most_clicked.type === "video" ? (
                                    <video
                                      muted
                                      autoPlay
                                      loop
                                      style={{
                                        height: "80px",
                                        width: "80px",
                                        cursor: "auto",
                                      }}
                                    >
                                      {" "}
                                      <source
                                        src={
                                          api_link.GET_IMAGE +
                                          `${
                                            this.state.most_clicked &&
                                            this.state.most_clicked.file
                                          }`
                                        }
                                        type="video/mp4"
                                      />
                                    </video>
                                  ) : (
                                    <div class="td-content customer-name">
                                      <img
                                        data-toggle="modal"
                                        data-target="#showAdView3"
                                        src={
                                          api_link.GET_IMAGE +
                                          `${
                                            this.state.most_clicked &&
                                            this.state.most_clicked.file
                                          }`
                                        }
                                        style={{
                                          width: "70px",
                                          height: "70px",

                                          cursor: "auto",
                                        }}
                                        alt="avatar"
                                      />
                                    </div>
                                  )}
                                </div>
                              )}

                              <div class="user-info">
                                <h5 class="card-user_name">
                                  {this.state.most_clicked &&
                                    this.state.most_clicked.title}
                                </h5>
                                <p
                                  class="card-user_occupation"
                                  style={{ fontSize: "2vh" }}
                                >
                                  Total Clicks{" "}
                                  <span
                                    class="badge badge-secondary"
                                    style={{ fontSize: "1.5vh" }}
                                  >
                                    {this.state.most_clicked &&
                                      this.state.most_clicked.clicks.length}
                                  </span>
                                </p>

                                <p class="card-text">
                                  {this.state.most_clicked &&
                                    this.state.most_clicked.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12 layout-spacing m-auto">
                    <div class="widget widget-five">
                      <div class="widget-content">
                        <div class="header">
                          <div class="header-body">
                            <h5>Ad with Most Views</h5>
                          </div>
                        </div>

                        <div class="w-content">
                          <div
                            class="card component-card_4"
                            style={{
                              cursor: "auto",
                            }}
                          >
                            <div
                              class="card-body"
                              style={{
                                cursor: "auto",
                              }}
                            >
                              {this.state.most_viewed == null ? (
                                <div class="user-profile">
                                  <img
                                    src="https://img.icons8.com/color/48/000000/buysellads.png"
                                    alt="ad"
                                  />
                                </div>
                              ) : (
                                <div class="user-profile">
                                  {this.state.most_viewed &&
                                  this.state.most_viewed.type === "video" ? (
                                    <video
                                      loop
                                      muted
                                      autoPlay
                                      style={{
                                        height: "80px",
                                        width: "80px",
                                        cursor: "auto",
                                      }}
                                    >
                                      {" "}
                                      <source
                                        src={
                                          api_link.GET_IMAGE +
                                          `${
                                            this.state.most_viewed &&
                                            this.state.most_viewed.file
                                          }`
                                        }
                                        type="video/mp4"
                                      />
                                    </video>
                                  ) : (
                                    <div class="td-content customer-name">
                                      <img
                                        data-toggle="modal"
                                        data-target="#showAdView3"
                                        src={
                                          api_link.GET_IMAGE +
                                          `${
                                            this.state.most_viewed &&
                                            this.state.most_viewed.file
                                          }`
                                        }
                                        style={{
                                          width: "70px",
                                          height: "70px",
                                          cursor: "auto",
                                        }}
                                        alt="avatar"
                                      />
                                    </div>
                                  )}
                                </div>
                              )}

                              <div class="user-info">
                                <h5 class="card-user_name">
                                  {this.state.most_viewed &&
                                    this.state.most_viewed.title}
                                </h5>
                                <p
                                  class="card-user_occupation"
                                  style={{ fontSize: "2vh" }}
                                >
                                  Total Views{" "}
                                  <span
                                    class="badge badge-secondary"
                                    style={{ fontSize: "1.5vh" }}
                                  >
                                    {this.state.most_viewed &&
                                      this.state.most_viewed.views.length}
                                  </span>
                                </p>

                                <p class="card-text">
                                  {this.state.most_viewed &&
                                    this.state.most_viewed.description}
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
            </div>

            <div class="row sales">
              <div class="col-xl-7 col-lg-12 col-md-12 col-sm-12 col-12 layout-spacing">
                <div class="widget widget-table-one">
                  <div class="widget-heading">
                    <h5 class="">Recently Posted Ads</h5>
                  </div>

                  <div class="widget-content">
                    <div
                      class="table-responsive "
                      style={{ height: "395px", overflowY: "auto" }}
                    >
                      {this.state.recent_ads &&
                      this.state.recent_ads.length > 1 ? (
                        <table class="table" style={{ textAlign: "center" }}>
                          <thead>
                            <tr>
                              <th>
                                <div class="th-content">Ad File</div>
                              </th>
                              <th>
                                <div class="th-content">Title</div>
                              </th>
                              <th>
                                <div class="th-content">Description</div>
                              </th>
                              <th>
                                <div class="th-content">Clicks</div>
                              </th>

                              <th>
                                <div class="th-content">Views</div>
                              </th>
                              <th>
                                <div class="th-content">Status</div>
                              </th>
                            </tr>
                          </thead>

                          <tbody>
                            {this.state.recent_ads &&
                              this.state.recent_ads.map((pointer) => (
                                <tr>
                                  <td>
                                    {pointer.type === "video" ? (
                                      <video
                                        data-toggle="modal"
                                        data-target="#showAdView3"
                                        loop
                                        muted
                                        autoPlay
                                        style={{
                                          height: "80px",
                                          width: "80px",
                                        }}
                                        onClick={() =>
                                          this.setState({
                                            stuffToShow: pointer.file,
                                            stuffToShowType: pointer.type,
                                          })
                                        }
                                      >
                                        {" "}
                                        <source
                                          src={
                                            api_link.GET_IMAGE +
                                            `${pointer.file}`
                                          }
                                          type="video/mp4"
                                        />
                                      </video>
                                    ) : (
                                      <Link to="#">
                                        <div class="td-content customer-name">
                                          <img
                                            data-toggle="modal"
                                            data-target="#showAdView3"
                                            onClick={() =>
                                              this.setState({
                                                stuffToShow: pointer.file,
                                                stuffToShowType: pointer.type,
                                              })
                                            }
                                            src={
                                              api_link.GET_IMAGE +
                                              `${pointer.file}`
                                            }
                                            style={{
                                              width: "70px",
                                              height: "70px",
                                            }}
                                            alt="avatar"
                                          />
                                        </div>
                                      </Link>
                                    )}
                                  </td>
                                  <td>
                                    <div class="td-content product-brand">
                                      {pointer.title}
                                    </div>
                                  </td>
                                  <td>
                                    <div class="td-content">
                                      {pointer.description}
                                    </div>
                                  </td>
                                  <td>
                                    <div class="td-content">
                                      {pointer.clicks.length}
                                    </div>
                                  </td>
                                  <td>
                                    <div class="td-content">
                                      {pointer.views.length}
                                    </div>
                                  </td>

                                  <td>
                                    <div class="td-content">
                                      {pointer.status === "Approved" ? (
                                        <span class="badge outline-badge-success">
                                          Approved
                                        </span>
                                      ) : null}
                                      {pointer.status === "Pending" ? (
                                        <span class="badge outline-badge-dark">
                                          Pending
                                        </span>
                                      ) : null}
                                      {pointer.status === "Blocked" ? (
                                        <span class="badge outline-badge-danger">
                                          Blocked
                                        </span>
                                      ) : null}
                                      {pointer.status === "Expired" ? (
                                        <span class="badge outline-badge-secondary">
                                          Expired
                                        </span>
                                      ) : null}
                                    </div>
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      ) : (
                        <div className="d-flex" style={{ height: "395px" }}>
                          <div
                            class="m-auto "
                            style={{
                              verticalAlign: "middle",
                              fontSize: "35px",
                              fontWeight: "500",
                            }}
                          >
                            <img
                              src={errorImage}
                              style={{ height: "70px" }}
                              alt="error"
                            />{" "}
                            No Data To Display
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-xl-5 col-lg-12 col-md-12 col-sm-12 col-12 layout-spacing">
                <div class="widget widget-table-one">
                  <div class="widget-heading">
                    <h5 class="">Blocked Ads</h5>
                  </div>

                  <div
                    class="widget-content example"
                    style={{ height: "395px" }}
                  >
                    {this.state.blockedAdsArray &&
                    this.state.blockedAdsArray.length >= 1 ? (
                      this.state.blockedAdsArray.map((pointer) => (
                        <div class="transactions-list">
                          <div class="t-item">
                            <div class="t-company-name">
                              <div class="t-icon">
                                <div class="">
                                  {pointer.type === "video" ? (
                                    <video
                                      data-toggle="modal"
                                      muted
                                      autoPlay
                                      data-target="#showAdView3"
                                      loop
                                      style={{
                                        height: "80px",
                                        width: "80px",
                                      }}
                                      onClick={() =>
                                        this.setState({
                                          stuffToShow: pointer.file,
                                          stuffToShowType: pointer.type,
                                        })
                                      }
                                    >
                                      {" "}
                                      <source
                                        src={
                                          api_link.GET_IMAGE + `${pointer.file}`
                                        }
                                        type="video/mp4"
                                      />
                                    </video>
                                  ) : (
                                    <Link to="#">
                                      <div class="td-content customer-name">
                                        <img
                                          data-toggle="modal"
                                          data-target="#showAdView3"
                                          onClick={() =>
                                            this.setState({
                                              stuffToShow: pointer.file,
                                              stuffToShowType: pointer.type,
                                            })
                                          }
                                          src={
                                            api_link.GET_IMAGE +
                                            `${pointer.file}`
                                          }
                                          style={{
                                            width: "70px",
                                            height: "70px",
                                          }}
                                          alt="avatar"
                                        />
                                      </div>
                                    </Link>
                                  )}
                                </div>
                              </div>
                              <div class="t-name">
                                <h4>{pointer.title}</h4>
                                <p class="meta-date">{pointer.description}</p>
                              </div>
                            </div>
                            <div class="t-rate rate-inc">
                              <p>
                                <span>{pointer.type}</span>{" "}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="d-flex" style={{ height: "395px" }}>
                        <div
                          class="m-auto "
                          style={{
                            verticalAlign: "middle",
                            fontSize: "35px",
                            fontWeight: "500",
                          }}
                        >
                          <img
                            src={errorImage}
                            style={{ height: "70px" }}
                            alt="error"
                          />{" "}
                          No Data To Display
                        </div>
                      </div>
                    )}
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
      </React.Fragment>
    );
  }
}

export default PublisherDashboard;
