import React, { Component } from "react";
import axios from "axios";
import api_link from "../../config.json";
import { ToastContainer, toast } from "react-toastify";
import { trackPromise } from "react-promise-tracker";
import { usePromiseTracker } from "react-promise-tracker";
import Loader from "react-promise-loader";
import "datatables.net-dt/js/dataTables.dataTables";
// import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import decrypt from "./../../utils/Encryption/Decrypt";
import encrypt from "./../../utils/Encryption/Encrypt";
class ManageCategories extends Component {
  state = {
    showSubs: false,
    modalOneHeading: "Add Category",
    categories: [],
    subcategories: [],
    icon_tag: null,
  };
  componentDidMount = async () => {
    this.getCategories1();
  };
  addCategory = async () => {
    const token = localStorage.getItem("token");
    const value = document.getElementById("category").value;
    const value2 = document.getElementById("arcategory").value;
    // const icon_link = document.getElementById("icon_link").value;
    const icon_link = "test icon";

    if (
      value == null ||
      value === "" ||
      value === undefined ||
      value2 == null ||
      value2 === "" ||
      value2 === undefined
    ) {
      toast.error("Category name is required", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      let response = await axios.post(
        api_link.API_LINK + "category",
        {
          cat: encrypt(
            JSON.stringify({ name: value, arname: value2, icon_link })
          ),
        },
        { headers: { Authorization: token } }
      );
      // console.log(response);
      response["data"] = JSON.parse(decrypt(response.data.resp));
      if (response["data"]["status"] === 200) {
        toast.dark("New Category Added", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        this.getCategories();
        window.$("#addCategory").modal("hide");
        this.clearInput();
        this.setState({ icon_tag: null });
      } else if (response["data"]["status"] === 400) {
        toast.error(response["data"]["message"], {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };
  clearInput = () => {
    document.getElementById("category").value = "";
    document.getElementById("subcategory").value = "";
    document.getElementById("arcategory").value = "";
    document.getElementById("arsubcategory").value = "";
    document.getElementById("editcategory").value = "";
    document.getElementById("editsubcategory").value = "";
    // document.getElementById("icon_link").value = "";
    // document.getElementById("edit_icon_link").value = "";
    this.setState({ icon_tag: null });
  };
  getCategories1 = async () => {
    const token = localStorage.getItem("token");
    let response = await trackPromise(
      axios.get(api_link.API_LINK + "admin/categories/get", {
        headers: { Authorization: token },
      })
    );
    response["data"] = JSON.parse(decrypt(response.data.resp));
    // console.log(response);
    this.setState({ categories: response["data"]["data"] });
    if (this.state.categories.length > 0) {
      $(document).ready(function () {
        $("#mydatatable").dataTable({});
      });
    }
  };
  getCategories = async () => {
    const token = localStorage.getItem("token");
    let response = await trackPromise(
      axios.get(api_link.API_LINK + "admin/categories/get", {
        headers: { Authorization: token },
      })
    );
    // console.log(response);
    response["data"] = JSON.parse(decrypt(response.data.resp));
    this.setState({ categories: response["data"]["data"] });
  };
  editCategory = async () => {
    const token = localStorage.getItem("token");
    const value = document.getElementById("editcategory").value;
    const value2 = document.getElementById("areditcategory").value;
    // const icon_link = document.getElementById("edit_icon_link").value;
    const icon_link = "no icon";
    if (value == null || value === "" || value === undefined) {
      toast.error("Category name is required", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      let response = await trackPromise(
        axios.put(
          api_link.API_LINK + "category/update-id",
          {
            name: encrypt(
              JSON.stringify({
                name: value,
                arname: value2,
                icon_link: icon_link,
              })
            ),
            cat_id: encrypt(JSON.stringify({ id: this.state.catIdToEdit })),
          },
          { headers: { Authorization: token } }
        )
      );
      response["data"] = JSON.parse(decrypt(response.data.resp));
      if (response["data"]["status"] === 200) {
        toast.dark("Category name is updated", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        this.getCategories();
        window.$("#editCategory").modal("hide");
        this.clearInput();
      }
    }
  };
  removeCategory = async (id) => {
    const token = localStorage.getItem("token");
    const response = await trackPromise(
      axios.delete(api_link.API_LINK + "category/remove/" + id, {
        headers: { Authorization: token },
      })
    );
    if (response["data"]["status"] === 200) {
      toast.dark("Category name is removed", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      this.getCategories();

      window.$("#removeCategory").modal("hide");
      this.clearInput();
    }
  };
  getSubCategories = async (id) => {
    const token = localStorage.getItem("token");
    let response = await axios.put(
      api_link.API_LINK + "admin/subcategories/get-id",
      { name: encrypt(JSON.stringify({ name: id })) },
      { headers: { Authorization: token } }
    );
    // console.log(response);
    response["data"] = JSON.parse(decrypt(response.data.resp));
    this.setState({ subcategories: response["data"]["data"] });
  };
  addSubCategory = async () => {
    const token = localStorage.getItem("token");
    const value = document.getElementById("subcategory").value;
    const value2 = document.getElementById("arsubcategory").value;
    if (
      value == null ||
      value === "" ||
      value === undefined ||
      value2 == null ||
      value2 === "" ||
      value2 === undefined
    ) {
      toast.error("SubCategory name is required", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      let response = await axios.post(
        api_link.API_LINK + "category/subcategory",
        {
          sub_cat: encrypt(
            JSON.stringify({
              name: value,
              category_id: this.state.catSubsIdToView,
              arname: value2,
            })
          ),
        },
        { headers: { Authorization: token } }
      );
      response["data"] = JSON.parse(decrypt(response.data.resp));
      if (response["data"]["status"] === 200) {
        toast.dark("SubCategory is added", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        this.getSubCategories(this.state.catSubsIdToView);
        window.$("#addSubCategory").modal("hide");
        this.clearInput();
      } else {
        toast.error(response["data"]["message"], {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };
  removeSubCategory = async (id) => {
    const token = localStorage.getItem("token");
    const response = await axios.delete(
      api_link.API_LINK + "category/remove/sub/" + id,
      { headers: { Authorization: token } }
    );
    if (response["data"]["status"] === 200) {
      toast.dark("Sub Category removed", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      this.getSubCategories(this.state.catSubsIdToView);

      window.$("#removeSubCategory").modal("hide");
      this.clearInput();
    } else {
      toast.error("Error", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  editSubCategory = async () => {
    const token = localStorage.getItem("token");
    const value = document.getElementById("editsubcategory").value;
    const value2 = document.getElementById("areditsubcategory").value;
    if (value == null || value === "" || value === undefined) {
      toast.error("Category name is required", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      const response = await axios.put(
        api_link.API_LINK + "category/update/sub-id",
        {
          name: encrypt(JSON.stringify({ name: value, arname: value2 })),
          subcat_id: encrypt(JSON.stringify({ id: this.state.editSubCatId })),
        },
        { headers: { Authorization: token } }
      );
      response["data"] = JSON.parse(decrypt(response.data.resp));
      if (response["data"]["status"] === 200) {
        toast.dark("Sub Category Updated", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        this.getSubCategories(this.state.catSubsIdToView);

        window.$("#editSubCategory").modal("hide");
        this.clearInput();
      } else {
        toast.error(response["data"]["message"], {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
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
            <div class="">
              <div className="row">
                <div className="col-md-12">
                  <div class="page-header">
                    <div class="page-title">
                      <h3>Categories & Sub Categories</h3>
                    </div>
                  </div>
                </div>
              </div>

              <React.Fragment>
                <div class="row layout-top-spacing">
                  <div className="col-lg-6 col-md-12 col-sm-12 mt-3">
                    <div class="widget widget-table-one">
                      <div class="widget-heading">
                        <h5
                          class="justify-content-between"
                          style={{ paddingTop: "7px" }}
                        >
                          {" "}
                          Total Categories :{" "}
                          <span
                            className="badge badge-secondary py-auto px-auto"
                            style={{
                              fontSize: "16px",
                            }}
                          >
                            {this.state.categories.length}
                          </span>
                        </h5>

                        <button
                          className="ml-auto btn btn-secondary"
                          type="button"
                          style={{ textAlign: "center" }}
                          data-toggle="modal"
                          data-target="#addCategory"
                        >
                          <i class="fas fa-plus-circle"></i> Add New Category
                        </button>
                      </div>

                      <div class="widget-content">
                        <div class="table-responsive">
                          <table
                            class=" table"
                            id="mydatatable"
                            data-turbolinks="false"
                            style={{ textAlign: "center" }}
                          >
                            <thead>
                              <tr style={{ textAlign: "center" }}>
                                <th>
                                  <div class="th-content"></div>
                                </th>
                                <th>
                                  <div class="th-content">Category Name</div>
                                </th>
                                <th>
                                  <div class="th-content">
                                    Category Name(Arabic)
                                  </div>
                                </th>
                                <th>
                                  <div
                                    class="th-content"
                                    style={{ textAlign: "center" }}
                                  >
                                    Edit
                                  </div>
                                </th>
                                <th>
                                  <div
                                    class="th-content"
                                    style={{ textAlign: "center" }}
                                  >
                                    View
                                  </div>
                                </th>
                                {/* <th>
                                  <div
                                    class="th-content"
                                    style={{ textAlign: "center" }}
                                  >
                                    Delete
                                  </div>
                                </th> */}
                              </tr>
                            </thead>
                            <tbody>
                              {this.state.categories.length > 0 &&
                                this.state.categories.map((pointer) => (
                                  <tr>
                                    <td>
                                      <div class="td-content customer-name">
                                        {/* <img
                                          style={{ height: "45px" }}
                                          src={pointer.icon_link}
                                        /> */}
                                        <i
                                          class="fas fa-dot-circle"
                                          style={{ color: "#5c1ac3" }}
                                        ></i>
                                      </div>
                                    </td>
                                    <td style={{ textAlign: "left" }}>
                                      <div class="td-content product-brand">
                                        {pointer.name}
                                      </div>
                                    </td>
                                    <td style={{ textAlign: "center" }}>
                                      <div class="td-content product-brand">
                                        {pointer.arname}
                                      </div>
                                    </td>
                                    <td style={{ textAlign: "center" }}>
                                      <div class="td-content">
                                        <span>
                                          <button
                                            className="btn btn-secondary"
                                            // data-toggle="tooltip"
                                            data-placement="top"
                                            title="Edit Category"
                                            type="button"
                                            data-toggle="modal"
                                            data-target="#editCategory"
                                            onClick={() =>
                                              this.setState({
                                                catNameToEdit: pointer.name,
                                                catIdToEdit: pointer._id,
                                                arCatNameToEdit: pointer.arname,
                                                catLinkToEdit:
                                                  pointer.icon_link,
                                              })
                                            }
                                          >
                                            <i class="fas fa-edit"></i>
                                          </button>
                                        </span>
                                      </div>
                                    </td>
                                    <td>
                                      <span>
                                        <button
                                          className="btn btn-primary mr-1 ml-1"
                                          data-toggle="tooltip"
                                          data-placement="top"
                                          title="View Sub-Categories"
                                          onClick={() => {
                                            this.setState({
                                              showSubs: true,
                                              catSubsToView: pointer.name,
                                              catSubsIdToView: pointer._id,
                                            });
                                            this.getSubCategories(pointer._id);
                                          }}
                                        >
                                          <i class="fas fa-eye"></i>
                                        </button>
                                      </span>
                                    </td>
                                    {/* <td>
                                    <span>
                                      <button
                                        className="btn btn-danger"
                                      
                                        data-placement="top"
                                        title="Remove Category"
                                        type="button"
                                        data-toggle="modal"
                                        data-target="#removeCategory"
                                        
                                        onClick={() =>
                                          this.setState({
                                            idToRemove: pointer._id,
                                          })
                                        }
                                      >
                                        <i class="fas fa-times-circle"></i>
                                      </button>
                                    </span>
                                  </td> */}
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                  {this.state.showSubs === true ? (
                    <div className="col-lg-6 col-md-12 col-sm-12 mt-3">
                      <div class="widget widget-table-one">
                        <div class="widget-heading">
                          <h5 class="">
                            {" "}
                            Sub-Categories of {this.state.catSubsToView}
                          </h5>
                          <button
                            className="ml-auto btn btn-secondary ml-auto mr-2"
                            type="button"
                            data-toggle="modal"
                            data-target="#addSubCategory"
                          >
                            ADD
                          </button>
                          <button
                            className=" btn btn-danger"
                            type="button"
                            onClick={() => this.setState({ showSubs: false })}
                          >
                            Close
                          </button>
                        </div>

                        <div class="widget-content">
                          <div class="table-responsive">
                            <table class="table" id="mydatatable">
                              <thead>
                                <tr>
                                  <th>
                                    <div class="th-content"></div>
                                  </th>
                                  <th>
                                    <div
                                      class="th-content"
                                      // style={{ textAlign: "right" }}
                                    >
                                      Category Name
                                    </div>
                                  </th>
                                  <th>
                                    <div class="th-content">
                                      Category Name(Arabic)
                                    </div>
                                  </th>
                                  <th>
                                    <div class="th-content">Edit</div>
                                  </th>
                                  {/* <th>
                                    <div class="th-content">Delete</div>
                                  </th> */}
                                </tr>
                              </thead>
                              <tbody>
                                {this.state.subcategories.map((pointer) => (
                                  <tr>
                                    <td>
                                      <div class="td-content customer-name">
                                        <i
                                          class="fas fa-dot-circle"
                                          style={{ color: "#5c1ac3" }}
                                        ></i>
                                      </div>
                                    </td>
                                    <td>
                                      <div class="td-content product-brand">
                                        {pointer.name}
                                      </div>
                                    </td>
                                    <td>
                                      <div
                                        class="td-content product-brand"
                                        style={{ textAlign: "center" }}
                                      >
                                        {pointer.arname}
                                      </div>
                                    </td>
                                    <td>
                                      <div class="td-content">
                                        {" "}
                                        <span>
                                          <button
                                            className="btn btn-secondary mr-2"
                                            // data-toggle="tooltip"
                                            data-placement="top"
                                            title="Edit Category"
                                            type="button"
                                            data-toggle="modal"
                                            data-target="#editSubCategory"
                                            onClick={() =>
                                              this.setState({
                                                editSubCatId: pointer._id,
                                                editSubCatName: pointer.name,
                                                arEditSubCatName:
                                                  pointer.arname,
                                              })
                                            }
                                          >
                                            <i class="fas fa-edit"></i>
                                          </button>
                                        </span>
                                      </div>
                                    </td>
                                    {/* <td>
                                      <span>
                                        <button
                                          className="btn btn-danger"
                                          //   data-toggle="tooltip"
                                          data-placement="top"
                                          title="Remove Category"
                                          type="button"
                                          data-toggle="modal"
                                          data-target="#removeSubCategory"
                                          onClick={() =>
                                            this.setState({
                                              removeSubCatId: pointer._id,
                                            })
                                          }
                                        >
                                          <i class="fas fa-times-circle"></i>
                                        </button>
                                      </span>
                                    </td> */}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              </React.Fragment>
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
        {/*Modals*/}
        {/*ADD CATEGORY */}
        <div
          class="modal fade"
          id="addCategory"
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
                  {this.state.modalOneHeading}
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  onClick={() => this.clearInput()}
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="form-group">
                  {/* <label for="exampleInputEmail1">Icon Link</label>
                  <div class="d-flex">
                    <input
                      type="text"
                      id="icon_link"
                      class="form-control"
                      aria-describedby="emailHelp"
                      placeholder="Link"
                      onChange={this.handleIconChange}
                    />
                    {this.state.icon_tag !== null ? (
                      <>
                        {" "}
                        <img
                          style={{ height: "45px" }}
                          src={this.state.icon_tag}
                        />
                      </>
                    ) : null}
                  </div> */}
                  <label for="exampleInputEmail1">Category Name</label>

                  <input
                    type="text"
                    class="form-control"
                    id="category"
                    aria-describedby="emailHelp"
                    placeholder="e.g: Utilities "
                  />
                  <label for="exampleInputEmail1">
                    Category Name in Arabic
                  </label>

                  <input
                    type="text"
                    class="form-control"
                    style={{ textAlign: "right" }}
                    id="arcategory"
                    aria-describedby="emailHelp"
                  />
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn"
                  style={{ color: "white", background: "#5c1ac3" }}
                  onClick={this.addCategory}
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
        {/*ADD SUBCATEGORY */}
        <div
          class="modal fade"
          id="addSubCategory"
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
                  Add Sub-Category for {this.state.catSubsToView}
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  onClick={() => this.clearInput()}
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="form-group">
                  <label for="exampleInputEmail1">Sub Category Name</label>

                  <input
                    type="text"
                    class="form-control"
                    id="subcategory"
                    aria-describedby="emailHelp"
                    placeholder="e.g: Electricity "
                  />
                  <label for="exampleInputEmail1">
                    Sub Category Name in Arabic
                  </label>

                  <input
                    type="text"
                    class="form-control"
                    style={{ textAlign: "right" }}
                    id="arsubcategory"
                    aria-describedby="emailHelp"
                  />
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn"
                  style={{ color: "white", background: "#5c1ac3" }}
                  onClick={this.addSubCategory}
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>

        {/*Edit CATEGORY */}
        <div
          class="modal fade"
          id="editCategory"
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
                  Edit Category
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  // onClick={() => this.clearInput()}
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="form-group">
                  {/* <div className="d-flex">
                    <label for="exampleInputEmail1">Current Icon</label>
                    <img
                      style={{ height: "40px" }}
                      src={this.state.catLinkToEdit}
                    />
                  </div>
                  <label for="exampleInputEmail1">Icon Link</label>

                  <input
                    type="text"
                    class="form-control"
                    id="edit_icon_link"
                    aria-describedby="emailHelp"
                    // defaultValue={this.state.catLinkToEdit}
                    onChange={this.handleIconChange}
                  /> */}

                  <label for="exampleInputEmail1">Category Name</label>

                  <input
                    type="text"
                    class="form-control"
                    id="editcategory"
                    aria-describedby="emailHelp"
                    defaultValue={this.state.catNameToEdit}
                  />
                  <label for="exampleInputEmail1">
                    Category Name in Arabic
                  </label>

                  <input
                    type="text"
                    class="form-control"
                    id="areditcategory"
                    aria-describedby="emailHelp"
                    defaultValue={this.state.arCatNameToEdit}
                  />
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn"
                  style={{ color: "white", background: "#5c1ac3" }}
                  onClick={this.editCategory}
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
        {/*Edit SUBCATEGORY */}
        <div
          class="modal fade"
          id="editSubCategory"
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
                  Edit Sub-Category
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  // onClick={() => this.clearInput()}
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="form-group">
                  <label for="exampleInputEmail1">Sub Category Name</label>

                  <input
                    type="text"
                    class="form-control"
                    id="editsubcategory"
                    defaultValue={this.state.editSubCatName}
                  />
                  <label for="exampleInputEmail1">
                    Sub Category Name in Arabic
                  </label>

                  <input
                    type="text"
                    class="form-control"
                    id="areditsubcategory"
                    defaultValue={this.state.arEditSubCatName}
                  />
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn"
                  style={{ color: "white", background: "#5c1ac3" }}
                  onClick={this.editSubCategory}
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>

        {/*Remove CATEGORY */}
        <div
          class="modal fade"
          id="removeCategory"
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
                  onClick={() => this.setState({ idToRemove: null })}
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="form-group">
                  <p style={{ fontSize: "2vh" }}>
                    Are you sure that you want to remove this category ,
                    removing this category will cause the removal of
                    sub-categories linked to it.
                  </p>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn"
                  style={{ color: "white", background: "#5c1ac3" }}
                  onClick={() => this.removeCategory(this.state.idToRemove)}
                >
                  Confirm
                </button>
                <button
                  type="button"
                  class="btn"
                  data-dismiss="modal"
                  style={{ color: "white", background: "#e7515a" }}
                  onClick={() => this.setState({ idToRemove: null })}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
        {/*Remove SUBCATEGORY */}
        <div
          class="modal fade"
          id="removeSubCategory"
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
                  onClick={() => this.setState({ idToRemove: null })}
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="form-group">
                  <p style={{ fontSize: "2vh" }}>
                    Are you sure that you want to remove this sub-category ?
                    This action is irreversible.
                  </p>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn"
                  style={{ color: "white", background: "#5c1ac3" }}
                  onClick={() =>
                    this.removeSubCategory(this.state.removeSubCatId)
                  }
                >
                  Confirm
                </button>
                <button
                  type="button"
                  class="btn"
                  data-dismiss="modal"
                  style={{ color: "white", background: "#e7515a" }}
                  onClick={() => this.setState({ removeSubCatId: null })}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
  handleIconChange = async ({ currentTarget: input }) => {
    const value = input.value.toString();
    // console.log(value);
    const value2 = value.substring(value.indexOf("h"), value.lastIndexOf('"'));
    // console.log(value2);
    document.getElementById("icon_link").value = value2;
    document.getElementById("edit_icon_link").value = value2;
    this.setState({ icon_tag: value2, catLinkToEdit: value2 });
  };
}

export default ManageCategories;
