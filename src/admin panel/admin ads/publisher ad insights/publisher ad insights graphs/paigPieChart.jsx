import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";
import allZeros from "./../../../../utils/allZero";
import errorImage from "./../../../../Global Image/errorImage";

class PAIGPieChart extends Component {
  state = {
    show: false,
    series: [],
    options: {
      chart: {
        width: 380,
        type: "pie",
      },
      labels: ["Impressions", "Clicks", "Views"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "center",
              width: 200,
              height: 150,
            },
          },
        },
      ],
    },
  };
  componentDidMount() {
    setTimeout(() => {
      this.setData();
    }, 1000);
  }
  setData() {
    this.setState({ show: false });
    const series = [
      this.props.total_impressions,
      this.props.total_clicks,
      this.props.total_views,
    ];
    try {
      this.setState({ series });
    } catch (e) {
      // console.log("Error Setting Data", e);
    }
    this.setState({ show: true });
  }
  componentDidUpdate(prevProps) {
    if (
      prevProps.total_impressions !== this.props.total_impressions ||
      prevProps.total_clicks !== this.props.total_clicks ||
      prevProps.total_views !== this.props.total_views
    ) {
      const series = [
        this.props.total_impressions,
        this.props.total_clicks,
        this.props.total_views,
      ];
      try {
        this.setState({ series });
      } catch (e) {
        // console.log("Error Setting Data", e);
      }
      this.setState({ show: true });
    }
  }
  render() {
    return (
      <React.Fragment>
        {this.state.show === true ? (
          this.state.series.length > 0 ? (
            allZeros(this.state.series) ? (
              <div
                className="m-auto "
                style={{
                  verticalAlign: "middle",
                  fontSize: "35px",
                  fontWeight: "500",
                  paddingTop: "20px",
                }}
              >
                <img src={errorImage} style={{ height: "70px" }} alt="error" />{" "}
                No Data To Display
              </div>
            ) : (
              <div id="chart">
                <ReactApexChart
                  options={this.state.options}
                  series={this.state.series}
                  type="pie"
                  width={450}
                />
              </div>
            )
          ) : null
        ) : null}
      </React.Fragment>
    );
  }
}

export default PAIGPieChart;
