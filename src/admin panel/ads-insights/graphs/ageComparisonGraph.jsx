import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";

class AgeComparisonGraph extends Component {
  state = {
    series: [44, 55, 67, 83],
    options: {
      chart: {
        height: 350,
        type: "radialBar",
      },
      plotOptions: {
        radialBar: {
          dataLabels: {
            name: {
              fontSize: "22px",
            },
            value: {
              fontSize: "16px",
            },
            total: {
              show: true,
              label: "Age Based",
              formatter: function (w) {
                // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                return "Clicks";
              },
            },
          },
        },
      },
      labels: ["20-25", "25-30", "30-35", "35-40", "40-45"],
    },
  };
  render() {
    return (
      <div id="chart">
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="radialBar"
          height={350}
        />
      </div>
    );
  }
}

export default AgeComparisonGraph;
