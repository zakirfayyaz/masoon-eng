import React, { Component } from "react";
import axios from "axios";
import api_link from "../../config.json";
import PricingPlans from "./../pricing/pricingPlans";
import { ToastContainer, toast } from "react-toastify";
import decrypt from "./../../utils/Encryption/Decrypt";
import encrypt from "./../../utils/Encryption/Encrypt";
import { trackPromise } from "react-promise-tracker";
import { usePromiseTracker } from "react-promise-tracker";
import Loader from "react-promise-loader";
class ManageAdPackages extends Component {
  state = {
    packageId: null,
    show: false,
    user_packages: [],
    all_packages: [],
    showEdit: false,
  };
  handleChange = ({ currentTarget: input }) => {
    //console.log(input.value);
  };
  componentDidMount = async () => {
    const token = localStorage.getItem("token");

    // try {
    //   await axios.put(
    //     api_link.API_LINK + "notice/user-packages/expire-by-date",
    //     {},
    //     { headers: { Authorization: token } }
    //   );
    // } catch (e) {
    //   //console.log(e);
    // }
    localStorage.getItem("publisherStatus");
    //console.log(publisherStatus);
    let resp1 = await await trackPromise(
      axios.get(api_link.API_LINK + "notice/user-packages", {
        headers: { Authorization: token },
      })
    );
    resp1["data"] = JSON.parse(decrypt(resp1.data.resp));
    this.setState({ user_packages: resp1["data"]["user_Packages"] });
    try {
      let response = await axios.get(
        api_link.API_LINK + "admin/package/retrive",
        {
          headers: { Authorization: token },
        }
      );
      response["data"] = JSON.parse(decrypt(response.data.resp));
      // //console.log("Packages", response);
      const userP = resp1["data"]["user_Packages"][0].package_id;
      //console.log("Package User Name", userP);
      var all_packages = response["data"]["packages"];
      var p = [];
      for (let i = 0; i < all_packages.length; i++) {
        if (all_packages[i]._id !== userP) {
          //console.log("running");
          p.push(all_packages[i]);
        }
      }
      this.setState({ all_packages: p });
    } catch (e) {
      //console.log(e);
    }
    this.setState({ show: true });
  };

