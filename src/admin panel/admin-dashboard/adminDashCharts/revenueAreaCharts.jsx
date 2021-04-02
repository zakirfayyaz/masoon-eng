import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";
import { trackPromise } from "react-promise-tracker";
import axios from "axios";
import api_link from "../../../config.json";
import allZeros from "./../../../utils/allZero";
import endpoint from "./../../../utils/endpoint";
import decrypt from "./../../../utils/Encryption/Decrypt";
import errorImage from "./../../../Global Image/errorImage";

class RevenueAreaChart extends Component {
  state = {
    series: [
      {
        data: [],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },

      title: {
        text: "Monthly Revenue Statistics",
        align: "center",
      },
      legend: {
        tooltipHoverFormatter: function (val, opts) {
          return (
            "val" +
            " - " +
            opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
            ""
          );
        },
      },

      xaxis: {
        categories: [],
        title: {
          text: "Days",
        },
      },
      yaxis: {
        title: {
          text: "Revenue (SR)",
        },
      },
      colors: ["#7e57c2"],
      tooltip: {
        y: [
          {
            title: {
              formatter: function (val) {
                return val + " SR ";
              },
            },
          },
          // {
          //   title: {
          //     formatter: function (val) {
          //       return val + " per session";
          //     },
          //   },
          // },
          // {
          //   title: {
          //     formatter: function (val) {
          //       return val;
          //     },
          //   },
          // },
        ],
      },
      grid: {
        borderColor: "#f1f1f1",
      },
    },
  };
  componentDidMount = async () => {
    const token = localStorage.getItem("token");
    const date = new Date();
    const year = date.getFullYear();
    const m = date.getMonth() + 1;
    const month = m < 10 ? "0" + m : m;
    var response = await trackPromise(
      axios.get(endpoint + `admin/users/publisher/revenue/${month}/${year}`, {
        headers: { Authorization: token },
      })
    );
    response["data"] = JSON.parse(decrypt(response["data"]["resp"]));
    const data = response["data"]["revenue_by_date"];
    const dates = [];
    const revenues = [];
    for (var i = 0; i < data.length; i++) {
      dates.push(data[i].date);
      revenues.push(data[i].counts);
    }
    if (allZeros(revenues)) {
      this.setState({ show: false });
    } else {
      const options = { ...this.state.options };
      options.xaxis.categories = dates;

      const yaxis = { ...this.state.series };
      yaxis[0].data = revenues;
    }
    this.setState({ show: true });
  };
  componentDidUpdate = async (prevProps) => {
    const token = localStorage.getItem("token");
    if (
      prevProps.selectedMonth !== this.props.selectedMonth ||
      prevProps.month !== this.props.month ||
      prevProps.year !== this.props.year
    ) {
      this.setState({ show: false });
      var response = await trackPromise(
        axios.get(
          api_link.API_LINK +
            `admin/users/publisher/revenue/${this.props.month}/${this.props.year}`,
          { headers: { Authorization: token } }
        )
      );
      response["data"] = JSON.parse(decrypt(response["data"]["resp"]));
      const data = response["data"]["revenue_by_date"];
      const dates = [];
      const revenues = [];
      for (var i = 0; i < data.length; i++) {
        dates.push(data[i].date);
        revenues.push(data[i].counts);
      }
      if (allZeros(revenues)) {
        this.setState({ show: false });
      } else {
        const xaxis = { ...this.state.options };
        xaxis.xaxis.categories = dates;

        const yaxis = { ...this.state.series };
        yaxis[0].data = revenues;
        this.setState({ show: true });
      }
    }
  };
  render() {
    return (
      <React.Fragment>
        {this.state.show === true ? (
          <div id="chart">
            <ReactApexChart
              options={this.state.options}
              series={this.state.series}
              type="area"
              height={350}
            />
          </div>
        ) : (
          <div className="d-flex" style={{ height: "370px" }}>
            {" "}
            <div
              class="m-auto "
              style={{
                verticalAlign: "middle",
                fontSize: "35px",
                fontWeight: "500",
              }}
            >
              <img src={errorImage} style={{ height: "70px" }} alt="error" /> No
              Data To Display
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default RevenueAreaChart;
