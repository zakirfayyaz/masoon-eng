import React, { Component } from "react";
import ApprovedAds from "./approvedAds";
import PendingAds from "./pendingAds";
import BloackedAds from "./blockedAds";
import { trackPromise } from "react-promise-tracker";
import axios from "axios";
import api_link from "../../config.json";
import { ToastContainer, toast } from "react-toastify";
import ExpiredAds from "./expiredAds";
import BackButton from "./../../utils/backButton";
import capitalizeFirstLetter from "./../../utils/first-capital";
import encrypt from "./../../utils/Encryption/Encrypt";
import decrypt from "./../../utils/Encryption/Decrypt";
import { usePromiseTracker } from "react-promise-tracker";
import Loader from "react-promise-loader";
class AdminAds extends Component {
  state = {
    approved_ads: [],
    blocked_ads: [],
    pending_ads: [],
    expired_ads: [],
  };
  componentDidMount = async () => {
    // admin/users/ads/id
    this.getads();
  };
  getads = async () => {
    const token = localStorage.getItem("token");
    let obj = {
      user_id: this.props.match.params.user_id,
    };
    obj = encrypt(JSON.stringify(obj));
    let response = await trackPromise(
      axios.put(
        api_link.API_LINK + "admin/users/ads-id",
        { name: obj },
        {
          headers: { Authorization: token },
        }
      )
    );
    response["data"] = JSON.parse(decrypt(response.data.resp));
    const total_ads = response["data"]["ads"];
    // console.log(total_ads);
    const approved = total_ads.filter((ads) => ads.status === "Approved");
    const blocked = total_ads.filter((ads) => ads.status === "Blocked");
    const pending = total_ads.filter((ads) => ads.status === "Pending");
    const expired = total_ads.filter((ads) => ads.status === "Expired");
    const status = response["data"]["package_status"];
    this.setState({
      approved_ads: approved,
      blocked_ads: blocked,
      pending_ads: pending,
      expired_ads: expired,
      status,
    });
  };
  blockAds = async (id) => {
    const token = localStorage.getItem("token");
    var obj = { id: id };
    obj = encrypt(JSON.stringify(obj));

    try {
      let response1 = await trackPromise(
        axios.put(
          api_link.API_LINK + "notice/block-id",
          { name: obj },
          {
            headers: { Authorization: token },
          }
        )
      );
      // console.log(response1);
      response1["data"] = JSON.parse(decrypt(response1.data.resp));
      if (response1.data.status === 200) {
        this.getads();
        toast.dark("Ad Blocked", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error(response1.data.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (e) {
      // console.log(e);
      toast.error("Error", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  approveAds = async (id) => {
    const token = localStorage.getItem("token");
    let obj = {
      id: id,
    };
    obj = encrypt(JSON.stringify(obj));
    try {
      let response1 = await trackPromise(
        axios.put(
          api_link.API_LINK + "notice/unblock-id",
          { name: obj },
          {
            headers: { Authorization: token },
          }
        )
      );
      response1["data"] = JSON.parse(decrypt(response1.data.resp));
      if (response1.data.status === 200) {
        this.getads();
        toast.dark("Ad Approved", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error(response1.data.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (e) {
      // console.log(e);
      toast.error("Error", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  unBlockAds = async (id) => {
    const token = localStorage.getItem("token");
    let obj = {
      id: id,
    };
    obj = encrypt(JSON.stringify(obj));
    try {
      let response1 = await trackPromise(
        axios.put(
          api_link.API_LINK + "notice/unblock-id",
          { name: obj },
          {
            headers: { Authorization: token },
          }
        )
      );
      response1["data"] = JSON.parse(decrypt(response1.data.resp));
      if (response1.data.status === 200) {
        this.getads();
        toast.dark("Ad Unblocked", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error(response1.data.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (e) {
      // console.log(e);
      toast.error("Error", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  render() {
    return (
      <div id="content" className="main-content">
        <Loader
          promiseTracker={usePromiseTracker}
          color={"#5c1ac3"}
          background={"rgb(255, 255, 255)"}
        />
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
        {/* Same as */}
        <ToastContainer />
        <div className="layout-px-spacing">
          <div className="">
            <div className="row">
              <div className="col-md-12">
                <div className="page-header">
                  <div className="page-title">
                    <div className="d-flex justify-content-between">
                      <BackButton />
                      <h3 style={{ paddingTop: "8px" }}>
                        Advertisements of{" "}
                        {capitalizeFirstLetter(this.props.match.params.user)}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <React.Fragment>
              <div className="row analytics layout-top-spacing">
                <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-12 layout-spacing m-auto">
                  <div className="d-flex justify-content-between widget-account-invoice-three">
                    <div className="mt-2">
                      <h4 className="text-white">Approved ADS</h4>
                    </div>
                    <div className="mt-1">
                      <p className="text-white h3">
                        {this.state.approved_ads.length}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-12 layout-spacing m-auto">
                  <div className="d-flex justify-content-between widget-account-invoice-five">
                    <div className="mt-2">
                      <h4 className="text-white">Pending ADS</h4>
                    </div>
                    <div className="mt-1">
                      <p className="text-white h3">
                        {this.state.pending_ads.length}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-12 layout-spacing m-auto">
                  <div className="d-flex justify-content-between widget-account-invoice-three">
                    <div className="mt-2">
                      <h4 className="text-white">Block ADS</h4>
                    </div>
                    <div className="mt-1">
                      <p className="text-white h3">
                        {this.state.blocked_ads.length}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-12 layout-spacing m-auto">
                  <div className="d-flex justify-content-between widget-account-invoice-five">
                    <div className="mt-2">
                      <h4 className="text-white">Expired ADS</h4>
                    </div>
                    <div className="mt-1">
                      <p className="text-white h3">
                        {this.state.expired_ads.length}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12 col-12 layout-top-spacing">
                  <div className="statbox widget box box-shadow">
                    <div className="widget-header"></div>
                    <div className="widget-content widget-content-area icon-pill">
                      <div className="row">
                        <div className="col-md-12 m-auto">
                          <ul
                            className="nav nav-pills mb-3 mt-3"
                            id="icon-pills-tab"
                            role="tablist"
                          >
                            <li className="nav-item">
                              <a
                                className="nav-link active"
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

                            <li className="nav-item">
                              <a
                                className="nav-link"
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
                            <li className="nav-item">
                              <a
                                className="nav-link"
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
                            <li className="nav-item">
                              <a
                                className="nav-link"
                                id="icon-pills-contact-tab"
                                data-toggle="pill"
                                href="#expired"
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

                      <div className="tab-content" id="icon-pills-tabContent">
                        <div
                          className="tab-pane fade show active"
                          id="icon-pills-home"
                          role="tabpanel"
                          aria-labelledby="icon-pills-home-tab"
                        >
                          <ApprovedAds
                            approved={this.state.approved_ads}
                            blockAds={this.blockAds}
                          />
                        </div>
                        <div
                          className="tab-pane fade"
                          id="icon-pills-contact"
                          role="tabpanel"
                          aria-labelledby="icon-pills-contact-tab"
                        >
                          <PendingAds
                            pending={this.state.pending_ads}
                            approveAds={this.approveAds}
                          />
                        </div>
                        <div
                          className="tab-pane fade"
                          id="icon-pills-contact1"
                          role="tabpanel"
                          aria-labelledby="icon-pills-contact-tab"
                        >
                          <BloackedAds
                            blocked={this.state.blocked_ads}
                            unBlockAds={this.unBlockAds}
                          />
                        </div>
                        <div
                          className="tab-pane fade"
                          id="expired"
                          role="tabpanel"
                          aria-labelledby="icon-pills-contact-tab"
                        >
                          <ExpiredAds expired={this.state.expired_ads} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </React.Fragment>
          </div>
        </div>
        <div className="footer-wrapper">
          <div className="footer-section f-section-1">
            <p className="">
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
          <div className="footer-section f-section-2"></div>
        </div>
      </div>
    );
  }
}

export default AdminAds;
