import React, { Component } from "react";
import PAIGPieChart from "./../../admin panel/admin ads/publisher ad insights/publisher ad insights graphs/paigPieChart";
import { Link } from "react-router-dom";
import api_link from "../../config.json";
import axios from "axios";
import MonthlyCVI from "./../../admin panel/admin ads/publisher ad insights/publisher ad insights graphs/montlyCVI";
import decrypt from "./../../utils/Encryption/Decrypt";
import encrypt from "./../../utils/Encryption/Encrypt";
import errorImage from "./../../Global Image/errorImage";

class PubisherPanelAdInsights extends Component {
  state = {
    total_ads: [],
    showInsight: false,
    total_clicks: "",
    total_impressions: "",
    total_views: "",
    filterValue: "",
    monthlyGraph: [],
    adId: "",
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
    const token = localStorage.getItem("token");

    let response1 = await axios.get(api_link.API_LINK + "profile", {
      headers: { Authorization: token },
    });
    response1["data"] = JSON.parse(decrypt(response1.data.resp));
    const id = response1["data"]["profile"]._id;
    // //console.log("Profile id", id);
    let response = await axios.put(
      api_link.API_LINK + "admin/users/ads-id",
      { name: encrypt(JSON.stringify({ user_id: id })) },
      {
        headers: { Authorization: token },
      }
    );
    response["data"] = JSON.parse(decrypt(response.data.resp));
    // const approved_ads = response["data"]["approved_ads_with_count"];
    const total_ads = response["data"]["ads"];
    // const expired_ads = response["data"]["expired_ads_with_count"];

    // for (var i = 0; i < approved_ads.length; i++) {
    //   total_ads.push(approved_ads[i]);
    // }
    // for (var k = 0; k < expired_ads.length; k++) {
    //   total_ads.push(expired_ads[k]);
    // }
    //console.log(total_ads);
    this.setState({ total_ads: total_ads });
  };
  getAdInsight = async (id) => {
    const token = localStorage.getItem("token");
    const date = new Date();
    const d = date.getDate();
    const day = d < 10 ? "0" + d : d;
    const m = date.getMonth() + 1;
    const month = m < 10 ? "0" + m : m;
    const year = date.getFullYear();
    //console.log(day, month, year);
    let response = await axios.put(
      api_link.API_LINK + `notice/ad-insights-id`,
      {
        name: encrypt(
          JSON.stringify({
            ad_id: id,
            day,
            month: month,
            year: year,
            status: 0,
          })
        ),
      },
      { headers: { Authorization: token } }
    );
    response["data"] = JSON.parse(decrypt(response.data.resp));
    this.setState({
      total_clicks: response["data"]["total_clicks"],
      total_impressions: response["data"]["total_impressions"],
      total_views: response["data"]["total_views"],
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
    // const month = input.value;
    const value = input.value;
    const day = value.substring(value.lastIndexOf("-") + 1);
    // const day = new Date().getDay();
    const month = value.substring(
      value.indexOf("-") + 1,
      value.lastIndexOf("-")
    );
    const year = value.substring(0, value.indexOf("-"));
    // const year = new Date().getFullYear();
    //console.log("hello", day, month, year);
    this.getSetData(day, month, year);
  };
  getSetData = async (day, month, year) => {
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
    response["data"] = JSON.parse(decrypt(response.data.resp));
    //console.log(response["data"]);
    this.setState({
      total_clicks: response["data"]["total_clicks"],
      total_impressions: response["data"]["total_impressions"],
      total_views: response["data"]["total_views"],
    });
  };
  getDataByMonth = async ({ currentTarget: input }) => {
    const month = input.value;
    const date = new Date();
    const d = date.getDate();
    const day = d < 10 ? "0" + d : d;
    // const month = value.substring(value.indexOf("-") + 1);
    const year = new Date().getFullYear();
    //console.log(month, year);
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
      response["data"] = JSON.parse(decrypt(response.data.resp));
      this.setState({
        total_clicks: response["data"]["total_clicks"],
        total_impressions: response["data"]["total_impressions"],
        total_views: response["data"]["total_views"],
      });
    } catch (e) {
      //console.log(e);
    }
  };

  handleMonthChange = async ({ currentTarget: input }) => {
    const month = input.value;
    // //console.log(value);
    // const month = value.substring(value.indexOf("-") + 1);
    // const year = value.substring(0, value.indexOf("-"));
    const year = new Date().getFullYear();
    //console.log(month, year);
    this.setState({ graphMonth: month, graphYear: year });
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
      <React.Fragment>
        <div id="content" class="main-content">
          <div class="" style={{ paddingBottom: "30px ", paddingLeft: "30px" }}>
            <div class="page-header">
              <div class="page-title">
                <h3> Ads Insights</h3>
              </div>
            </div>
          </div>
          <div
            className="row layout-spacing"
            style={{
              marginRight: "0px",
              marginLeft: "0px",
              marginTop: "10px",
            }}
          >
            <div className="col-md-12">
              {/* ADS*/}
              <div class="widget widget-table-one">
                <div class="widget-heading">
                  <Link to="/en-admin/dashboard-pending-ads">
                    {" "}
                    <h5 class="">Publisher ADS</h5>
                  </Link>
                </div>

                <div class="widget-content">
                  <div
                    class="table-responsive d-flex"
                    style={{ maxheight: "40vh", overflow: "auto" }}
                  >
                    {this.state.total_ads.length > 1 ? (
                      <table class="table ">
                        <thead>
                          <tr style={{ textAlign: "center" }}>
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
                              <div class="th-content">Status</div>
                            </th>
                            <th>
                              <div class="th-content">Created At</div>
                            </th>
                            <th>
                              <div class="th-content">Expires At</div>
                            </th>
                            <th>
                              <div class="th-content">Action</div>
                            </th>
                          </tr>
                        </thead>

                        <tbody>
                          {this.state.total_ads &&
                            this.state.total_ads.map((pointer) => (
                              <tr>
                                <td>
                                  <div class="td-content customer-name">
                                    {pointer.type === "video" ? (
                                      <video
                                        autoPlay
                                        loop
                                        muted
                                        style={{
                                          height: "70px",
                                          width: "70px",
                                        }}
                                        data-toggle="modal"
                                        data-target="#insightShowAd"
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
                                            data-target="#insightShowAd"
                                            src={
                                              api_link.GET_IMAGE +
                                              `${pointer.file}`
                                            }
                                            onClick={() =>
                                              this.setState({
                                                stuffToShow: pointer.file,
                                                stuffToShowType: pointer.type,
                                              })
                                            }
                                            style={{
                                              width: "60px",
                                              height: "60px",
                                            }}
                                            alt="avatar"
                                          />
                                        </div>
                                      </Link>
                                    )}
                                  </div>
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
                                    {pointer.status === "Approved" ? (
                                      <span class="badge outline-badge-success">
                                        Approved
                                      </span>
                                    ) : (
                                      <span class="badge outline-badge-warning">
                                        Expired
                                      </span>
                                    )}
                                  </div>
                                </td>
                                <td>
                                  {pointer.createdAt.substring(
                                    0,
                                    pointer.createdAt.indexOf("T")
                                  )}
                                </td>
                                <td>
                                  {pointer.expiresAt.substring(
                                    0,
                                    pointer.expiresAt.indexOf("T")
                                  )}
                                </td>
                                <td>
                                  <button
                                    className="btn btn-outline-secondary"
                                    onClick={() => {
                                      this.getAdInsight(pointer._id);
                                      this.setState({
                                        showInsight: true,
                                        selectedAdTitle: pointer.title,
                                        adId: pointer._id,
                                      });
                                    }}
                                  >
                                    Show Insights
                                  </button>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    ) : (
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
                    )}
                  </div>
                </div>
              </div>
            </div>
            {this.state.showInsight === true ? (
              <div className="col-md-12 mt-5 mb-3">
                {/* ADS INSIGHTS*/}
                <div class="widget widget-table-one">
                  <div class="widget-heading">
                    <Link to="/en-admin/dashboard-pending-ads">
                      {" "}
                      <h5 class="">
                        AD INSIGHTS FOR{" "}
                        {this.state.selectedAdTitle &&
                          this.state.selectedAdTitle}
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
                                defaultChecked
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
                            {/* <input
                              className="col-md-5 form-control pr-3"
                              type="month"
                              onChange={this.handleMonthChange}
                            /> */}
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
            ) : null}
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
                <div className="text-center">
                  {this.state.stuffToShowType &&
                  this.state.stuffToShowType === "video" ? (
                    <video
                      data-toggle="modal"
                      data-target="#showAdView2"
                      mute
                      loop
                      style={{ height: "40vh", width: "40vh" }}
                      controls
                      id="video"
                    >
                      {" "}
                      <source
                        src={api_link.GET_IMAGE + `${this.state.stuffToShow}`}
                        type="video/mp4"
                      />
                    </video>
                  ) : (
                    <img
                      data-toggle="modal"
                      data-target="#showAdView2"
                      src={api_link.GET_IMAGE + `${this.state.stuffToShow}`}
                      style={{ height: "40vh", width: "40vh" }}
                      alt="avatar"
                    />
                  )}
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-primary"
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

export default PubisherPanelAdInsights;
