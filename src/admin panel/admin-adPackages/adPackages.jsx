import React, { Component } from "react";
import "./adPackages.css";
import axios from "axios";
import api_link from "../../config.json";
import AdminFooter from "./../adminLayout/adminFooter";
import ToolTipComponent from "./../../utils/tooltipComponent";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import $ from "jquery";
import decrypt from "./../../utils/Encryption/Decrypt";
import encrypt from "./../../utils/Encryption/Encrypt";
class AdPackages extends Component {
  state = {
    packages: [],
    show: false,
    data: { type: "Basic" },
    data1: { type: "Standard" },
    data2: { type: "Premium" },
    createButton: true,
    selectedId: "",
  };
  componentDidMount = async () => {
    this.getData1();
  };
  getData1 = async () => {
    const token = localStorage.getItem("token");

    try {
      var resp = await axios.get(api_link.API_LINK + "admin/package/retrive", {
        headers: { Authorization: token },
      });
      resp["data"] = JSON.parse(decrypt(resp["data"]["resp"]));
      this.setState({ packages: resp["data"]["packages"], show: true });
      if (resp["data"]["packages"].length < 1) {
        this.setState({ createButton: true });
      } else {
        this.setState({ createButton: false });
      }
      // console.log(resp);
    } catch (e) {
      // console.log(e);
    }
    if (this.state.packages.length > 0) {
      $(document).ready(function () {
        $("#packagesTables1").dataTable({});
      });
    }
  };
  getData = async () => {
    const token = localStorage.getItem("token");

    try {
      var resp = await axios.get(api_link.API_LINK + "admin/package/retrive", {
        headers: { Authorization: token },
      });
      resp["data"] = JSON.parse(decrypt(resp["data"]["resp"]));
      this.setState({ packages: resp["data"]["packages"], show: true });
      if (resp["data"]["packages"].length < 1) {
        this.setState({ createButton: true });
      } else {
        this.setState({ createButton: false });
      }
      // console.log(resp);
    } catch (e) {
      // console.log(e);
    }
  };
  handleChange = ({ currentTarget: input }) => {
    const data = {
      // duration: this.state.packages[0] && this.state.packages[0].duration,
      // amount: this.state.packages[0] && this.state.packages[0].amount,
      // clicks: this.state.packages[0] && this.state.packages[0].clicks,
      // views: this.state.packages[0] && this.state.packages[0].views,
      // description: this.state.packages[0] && this.state.packages[0].description,
      // ads_per_package: parseInt(
      //   this.state.packages[0] && this.state.packages[0].ads_per_package
      ...this.state.data,
      // ),
    };
    data[input.name] = input.value;
    this.setState({ data });
    // console.log(this.state.data);
  };
  handleChange1 = ({ currentTarget: input }) => {
    const data1 = {
      // duration: this.state.packages[1] && this.state.packages[1].duration,
      // amount: this.state.packages[1] && this.state.packages[1].amount,
      // clicks: this.state.packages[1] && this.state.packages[1].clicks,
      // views: this.state.packages[1] && this.state.packages[1].views,
      // description: this.state.packages[1] && this.state.packages[1].description,
      // ads_per_package: parseInt(
      //   this.state.packages[1] && this.state.packages[1].ads_per_package
      // ),
      ...this.state.data1,
    };
    data1[input.name] = input.value;
    this.setState({ data1 });
    // console.log(this.state.data1);
  };
  handleChange2 = ({ currentTarget: input }) => {
    const data2 = {
      // duration: this.state.packages[2] && this.state.packages[2].duration,
      // amount: this.state.packages[2] && this.state.packages[2].amount,
      // clicks: this.state.packages[2] && this.state.packages[2].clicks,
      // views: this.state.packages[2] && this.state.packages[2].views,
      // description: this.state.packages[2] && this.state.packages[2].description,
      // ads_per_package: parseInt(
      //   this.state.packages[2] && this.state.packages[2].ads_per_package
      // ),
      ...this.state.data2,
    };
    data2[input.name] = input.value;
    this.setState({ data2 });
    // console.log(this.state.data2);
  };
  updatePackage1 = async (id) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.put(
        api_link.API_LINK + "admin/package/update/" + id,
        this.state.data,
        { headers: { Authorization: token } }
      );
      // this.setState({ packages: resp["data"]["packages"], show: true });
      if (response["data"]["status"] === 200) {
        alert("Basic Package Updated");
        const data = { ...this.state.packages };
        data[0] = response["data"]["updated_package"];
        this.setState({ packages: data });
      }
      // console.log(response);
    } catch (e) {
      // console.log(e);
    }
  };
  updatePackage2 = async (id) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.put(
        api_link.API_LINK + "admin/package/update/" + id,
        this.state.data1,
        { headers: { Authorization: token } }
      );
      // this.setState({ packages: resp["data"]["packages"], show: true });
      if (response["data"]["status"] === 200) {
        alert("Standard Package Updated");
        const data = { ...this.state.packages };
        data[1] = response["data"]["updated_package"];
        this.setState({ packages: data });
      }
      // console.log(response);
    } catch (e) {
      // console.log(e);
    }
  };
  updatePackage3 = async (id) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.put(
        api_link.API_LINK + "admin/package/update/" + id,
        this.state.data2,
        { headers: { Authorization: token } }
      );
      // this.setState({ packages: resp["data"]["packages"], show: true });
      if (response["data"]["status"] === 200) {
        alert("Premium Package Updated");
        const data = { ...this.state.packages };
        data[2] = response["data"]["updated_package"];
        this.setState({ packages: data });
      }
      // console.log(response);
    } catch (e) {
      // console.log(e);
    }
  };
  createPackage = async (id) => {
    const token = localStorage.getItem("token");
    const data =
      id === 0
        ? { ...this.state.data }
        : id === 1
        ? { ...this.state.data1 }
        : { ...this.state.data2 };
    const response = await axios.post(
      api_link.API_LINK + "admin/package/add",
      data,
      { headers: { Authorization: token } }
    );
    // console.log(response);
    if (response.status === 200) {
      window.alert("Package Created");
      window.location.reload();
    }
  };

  render() {
    return (
      <React.Fragment>
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
          <div class="layout-px-spacing">
            <div className="row">
              <div className="col-8">
                <div class="page-header">
                  <div class="page-title">
                    <h3>Ad Packages Detail</h3>
                  </div>
                </div>
              </div>
              <div className="col-4 text-right">
                <button
                  className="btn btn-secondary btn-lg mt-3"
                  onClick={() =>
                    this.props.history.push("/en-admin/create-package")
                  }
                >
                  <i class="fas fa-plus"></i> Create Package
                </button>
              </div>
            </div>
            <div className="row pt-5">
              <div
                class="col-lg-12 m-auto widget box box-shadow"
                style={{ padding: "20px" }}
              >
                <div class="widget-header"></div>
                <div class="widget-content widget-content-area icon-pill">
                  <div className="">
                    <div class="table-responsive mb-4 mt-4">
                      <table
                        id="packagesTables1"
                        class="table table-hover non-hover"
                      >
                        <thead>
                          <tr>
                            <th>Package Name(en)</th>
                            <th>Package Name(ar)</th>
                            <th>Amount(SAR)</th>
                            <th>Duration</th>
                            <th>Ads Allowed</th>
                            <th>Total Clicks</th>
                            <th>Total Views</th>
                            <th>Description(en)</th>
                            <th>Description(ar)</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.packages.map((pointer) => (
                            <tr>
                              <td className="text-center">{pointer.name}</td>
                              <td className="text-center">{pointer.arname}</td>
                              <td className="text-center">{pointer.amount}</td>
                              <td className="text-center">
                                {pointer.duration}
                              </td>
                              <td className="text-center">
                                {pointer.ads_per_package}
                              </td>
                              <td className="text-center">{pointer.clicks}</td>
                              <td className="text-center">{pointer.views}</td>
                              <td className="text-center">
                                <ToolTipComponent
                                  string={pointer.description}
                                />
                              </td>
                              <td className="text-center">
                                <ToolTipComponent
                                  string={pointer.arDescription}
                                />
                              </td>
                              <td>
                                <div class="input-group-prepend">
                                  <button
                                    type="button"
                                    class="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                  >
                                    {" "}
                                    More
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
                                      class="feather feather-chevron-down"
                                    >
                                      <polyline points="6 9 12 15 18 9"></polyline>
                                    </svg>
                                  </button>
                                  <div
                                    class="dropdown-menu"
                                    style={{ willChange: "transform" }}
                                  >
                                    <Link
                                      className="dropdown-item"
                                      to={`/en-admin/edit-package/${pointer._id}`}
                                    >
                                      Edit Package{" "}
                                      <i class="fas fa-angle-right text-white"></i>
                                    </Link>
                                    <Link
                                      class="dropdown-item"
                                      to="#"
                                      data-toggle="modal"
                                      data-target="#askBeforeRemove"
                                      onClick={() =>
                                        this.setState({
                                          selectedId: pointer._id,
                                        })
                                      }
                                    >
                                      Remove Package
                                    </Link>
                                  </div>
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
            </div>
          </div>
          <AdminFooter />
        </div>
        <div
          class="modal fade"
          id="askBeforeRemove"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
          data-backdrop="static"
        >
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">
                  Alert
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <h5>Are you sure to remove this package?</h5>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-warning"
                  style={{ backgroundColor: "#e2a03f" }}
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  class="btn btn-secondary"
                  style={{ backgroundColor: "#5c1ac3" }}
                  data-dismiss="modal"
                  onClick={this.deletePackage}
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
  deletePackage = async () => {
    const id = this.state.selectedId;
    const token = localStorage.getItem("token");
    var obj = { package_id: id };
    obj = encrypt(JSON.stringify(obj));
    var response = await axios.put(
      api_link.API_LINK + "admin/package/delete-id",
      { name: obj },
      { headers: { Authorization: token } }
    );
    response["data"] = JSON.parse(decrypt(response.data.resp));
    if (response.data.status === 200) {
      toast.success("Package removed", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      this.getData();
    } else {
      toast.error(response.data.message, {
        position: "top-center",
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
}

export default AdPackages;