  setPackageId = (id, real) => {
    //console.log(id);
    this.setState({ packageId: id });
  };
  pageChange = () => {
    this.setState({ pricingSelect: true });
  };
  changePackage = async () => {
    var id = window.$("#package").val();
    //console.log(id, this.state.user_packages[0]._id);
    const token = localStorage.getItem("token");
    if (id !== "") {
      let response = await axios.put(
        api_link.API_LINK + "notice/user-packages/upgrade-id",
        {
          name: encrypt(
            JSON.stringify({
              user_package_id: this.state.user_packages[0]._id,
              package_id: id,
            })
          ),
        },
        { headers: { Authorization: token } }
      );
      // //console.log(response);
      response["data"] = JSON.parse(decrypt(response.data.resp));
      if (response.data.status === 200) {
        toast.success("Package Update Requested", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        this.setState({ showEdit: false });
        setTimeout(() => window.location.reload(), 2000);
      } else {
        toast.error(response.data.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } else {
      toast.error("Please Select A Package", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  requestRenewal = async () => {
    //console.log("Requested Renewal");
    const id = this.state.user_packages[0]._id;
    const token = localStorage.getItem("token");
    let response = await axios.put(
      api_link.API_LINK + "notice/user-packages/renew-id",
      { name: encrypt(JSON.stringify({ package_id: id })) },
      { headers: { Authorization: token } }
    );
    // //console.log(response);
    response["data"] = JSON.parse(decrypt(response.data.resp));
    if (response.data.status === 200) {
      toast.success("Package Renewal Requested", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setTimeout(() => window.location.reload(), 3000);
    } else {
      toast.error("Error Requesting", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  render() {
    return (
      <>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Loader
          promiseTracker={usePromiseTracker}
          color={"#5c1ac3"}
          background={"rgb(255, 255, 255)"}
        />
        {this.state.show === true &&
        this.state.user_packages &&
        this.state.user_packages.length < 1 ? (
          <React.Fragment>
            <div id="content" class="main-content">
              <div
                class=""
                style={{
                  paddingRight: "20px",
                  paddingLeft: "20px",
                  paddingBottom: "10px",
                }}
              >
                <div class="">
                  <div className="row">
                    <div className="col-md-12">
                      <div class="page-header">
                        <div class="page-title">
                          <h3>Manage Ad Packages</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="row"
                style={{ marginLeft: "0px", marginRight: "0px" }}
              >
                <div className="col-md-12">
                  <PricingPlans
                    selectPackage={this.setPackageId}
                    package_id={this.state.packageId}
                    changePage={this.pageChange}
                    accounts={this.state.accounts}
                  />
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
                <div class="footer-section f-section-2"></div>
              </div>
            </div>
          </React.Fragment>
        ) : (
          this.state.user_packages &&
          this.state.user_packages.length > 0 && (
            <React.Fragment>
              <div id="content" class="main-content">
                <div class="layout-px-spacing">
                  <div class="">
                    <div
                      className="row"
                      style={{ marginRight: "0px", marginLeft: "0px" }}
                    >
                      <div className="col-md-12">
                        <div class="page-header">
                          <div class="page-title">
                            <h3>Manage Ad Packages</h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="row"
                  style={{ marginRight: "0px", marginLeft: "0px" }}
                >
                  <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 layout-spacing">
                    <div class="widget widget-table-two">
                      <div class="widget-heading">
                        <h5 class="">Ad Package Detail</h5>
                      </div>

                      <div class="widget-content">
                        <div
                          class="table-responsive example"
                          style={{ maxheight: "35vh" }}
                        >
                          <table class="table" style={{ textAlign: "center" }}>
                            <thead>
                              <tr>
                                <th>
                                  <div class="th-content"></div>
                                </th>
                                <th>
                                  <div class="th-content">Package Name</div>
                                </th>
                                <th>
                                  <div class="th-content">Ads Remaining</div>
                                </th>
                                <th>
                                  <div class="th-content">Started At</div>
                                </th>

                                <th>
                                  <div class="th-content">Expires At</div>
                                </th>
                                <th>
                                  <div class="th-content">Status</div>
                                </th>
                              </tr>
                            </thead>

                            <tbody>
                              {this.state.user_packages &&
                                this.state.user_packages.map((pointer) => (
                                  <tr>
                                    <td>
                                      <div class="td-content product-brand">
                                        <img
                                          src="https://img.icons8.com/plasticine/100/000000/membership-card.png"
                                          alt="xxx"
                                        />
                                      </div>
                                    </td>
                                    <td>
                                      <div class="td-content product-brand">
                                        {pointer.package_name}
                                      </div>
                                    </td>
                                    <td>
                                      <div class="td-content">
                                        {pointer.ads_count}
                                      </div>
                                    </td>

                                    <td>
                                      <div class="td-content">
                                        {pointer.approvedAt
                                          ? pointer.approvedAt.substring(
                                              0,
                                              pointer.approvedAt.indexOf("T")
                                            )
                                          : "Nan"}
                                      </div>
                                    </td>
                                    <td>
                                      <div class="td-content">
                                        {pointer.expiresAt
                                          ? pointer.expiresAt.substring(
                                              0,
                                              pointer.expiresAt.indexOf("T")
                                            )
                                          : "Nan"}
                                      </div>
                                    </td>
                                    <td>
                                      <div class="td-content">
                                        {pointer.status === "Approved" ? (
                                          <span class="badge outline-badge-success">
                                            Approved
                                          </span>
                                        ) : null}
                                        {pointer.status === "Pending" ? (
                                          <span class="badge outline-badge-danger">
                                            Pending
                                          </span>
                                        ) : null}
                                        {pointer.status === "Expired" ? (
                                          <span class="badge outline-badge-dark">
                                            Expired
                                          </span>
                                        ) : null}
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 layout-spacing">
                    <div class="card" style={{ height: "192px" }}>
                      <div
                        class="card-header"
                        style={{ fontSize: "1.5vh", fontWeight: "900" }}
                      >
                        <b> Renew Package</b>
                      </div>
                      <div class="card-body">
                        {this.state.user_packages[0] &&
                          this.state.user_packages[0].status === "Approved" && (
                            <h5 className="card-title">
                              You can renew your package after it expires.
                            </h5>
                          )}
                        {this.state.user_packages[0] &&
                          this.state.user_packages[0].status === "Pending" && (
                            <h5 className="card-title">
                              You can renew your package after it expires.
                            </h5>
                          )}
                        {this.state.user_packages[0] &&
                          this.state.user_packages[0].status === "Expired" && (
                            <h5 className="card-title">
                              Your Package is Expired! Request a Renewal
                            </h5>
                          )}
                        <div style={{ marginTop: "32px" }}>
                          {this.state.user_packages[0] &&
                            this.state.user_packages[0].status ===
                              "Approved" && (
                              <button
                                to="#"
                                class="btn btn-secondary mt-2"
                                disabled
                              >
                                Request Renewal
                              </button>
                            )}

                          {this.state.user_packages[0] &&
                            this.state.user_packages[0].status ===
                              "Pending" && (
                              <button
                                to="#"
                                class="btn btn-secondary  mt-2"
                                disabled
                              >
                                Request Renewal
                              </button>
                            )}
                          {this.state.user_packages[0] &&
                            this.state.user_packages[0].status ===
                              "Expired" && (
                              <button
                                class="btn btn-secondary  mt-2"
                                onClick={() => this.requestRenewal()}
                              >
                                Request Renewal
                              </button>
                            )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 layout-spacing">
                    <div class="card">
                      <div class="card-header">Package Upgrade/Downgrade</div>
                      <div class="card-body">
                        <h5 class="card-title">
                          Currently Activated Package{" "}
                          <b>
                            "
                            {this.state.user_packages[0] &&
                              this.state.user_packages[0].package_name}
                            "
                          </b>
                        </h5>
                        <h6 class="card-title">
                          Current Package can be Upgraded/Downgraded when
                          Expired.
                        </h6>

                        {this.state.showEdit === true ? (
                          <React.Fragment>
                            <div className="d-flex">
                              <select
                                className="form-control"
                                id="package"
                                onChange={this.handleChange}
                              >
                                <option value=""> Select Package</option>
                                {this.state.all_packages.map((pointer) => (
                                  <option value={pointer._id}>
                                    {pointer.name}
                                  </option>
                                ))}
                              </select>
                              <button
                                className="btn btn-secondary mr-2 ml-2"
                                onClick={this.changePackage}
                              >
                                Request
                              </button>
                              <button
                                className="btn btn-warning"
                                onClick={() =>
                                  this.setState({ showEdit: false })
                                }
                              >
                                Cancel
                              </button>
                            </div>
                          </React.Fragment>
                        ) : (
                          <React.Fragment>
                            <button
                              className="btn btn-secondary"
                              onClick={() => this.setState({ showEdit: true })}
                              disabled={
                                this.state.user_packages[0].status !== "Expired"
                                  ? true
                                  : false
                              }
                            >
                              Change Package
                            </button>
                          </React.Fragment>
                        )}
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
                  <div class="footer-section f-section-2"></div>
                </div>
              </div>
            </React.Fragment>
          )
        )}
      </>
    );
  }
}

export default ManageAdPackages;
