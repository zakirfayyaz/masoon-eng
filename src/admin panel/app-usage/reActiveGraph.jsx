import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";
class RecentActive extends Component {
  state = {
    series: [
      {
        name: "Desktops",
        data: [10, 41, 35, 51, 49, 62, 69],
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
      stroke: {
        curve: "straight",
      },
      // title: {
      //   text: "Product Trends by Month",
      //   align: "left",
      // },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: [
          "12pm - 1pm",
          "1pm - 2pm",
          "2pm - 3pm",
          "3pm - 4pm",
          "4pm - 5pm",
          "5pm - 6pm",
          "6pm - 7pm",
        ],
      },
    },
  };
  render() {
    return (
      <div id="chart">
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="line"
          height={350}
        />
      </div>
    );
  }
}

export default RecentActive;
