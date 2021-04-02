import React, { Component } from "react";
import AdminFooter from "./../adminLayout/adminFooter";
import BackButton from "./../../utils/backButton";
import axios from "axios";
import api_link from "../../config.json";
import { ToastContainer, toast } from "react-toastify";
import encrypt from "./../../utils/Encryption/Encrypt";
import decrypt from "./../../utils/Encryption/Decrypt";

class CreatePackageForm extends Component {
  state = { data: { type: "Manhoos" } };
  handleChange = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data });
    // console.log(this.state.data);
  };
  createPackage = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    var obj = this.state.data;
    obj = encrypt(JSON.stringify(obj));
    var response = await axios.post(
      `${api_link.API_LINK}admin/package/add`,
      { package: obj },
      {
        headers: { Authorization: token },
      }
    );
    response["data"] = JSON.parse(decrypt(response.data.resp));
    if (response.data.status === 200) {
      toast.success("Package Created Successfully", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => (window.location.href = "en-admin/ad-packages"), 3000);
    } else {
      toast.error(response.data.message, {
        position: "top-center",
        autoClose: 5000,
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
        <div id="content" class="main-content">
          <div class="" style={{ padding: "20px " }}>
            <div class="page-header">
              <div class="page-title">
                <div className="d-flex justify-content-between">
                  <BackButton />
                  <h3 style={{ paddingTop: "8px" }}>Create New Package</h3>
                </div>
              </div>
            </div>
          </div>
          <div class="row" style={{ margin: 0 }}>
            <div class="col-lg-8 m-auto">
              <div class=" widget box mb-5">
                <div class="widget-content widget-content-area icon-pill">
                  <form className="text-left" onSubmit={this.createPackage}>
                    <div className="row">
                      <div className="col-md-12">
                        <div
                          id="username-field"
                          className="field-wrapper input mt-3 mb-3"
                        >
                          <label
                            htmlFor="username"
                            className="required"
                            style={{ color: "black", fontWeight: "700" }}
                          >
                            Package Name(en)
                          </label>

                          <input
                            id="basic_days_duration"
                            name="name"
                            type="text"
                            required
                            className="form-control"
                            onChange={this.handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div
                          id="username-field"
                          className="field-wrapper input mt-3 mb-3"
                        >
                          <label
                            htmlFor="username"
                            className="required"
                            style={{ color: "black", fontWeight: "700" }}
                          >
                            Package Name(ar)
                          </label>

                          <input
                            id="basic_days_duration"
                            name="arname"
                            type="text"
                            required
                            className="form-control text-right"
                            onChange={this.handleChange}
                          />
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div
                          id="username-field"
                          className="field-wrapper input mt-3 mb-3"
                        >
                          <label
                            htmlFor="username"
                            className="required"
                            style={{ color: "black", fontWeight: "700" }}
                          >
                            Package Days Duration
                          </label>

                          <input
                            id="basic_days_duration"
                            name="duration"
                            type="number"
                            required
                            className="form-control"
                            onChange={this.handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div
                          id="username-field"
                          className="field-wrapper input mt-3 mb-3"
                        >
                          <label
                            htmlFor="username"
                            className="required"
                            style={{ color: "black", fontWeight: "700" }}
                          >
                            Ad Views
                          </label>

                          <input
                            id="basic_ad_views"
                            name="views"
                            required
                            type="number"
                            className="form-control"
                            placeholder=""
                            onChange={this.handleChange}
                          />
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div
                          id="username-field"
                          className="field-wrapper input mt-3 mb-3"
                        >
                          <label
                            htmlFor="username"
                            className="required"
                            style={{ color: "black", fontWeight: "700" }}
                          >
                            Ad Clicks
                          </label>

                          <input
                            id="basic_ad_clicks"
                            name="clicks"
                            type="number"
                            required
                            className="form-control"
                            placeholder=""
                            onChange={this.handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div
                          id="username-field"
                          className="field-wrapper input mt-3 mb-3"
                        >
                          <label
                            htmlFor="username"
                            style={{ color: "black", fontWeight: "700" }}
                            className="required"
                          >
                            Package Price
                          </label>

                          <input
                            id="basic_amount_per_ad"
                            name="amount"
                            required
                            type="number"
                            className="form-control"
                            placeholder=""
                            onChange={this.handleChange}
                          />
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div
                          id="username-field"
                          className="field-wrapper input mt-3 mb-3"
                        >
                          <label
                            htmlFor="username"
                            className="required"
                            style={{ color: "black", fontWeight: "700" }}
                          >
                            Package Description in English
                          </label>

                          <textarea
                            id="basic_description"
                            name="description"
                            type="text"
                            row="3"
                            required
                            className="form-control"
                            placeholder=""
                            onChange={this.handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div
                          id="username-field"
                          className="field-wrapper input mt-3 mb-3"
                        >
                          <label
                            htmlFor="username"
                            className="required"
                            style={{ color: "black", fontWeight: "700" }}
                          >
                            Package Description in Arabic
                          </label>

                          <textarea
                            id="basic_description"
                            name="arDescription"
                            type="text"
                            row="3"
                            required
                            className="form-control text-right"
                            placeholder=""
                            onChange={this.handleChange}
                          />
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div
                          id="username-field"
                          className="field-wrapper input mt-3 mb-3"
                        >
                          <label
                            htmlFor="username"
                            style={{ color: "black", fontWeight: "700" }}
                          >
                            Ads Per Package
                          </label>
                          <br></br>

                          <input
                            id="basic_ads_per_package"
                            name="ads_per_package"
                            required
                            type="number"
                            className="form-control"
                            placeholder=""
                            onChange={this.handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-8 m-auto">
                        <div
                          id="username-field"
                          className="field-wrapper input mt-3 mb-3"
                        >
                          <button
                            className="btn btn-block btn-lg btn-secondary"
                            type="submit"
                          >
                            {" "}
                            Add Package
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <AdminFooter />
        </div>
      </>
    );
  }
}

export default CreatePackageForm;
