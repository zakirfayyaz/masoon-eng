import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";

class ConsumedPackagesGraph extends Component {
  state = {
    series: [],
    options: {
      chart: {
        width: 100,
        type: "pie",
      },
      dataLabels: {
        enabled: true,
      },
      responsive: [
        {
          breakpoint: 475,
          options: {
            chart: {
              width: 200,
              height: 200,
            },
            legend: {
              show: false,
              width: 100,
            },
            dataLabels: {
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
  componentDidMount() {
    this.setData();
  }
  setData() {
    setTimeout(() => {
      this.setState({ show: false });

      const data = this.props.data;
      var series = [];
      var labels = [];
      for (let i = 0; i < data.length; i++) {
        labels.push(data[i].package_name);
        series.push(data[i].total);
      }
      //console.log(series, labels);
      // var ser = this.state.series
      // state["series"] = series;
      var opt = this.state.options;
      opt["labels"] = labels;

      try {
        // this.setState({ series });
        this.setState({ show: true, series: series, options: opt });
      } catch (e) {
        //console.log("Error Setting Data", e);
      }
      this.setState({ show: true });
    }, 1500);
  }
  // componentDidUpdate(prevProps) {
  //   if (
  //     prevProps.basic !== this.props.basic ||
  //     prevProps.standard !== this.props.standard ||
  //     prevProps.premium !== this.props.premium
  //   ) {
  //     var total = this.props.basic + this.props.standard + this.props.premium;
  //     var basic = parseInt((this.props.basic / total) * 100);
  //     var standard = parseInt((this.props.standard / total) * 100);
  //     var premium = parseInt((this.props.premium / total) * 100);
  //     const series = [basic, standard, premium];

  //     try {
  //       this.setState({ series });
  //     } catch (e) {
  //       //console.log("Error Setting Data", e);
  //     }
  //     this.setState({ show: true });
  //   }
  // }
  render() {
    return (
      <div
        id="chart"
        style={{
          verticalAlign: "middle",
        }}
        className="m-auto"
      >
        {this.state.show === true ? (
          <ReactApexChart
            options={this.state.options}
            series={this.state.series}
            type="donut"
            height={400}
          />
        ) : null}
      </div>
    );
  }
}

export default ConsumedPackagesGraph;
