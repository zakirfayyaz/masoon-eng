import React, { Component } from "react";
import SavingVsIncomeGraph from "./graphs-spending-saving/saving-vs-income-graph";
import SavingVsBudgetGraph from "./graphs-spending-saving/saving-vs-budget-graph";

import CategoriesOverview from "./overview-table/categories-overview";
import MerchantsOverview from "./overview-table/merchants-overview";
import BudgetsOverview from "./overview-table/budgets-overview";
class SpendingSaving extends Component {
  state = {
    user_id: "",
    reload: false,
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
      "sepember",
      "october",
      "november",
      "december",
    ],
    selectedMonth: "",
    categories: [],
  };
  componentDidMount = async () => {
    const user_id = this.props.match.params.id;

    this.setState({ user_id });
  };
  handleMonthChange = async (event) => {
    this.setState({ reload: true });
    this.setState({ selectedMonth: event.currentTarget.value });
  };
  render() {
    return (
      <React.Fragment>
        <div id="content" class="main-content">
          <div class="layout-px-spacing">
            <div class="page-header">
              <div class="page-title">
                <h3>Users Spending & Saving Behaviours</h3>
              </div>
            </div>
            {/* <div class="row layout-spacing">
              
              <div class="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-12 layout-spacing mt-2">
                <div
                  class="d-flex justify-content-between widget-account-invoice-six layout-spacing"
                  style={{ cursor: "pointer" }}
                >
                  <div class="mt-2">
                    <span class="text-white" style={{ fontSize: "15px" }}>
                      Overall Budget
                    </span>
                  </div>
                  <div class="mt-1">
                    <p class="text-white " style={{ fontSize: "15px" }}>
                      lol
                    </p>
                  </div>
                </div>
              </div>
              <div class="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-12 layout-spacing mt-2">
                <div
                  class="d-flex justify-content-between widget-account-invoice-three"
                  style={{
                    background:
                      "linear-gradient(to right, #FFC133 0%, #FF973A 100%)",
                    cursor: "pointer",
                  }}
                >
                  <div class="mt-2">
                    <span class="text-white" style={{ fontSize: "15px" }}>
                      Remaining Budget
                    </span>
                  </div>
                  <div class="mt-1">
                    <p class="text-white " style={{ fontSize: "15px" }}>
                      lol
                    </p>
                  </div>
                </div>
              </div>
              <div class="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-12 layout-spacing mt-2">
                <div
                  class="d-flex justify-content-between widget-account-invoice-six layout-spacing"
                  style={{ cursor: "pointer" }}
                >
                  <div class="mt-2">
                    <span class="text-white" style={{ fontSize: "15px" }}>
                      Spendings
                    </span>
                  </div>
                  <div class="mt-1">
                    <p class="text-white " style={{ fontSize: "15px" }}>
                      lol
                    </p>
                  </div>
                </div>
              </div>
              <div class="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-12 layout-spacing mt-2">
                <div
                  class="d-flex justify-content-between widget-account-invoice-three"
                  style={{
                    background:
                      "linear-gradient(to right, #FFC133 0%, #FF973A 100%)",
                    cursor: "pointer",
                  }}
                >
                  <div class="mt-2">
                    <span class="text-white" style={{ fontSize: "15px" }}>
                      Savings
                    </span>
                  </div>
                  <div class="mt-1">
                    <p class="text-white " style={{ fontSize: "15px" }}>
                      lol
                    </p>
                  </div>
                </div>
              </div>
              
            </div> */}

            <div className="row">
              <div className="col-lg-6 col-md-12 col-sm-12">
                <div class="row">
                  <div class="col-lg-12 col-12 layout-top-spacing">
                    <SavingVsIncomeGraph
                      user_id={this.state.user_id && this.state.user_id}
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-12 col-sm-12">
                <div class="row">
                  <div class="col-lg-12 col-12 layout-top-spacing">
                    <SavingVsBudgetGraph
                      user_id={this.state.user_id && this.state.user_id}
                      selectedMonth={this.state.selectedMonth}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div class="col-12 statbox widget box box-shadow mt-4">
                <div class="widget-header">
                  <h4> Spending Behaviour</h4>{" "}
                </div>
                <div class="widget-content widget-content-area icon-pill">
                  <div className="row">
                    <div className="col-md-12">
                      <ul
                        class="nav nav-pills mb-3 mt-3"
                        id="icon-pills-tab"
                        role="tablist"
                      >
                        <li class="nav-item">
                          <a
                            class="nav-link active"
                            id="icon-pills-home-tab"
                            data-toggle="pill"
                            href="#icon-pills-home"
                            role="tab"
                            aria-controls="icon-pills-home"
                            aria-selected="true"
                          >
                            {" "}
                            Categories
                          </a>
                        </li>

                        <li class="nav-item">
                          <a
                            class="nav-link"
                            id="icon-pills-contact-tab"
                            data-toggle="pill"
                            href="#icon-pills-contact"
                            role="tab"
                            aria-controls="icon-pills-contact"
                            aria-selected="false"
                          >
                            {" "}
                            Merchants
                          </a>
                        </li>
                        <li class="nav-item">
                          <a
                            class="nav-link"
                            id="icon-pills-contact-tab"
                            data-toggle="pill"
                            href="#icon-pills-budgets"
                            role="tab"
                            aria-controls="icon-pills-contact"
                            aria-selected="false"
                          >
                            {" "}
                            Budgets
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div class="tab-content" id="icon-pills-tabContent">
                    <div
                      class="tab-pane fade show active"
                      id="icon-pills-home"
                      role="tabpanel"
                      aria-labelledby="icon-pills-home-tab"
                    >
                      <CategoriesOverview
                        user_id={this.state.user_id && this.state.user_id}
                      />
                    </div>
                    <div
                      class="tab-pane fade"
                      id="icon-pills-contact"
                      role="tabpanel"
                      aria-labelledby="icon-pills-contact-tab"
                    >
                      <MerchantsOverview
                        user_id={this.state.user_id && this.state.user_id}
                      />
                    </div>
                    <div
                      class="tab-pane fade"
                      id="icon-pills-budgets"
                      role="tabpanel"
                      aria-labelledby="icon-pills-contact-tab"
                    >
                      <BudgetsOverview
                        user_id={this.state.user_id && this.state.user_id}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="footer-wrapper">
            <div class="footer-section f-section-1">
              <p class="">
                Copyright © 2020{" "}
                <a
                  target="_blank"
                  href="https://cdoxs.com"
                  rel="noopener noreferrer"
                >
                  CDOXS
                </a>
                , All rights reserved.
              </p>
            </div>
            <div class="footer-section f-section-2">
              <p class="">
                Coded with{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-heart"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </p>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default SpendingSaving;
