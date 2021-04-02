import React, { Component } from "react";
import axios from "axios";
import api_link from "../../../config.json";
class BudgetsOverview extends Component {
  state = { budgets: [] };
  componentDidMount = async () => {
    setTimeout(() => this.getData(), 1000);
  };
  getData = async () => {
    const date = new Date();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        api_link.API_LINK +
          "income/spendings/budgets/admin/" +
          month +
          "/" +
          year +
          "/1/" +
          this.props.user_id,
        { headers: { Authorization: token } }
      );
      //console.log(response);
      this.setState({ budgets: response["data"] });
    } catch (e) {
      //console.log(e);
    }
  };
  handleChangeMonth = async ({ currentTarget: input }) => {
    const value = input.value;
    const year = value.substring(0, value.indexOf("-"));
    const month = value.substring(value.indexOf("-") + 1);
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        api_link.API_LINK +
          "income/spendings/budgets/admin/" +
          month +
          "/" +
          year +
          "/1/" +
          this.props.user_id,
        { headers: { Authorization: token } }
      );
      //console.log(response);
      this.setState({ budgets: response["data"] });
    } catch (e) {
      //console.log(e);
    }
  };
  render() {
    return (
      <div class="widget widget-table-one ">
        <div class="widget-heading d-flex justify-content-between">
          {" "}
          <h5 class="">
            Total Amount :{" "}
            <span
              className="badge badge-secondary"
              style={{ fontSize: "1.5vh" }}
            >
              {this.state.budgets.total}
            </span>
          </h5>
          <input
            type="month"
            className="form-control col-md-4"
            onChange={this.handleChangeMonth}
          />
        </div>

        <div class="widget-content">
          <div
            class="table-responsive "
            style={{ minheight: "55vh", overflowX: "auto" }}
          >
            <table class="table">
              <thead>
                <tr>
                  <th>
                    <div class="th-content">Name</div>
                  </th>
                  <th>
                    <div class="th-content">Transc. Performed</div>
                  </th>
                  <th>
                    <div class="th-content">Amount Spent</div>
                  </th>
                  <th>
                    <div class="th-content"></div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {this.state.budgets.budgets &&
                  this.state.budgets.budgets.map((pointer) => (
                    <tr>
                      <td style={{ fontSize: "15px", fontWeight: "700" }}>
                        {pointer.name}
                      </td>
                      <td style={{ fontSize: "15px", fontWeight: "700" }}>
                        {pointer.total_transactions}
                      </td>
                      <td style={{ fontSize: "15px", fontWeight: "700" }}>
                        {pointer.amount}
                      </td>
                      <td style={{ fontSize: "15px", fontWeight: "700" }}>
                        {(
                          (pointer.amount / this.state.budgets.total) *
                          100
                        ).toFixed(0) + "% "}
                        Used of total amount
                        <span>
                          <div class="progress br-30 ">
                            <div
                              class="progress-bar bg-secondary"
                              role="progressbar"
                              style={{
                                width:
                                  (pointer.amount / this.state.budgets.total) *
                                    100 +
                                  "%",
                              }}
                              aria-valuenow="25"
                              aria-valuemin="0"
                              aria-valuemax="100"
                            ></div>
                          </div>
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default BudgetsOverview;
