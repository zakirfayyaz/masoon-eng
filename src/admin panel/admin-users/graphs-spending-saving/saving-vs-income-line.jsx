import ReactApexChart from "react-apexcharts";
import React, { Component } from "react";
import axios from "axios";
import api_link from "../../../config.json";
import encrypt from "./../../../utils/Encryption/Encrypt";
import decrypt from "./../../../utils/Encryption/Decrypt";
import errorImage from "./../../../Global Image/errorImage";

class SavingVsIncomeLine extends Component {
  state = {
    currentMonth: "",
    currentYear: 0,
    currentMonthNo: "",
    months: [
      "Months..",
      "january",
      "february",
      "march",
      "april",
      "may",
      "june",
      "july",
      "august",
      "september",
      "october",
      "november",
      "december",
    ],
    show: false,

    series: [],
    options: {
      chart: {
        width: 380,
        type: "donut",
      },
      dataLabels: {
        enabled: true,
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 300,
            },
            legend: {
              show: false,
            },
          },
        },
      ],
      legend: {
        position: "right",
        offsetY: 0,
        height: 150,
        width: 170,
      },
    },
  };
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  componentDidMount = async () => {
    const date = new Date();
    this.setState({ currentYear: date.getFullYear() });
    setTimeout(() => {
      this.getData();
    }, 1000);
    var years = [];
    for (var i = 2019; i <= 2050; i++) {
      years.push({ val: i, years: i });
    }
    this.setState({ selectYears: years });
  };
  getData = async () => {
    const months = [
      "0",
      "january",
      "february",
      "march",
      "april",
      "may",
      "june",
      "july",
      "august",
      "sepember",
      "october",
      "november",
      "december",
    ];
    const date = new Date();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    // console.log(month, year);
    const token = localStorage.getItem("token");
    const monthNumber = months[month];
    this.setState({ currentMonth: this.state.months[month] });

    try {
      var obj1 = {
        month: monthNumber,
        year: year,
        user_id: this.props.user_id,
      };
      obj1 = encrypt(JSON.stringify(obj1));
      var response = await axios.put(
        api_link.API_LINK + `income/savings/budget-id`,
        { name: obj1 },
        { headers: { Authorization: token } }
      );
      response["data"] = JSON.parse(decrypt(response["data"]["resp"]));
      // const response = await axios.get(
      //   api_link.API_LINK +
      //     `income/savings/budget/${monthNumber}/${year}/${this.props.user_id}`,
      //   { headers: { Authorization: token } }
      // );
      const data = response["data"]["budget_with_savings"];
      // console.log("SVB", data);
      const budgets = [];
      const saved = [];

      for (var i = 0; i < data.length; i++) {
        budgets.push(data[i].budget);
        saved.push(
          parseInt((data[i].saving / response.data.total_income) * 100)
        );
      }
      // console.log("budgets", budgets, "saved", saved);
      const thisState = { ...this.state };
      thisState.options.labels = budgets;
      //thisState.series = saved;
      this.setState({ series: saved, show: true });
    } catch (e) {
      // console.log(e);
    }
  };

  handleMonthChange = async (event) => {
    var selectedMonth = event.currentTarget.value;
    this.setState({ show: false, currentMonth: selectedMonth });
    const token = localStorage.getItem("token");
    try {
      var obj1 = {
        month: selectedMonth,
        year: this.state.currentYear,
        user_id: this.props.user_id,
      };
      obj1 = encrypt(JSON.stringify(obj1));
      var response = await axios.put(
        api_link.API_LINK + `income/savings/budget-id`,
        { name: obj1 },
        { headers: { Authorization: token } }
      );
      response["data"] = JSON.parse(decrypt(response["data"]["resp"]));
      // const response = await axios.get(
      //   api_link.API_LINK +
      //     `income/savings/budget/${selectedMonth}/${this.state.currentYear}/${this.props.user_id}`,
      //   { headers: { Authorization: token } }
      // );
      const data = response["data"]["budget_with_savings"];
      const budgets = [];
      const saved = [];

      for (var i = 0; i < data.length; i++) {
        budgets.push(data[i].budget);
        saved.push(
          parseInt((data[i].saving / response.data.total_income) * 100)
        );
      }
      // console.log("budgets", budgets, "saved", saved);
      const thisState = { ...this.state };
      thisState.options.labels = budgets;
      //thisState.series = saved;
      this.setState({ series: saved, show: true });
    } catch (e) {
      // console.log(e);
    }
    this.setState({ show: true });
  };
  handleYearChange = async (event) => {
    var year = event.currentTarget.value;
    this.setState({ show: false, currentYear: year });
    const token = localStorage.getItem("token");
    try {
      var obj1 = {
        month: this.state.currentMonth,
        year: year,
        user_id: this.props.user_id,
      };
      obj1 = encrypt(JSON.stringify(obj1));
      var response = await axios.put(
        api_link.API_LINK + `income/savings/budget-id`,
        { name: obj1 },
        { headers: { Authorization: token } }
      );
      response["data"] = JSON.parse(decrypt(response["data"]["resp"]));
      // const response = await axios.get(
      //   api_link.API_LINK +
      //     `income/savings/budget/${this.state.currentMonth}/${year}/${this.props.user_id}`,
      //   { headers: { Authorization: token } }
      // );
      const data = response["data"]["budget_with_savings"];
      const budgets = [];
      const saved = [];

      for (var i = 0; i < data.length; i++) {
        budgets.push(data[i].budget);
        saved.push(
          parseInt((data[i].saving / response.data.total_income) * 100)
        );
      }
      // console.log("budgets", budgets, "saved", saved);
      const thisState = { ...this.state };
      thisState.options.labels = budgets;
      //thisState.series = saved;
      this.setState({ series: saved, show: true });
    } catch (e) {
      // console.log(e);
    }
    this.setState({ show: true });
  };
  render() {
    return (
      <React.Fragment>
        {this.state.show === true ? (
          <div
            class="statbox widget box box-shadow mb-3"
            style={{
              height: "460px",
              paddingLeft: "0px",
              paddingRight: "0px",
            }}
          >
            <div class="widget-header mb-1">
              <div className="row">
                <div className="col-md-6">
                  <h4>
                    {" "}
                    % Savings Vs Income for{" "}
                    {this.capitalizeFirstLetter(this.state.currentMonth)},{" "}
                    {this.state.currentYear}
                  </h4>
                </div>
                <div
                  className="col-md-3 py-auto"
                  style={{ textAlign: "right" }}
                >
                  <select
                    className="form-control col-md-12 m-auto"
                    onChange={this.handleMonthChange}
                  >
                    {this.state.months.map((pointer) => (
                      <option value={pointer}>{pointer}</option>
                    ))}
                  </select>
                </div>
                <div
                  className="col-md-3 py-auto"
                  style={{ textAlign: "right" }}
                >
                  <select
                    className="form-control col-md-12 m-auto"
                    onChange={this.handleYearChange}
                  >
                    <option>Year...</option>
                    {this.state.selectYears.map((pointer) => (
                      <option value={pointer.val}>{pointer.years}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            {this.state.series.length > 0 ? (
              <div class="">
                <div className="row">
                  <div className="col-md-12">
                    <div id="chart">
                      <ReactApexChart
                        options={this.state.options}
                        series={this.state.series}
                        type="donut"
                        height={300}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="d-flex">
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
        ) : null}
      </React.Fragment>
    );
  }
}

export default SavingVsIncomeLine;
