import React, { Component, Suspense } from "react";
import { trackPromise } from "react-promise-tracker";
import { usePromiseTracker } from "react-promise-tracker";
import Loader from "react-promise-loader";
import axios from "axios";
import api_link from "../../config.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import RevenueAreaChart from "./adminDashCharts/revenueAreaCharts";
import "./test.css";
import { Link } from "react-router-dom";
import ToolTipComponent from "./../../utils/tooltipComponent";
import AdminFooter from "./../adminLayout/adminFooter";
import decrypt from "./../../utils/Encryption/Decrypt";
import endpoint from "./../../utils/endpoint";
import errorImage from "./../../Global Image/errorImage";
const RevenueAreaChart = React.lazy(() =>
  import("./adminDashCharts/revenueAreaCharts")
);

class AdminDashboard extends Component {
  state = {
    rjc: [1, 1, 1],
    sandr: [1, 1, 1, 1],
    doubtful: [1, 1, 1],
    data: [],
    show: false,
    pending_publishers: [],
    actualYear: "",
    total_revenue: "",
    graphYear: 2020,
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
  stopClosing = async (e) => {
    e.preventDefault();
    if (Math.floor(Math.random() * 2) === 1) {
      // console.log("success");
      window.$("#dashboardAdView").modal("hide");
      return;
    }
    // console.log("failure");
    return false;
  };
  approveAD = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await trackPromise(
        axios.put(
          api_link.API_LINK + "ads/unblock/" + id,
          {},
          {
            headers: { Authorization: token },
          }
        )
      );
      // console.log(response1);
      const response = await trackPromise(
        axios.get(api_link.API_LINK + "admin/dashboard", {
          headers: { Authorization: token },
        })
      );

      this.setState({
        adsToBeApproved: response["data"]["ads"],
      });
      // console.log(response);
      toast.dark("Ad Approved", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
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
  approve = async (package_id, user_package_id) => {
    // console.log(package_id, user_package_id);
    const token = localStorage.getItem("token");
    const response = await trackPromise(
      axios.put(
        api_link.API_LINK + "notice/user-packages/approve/" + user_package_id,
        {
          package_id: package_id,
        },
        {
          headers: { Authorization: token },
        }
      )
    );
    // console.log(response);
    await trackPromise(
      axios.get(api_link.API_LINK + "admin/dashboard", {
        headers: { Authorization: token },
      })
    );
    this.setState({
      data: response["data"],
    });
    // console.log(response2);
  };
  async componentDidMount() {
    const date = new Date();
    const year = date.getFullYear();
    const m = date.getMonth() + 1;
    const month = m < 10 ? "0" + m : m;
    const token = localStorage.getItem("token");

    var response = await trackPromise(
      axios.get(endpoint + "admin/dashboard", {
        headers: { Authorization: token },
      })
    );

    response["data"] = JSON.parse(decrypt(response["data"]["resp"]));
    // console.log(response);
    const most_popular_ads = response["data"]["most_popular_ads"];

    const sorted_most_popular = []
      .concat(most_popular_ads)
      .sort((a, b) => (a.clicks.length < b.clicks.length ? 1 : -1))
      .slice(0, 5);
    this.setState({
      data: response["data"],
      adsToBeApproved: response["data"]["ads"],
      most_popular_ads: sorted_most_popular,
      total_revenue: response["data"]["total_revenue"],
      graphYear: year,
      graphMonth: month,
    });
    // console.log(response);

    const years = [];
    for (var i = 2020; i < 2050; i++) {
      years.push({ val: i, year: i });
    }
    this.setState({
      show: true,
      currentMonth: this.state.months[m - 1],
      selectYear: years,
    });
  }
  handleYearChange = async ({ currentTarget: input }) => {
    const value = input.value;
    // console.log(value);
    this.setState({ graphYear: value });
  };
  handleMonthChange = async ({ currentTarget: input }) => {
    // const date = new Date();
    const year = this.state.graphYear;
    const value = input.value;
    // console.log(value);
    const gY = this.state.months[parseInt(value)];
    this.setState({
      graphMonth: value,
      graphYear: year,
      actualYear: gY,
      currentMonth: this.state.months[value - 1],
    });
  };
  reverseDate(str) {
    return str.split("-").reverse().join("/");
  }
  render() {
    return (
      <React.Fragment>
        <Loader
          promiseTracker={usePromiseTracker}
          color={"#5c1ac3"}
          background={"rgb(255, 255, 255)"}
        />
        {this.state.show === true ? (
          <React.Fragment>
            <ToastContainer
              position="top-center"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
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
                      <div
                        class="col-xl-4 col-sm-4 py-2"
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          this.props.history.push("/en-admin/dashboard-revenue")
                        }
                      >
                        <div class="card text-white h-100">
                          <div
                            class="card-body"
                            style={{ background: "#c2d5ff" }}
                          >
                            <div class="rotate">
                              <i
                                class="fas fa-coins"
                                style={{ color: "#1b55e2", fontSize: "40px" }}
                              ></i>
                            </div>
                            <h4
                              class="text-uppercase pt-2"
                              style={{ fontSize: "26px", fontWeight: "500" }}
                            >
                              REVENUE
                            </h4>
                            <h3
                              class="display-4"
                              style={{ fontSize: "35px", fontWeight: "400" }}
                            >
                              {this.state.total_revenue} SAR
                            </h3>
                          </div>
                        </div>
                      </div>
                      <div class="col-xl-4 col-sm-4 py-2">
                        <div
                          class="card  text-white h-100"
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            this.props.history.push("/en-admin/aUsers")
                          }
                        >
                          <div
                            class="card-body "
                            style={{ background: "#ffe1e2" }}
                          >
                            <div class="rotate">
                              <i
                                class="fas fa-globe "
                                style={{ color: "#e7515a", fontSize: "40px" }}
                              ></i>
                            </div>
                            <h4
                              class="text-uppercase pt-2"
                              style={{ fontSize: "26px", fontWeight: "500" }}
                            >
                              REGISTERED USERS
                            </h4>
                            <h3
                              class="display-4"
                              style={{ fontSize: "35px", fontWeight: "400" }}
                            >
                              {this.state.data.active_users_count}
                            </h3>
                          </div>
                        </div>
                      </div>
                      <div class="col-xl-4 col-sm-4 py-2">
                        <div
                          class="card  text-white h-100"
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            this.props.history.push(
                              "/en-admin/dashboard-pending-requests"
                            )
                          }
                        >
                          <div
                            class="card-body "
                            style={{ background: "#e6ffbf" }}
                          >
                            <div class="rotate">
                              <i
                                class="fas fa-hourglass-half "
                                style={{ color: "#8dbf42", fontSize: "40px" }}
                              ></i>
                            </div>
                            <h4
                              class="text-uppercase pt-2"
                              style={{ fontSize: "26px", fontWeight: "500" }}
                            >
                              PENDING PACKAGES
                            </h4>
                            <h3
                              class="display-4"
                              style={{ fontSize: "35px", fontWeight: "400" }}
                            >
                              {this.state.data.recent_package_requests.length}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row analytics"></div>

                <div class="row sales">
                  <div class="col-xl-6 col-lg-12 col-md-12 col-sm-12 col-12 layout-spacing">
                    <div
                      class="widget widget-table-two"
                      // style={{ height: "499px" }}
                    >
                      <div class="widget-heading">
                        <h5 class="" className="">
                          Revenue for {this.state.currentMonth},{" "}
                          {this.state.graphYear}
                        </h5>
                      </div>
                      <div className="widget-content">
                        <div className="row">
                          <div className="col-md-5 ml-auto">
                            {/* <input
                              type="month"
                              className="form-control "
                              onChange={this.handleMonthChange}
                            />{" "} */}
                            <select
                              className="form-control "
                              onChange={this.handleMonthChange}
                            >
                              <option>Select Month..</option>
                              {this.state.selectMonth.map((pointer) => (
                                <option value={pointer.val}>
                                  {pointer.month}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="col-md-5 ml-auto">
                            {/* <input
                              type="month"
                              className="form-control "
                              onChange={this.handleMonthChange}
                            />{" "} */}
                            <select
                              className="form-control "
                              onChange={this.handleYearChange}
                            >
                              <option>Select Year..</option>
                              {this.state.selectYear.map((pointer) => (
                                <option value={pointer.val}>
                                  {pointer.year}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                      <div>
                        <Suspense fallback={<div></div>}>
                          <RevenueAreaChart
                            month={this.state.graphMonth}
                            year={this.state.graphYear}
                            selectedMonth={this.state.actualYear}
                          />
                        </Suspense>
                      </div>
                    </div>
                  </div>
                  {/* <div class="col-xl-6 col-lg-12 col-md-12 col-sm-12 col-12 layout-spacing">
                    <div class="widget widget-table-two">
                      <div class="widget-heading">
                        <h5 class="">Revenue By User Comparison</h5>
                      </div>
                      <RevenueLineChartMonthly />
                    </div>
                  </div> */}
                  <div class="col-xl-6 col-lg-12 col-md-12 col-sm-12 col-12 layout-spacing">
                    <div class="widget widget-table-one">
                      <div class="widget-heading">
                        <Link
                          to="/en-admin/dashboard-pending-requests"
                          className="h5"
                        >
                          <b> Advertisers Packages Request</b>
                        </Link>
                      </div>

                      <div class="widget-content">
                        <div
                          class="table-responsive example d-flex"
                          style={{ minHeight: "412px" }}
                        >
                          {this.state.data.recent_package_requests < 1 ? (
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
                          ) : (
                            <table
                              class="table"
                              style={{ textAlign: "center" }}
                            >
                              <thead>
                                <tr>
                                  <th>
                                    <div class="th-content">User Name</div>
                                  </th>
                                  <th>
                                    <div class="th-content">Request Date</div>
                                  </th>
                                  <th>
                                    <div class="th-content">Package Name</div>
                                  </th>

                                  <th>
                                    <div class="th-content">Status</div>
                                  </th>
                                  <th>
                                    {" "}
                                    <div
                                      class="th-content"
                                      style={{ textAlign: "center" }}
                                    >
                                      Action
                                    </div>
                                  </th>
                                </tr>
                              </thead>

                              <tbody>
                                {this.state.data.recent_package_requests.map(
                                  (pointer) => (
                                    <tr>
                                      <td>
                                        <div class="td-content customer-name">
                                          {pointer.user_name}
                                        </div>
                                      </td>
                                      <td>
                                        <div class="td-content product-brand">
                                          {this.reverseDate(
                                            pointer.createdAt.substring(
                                              0,
                                              pointer.createdAt.indexOf("T")
                                            )
                                          )}
                                        </div>
                                      </td>
                                      <td>
                                        <div class="td-content">
                                          {pointer.package_name}
                                        </div>
                                      </td>

                                      <td>
                                        <div class="td-content">
                                          <span class="badge outline-badge-danger">
                                            {pointer.status === "Pending" &&
                                              "Pending"}
                                          </span>
                                        </div>
                                      </td>
                                      <td>
                                        {/* <button
                                          className="btn btn-md btn-outline-secondary"
                                          onClick={() =>
                                            this.approve(
                                              pointer.package_id,
                                              pointer._id
                                            )
                                          }
                                        >
                                          Approve Request
                                        </button> */}
                                        <button
                                          className="btn btn-md btn-outline-secondary"
                                          onClick={() =>
                                            this.props.history.push(
                                              `/en-admin/publisher-detail/${pointer.user_id}`
                                            )
                                          }
                                        >
                                          Show Advertiser
                                        </button>
                                      </td>
                                    </tr>
                                  )
                                )}
                              </tbody>
                            </table>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="col-xl-6 col-lg-12 col-md-12 col-sm-12 col-12 layout-spacing">
                    <div class="widget widget-table-one">
                      <div class="widget-heading">
                        <Link to="/en-admin/dashboard-pending-ads">
                          {" "}
                          <h5 class="">Ads Request with Pending Approval</h5>
                        </Link>
                      </div>

                      <div class="widget-content">
                        <div
                          class="table-responsive example d-flex"
                          style={{ height: "55vh" }}
                        >
                          {this.state.adsToBeApproved.length < 1 ? (
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
                          ) : (
                            <table
                              class="table"
                              style={{ textAlign: "center" }}
                            >
                              <thead>
                                <tr>
                                  <th>
                                    <div class="th-content">File</div>
                                  </th>
                                  <th>
                                    <div class="th-content">Title</div>
                                  </th>
                                  <th>
                                    <div class="th-content">Description</div>
                                  </th>

                                  {/* <th>
                                  <div class="th-content">Payment Status</div>
                                </th> */}
                                  <th>
                                    <div class="th-content">Status</div>
                                  </th>
                                  <th>
                                    <div class="th-content">Action</div>
                                  </th>
                                </tr>
                              </thead>

                              <tbody>
                                {this.state.adsToBeApproved &&
                                  this.state.adsToBeApproved.map((pointer) => (
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
                                              data-target="#dashboardAdView"
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
                                                  data-target="#dashboardAdView"
                                                  src={
                                                    api_link.GET_IMAGE +
                                                    `${pointer.file}`
                                                  }
                                                  onClick={() =>
                                                    this.setState({
                                                      stuffToShow: pointer.file,
                                                      stuffToShowType:
                                                        pointer.type,
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
                                          {" "}
                                          <ToolTipComponent
                                            string={pointer.description}
                                          />
                                        </div>
                                      </td>

                                      <td>
                                        <div class="td-content">
                                          <span class="badge outline-badge-warning">
                                            {pointer.status === "Pending" &&
                                              "Pending"}
                                          </span>
                                        </div>
                                      </td>
                                      <td>
                                        <button
                                          className="btn btn-md btn-outline-secondary"
                                          // onClick={() =>
                                          //   this.approveAD(pointer._id)
                                          // }
                                          onClick={() =>
                                            this.props.history.push(
                                              "/en-admin/dashboard-pending-ads"
                                            )
                                          }
                                        >
                                          Show Detail
                                        </button>
                                      </td>
                                    </tr>
                                  ))}
                              </tbody>
                            </table>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-6 col-lg-12 col-md-12 col-sm-12 col-12 layout-spacing">
                    <div class="widget widget-table-one">
                      <div class="widget-heading">
                        <Link to="/en-admin/dashboard-popular-ads">
                          {" "}
                          <h5 class="">
                            Most Popular Ads Based on Clicks Overall
                          </h5>
                        </Link>
                      </div>

                      <div class="widget-content">
                        <div
                          class="table-responsive d-flex"
                          style={{ height: "55vh", overflowX: "auto" }}
                        >
                          {this.state.most_popular_ads.length < 1 ? (
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
                          ) : (
                            <table class="table">
                              <thead>
                                <tr>
                                  <th>
                                    <div class="th-content">File</div>
                                  </th>
                                  <th>
                                    <div class="th-content">Title</div>
                                  </th>
                                  <th>
                                    <div class="th-content">Description</div>
                                  </th>
                                  {/* <th>
                                    <div class="th-content">Link</div>
                                  </th> */}
                                  {/* <th>
                                    <div class="th-content">Date</div>
                                  </th> */}
                                  <th>
                                    <div class="th-content">Clicks</div>
                                  </th>
                                  {/* <th>
                                  <div class="th-content">Views</div>
                                </th> */}
                                  {/* <th>
                                  <div class="th-content">Type</div>
                                </th> */}
                                  {/* <th>
                                    <div class="th-content">Status</div>
                                  </th> */}
                                </tr>
                              </thead>
                              <tbody>
                                {this.state.most_popular_ads &&
                                  this.state.most_popular_ads.map((pointer) => (
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
                                              data-target="#dashboardAdView"
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
                                                  data-target="#dashboardAdView"
                                                  src={
                                                    api_link.GET_IMAGE +
                                                    `${pointer.file}`
                                                  }
                                                  onClick={() =>
                                                    this.setState({
                                                      stuffToShow: pointer.file,
                                                      stuffToShowType:
                                                        pointer.type,
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
                                          <ToolTipComponent
                                            string={pointer.description}
                                          />
                                        </div>
                                      </td>
                                      {/* <td>
                                        <div class="td-content">
                                          <a
                                            href={"//" + pointer.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                          >
                                            Click To View
                                          </a>
                                        </div>
                                      </td> */}
                                      {/* <td>
                                        <div class="td-content">
                                          {this.reverseDate(
                                            pointer.createdAt.substring(
                                              0,
                                              pointer.createdAt.indexOf("T")
                                            )
                                          )}
                                        </div>
                                      </td> */}
                                      <td>
                                        <div class="td-content">
                                          <span class="badge outline-badge-primary">
                                            {pointer.clicks.length}
                                          </span>
                                        </div>
                                      </td>

                                      {/* <td>
                                      <div class="td-content">
                                        <span class="badge outline-badge-success">
                                          {pointer.type === "video"
                                            ? "Video"
                                            : "Image"}
                                        </span>
                                      </div>
                                    </td> */}
                                      {/* <td>
                                        <div class="td-content">
                                          {pointer.status === "Approved" ? (
                                            <span class="badge outline-badge-success">
                                              Approved
                                            </span>
                                          ) : null}
                                          {pointer.status === "Expired" ? (
                                            <span class="badge outline-badge-dark">
                                              Expired
                                            </span>
                                          ) : null}
                                          {pointer.status === "Pending" ? (
                                            <span class="badge outline-badge-warning">
                                              Pending
                                            </span>
                                          ) : null}
                                          {pointer.status === "Blocked" ? (
                                            <span class="badge outline-badge-dark">
                                              Blocked
                                            </span>
                                          ) : null}
                                        </div>
                                      </td> */}
                                    </tr>
                                  ))}
                              </tbody>
                            </table>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <AdminFooter />
            </div>
          </React.Fragment>
        ) : null}
        <div
          class="modal fade"
          id="dashboardAdView"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
          data-backdrop="static"
        >
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">
                  Your Ad View
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
                      loop
                      mute
                      style={{ height: "40vh", width: "40vh" }}
                      controls
                      onClick={(e) => e.preventDefault()}
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

export default AdminDashboard;
