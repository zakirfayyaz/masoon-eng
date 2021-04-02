import React, { Component, Suspense } from "react";
// import MonthlyClicksGraph from "./graphs/monthlyClicksGraph";
// import ClicksVsViews from "./graphs/clicksVsViews";
// import AgeComparisonGraph from "./graphs/ageComparisonGraph";
// import ConsumedPackagesGraph from "./graphs/consumedPackagesGraph";
import MostViewed from "./tables/mostViewed";
import MostClickedTable from "./tables/mostClicked";
import axios from "axios";
import api_link from "../../config.json";
import "./adinsights.css";
import { trackPromise } from "react-promise-tracker";

import capitalizeFirstLetter from "./../../utils/first-capital";
import decrypt from "./../../utils/Encryption/Decrypt";
const MonthlyClicksGraph = React.lazy(() =>
  import("./graphs/monthlyClicksGraph")
);
const ConsumedPackagesGraph = React.lazy(() =>
  import("./graphs/consumedPackagesGraph")
);
class AdsInsights extends Component {
  state = {
    impressions: "",
    id: 0,
    clicks: "",
    views: "",
    ads: [],
    basic: "",
    standard: "",
    premium: "",
    most_clicked: [],
    most_viewed: [],
    graphHeading: "Impressions",
    graphMonth: "",
    graphYear: "",
    total_revenue: "",
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
    currentMonth: "",
    selectYears: [],
    mostClickMonth: "",
    mostViewMonth: "",
    mostClickedYear: new Date().getFullYear(),
    mostViewYear: new Date().getFullYear(),
    packages_with_insights: [],
  };
  componentDidMount = async () => {
    const date = new Date();
    const year = date.getFullYear();
    this.setState({ graphYear: year });
    const m = date.getMonth() + 1;
    const month = m < 10 ? "0" + m : m;
    const token = localStorage.getItem("token");
    this.setState({
      currentMonth: this.state.months[m - 1],
      mostClickMonth: this.state.months[m - 1],
      mostViewMonth: this.state.months[m - 1],
    });
    //console.log("1st", month, year);
    var response = await trackPromise(
      axios.get(
        api_link.API_LINK +
          `admin/users/publisher/ad-insights/all/${month}/${year}`,
        {
          headers: { Authorization: token },
        }
      )
    );
    response["data"] = JSON.parse(decrypt(response.data.resp));
    //console.log(response);
    const ads = response["data"]["ads_with_insights_counts"];
    const sortByClicks = []
      .concat(ads)
      .sort((a, b) => (a.total_clicks < b.total_clicks ? 1 : -1));
    const sortByViews = []
      .concat(ads)
      .sort((a, b) => (a.total_views < b.total_views ? 1 : -1));
    //console.log(sortByClicks.slice(0, 5), sortByViews.slice(0, 5));
    this.setState({
      impressions: response["data"]["overall_impressions"],
      clicks: response["data"]["overall_clicks"],
      views: response["data"]["overall_views"],
      ads: ads,
      // basic: response["data"]["basic"],
      // standard: response["data"]["standard"],
      // premium: response["data"]["premium"],
      packages_with_insights: response["data"]["packages_with_insights"],
      most_viewed: sortByViews.slice(0, 5),
      most_clicked: sortByClicks.slice(0, 5),
      graphData: response["data"]["count_with_eactDay"],
      graphMonth: month,
      graphYear: year,
      total_revenue: response["data"]["total_revenue"],
    });

    var years = [];
    for (var i = 2020; i <= 2050; i++) {
      years.push({ val: i, years: i });
    }
    this.setState({ selectYears: years });
  };
  handleChange = async ({ currentTarget: input }) => {
    const value = parseInt(input.value);
    if (value === 0) {
      this.setState({ graphHeading: "Impressions", id: 0 });
    } else if (value === 1) {
      this.setState({ graphHeading: "Clicks", id: 1 });
    } else if (value === 2) {
      this.setState({ graphHeading: "Views", id: 2 });
    }
  };
  handleMonthChange = async ({ currentTarget: input }) => {
    const month = input.value;
    // //console.log(value);
    // const month = value.substring(value.indexOf("-") + 1);
    // const year = value.substring(0, value.indexOf("-"));
    this.setState({
      currentMonth: capitalizeFirstLetter(this.state.months[month - 1]),
    });

    const year = this.state.graphYear;
    //console.log(month, year);
    this.setState({ graphMonth: month, graphYear: year });
  };
  handleYearChange = async ({ currentTarget: input }) => {
    const year = input.value;

    this.setState({ graphYear: year });
  };
  handleMMChange = async ({ currentTarget: input }) => {
    const token = localStorage.getItem("token");
    const month = input.value;
    this.setState({
      mostClickMonth: month,
    });
    const year = this.state.mostClickedYear;
    //console.log("2nd", month, year);
    const response = await axios.get(
      api_link.API_LINK +
        `admin/users/publisher/ad-insights/all/${month}/${year}`,
      {
        headers: { Authorization: token },
      }
    );
    response["data"] = JSON.parse(decrypt(response.data.resp));
    // //console.log(response);
    const ads = response["data"]["ads_with_insights_counts"];
    const sortByClicks = []
      .concat(ads)
      .sort((a, b) => (a.total_clicks < b.total_clicks ? 1 : -1));
    this.setState({ most_clicked: sortByClicks.slice(0, 5) });
  };
  handleMYChange = async ({ currentTarget: input }) => {
    const token = localStorage.getItem("token");
    const year = input.value;
    this.setState({
      mostClickedYear: year,
    });
    const month = this.state.mostClickMonth;
    //console.log("3rd", month, year);
    const response = await axios.get(
      api_link.API_LINK +
        `admin/users/publisher/ad-insights/all/${month}/${year}`,
      {
        headers: { Authorization: token },
      }
    );

    // //console.log(response);
    response["data"] = JSON.parse(decrypt(response.data.resp));
    const ads = response["data"]["ads_with_insights_counts"];
    const sortByClicks = []
      .concat(ads)
      .sort((a, b) => (a.total_clicks < b.total_clicks ? 1 : -1));
    this.setState({ most_clicked: sortByClicks.slice(0, 5) });
  };
  handleMMVChange = async ({ currentTarget: input }) => {
    const token = localStorage.getItem("token");
    const month = input.value;
    //console.log(month);
    this.setState({
      mostViewMonth: month,
    });
    const year = this.state.mostViewYear;
    //console.log("4th", month, year);
    const response = await axios.get(
      api_link.API_LINK +
        `admin/users/publisher/ad-insights/all/${month}/${year}`,
      {
        headers: { Authorization: token },
      }
    );
    response["data"] = JSON.parse(decrypt(response.data.resp));
    // //console.log(response);
    const ads = response["data"]["ads_with_insights_counts"];
    const sortByViews = []
      .concat(ads)
      .sort((a, b) => (a.total_views < b.total_views ? 1 : -1));
    this.setState({ most_viewed: sortByViews.slice(0, 5) });
  };
  handleMYVChange = async ({ currentTarget: input }) => {
    const token = localStorage.getItem("token");
    const year = input.value;
    this.setState({
      mostViewYear: year,
    });
    const month = this.state.mostViewMonth;
    //console.log("5th", month, year);
    const response = await axios.get(
      api_link.API_LINK +
        `admin/users/publisher/ad-insights/all/${month}/${year}`,
      {
        headers: { Authorization: token },
      }
    );
    response["data"] = JSON.parse(decrypt(response.data.resp));
    // console.log(response);
    const ads = response["data"]["ads_with_insights_counts"];
    const sortByViews = []
      .concat(ads)
      .sort((a, b) => (a.total_views < b.total_views ? 1 : -1));
    this.setState({ most_viewed: sortByViews.slice(0, 5) });
  };
  render() {
    return (
      <React.Fragment>
        {/* <Loader
          promiseTracker={usePromiseTracker}
          color={"#5c1ac3"}
          background={"rgb(255, 255, 255)"}
        /> */}
        <div id="content" class="main-content">
          <div class="layout-px-spacing">
            <div class="page-header">
              <div class="page-title">
                <h3>Ads Insights</h3>
              </div>
            </div>

            <div class="row layout-spacing">
              {/* Content */}
              <div class="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-12 layout-spacing mt-2">
                <div
                  class="d-flex justify-content-between widget-account-invoice-six layout-spacing"
                  style={{ cursor: "pointer", height: "87px" }}
                  onClick={() =>
                    this.props.history.push("/en-admin/dashboard-revenue")
                  }
                >
                  <div class="mt-2">
                    <span class="text-white">
                      <i class="fas fa-donate"></i> Revenue(SAR)
                    </span>
                  </div>
                  <div class="mt-1">
                    <p
                      class="text-white "
                      style={{ marginTop: "5px", marginBottom: "0px" }}
                    >
                      {this.state.total_revenue}
                    </p>
                  </div>
                </div>
              </div>
              <div class="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-12 layout-spacing mt-2">
                <div
                  class="d-flex justify-content-between widget-account-invoice-three"
                  style={{
                    background:
                      "linear-gradient(to right, #FFC133 0%, #FF973A 100%)",
                    cursor: "pointer",
                    height: "87px",
                  }}
                  onClick={() =>
                    this.props.history.push("/en-admin/ads-insights-cvi/1")
                  }
                >
                  <div class="mt-2">
                    <span class="text-white">
                      <i class="fas fa-cloud-upload-alt"></i> Impressions
                    </span>
                  </div>
                  <div class="mt-1">
                    <p
                      class="text-white "
                      style={{ marginTop: "5px", marginBottom: "0px" }}
                    >
                      {this.state.impressions}
                    </p>
                  </div>
                </div>
              </div>
              <div class="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-12 layout-spacing mt-2">
                <div
                  class="d-flex justify-content-between widget-account-invoice-six layout-spacing"
                  style={{ cursor: "pointer", height: "87px" }}
                  onClick={() =>
                    this.props.history.push("/en-admin/ads-insights-cvi/2")
                  }
                >
                  <div class="mt-2">
                    <span class="text-white">
                      <i class="fas fa-mouse"></i> Clicks
                    </span>
                  </div>
                  <div class="mt-1">
                    <p
                      class="text-white "
                      style={{ marginTop: "5px", marginBottom: "0px" }}
                    >
                      {this.state.clicks}
                    </p>
                  </div>
                </div>
              </div>
              <div class="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-12 layout-spacing mt-2">
                <div
                  class="d-flex justify-content-between widget-account-invoice-three"
                  style={{
                    background:
                      "linear-gradient(to right, #FFC133 0%, #FF973A 100%)",
                    cursor: "pointer",
                    height: "87px",
                  }}
                  onClick={() =>
                    this.props.history.push("/en-admin/ads-insights-cvi/3")
                  }
                >
                  <div class="mt-2">
                    <span class="text-white">
                      <i class="fas fa-eye"></i> Views
                    </span>
                  </div>
                  <div class="mt-1">
                    <p
                      class="text-white "
                      style={{ marginTop: "5px", marginBottom: "0px" }}
                    >
                      {this.state.views}
                    </p>
                  </div>
                </div>
              </div>
              {/*Graphs*/}
            </div>
            <div className="row">
              <div class="col-xl-6 col-md-12  layout-spacing ">
                <div
                  class="widget widget-chart-two"
                  style={{ maxheight: "356px" }}
                >
                  <div class="widget-heading">
                    <h5 class="">
                      Monthly {this.state.graphHeading} for{" "}
                      {this.state.months[this.state.graphMonth - 1]},{" "}
                      {this.state.graphYear}
                    </h5>
                  </div>
                  <div
                    className="row p-2"
                    // style={{ textAlign: "center" }}
                  >
                    <div
                      className="col-md-12 mb-1"
                      style={{ textAlign: "center" }}
                    >
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="inlineRadioOptions"
                          id="inlineRadio1"
                          value="0"
                          onChange={this.handleChange}
                          defaultChecked
                        />
                        <label class="form-check-label mt-0" for="inlineRadio1">
                          Impression
                        </label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="inlineRadioOptions"
                          id="inlineRadio2"
                          value="1"
                          onChange={this.handleChange}
                        />
                        <label class="form-check-label mt-0" for="inlineRadio2">
                          Clicks
                        </label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="inlineRadioOptions"
                          id="inlineRadio3"
                          value="2"
                          onChange={this.handleChange}
                        />
                        <label class="form-check-label mt-0" for="inlineRadio3">
                          Views
                        </label>
                      </div>
                    </div>

                    <div
                      className="col-md-6 mt-1"
                      style={{ textAlign: "center" }}
                    >
                      <select
                        className="form-control pr-3"
                        onChange={this.handleMonthChange}
                      >
                        <option>Select Month...</option>
                        {this.state.selectMonth.map((pointer) => (
                          <option value={pointer.val}>{pointer.month}</option>
                        ))}
                      </select>
                    </div>
                    <div
                      className="col-md-6 mt-1"
                      style={{ textAlign: "center" }}
                    >
                      <select
                        className="form-control pr-3"
                        onChange={this.handleYearChange}
                      >
                        <option>Select Year...</option>
                        {this.state.selectYears.map((pointer) => (
                          <option value={pointer.val}>{pointer.years}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div class="widget-content" style={{ height: "375px" }}>
                    <Suspense fallback={<div></div>}>
                      <MonthlyClicksGraph
                        id={this.state.id}
                        month={this.state.graphMonth}
                        year={this.state.graphYear}
                      />
                    </Suspense>
                  </div>
                </div>
              </div>
              <div class="col-xl-6 col-md-12  layout-spacing ">
                <div
                  class="widget widget-chart-two"
                  style={{ height: "528px" }}
                >
                  <div class="widget-heading">
                    <h5 class="">
                      Ads Packages consumed in Percentage % Overall
                    </h5>
                  </div>
                  <div class="widget-content">
                    <Suspense fallback={<div></div>}>
                      <ConsumedPackagesGraph
                        data={this.state.packages_with_insights}
                      />
                    </Suspense>
                  </div>
                </div>
              </div>

              <div class="col-xl-6 col-md-12  layout-spacing ">
                <div
                  class="widget widget-chart-two "
                  style={{ height: "650px" }}
                >
                  <div class="widget-heading">
                    <div className="d-flex justify-content-between">
                      <h5 class="">
                        Most Clicked Ads{" "}
                        {
                          this.state.months[
                            parseInt(this.state.mostClickMonth) - 1
                          ]
                        }{" "}
                        {this.state.mostClickedYear}
                      </h5>
                    </div>
                    <div className="row mt-1">
                      <div
                        className="col-md-6 m-auto"
                        style={{ textAlign: "center" }}
                      >
                        <select
                          className="form-control pr-3"
                          onChange={this.handleMMChange}
                        >
                          <option>Select Month...</option>
                          {this.state.selectMonth.map((pointer) => (
                            <option value={pointer.val}>{pointer.month}</option>
                          ))}
                        </select>
                      </div>
                      <div
                        className="col-md-6 m-auto"
                        style={{ textAlign: "center" }}
                      >
                        <select
                          className="form-control pr-3"
                          onChange={this.handleMYChange}
                        >
                          <option>Select Year...</option>
                          {this.state.selectYears.map((pointer) => (
                            <option value={pointer.val}>{pointer.years}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="widget-content p-2">
                    <MostClickedTable data={this.state.most_clicked} />
                  </div>
                </div>
              </div>

              <div class="col-xl-6 col-md-12  layout-spacing ">
                <div
                  class="widget widget-chart-two"
                  style={{ height: "650px" }}
                >
                  <div class="widget-heading">
                    <h5 class="">
                      Most Viewed Ads{" "}
                      {
                        this.state.months[
                          parseInt(this.state.mostViewMonth) - 1
                        ]
                      }{" "}
                      {this.state.mostViewYear}
                    </h5>
                    <div className="row mt-1">
                      <div
                        className="col-md-6 m-auto"
                        style={{ textAlign: "center" }}
                      >
                        <select
                          className="form-control pr-3"
                          onChange={this.handleMMVChange}
                        >
                          <option>Select Month...</option>
                          {this.state.selectMonth.map((pointer) => (
                            <option value={pointer.val}>{pointer.month}</option>
                          ))}
                        </select>
                      </div>
                      <div
                        className="col-md-6 m-auto"
                        style={{ textAlign: "center" }}
                      >
                        <select
                          className="form-control pr-3"
                          onChange={this.handleMYVChange}
                        >
                          <option>Select Year...</option>
                          {this.state.selectYears.map((pointer) => (
                            <option value={pointer.val}>{pointer.years}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="widget-content p-2">
                    <MostViewed data={this.state.most_viewed} />
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
      </React.Fragment>
    );
  }
}

export default AdsInsights;
