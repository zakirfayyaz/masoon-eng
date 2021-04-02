import React, { Component } from "react";
import PublisherApproved from "./publisherApproved";
import PublisherBlocked from "./publisherBlocked";
import PublisherPending from "./publisherPending";
import api_link from "../../config.json";
import axios from "axios";
import { trackPromise } from "react-promise-tracker";
import { usePromiseTracker } from "react-promise-tracker";
import Loader from "react-promise-loader";
import PublisherExpiredAds from "./publisherExpired";
import decrypt from "./../../utils/Encryption/Decrypt";
import encrypt from "./../../utils/Encryption/Encrypt";
import { Link } from "react-router-dom";
class PublisherAdDetail extends Component {
  state = {};
  componentDidMount = async () => {
    try {
      var token = localStorage.getItem("token");
      // try {
      //   await axios.put(
      //     api_link.API_LINK + "notice/user-packages/expire-ad-by-date",
      //     {},
      //     { headers: { Authorization: token } }
      //   );
      // } catch (e) {
      //   //console.log(e);
      // }
      let package_detail = await trackPromise(
        axios.get(api_link.API_LINK + "notice/user-packages", {
          headers: { Authorization: token },
        })
      );
      package_detail["data"] = JSON.parse(decrypt(package_detail.data.resp));
      // console.log(package_detail["data"]["user_Packages"][0].status);
      let profile = await axios.get(api_link.API_LINK + "profile", {
        headers: { Authorization: token },
      });
      profile["data"] = JSON.parse(decrypt(profile.data.resp));
      //console.log("profile here", profile);
      const user_id = profile["data"]["profile"]._id;
      //console.log("user_id", user_id);
      let response = await trackPromise(
        axios.put(
          api_link.API_LINK + "admin/users/ads-id",
          { name: encrypt(JSON.stringify({ user_id: user_id })) },
          {
            headers: { Authorization: token },
          }
        )
      );
      response["data"] = JSON.parse(decrypt(response.data.resp));
      //console.log(response);
      const total_ads = response["data"]["ads"];
      const approved = total_ads.filter((ads) => ads.status === "Approved");
      const blocked = total_ads.filter((ads) => ads.status === "Blocked");
      const pending = total_ads.filter((ads) => ads.status === "Pending");
      const expired = total_ads.filter((ads) => ads.status === "Expired");
      const status = package_detail["data"]["user_Packages"][0].status;
      this.setState({ approved, blocked, pending, expired, status });
    } catch (e) {
      //console.log(e);
    }
  };
  render() {
    return (
      <React.Fragment>
        <Loader
          promiseTracker={usePromiseTracker}
          color={"#5c1ac3"}
          background={"rgb(255, 255, 255)"}
        />
        <div id="content" class="main-content">
          {this.state.status === "Expired" && (
            <div class="alert alert-danger" role="alert">
              Dear Advertiser! You're package has been expired.{" "}
              <Link
                to="/en-publisher/manage-packages"
                style={{ fontWeight: "500 " }}
              >
                Upgrade
              </Link>{" "}
              your package to post more or{" "}
              <Link
                to="/en-publisher/manage-packages"
                style={{ fontWeight: "500 " }}
              >
                Request
              </Link>{" "}
              Renewal. Thank you!
            </div>
          )}
          <div class="layout-px-spacing">
            <div class="">
              <div className="row">
                <div className="col-md-12">
                  <div class="page-header">
                    <div class="page-title">
                      <h3>Advertisement Overview</h3>
                    </div>
                  </div>
                </div>
              </div>

              <React.Fragment>
                <div class="row analytics layout-top-spacing">
                  <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-12 layout-spacing m-auto">
                    <div class="d-flex justify-content-between widget-account-invoice-five">
                      <div class="mt-2">
                        <h4 class="text-white">Approved ADS</h4>
                      </div>
                      <div class="mt-1">
                        <p class="text-white h3">
                          {this.state.approved && this.state.approved.length}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-12 layout-spacing m-auto">
                    <div class="d-flex justify-content-between widget-account-invoice-six">
                      <div class="mt-2">
                        <h4 class="text-white">Pending ADS</h4>
                      </div>
                      <div class="mt-1">
                        <p class="text-white h3">
                          {" "}
                          {this.state.pending && this.state.pending.length}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-12 layout-spacing m-auto">
                    <div class="d-flex justify-content-between widget-account-invoice-five">
                      <div class="mt-2">
                        <h4 class="text-white">Block ADS</h4>
                      </div>
                      <div class="mt-1">
                        <p class="text-white h3">
                          {" "}
                          {this.state.blocked && this.state.blocked.length}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-12 layout-spacing m-auto">
                    <div class="d-flex justify-content-between widget-account-invoice-six">
                      <div class="mt-2">
                        <h4 class="text-white">Expired ADS</h4>
                      </div>
                      <div class="mt-1">
                        <p class="text-white h3">
                          {" "}
                          {this.state.expired && this.state.expired.length}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-lg-12 col-12 layout-top-spacing">
                    <div class="statbox widget box box-shadow">
                      <div class="widget-header"></div>
                      <div class="widget-content widget-content-area icon-pill">
                        <div className="row">
                          <div className="col-md-12 m-auto">
                            <ul
                              class="nav nav-pills mb-3 mt-3"
                              id="icon-pills-tab"
                              role="tablist"
                            >
                              <li class="nav-item">
                                <a
                                  class="nav-link active"
                                  id="icon-pills-home-tab"
                                  data-toggle="pill"
                                  href="#icon-pills-home"
                                  role="tab"
                                  aria-controls="icon-pills-home"
                                  aria-selected="true"
                                >
                                  {" "}
                                  Approved
                                </a>
                              </li>

                              <li class="nav-item">
                                <a
                                  class="nav-link"
                                  id="icon-pills-contact-tab"
                                  data-toggle="pill"
                                  href="#icon-pills-contact"
                                  role="tab"
                                  aria-controls="icon-pills-contact"
                                  aria-selected="false"
                                >
                                  {" "}
                                  Pending
                                </a>
                              </li>
                              <li class="nav-item">
                                <a
                                  class="nav-link"
                                  id="icon-pills-contact-tab"
                                  data-toggle="pill"
                                  href="#icon-pills-contact1"
                                  role="tab"
                                  aria-controls="icon-pills-contact"
                                  aria-selected="false"
                                >
                                  {" "}
                                  Blocked
                                </a>
                              </li>
                              <li class="nav-item">
                                <a
                                  class="nav-link"
                                  id="expired"
                                  data-toggle="pill"
                                  href="#expired-ads"
                                  role="tab"
                                  aria-controls="icon-pills-contact"
                                  aria-selected="false"
                                >
                                  {" "}
                                  Expired
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
                            <PublisherApproved approved={this.state.approved} />
                          </div>
                          <div
                            class="tab-pane fade"
                            id="icon-pills-contact"
                            role="tabpanel"
                            aria-labelledby="icon-pills-contact-tab"
                          >
                            <PublisherPending pending={this.state.pending} />
                          </div>
                          <div
                            class="tab-pane fade"
                            id="icon-pills-contact1"
                            role="tabpanel"
                            aria-labelledby="icon-pills-contact-tab"
                          >
                            <PublisherBlocked blocked={this.state.blocked} />
                          </div>
                          <div
                            class="tab-pane fade"
                            id="expired-ads"
                            role="tabpanel"
                            aria-labelledby="icon-pills-contact-tab"
                          >
                            <PublisherExpiredAds
                              expired={this.state.expired && this.state.expired}
                              status={this.state.status && this.state.status}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </React.Fragment>
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

export default PublisherAdDetail;
