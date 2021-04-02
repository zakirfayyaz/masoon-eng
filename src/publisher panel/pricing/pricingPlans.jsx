import React, { Component } from "react";
import "./pricing.css";
import { Link } from "react-router-dom";
import axios from "axios";
import api_link from "../../config.json";
import { trackPromise } from "react-promise-tracker";
import { ToastContainer, toast } from "react-toastify";
import decrypt from "./../../utils/Encryption/Decrypt";
import encrypt from "./../../utils/Encryption/Encrypt";
class PricingPlans extends Component {
  state = {
    packages: [],
    show: false,
    account: [1],
    selectedId: "",
    selectedName: "",
  };
  async componentDidMount() {
    const token = localStorage.getItem("token");

    let response = await trackPromise(
      axios.get(api_link.API_LINK + "admin/package/retrive", {
        headers: { Authorization: token },
      })
    );
    //console.log(response);
    response["data"] = JSON.parse(decrypt(response.data.resp));
    // const resp2 = await axios.get(api_link.API_LINK + "admin/package/retrive", {
    //   headers: { Authorization: token },
    // });
    // //console.log(resp2);
    this.setState({
      basic: response["data"]["packages"][0],
      standard: response["data"]["packages"][1],
      premium: response["data"]["packages"][2],
      packages: response["data"]["packages"],
    });
    this.setState({ show: true });
  }
  assignPackage = async () => {
    const token = localStorage.getItem("token");
    const package_id = this.state.selectedId;
    let resp1 = await axios.post(
      api_link.API_LINK + "notice/user-packages",
      { name: encrypt(JSON.stringify({ package_id: package_id })) },
      { headers: { Authorization: token } }
    );
    //console.log(resp1);
    resp1["data"] = JSON.parse(decrypt(resp1.data.resp));
    if (resp1["data"]["status"] === 200) {
      toast.dark("Package Requested", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  };
  render() {
    return (
      <React.Fragment>
        {this.state.show === true ? (
          <React.Fragment>
            <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={true}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
            <h3> Select A Package To Continue Posting Ads</h3>
            <div
              className="row pt-5"
              style={{ marginLeft: "0px", marginRight: "0px" }}
            >
              <div
                class="col-lg-12 m-auto widget box box-shadow"
                style={{ padding: "20px" }}
              >
                <div class="widget-header"></div>
                <div class="widget-content widget-content-area icon-pill">
                  <div className="">
                    <div class="table-responsive mb-4 mt-4">
                      <table
                        id="mydatatable2"
                        class="table table-hover non-hover"
                      >
                        <thead>
                          <tr>
                            <th>Package Name</th>
                            <th>Amount(SAR)</th>
                            <th>Duration(days)</th>
                            <th>Ads Allowed</th>
                            <th>Total Clicks</th>
                            <th>Total Views</th>
                            <th>Description</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.packages.map((pointer) => (
                            <tr>
                              <td>{pointer.name}</td>

                              <td>{pointer.amount}</td>
                              <td>{pointer.duration}</td>
                              <td>{pointer.ads_per_package}</td>
                              <td>{pointer.clicks}</td>
                              <td>{pointer.views}</td>
                              <td>{pointer.description}</td>

                              <td>
                                <Link
                                  to="#"
                                  onClick={() =>
                                    this.setState({
                                      selectedId: pointer._id,
                                      selectedName: pointer.name,
                                    })
                                  }
                                  class="btn btn-outline-secondary"
                                  data-toggle="modal"
                                  data-target="#packageConfirmation"
                                >
                                  Select
                                </Link>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </React.Fragment>
        ) : null}
        <div
          class="modal fade"
          id="packageConfirmation"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">
                  Package Select Confirmation
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={() => this.setState({ selectedId: "" })}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body" style={{ fontSize: "2vh" }}>
                You have Selected <b>{this.state.selectedName}</b> Package,
                after confirmation your request for this selection will be
                forwarded to the Admin.
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  style={{ background: "red", color: "white" }}
                  className="btn btn-md"
                  data-dismiss="modal"
                  onClick={() =>
                    this.setState({ selectedId: "", selectedName: "" })
                  }
                >
                  Cancel Selection
                </button>

                <button
                  type="button"
                  data-dismiss="modal"
                  class="btn btn-success"
                  style={{ background: "#8dbf42", color: "white" }}
                  onClick={() => this.assignPackage()}
                >
                  Confirm Selection
                </button>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default PricingPlans;
