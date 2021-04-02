import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";
import axios from "axios";
import api_link from "../../../config.json";
import { trackPromise } from "react-promise-tracker";

import { usePromiseTracker } from "react-promise-tracker";
import Loader from "react-promise-loader";
import allZeros from "./../../../utils/allZero";
import decrypt from "./../../../utils/Encryption/Decrypt";
import errorImage from "./../../../Global Image/errorImage";
class MonthlyClicksGraph extends Component {
  state = {
    series: [
      {
        name: "Count",
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

      // title: {
      //   text: "Monthly Ad Clicks Statistics",
      //   align: "left",
      // },
      legend: {
        tooltipHoverFormatter: function (val, opts) {
          return (
            val +
            " - " +
            opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
            ""
          );
        },
      },

      xaxis: {
        categories: [],
      },
      colors: ["#7e57c2"],
      tooltip: {
        y: [
          {
            title: {
              formatter: function (val) {
                return val + " (total)";
              },
            },
          },
          {
            title: {
              formatter: function (val) {
                return val + " per session";
              },
            },
          },
          {
            title: {
              formatter: function (val) {
                return val;
              },
            },
          },
        ],
      },
      grid: {
        borderColor: "#f1f1f1",
      },
    },
  };
  async componentDidMount() {
    const date = new Date();
    const year = date.getFullYear();
    const m = date.getMonth() + 1;
    const month = m < 10 ? "0" + m : m;
    const token = localStorage.getItem("token");
    //console.log("Graph 1st", month, year);

    const response = await trackPromise(
      axios.get(
        api_link.API_LINK +
          `admin/users/publisher/ad-insights/all/${month}/${year}`,
        {
          headers: { Authorization: token },
        }
      )
    );
    response["data"] = JSON.parse(decrypt(response.data.resp));
    // console.log(response);
    const data = response["data"]["count_with_eactDay"];
    const impressions = [];
    const clicks = [];
    const views = [];
    const days = [];
    for (var o = 1; o <= data.length; o++) {
      days.push(o);
    }
    for (var i = 0; i < data.length; i++) {
      clicks.push(data[i].counts[0]);
    }
    for (var k = 0; k < data.length; k++) {
      views.push(data[k].counts[1]);
    }
    for (var l = 0; l < data.length; l++) {
      impressions.push(data[l].counts[1]);
    }

    /*Setting Data*/
    //console.log(impressions);

    const options = { ...this.state.options };
    options.xaxis[0] = days;
    if (this.props.id === 0) {
      var temp = [];
      temp.push({ name: "Impressions", data: impressions });
      this.setState({ series: temp });
    } else if (this.props.id === 1) {
      var temp2 = [];
      temp2.push({ name: "Clicks", data: clicks });
      this.setState({ series: temp2 });
    } else if (this.props.id === 2) {
      var temp3 = [];
      temp3.push({ name: "Views", data: clicks });
      this.setState({ series: temp3 });
    }
  }

  componentDidUpdate = async (prevProps) => {
    if (
      (prevProps.id && prevProps.id !== this.props.id) ||
      (prevProps.month && prevProps.month !== this.props.month) ||
      (prevProps.year && prevProps.year !== this.props.year)
    ) {
      const token = localStorage.getItem("token");
      //console.log("Graph 2nd", this.props.month, this.props.year);
      const response = await trackPromise(
        axios.get(
          api_link.API_LINK +
            `admin/users/publisher/ad-insights/all/${this.props.month}/${this.props.year}`,
          {
            headers: { Authorization: token },
          }
        )
      );
      response["data"] = JSON.parse(decrypt(response.data.resp));
      const data = response["data"]["count_with_eactDay"];
      const impressions = [];
      const clicks = [];
      const views = [];
      const days = [];
      for (var o = 1; o <= data.length; o++) {
        days.push(o);
      }
      for (var i = 0; i < data.length; i++) {
        clicks.push(data[i].counts[0]);
      }
      for (var k = 0; k < data.length; k++) {
        views.push(data[k].counts[1]);
      }
      for (var l = 0; l < data.length; l++) {
        impressions.push(data[l].counts[1]);
      }

      /*Setting Data*/
      //console.log(impressions);

      const options = { ...this.state.options };
      options.xaxis[0] = days;
      if (this.props.id === 0) {
        var temp = [];
        temp.push({ name: "Impressions", data: impressions });
        this.setState({ series: temp });
      } else if (this.props.id === 1) {
        var temp2 = [];
        temp2.push({ name: "Clicks", data: clicks });
        this.setState({ series: temp2 });
      } else if (this.props.id === 2) {
        var temp3 = [];
        temp3.push({ name: "Views", data: clicks });
        this.setState({ series: temp3 });
      }
    }
  };
  render() {
    return (
      <React.Fragment>
        <Loader
          promiseTracker={usePromiseTracker}
          color={"#5c1ac3"}
          background={"rgb(255, 255, 255)"}
        />
        {allZeros(this.state.series[0].data) ? (
          <div className="d-flex" style={{ height: "350px" }}>
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
        ) : (
          <div id="chart">
            <ReactApexChart
              options={this.state.options}
              series={this.state.series}
              type="area"
              height={380}
            />
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default MonthlyClicksGraph;
