import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";
import axios from "axios";
import api_link from "../../../config.json";
import decrypt from "./../../../utils/Encryption/Decrypt";
class IncomeRelatedGraph extends Component {
  state = {
    selectYears: [],
    selectMonth: "",
    selectYear: 0,
    currentMonth: "",
    show: false,
    months: [
      "Select Month",
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
    series: [
      {
        name: "% of Budget",
        data: [],
      },
      {
        name: "% of Expense",
        data: [],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 500,

        stacked: true,
        stackType: "100%",
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
      xaxis: {
        type: "Budget",
        categories: [],
        title: {
          text: "Category Names",
        },
      },
      yaxis: {
        title: {
          text: "Percentage(%)",
        },
      },
      legend: {
        position: "right",
        offsetY: 40,
      },
      colors: ["#7e57c2", "#e7515a"],
      fill: {
        opacity: 1,
      },
    },
  };

  async componentDidMount() {
    const date = new Date();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    this.setState({ selectYear: year });
    const m = date.getMonth();
    this.setState({ currentMonth: this.state.months[m] });
    const token = localStorage.getItem("token");
    try {
      var response = await axios.get(
        api_link.API_LINK +
          `income/all/savings/budget/all/${this.state.months[month]}/${year}`,
        { headers: { Authorization: token } }
      );
      response["data"] = JSON.parse(decrypt(response["data"]["resp"]));
      // console.log("Overall Data", response);
      // console.log("Overall Bar ", response["data"].savings);
      const data = response["data"].savings;

      const budgets = [];
      const percentage_budget = [];
      const percentage_expense = [];

      for (let i = 0; i < data.length; i++) {
        budgets.push(data[i].budget);
        percentage_budget.push(data[i].percentage_budget);
        percentage_expense.push(data[i].percentage_expense);
      }

      const thisState = { ...this.state };
      thisState.series[0].data = percentage_budget;
      thisState.series[1].data = percentage_expense;
      thisState.options.xaxis.categories = budgets;
      this.setState({ show: true });
    } catch (e) {
      // console.log("Error Getting Data");
    }
    var years = [];
    for (let i = 2020; i <= 2050; i++) {
      years.push({ val: i, years: i });
    }
    this.setState({ selectYears: years });
  }
  handleMonthChange = async (event) => {
    var value = event.currentTarget.value;
    // const date = new Date();
    this.setState({ show: false, currentMonth: value });
    const year = this.state.selectYear;
    const token = localStorage.getItem("token");
    try {
      var response = await axios.get(
        api_link.API_LINK + `income/all/savings/budget/all/${value}/${year}`,
        { headers: { Authorization: token } }
      );
      response["data"] = JSON.parse(decrypt(response["data"]["resp"]));
      // console.log("Overall Data", response);
      // console.log("Overall Bar ", response["data"].savings);
      const data = response["data"].savings;

      const budgets = [];
      const percentage_budget = [];
      const percentage_expense = [];

      for (var i = 0; i < data.length; i++) {
        budgets.push(data[i].budget);
        percentage_budget.push(Math.ceil(data[i].percentage_budget));
        percentage_expense.push(Math.ceil(data[i].percentage_expense));
      }

      const thisState = { ...this.state };
      thisState.series[0].data = percentage_budget;
      thisState.series[1].data = percentage_expense;
      thisState.options.xaxis.categories = budgets;
      this.setState({ show: true });
    } catch (e) {
      // console.log("Error Getting Data");
    }
  };
  handleYearChange = async (event) => {
    var year = event.currentTarget.value;
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
      // console.log("Overall Data", response);
      // console.log("Overall Bar ", response["data"].savings);
      const data = response["data"].savings;

      const budgets = [];
      const percentage_budget = [];
      const percentage_expense = [];

      for (var i = 0; i < data.length; i++) {
        budgets.push(data[i].budget);
        percentage_budget.push(data[i].percentage_budget);
        percentage_expense.push(data[i].percentage_expense);
      }

      const thisState = { ...this.state };
      thisState.series[0].data = percentage_budget;
      thisState.series[1].data = percentage_expense;
      thisState.options.xaxis.categories = budgets;
      this.setState({ show: true });
    } catch (e) {
      // console.log("Error Getting Data");
    }
  };
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  render() {
    return (
      <div
        class="statbox widget box box-shadow"
        // style={{ paddingLeft: "50px", paddingRight: "50px" }}
      >
        <div class="widget-header ">
          <div className="d-flex justify-content-between">
            <p>
              <b style={{ fontSize: "2vh" }}>
                Comparion %age Budget & %age Expense for{" "}
                {this.capitalizeFirstLetter(this.state.currentMonth)}
              </b>
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-12 text-center mt-1">
            <select
              onChange={this.handleMonthChange}
              className="form-control col-lg-8 col-sm-12 col-xs-12 col-md-12  m-auto"
            >
              {this.state.months.map((pointer) => (
                <option value={pointer}>{pointer}</option>
              ))}
            </select>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 text-center mt-1">
            <select
              onChange={this.handleYearChange}
              className="form-control col-lg-8 col-sm-12 col-md-12 col-xs-12  m-auto"
            >
              <option value={"january"}>Select Year...</option>
              {this.state.selectYears.map((pointer) => (
                <option value={pointer.val}>{pointer.years}</option>
              ))}
            </select>
          </div>
        </div>

        <div id="chart">
          {this.state.show === true ? (
            <ReactApexChart
              options={this.state.options}
              series={this.state.series}
              type="bar"
              height={350}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

export default IncomeRelatedGraph;
