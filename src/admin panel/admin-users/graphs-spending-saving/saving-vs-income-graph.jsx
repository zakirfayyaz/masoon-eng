import ReactApexChart from "react-apexcharts";
import React, { Component } from "react";
import axios from "axios";
import api_link from "../../../config.json";
import encrypt from "./../../../utils/Encryption/Encrypt";
import decrypt from "./../../../utils/Encryption/Decrypt";
import errorImage from "./../../../Global Image/errorImage";

class SavingVsIncomeGraph extends Component {
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
    series: [
      {
        name: "% Budget",
        data: [],
      },
      {
        name: "% Expenses",
        data: [],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
        stacked: true,
        toolbar: {
          show: true,
        },
        zoom: {
          enabled: true,
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: "bottom",
              offsetX: -10,
              offsetY: 0,
            },
          },
        },
      ],
      plotOptions: {
        bar: {
          horizontal: false,
        },
      },
      yaxis: {
        title: { text: "Percentage(%)" },
      },
      xaxis: {
        type: "Budget",
        title: { text: "Categories" },
        categories: [],
      },
      legend: {
        position: "right",
        offsetY: 40,
      },
      colors: ["#7e57c2", "#e7515a"],
      fill: {
        opacity: 5,
      },
    },
  };
  async componentDidMount() {
    const date = new Date();
    this.setState({ currentYear: date.getFullYear() });
    setTimeout(() => this.getData(), 1000);
    // console.log("Onin");
    var years = [];
    for (var i = 2019; i <= 2050; i++) {
      years.push({ val: i, years: i });
    }
    this.setState({ selectYears: years });
  }
  getData = async () => {
    const date = new Date();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    // console.log(month, year);
    const token = localStorage.getItem("token");
    const monthNumber = this.state.months[month];
    this.setState({ currentMonth: this.state.months[month] });
    // /${monthNumber}/${year}/${this.props.user_id}
    var obj1 = { month: monthNumber, year: year, user_id: this.props.user_id };
    obj1 = encrypt(JSON.stringify(obj1));
    try {
      var response = await axios.put(
        api_link.API_LINK + `income/savings/budget-id`,
        { name: obj1 },
        { headers: { Authorization: token } }
      );
      response["data"] = JSON.parse(decrypt(response["data"]["resp"]));
      const data = response["data"]["budget_with_savings"];
      // console.log("SVI", data);
      const budgets = [];
      const per_expense = [];
      const per_budget = [];
      const saved = [];

      for (var i = 0; i < data.length; i++) {
        budgets.push(data[i].budget);
        per_budget.push(data[i].percentage_budget);
        per_expense.push(data[i].percentage_expense);
        saved.push(data[i].percentage_income);
      }
      // console.log("budgets", budgets, "saved", saved);
      const thisState = { ...this.state };
      thisState.options.xaxis.categories = budgets;
      thisState.series[0].data = per_budget;
      thisState.series[1].data = per_expense;
      this.setState({ show: true });
    } catch (e) {
      // console.log(e);
    }
  };
  handleMonthChange = async (event) => {
    var selectedMonth = event.currentTarget.value;
    this.setState({ currentMonth: selectedMonth });
    // const date = new Date();

    // const year = date.getFullYear();
    this.setState({ show: false });
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
      // console.log("response of Month", response);
      response["data"] = JSON.parse(decrypt(response["data"]["resp"]));
      // console.log("response of Month", response);
      // const response = await axios.get(
      //   api_link.API_LINK +
      //     `income/savings/budget/${selectedMonth}/${this.state.currentYear}/${this.props.user_id}`,
      //   { headers: { Authorization: token } }
      // );
      const data = response["data"]["budget_with_savings"];
      // console.log("SVI", data);
      const budgets = [];
      const per_expense = [];
      const per_budget = [];
      const saved = [];

      for (var i = 0; i < data.length; i++) {
        budgets.push(data[i].budget);
        per_budget.push(data[i].percentage_budget);
        per_expense.push(data[i].percentage_expense);
        saved.push(data[i].percentage_income);
      }
      // console.log("budgets", budgets, "saved", saved);
      const thisState = { ...this.state };
      thisState.options.xaxis.categories = budgets;
      thisState.series[0].data = per_budget;
      thisState.series[1].data = per_expense;
      this.setState({ show: true });
    } catch (e) {
      // console.log(e);
    }
    // this.setState({ show: true });
  };
  handleYearChange = async (event) => {
    var year = event.currentTarget.value;
    this.setState({ currentYear: year });
    // const date = new Date();
    // const year = date.getFullYear();
    this.setState({ show: false });
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
      // console.log("SVI", response);
      response["data"] = JSON.parse(decrypt(response["data"]["resp"]));
      // const response = await axios.get(
      //   api_link.API_LINK +
      //     `income/savings/budget/${this.state.currentMonth}/${year}/${this.props.user_id}`,
      //   { headers: { Authorization: token } }
      // );
      const data = response["data"]["budget_with_savings"];
      // console.log("SVI", data);
      const budgets = [];
      const per_expense = [];
      const per_budget = [];
      const saved = [];

      for (var i = 0; i < data.length; i++) {
        budgets.push(data[i].budget);
        per_budget.push(data[i].percentage_budget);
        per_expense.push(data[i].percentage_expense);
        saved.push(data[i].percentage_income);
      }
      // console.log("budgets", budgets, "saved", saved);
      const thisState = { ...this.state };
      thisState.options.xaxis.categories = budgets;
      thisState.series[0].data = per_budget;
      thisState.series[1].data = per_expense;
      this.setState({ show: true });
    } catch (e) {
      // console.log(e);
    }
    this.setState({ show: true });
  };
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  render() {
    return (
      <React.Fragment>
        <div
          class="widget box "
          style={{ height: "500px", paddingLeft: "0px", paddingRight: "0px" }}
        >
          <div class="widget-header">
            <div className="row mb-1">
              <div className="col-md-12">
                <h4>
                  {" "}
                  % Budget vs % Expense for{" "}
                  {this.capitalizeFirstLetter(this.state.currentMonth)},{" "}
                  {this.state.currentYear}
                </h4>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6  col-sm-12 m-auto pt-1 pb-1">
                <select
                  className="form-control col-md-12 m-auto"
                  onChange={this.handleMonthChange}
                >
                  {this.state.months.map((pointer) => (
                    <option value={pointer}>{pointer}</option>
                  ))}
                </select>
              </div>
              <div className="col-md-6  col-sm-12 m-auto pt-1 pb-2">
                <select
                  className="form-control col-md-12 m-auto "
                  onChange={this.handleYearChange}
                >
                  <option>Year..</option>
                  {this.state.selectYears &&
                    this.state.selectYears.map((pointer) => (
                      <option value={pointer.val}>{pointer.years}</option>
                    ))}
                </select>
              </div>
            </div>
          </div>
          {this.state.show === true ? (
            this.state.series[0].data.length < 1 &&
            this.state.series[1].data.length < 1 ? (
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
            ) : (
              <div class="widget-content widget-content-area">
                <div className="row">
                  <div className="col-md-12">
                    <div id="chart">
                      <ReactApexChart
                        options={this.state.options}
                        series={this.state.series}
                        type="bar"
                        height={320}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )
          ) : null}
        </div>
      </React.Fragment>
    );
  }
}

export default SavingVsIncomeGraph;
