import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";

class ClicksVsViews extends Component {
  state = {
    series: [
      {
        name: "Clicks",
        data: [35, 55, 40, 13, 15, 20, 44],
      },
      {
        name: "Views",
        data: [33, 55, 12, 44, 10, 30, 77],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories: ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"],
      },
      yaxis: {
        title: {
          text: "$ (thousands)",
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val;
          },
        },
      },
    },
  };
  render() {
    return (
      <React.Fragment>
        <div id="chart">
          <ReactApexChart
            options={this.state.options}
            series={this.state.series}
            type="bar"
            height={350}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default ClicksVsViews;
