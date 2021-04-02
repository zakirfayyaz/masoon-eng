import React, { Component } from "react";
import { Link } from "react-router-dom";
import api_link from "../../../config.json";
import axios from "axios";
import PAIGPieChart from "./publisher ad insights graphs/paigPieChart";
import MonthlyCVI from "./publisher ad insights graphs/montlyCVI";
import BackButton from "./../../../utils/backButton";
import reverseDate from "./../../../utils/reverse-date";
import $ from "jquery";
import ToolTipComponent from "./../../../utils/tooltipComponent";
import encrypt from "./../../../utils/Encryption/Encrypt";
import decrypt from "./../../../utils/Encryption/Decrypt";
import token from "./../../../utils/token";
import errorImage from "./../../../Global Image/errorImage";
class publisherAdInsights extends Component {
  state = {
    total_ads: [],
    showInsight: false,
    total_clicks: "",
    total_impressions: "",
    total_views: "",
    filterValue: 1,
    monthlyGraph: [],
    adId: "",
    monthlyid: 0,
    graphMonth: "",
    graphYear: "",
    monthlyGraphHeading: "Impressions Monthly",
    currentMonth: "",
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
    var obj = {
      user_id: this.props.match.params.id,
    };
    obj = encrypt(JSON.stringify(obj));
    let response = await axios.put(
      api_link.API_LINK + "admin/users/ads-id",
      {
        name: obj,
      },
      {
        headers: { Authorization: token },
      }
    );
    response["data"] = JSON.parse(decrypt(response.data.resp));
    const total_ads = response["data"]["ads"];
    this.setState({ total_ads: total_ads });
    setTimeout(() => {
      if (this.state.total_ads.length > 0) {
        $(document).ready(function () {
          $("#mydatatabletotalads").dataTable({});
        });
      }
    }, 3000);
  };

