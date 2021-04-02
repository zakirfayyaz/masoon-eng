import React, { Component, Suspense } from "react";
// import ReactApexChart from "react-apexcharts";
const ReactApexChart = React.lazy(() => import("react-apexcharts"));
class DailyRegistration extends Component {
  state = {
    show: false,
    series: [],
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
              label: "DailyUsage ",
              formatter: function (w) {
                return "of Users";
              },
            },
          },
        },
      },
      labels: ["Active", "Online", "Offline"],
    },
  };
  componentDidMount = async () => {
    setTimeout(() => {
      this.setData();
    }, 1000);
  };
  setData = () => {
    // const online = this.props.total_online;
    // const offline = this.props.total_offline;
    // const active = this.props.total_active;
    // this.setState({ show: true });
    // const series = [active, online, offline];
    // this.setState({ series: series });
  };
  componentDidUpdate(prevProps) {
    if (
      prevProps.total_online !== this.props.total_online ||
      prevProps.total_offline !== this.props.total_offline ||
      prevProps.total_active !== this.props.total_active
    ) {
      const total =
        this.props.total_online +
        this.props.total_offline +
        this.props.total_active;
      const online = parseInt((this.props.total_online / total) * 100);
      const offline = parseInt((this.props.total_offline / total) * 100);
      const active = parseInt((this.props.total_active / total) * 100);
      this.setState({ show: true });
      const series = [active, online, offline];
      this.setState({ series: series });
    }
  }
  render() {
    return (
      <Suspense fallback={<div></div>}>
        <div id="chart">
          <ReactApexChart
            options={this.state.options}
            series={this.state.series}
            type="radialBar"
            height={375}
          />
        </div>
      </Suspense>
    );
  }
}

export default DailyRegistration;
