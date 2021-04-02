import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";
import axios from "axios";
import api_link from "../../../config.json";
import decrypt from "./../../../utils/Encryption/Decrypt";
import errorImage from "./../../../Global Image/errorImage";
class IncomeRelatedPie2 extends Component {
  state = {
    currentMonth: "",
    selectYears: [],
    selectYear: "",
    show: false,
    months: [
      "Month...",
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
    series: [],
    options: {
      chart: {
        width: 100,
        type: "donut",
      },
      dataLabels: {
        enabled: true,
      },
      responsive: [
        {
          breakpoint: 425,
          options: {
            chart: {
              width: 300,
            },
            legend: {
              show: false,
              width: 100,
            },
          },
        },
      ],
      legend: {
        position: "right",
        offsetY: 0,
        width: 170,
        height: 150,
      },
    },
  };
  async componentDidMount() {
    const date = new Date();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    this.setState({ selectYear: year, currentMonth: month });
    const token = localStorage.getItem("token");
    this.setState({ currentMonth: this.state.months[month] });
    try {
      var response = await axios.get(
        api_link.API_LINK +
          `income/all/savings/budget/all/${this.state.months[month]}/${year}`,
        { headers: { Authorization: token } }
      );
      response["data"] = JSON.parse(decrypt(response["data"]["resp"]));
      const budgets = [];
      const percentage = [];
      const data = response.data.savings;
      for (let i = 0; i < data.length; i++) {
        budgets.push(data[i].budget);
        percentage.push(
          parseInt(
            (response.data.savings[i].saving / response.data.total_income) * 100
          )
        );
      }
      //console.log("percentage", percentage);

      const thisState = { ...this.state };
      // thisState.series[0].data = percentage;
      thisState.options.labels = budgets;
      this.setState({ series: percentage, show: true });
    } catch (e) {
      //console.log("Error Getting Data");
    }
    var years = [];
    for (let i = 2020; i <= 2050; i++) {
      years.push({ val: i, years: i });
    }
    this.setState({ selectYears: years });
  }
  handleMonthChange = async (event) => {
    var value = event.currentTarget.value;
    this.setState({ currentMonth: value });
    // const date = new Date();
    this.setState({ show: false });
    const year = this.state.selectYear;
    const token = localStorage.getItem("token");
    try {
      var response = await axios.get(
        api_link.API_LINK + `income/all/savings/budget/all/${value}/${year}`,
        { headers: { Authorization: token } }
      );
      response["data"] = JSON.parse(decrypt(response["data"]["resp"]));
      const budgets = [];
      const percentage = [];
      const data = response.data.savings;
      for (var i = 0; i < data.length; i++) {
        budgets.push(data[i].budget);
        percentage.push(
          parseInt(
            (response.data.savings[i].saving / response.data.total_income) * 100
          )
        );
      }
      //console.log("percentage", percentage);

      const thisState = { ...this.state };
      // thisState.series[0].data = percentage;
      thisState.options.labels = budgets;
      this.setState({ series: percentage, show: true });
    } catch (e) {
      //console.log("Error Getting Data");
    }
    this.setState({ show: true });
  };
  handleYearChange = async (event) => {
    var year = event.currentTarget.value;
    this.setState({ selectYear: year });
    // const date = new Date();
    this.setState({ show: false });
    const month = this.state.currentMonth;
    const token = localStorage.getItem("token");
    try {
      var response = await axios.get(
        api_link.API_LINK + `income/all/savings/budget/all/${month}/${year}`,
        { headers: { Authorization: token } }
      );
      response["data"] = JSON.parse(decrypt(response["data"]["resp"]));
      const budgets = [];
      const percentage = [];
      const data = response.data.savings;
      for (var i = 0; i < data.length; i++) {
        budgets.push(data[i].budget);
        percentage.push(
          parseInt(
            (response.data.savings[i].saving / response.data.total_income) * 100
          )
        );
      }
      //console.log("percentage", percentage);

      const thisState = { ...this.state };
      // thisState.series[0].data = percentage;
      thisState.options.labels = budgets;
      this.setState({ series: percentage, show: true });
    } catch (e) {
      //console.log("Error Getting Data");
    }
    this.setState({ show: true });
  };
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  render() {
    return (
      <div
        class="statbox widget box box-shadow"
        style={{ minHeight: "400px", paddingLeft: "0px", paddingRight: "0px" }}
      >
        <div class="widget-header">
          <div class="widget-header">
            <div className="d-flex justify-content-between">
              <p>
                <b style={{ fontSize: "2vh" }}>
                  %age Saving vs. Income for{" "}
                  {this.capitalizeFirstLetter(this.state.currentMonth)}
                </b>
              </p>
            </div>
            <div className="row">
              <div className="col-6">
                <select
                  onChange={this.handleMonthChange}
                  className="form-control col-md-8 col-sm-12 m-auto"
                >
                  {this.state.months.map((pointer) => (
                    <option value={pointer}>{pointer}</option>
                  ))}
                </select>
              </div>
              <div className="col-6">
                <select
                  onChange={this.handleYearChange}
                  className="form-control col-md-8 col-sm-12 m-auto"
                >
                  <option value={new Date().getFullYear()}>Year</option>
                  {this.state.selectYears.map((pointer) => (
                    <option value={pointer.val}>{pointer.years}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
        <div id="chart" className="py-auto ">
          {this.state.show === true ? (
            this.state.series.length > 0 ? (
              <ReactApexChart
                options={this.state.options}
                series={this.state.series}
                type="donut"
                height={280}
              />
            ) : (
              <div>
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
              </div>
            )
          ) : null}
        </div>
      </div>
    );
  }
}

export default IncomeRelatedPie2;