  getAdInsight = async (id) => {
    const token = localStorage.getItem("token");
    const date = new Date();
    const d = date.getDate();
    const day = d < 10 ? "0" + d : d;
    const month = date.getMonth() + 1;
    // const month = m < 10 ? "0" + m : m;
    const year = date.getFullYear();
    // console.log(day, month, year);
    var obj = {
      ad_id: id,
      day: day,
      month: month,
      year: year,
      status: 0,
    };
    // console.log(obj);
    obj = encrypt(JSON.stringify(obj));
    let response = await axios.put(
      api_link.API_LINK + `notice/ad-insights-id`,
      { name: obj },
      { headers: { Authorization: token } }
    );
    response["data"] = JSON.parse(decrypt(response.data.resp));
    this.setState({ currentMonth: this.state.months[month - 1] });
    // console.log(response);
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
    const value = input.value.toString();
    const day = value.substring(value.lastIndexOf("-") + 1);
    const month = value.substring(
      value.indexOf("-") + 1,
      value.lastIndexOf("-")
    );
    const year = value.substring(0, value.indexOf("-"));
    // console.log(day, month, year);
    this.setState({ currentMonth: value });
    const id = this.state.adId;
    try {
      var obj = {
        ad_id: id,
        day: day,
        month: month,
        year: year,
        status: 0,
      };
      obj = encrypt(JSON.stringify(obj));
      let response = await axios.put(
        api_link.API_LINK + `notice/ad-insights-id`,
        { name: obj },
        { headers: { Authorization: token } }
      );
      response["data"] = JSON.parse(decrypt(response.data.resp));
      this.setState({ currentMonth: this.state.months[month - 1] });
      // const id = this.state.adId;
      // const token = localStorage.getItem("token");
      // const response = await axios.get(
      //   api_link.API_LINK +
      //     `notice/ad-insights/${id}/${day}/${month}/${year}/0`,
      //   { headers: { Authorization: token } }
      // );
      // console.log(response);
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
    const day = date.getDate();
    // const day = d < 10 ? "0" + d : d;
    // const month = value.substring(value.indexOf("-") + 1);
    // const year = value.substring(0, value.indexOf("-"));
    const year = new Date().getFullYear();
    this.setState({ currentMonth: this.state.months[month - 1] });
    // console.log(month, year);
    const id = this.state.adId;
    try {
      var obj = {
        ad_id: id,
        day: day,
        month: month,
        year: year,
        status: 2,
      };
      obj = encrypt(JSON.stringify(obj));
      let response = await axios.put(
        api_link.API_LINK + `notice/ad-insights-id`,
        { name: obj },
        { headers: { Authorization: token } }
      );
      response["data"] = JSON.parse(decrypt(response.data.resp));
      this.setState({ currentMonth: this.state.months[month - 1] });
      // const id = this.state.adId;
      // const token = localStorage.getItem("token");
      // const response = await axios.get(
      //   api_link.API_LINK +
      //     `notice/ad-insights/${id}/${day}/${month}/${year}/2`,
      //   { headers: { Authorization: token } }
      // );
      // console.log(response);
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
        <div id="content" className="main-content">
          <div
            className=""
            style={{ paddingBottom: "30px ", paddingLeft: "30px" }}
          >
            <div className="page-header">
              <div className="page-title">
                <div className="d-flex justify-content-between">
                  <BackButton />
                  <h3 style={{ paddingTop: "8px" }}>
                    Advertiser Ads Insights for {this.props.match.params.name}
                  </h3>
                </div>
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
              <div className="widget widget-table-one">
                <div className="widget-heading">
                  <Link to="/en-admin/dashboard-pending-ads">
                    {" "}
                    <h5 className="">Advertiser ADS</h5>
                  </Link>
                </div>

                <div className="widget-content example d-flex">
                  <div
                    className="table-responsive "
                    style={{ maxheight: "40vh" }}
                  >
                    {this.state.total_ads.length > 0 ? (
                      <table
                        className="table"
                        style={{ textAlign: "center", width: "100%" }}
                        id="mydatatabletotalads"
                      >
                        <thead>
                          <tr>
                            <th>
                              <div className="th-content">Ad File</div>
                            </th>
                            <th>
                              <div className="th-content">Title</div>
                            </th>
                            <th>
                              <div className="th-content">Description</div>
                            </th>

                            {/* <th>
                                  <div className="th-content">Payment Status</div>
                                </th> */}
                            <th>
                              <div className="th-content">Status</div>
                            </th>
                            <th>
                              <div className="th-content">Created At</div>
                            </th>
                            <th>
                              <div className="th-content">Expires At</div>
                            </th>
                            <th>
                              <div className="th-content">Action</div>
                            </th>
                          </tr>
                        </thead>

                        <tbody>
                          {this.state.total_ads &&
                            this.state.total_ads.map((pointer) => (
                              <tr>
                                <td>
                                  <div className="td-content customer-name">
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
                                        <div className="td-content customer-name">
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
                                  <div className="td-content product-brand">
                                    {pointer.title}
                                  </div>
                                </td>
                                <td>
                                  <div className="td-content">
                                    <ToolTipComponent
                                      string={pointer.description}
                                    />
                                  </div>
                                </td>

                                <td>
                                  <div className="td-content">
                                    {pointer.status === "Approved" ? (
                                      <span className="badge outline-badge-success">
                                        Approved
                                      </span>
                                    ) : (
                                      <span className="badge outline-badge-warning">
                                        Expired
                                      </span>
                                    )}
                                  </div>
                                </td>
                                <td>
                                  {reverseDate(
                                    pointer.createdAt.substring(
                                      0,
                                      pointer.createdAt.indexOf("T")
                                    )
                                  )}
                                </td>
                                <td>
                                  {reverseDate(
                                    pointer.expiresAt.substring(
                                      0,
                                      pointer.expiresAt.indexOf("T")
                                    )
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
                        className="m-auto "
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
                <div className="widget widget-table-one">
                  <div className="widget-heading">
                    <Link to="/en-admin/dashboard-pending-ads">
                      {" "}
                      <h5 className="">
                        AD INSIGHTS FOR{" "}
                        {this.state.selectedAdTitle &&
                          this.state.selectedAdTitle}{" "}
                        For {this.state.currentMonth}
                      </h5>
                    </Link>
                  </div>

                  <div className="widget-content">
                    <div
                      className="table-responsive example"
                      style={{ maxheight: "65vh" }}
                    >
                      <div className="row">
                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 layout-spacing mt-2">
                          <div
                            className="d-flex justify-content-between widget-account-invoice-three"
                            style={{
                              background:
                                "linear-gradient(to right, #FFC133 0%, #FF973A 100%)",
                            }}
                          >
                            <div className="mt-2">
                              <span className="text-white">
                                <i className="fas fa-cloud-upload-alt"></i>{" "}
                                Impressions
                              </span>
                            </div>
                            <div className="mt-1">
                              <p className="text-white ">
                                {this.state.total_impressions &&
                                  this.state.total_impressions}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 layout-spacing mt-2">
                          <div className="d-flex justify-content-between widget-account-invoice-six layout-spacing">
                            <div className="mt-2">
                              <span className="text-white">
                                <i className="fas fa-mouse"></i> Clicks
                              </span>
                            </div>
                            <div className="mt-1">
                              <p className="text-white ">
                                {this.state.total_clicks &&
                                  this.state.total_clicks}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 layout-spacing mt-2">
                          <div
                            className="d-flex justify-content-between widget-account-invoice-three"
                            style={{
                              background:
                                "linear-gradient(to right, #FFC133 0%, #FF973A 100%)",
                            }}
                          >
                            <div className="mt-2">
                              <span className="text-white">
                                <i className="fas fa-eye"></i> Views
                              </span>
                            </div>
                            <div className="mt-1">
                              <p className="text-white ">
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
                            <div className="form-check form-check-inline">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="inlineRadioOptions"
                                id="inlineRadio1"
                                value="0"
                                onChange={this.handleFilterChange}
                              />
                              <label
                                className="form-check-label mt-0"
                                for="inlineRadio1"
                              >
                                By Date
                              </label>
                            </div>
                            <div className="form-check form-check-inline">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="inlineRadioOptions"
                                id="inlineRadio2"
                                onChange={this.handleFilterChange}
                                value="1"
                                defaultChecked
                              />
                              <label
                                className="form-check-label  mt-0"
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
                            <div className="form-check form-check-inline">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="inlineRadioOptions1"
                                id="inlineRadio1"
                                value="0"
                                onChange={this.handleChange}
                                defaultChecked
                              />
                              <label
                                className="form-check-label  mt-0"
                                for="inlineRadio1"
                              >
                                Impression
                              </label>
                            </div>
                            <div className="form-check form-check-inline">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="inlineRadioOptions1"
                                id="inlineRadio2"
                                value="1"
                                onChange={this.handleChange}
                              />
                              <label
                                className="form-check-label  mt-0"
                                for="inlineRadio2"
                              >
                                Clicks
                              </label>
                            </div>
                            <div className="form-check form-check-inline">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="inlineRadioOptions1"
                                id="inlineRadio3"
                                value="2"
                                onChange={this.handleChange}
                              />
                              <label
                                className="form-check-label mt-0"
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
            ) : null}
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
        <div
          className="modal fade"
          id="insightShowAd"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">
                  Modal title
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body" style={{ textAlign: "center" }}>
                {this.state.stuffToShowType &&
                this.state.stuffToShowType === "video" ? (
                  <div className="text-center">
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
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  style={{ color: "white", backgroundColor: "#1b55e2" }}
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

export default publisherAdInsights;
