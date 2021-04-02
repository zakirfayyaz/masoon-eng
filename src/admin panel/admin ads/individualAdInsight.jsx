import React, { Component } from "react";
import BackButton from "./../../utils/backButton";
import { Link } from "react-router-dom";
import api_link from "../../config.json";
import MonthlyCVI from "./publisher ad insights/publisher ad insights graphs/montlyCVI";
import PAIGPieChart from "./publisher ad insights/publisher ad insights graphs/paigPieChart";
import axios from "axios";
import encrypt from "./../../utils/Encryption/Encrypt";
import decrypt from "./../../utils/Encryption/Decrypt";

class IndividualAdInsight extends Component {
  state = {
    adId: "",
    total_ads: [],
    showInsight: true,
    total_clicks: "",
    total_impressions: "",
    total_views: "",
    filterValue: 0,
    monthlyGraph: [],
    monthlyid: 0,
    graphMonth: new Date().getMonth() + 1,
    graphYear: new Date().getFullYear(),
    monthlyGraphHeading: "Impressions Monthly",
    selectMonth: [
      { val: 1, month: "January" },
      { val: 2, month: "Feburary" },
      { val: 3, month: "March" },
      { val: 4, month: "April" },
      { val: 5, month: "May" },
      { val: 6, month: "June" },
      { val: 7, month: "July" },
      { val: 8, month: "August" },
      { val: 9, month: "September" },
      { val: 10, month: "October" },
      { val: 11, month: "November" },
      { val: 12, month: "December" },
    ],
    months: [
      "January",
      "Feburary",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
  };
  componentDidMount = async () => {
    this.getAdInsight(this.props.match.params.id);
    // console.log(this.props.match.params.id);
    this.setState({ adId: this.props.match.params.id });
  };
  getAdInsight = async (id) => {
    const token = localStorage.getItem("token");
    const date = new Date();
    const d = date.getDate();
    const day = d < 10 ? "0" + d : d;
    const m = date.getMonth() + 1;
    const month = m < 10 ? "0" + m : m;
    const year = date.getFullYear();
    // console.log(day, month, year);
    let response = await axios.put(
      api_link.API_LINK + `notice/ad-insights-id`,
      {
        name: encrypt(
          JSON.stringify({
            ad_id: id,
            day: day,
            month: month,
            year: year,
            status: 0,
          })
        ),
      },
      { headers: { Authorization: token } }
    );
    // console.log(response);
    response["data"] = JSON.parse(decrypt(response.data.resp));
    this.setState({
      total_clicks: response["data"]["total_clicks"],
      total_impressions: response["data"]["total_impressions"],
      total_views: response["data"]["total_views"],
      currentMonth: this.state.months[month - 1],
    });
  };
  handleFilterChange = async ({ currentTarget: input }) => {
    const value = parseInt(input.value);
    if (value === 0) {
      this.setState({ filterValue: 0 });
    } else if (value === 1) {
      this.setState({ filterValue: 1 });
    }
  };
  getDataByDate = async ({ currentTarget: input }) => {
    const value = input.value.toString();
    const day = value.substring(value.lastIndexOf("-") + 1);
    const month = value.substring(
      value.indexOf("-") + 1,
      value.lastIndexOf("-")
    );
    const year = value.substring(0, value.indexOf("-"));
    // console.log(day, month, year);
    this.setState({ currentMonth: value });

    try {
      const id = this.state.adId;
      const token = localStorage.getItem("token");
      let response = await axios.put(
        api_link.API_LINK + `notice/ad-insights-id`,
        {
          name: encrypt(
            JSON.stringify({
              ad_id: id,
              day: day,
              month: month,
              year: year,
              status: 0,
            })
          ),
        },
        { headers: { Authorization: token } }
      );
      // console.log(response);
      response["data"] = JSON.parse(decrypt(response.data.resp));
      this.setState({
        total_clicks: response["data"]["total_clicks"],
        total_impressions: response["data"]["total_impressions"],
        total_views: response["data"]["total_views"],
      });
    } catch (e) {
      // console.log(e);
    }
  };
  getDataByMonth = async ({ currentTarget: input }) => {
    const month = input.value;
    const date = new Date();
    const d = date.getDate();
    const day = d < 10 ? "0" + d : d;
    // const month = value.substring(value.indexOf("-") + 1);
    // const year = value.substring(0, value.indexOf("-"));
    this.setState({ currentMonth: this.state.months[month - 1] });
    const year = new Date().getFullYear();
    // console.log(month, year);
    try {
      const id = this.state.adId;
      const token = localStorage.getItem("token");
      let response = await axios.put(
        api_link.API_LINK + `notice/ad-insights-id`,
        {
          name: encrypt(
            JSON.stringify({
              ad_id: id,
              day: day,
              month: month,
              year: year,
              status: 2,
            })
          ),
        },
        { headers: { Authorization: token } }
      );
      // console.log(response);
      response["data"] = JSON.parse(decrypt(response.data.resp));
      this.setState({
        total_clicks: response["data"]["total_clicks"],
        total_impressions: response["data"]["total_impressions"],
        total_views: response["data"]["total_views"],
      });
    } catch (e) {
      // console.log(e);
    }
  };

  handleMonthChange = async ({ currentTarget: input }) => {
    const value = input.value;
    // console.log(value);
    const month = value.substring(value.indexOf("-") + 1);
    // const year = value.substring(0, value.indexOf("-"));
    const year = new Date().getFullYear();
    // console.log(month, year);
    this.setState({
      graphMonth: month,
      graphYear: year,
      currentmonth: this.state.months[value - 1],
    });
  };
  handleChange = async ({ currentTarget: input }) => {
    const value = parseInt(input.value);
    if (value === 0) {
      this.setState({
        monthlyid: 0,
        monthlyGraphHeading: "Impressions Monthly",
      });
    } else if (value === 1) {
      this.setState({ monthlyid: 1, monthlyGraphHeading: "Clicks Monthly" });
    } else if (value === 2) {
      this.setState({ monthlyid: 2, monthlyGraphHeading: "Views Monthly" });
    }
  };
  render() {
    return (
      <>
        <React.Fragment>
          <div id="content" class="main-content">
            <div
              class=""
              style={{ paddingBottom: "30px ", paddingLeft: "30px" }}
            >
              <div class="page-header">
                <div class="page-title">
                  <div className="d-flex justify-content-between">
                    <BackButton />
                    <h3 style={{ paddingTop: "8px" }}>
                      Individual Ad Insights
                    </h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="row " style={{ margin: "20px" }}>
              <div className="col-md-12">
                {/* ADS INSIGHTS*/}
                <div class="widget widget-table-one">
                  <div class="widget-heading">
                    <Link to="/en-admin/dashboard-pending-ads">
                      {" "}
                      <h5 class="">
                        AD INSIGHTS FOR {this.state.currentMonth}
                      </h5>
                    </Link>
                  </div>

                  <div class="widget-content">
                    <div
                      class="table-responsive example"
                      style={{ maxheight: "65vh" }}
                    >
                      <div className="row">
                        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 layout-spacing mt-2">
                          <div
                            class="d-flex justify-content-between widget-account-invoice-three"
                            style={{
                              background:
                                "linear-gradient(to right, #FFC133 0%, #FF973A 100%)",
                            }}
                          >
                            <div class="mt-2">
                              <span class="text-white">
                                <i class="fas fa-cloud-upload-alt"></i>{" "}
                                Impressions
                              </span>
                            </div>
                            <div class="mt-1">
                              <p class="text-white ">
                                {this.state.total_impressions &&
                                  this.state.total_impressions}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 layout-spacing mt-2">
                          <div class="d-flex justify-content-between widget-account-invoice-six layout-spacing">
                            <div class="mt-2">
                              <span class="text-white">
                                <i class="fas fa-mouse"></i> Clicks
                              </span>
                            </div>
                            <div class="mt-1">
                              <p class="text-white ">
                                {this.state.total_clicks &&
                                  this.state.total_clicks}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 layout-spacing mt-2">
                          <div
                            class="d-flex justify-content-between widget-account-invoice-three"
                            style={{
                              background:
                                "linear-gradient(to right, #FFC133 0%, #FF973A 100%)",
                            }}
                          >
                            <div class="mt-2">
                              <span class="text-white">
                                <i class="fas fa-eye"></i> Views
                              </span>
                            </div>
                            <div class="mt-1">
                              <p class="text-white ">
                                {this.state.total_views &&
                                  this.state.total_views}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="d-flex justify-content-between">
                            <div class="form-check form-check-inline">
                              <input
                                class="form-check-input"
                                type="radio"
                                name="inlineRadioOptions"
                                id="inlineRadio1"
                                value="0"
                                onChange={this.handleFilterChange}
                                defaultChecked
                              />
                              <label
                                class="form-check-label"
                                for="inlineRadio1"
                              >
                                By Date
                              </label>
                            </div>
                            <div class="form-check form-check-inline">
                              <input
                                class="form-check-input"
                                type="radio"
                                name="inlineRadioOptions"
                                id="inlineRadio2"
                                onChange={this.handleFilterChange}
                                value="1"
                              />
                              <label
                                class="form-check-label"
                                for="inlineRadio2"
                              >
                                By Month
                              </label>
                            </div>
                            {this.state.filterValue === 0 ? (
                              <input
                                type="date"
                                className="form-control col-md-5"
                                onChange={this.getDataByDate}
                              />
                            ) : (
                              // <input
                              //   type="month"
                              //   className="form-control  col-md-5"
                              //   onChange={this.getDataByMonth}
                              // />
                              <select
                                className="form-control  col-md-5"
                                onChange={this.getDataByMonth}
                              >
                                <option>Select Month...</option>
                                {this.state.selectMonth.map((pointer) => (
                                  <option value={pointer.val}>
                                    {pointer.month}
                                  </option>
                                ))}
                              </select>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div
                          className="container d-flex justify-content-between col-md-5 m-auto"
                          style={{ textAlign: "center" }}
                        >
                          <PAIGPieChart
                            total_impressions={
                              this.state.total_impressions &&
                              this.state.total_impressions
                            }
                            total_clicks={
                              this.state.total_clicks && this.state.total_clicks
                            }
                            total_views={
                              this.state.total_views && this.state.total_views
                            }
                          />
                        </div>

                        <div className="col-12 col-md-12 mt-5">
                          <h5 style={{ textAlign: "left" }}>
                            {this.state.monthlyGraphHeading}
                          </h5>
                          <div
                            className="d-flex justify-content-between"
                            style={{ textAlign: "center" }}
                          >
                            <div class="form-check form-check-inline">
                              <input
                                class="form-check-input"
                                type="radio"
                                name="inlineRadioOptions1"
                                id="inlineRadio1"
                                value="0"
                                onChange={this.handleChange}
                                defaultChecked
                              />
                              <label
                                class="form-check-label"
                                for="inlineRadio1"
                              >
                                Impression
                              </label>
                            </div>
                            <div class="form-check form-check-inline">
                              <input
                                class="form-check-input"
                                type="radio"
                                name="inlineRadioOptions1"
                                id="inlineRadio2"
                                value="1"
                                onChange={this.handleChange}
                              />
                              <label
                                class="form-check-label"
                                for="inlineRadio2"
                              >
                                Clicks
                              </label>
                            </div>
                            <div class="form-check form-check-inline">
                              <input
                                class="form-check-input"
                                type="radio"
                                name="inlineRadioOptions1"
                                id="inlineRadio3"
                                value="2"
                                onChange={this.handleChange}
                              />
                              <label
                                class="form-check-label"
                                for="inlineRadio3"
                              >
                                Views
                              </label>
                            </div>
                            <select
                              className="col-md-5 form-control pr-3"
                              onChange={this.handleMonthChange}
                            >
                              <option>Select Month...</option>
                              {this.state.selectMonth.map((pointer) => (
                                <option value={pointer.val}>
                                  {pointer.month}
                                </option>
                              ))}
                            </select>
                            {/* <input
                              className="col-md-5 form-control pr-3"
                              type="month"
                              onChange={this.handleMonthChange}
                            /> */}
                          </div>
                          <div
                            className="ml-auto"
                            style={{ textAlign: "center" }}
                          ></div>
                          <MonthlyCVI
                            adId={this.state.adId && this.state.adId}
                            id={this.state.monthlyid}
                            month={this.state.graphMonth}
                            year={this.state.graphYear}
                          />
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
              <div class="footer-section f-section-2"></div>
            </div>
          </div>
          <div
            class="modal fade"
            id="insightShowAd"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalCenterTitle"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLongTitle">
                    Modal title
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
                <div class="modal-body" style={{ textAlign: "center" }}>
                  {this.state.stuffToShowType &&
                  this.state.stuffToShowType === "video" ? (
                    <div className="text-center">
                      <video
                        data-toggle="modal"
                        data-target="#showAdView2"
                        mute
                        loop
                        style={{ height: "32vh", width: "32vh" }}
                        controls
                        id="video"
                      >
                        {" "}
                        <source
                          src={api_link.GET_IMAGE + `${this.state.stuffToShow}`}
                          type="video/mp4"
                        />
                      </video>
                    </div>
                  ) : (
                    <img
                      data-toggle="modal"
                      data-target="#showAdView2"
                      src={api_link.GET_IMAGE + `${this.state.stuffToShow}`}
                      style={{ height: "32vh", width: "32vh" }}
                      alt="avatar"
                    />
                  )}
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-dismiss="modal"
                    onClick={() => this.stopVideo()}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      </>
    );
  }
  stopVideo = () => {
    if (this.state.stuffToShowType === "video") {
      var video = document.getElementById("video");
      if (!video.muted) {
        video.muted = true;
      }
      video.pause();
    }
  };
}

export default IndividualAdInsight;
