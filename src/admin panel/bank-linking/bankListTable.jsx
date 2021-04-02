import React, { Component } from "react";
import api_link from "../../config.json";
class BankListTable extends Component {
  state = {};
  componentDidMount() {
    setTimeout(() => {
      this.setState({ actualAccount: this.props.accounts });
      // $(document).ready(function () {
      //   $("#mydatatable").dataTable({});
      // });
    }, 2000);
  }
  dynamicSearchBank = async ({ currentTarget: input }) => {
    const value = input.value.toLowerCase();
    // const searched = [];
    const actualBanks = this.props.accounts;
    //console.log(value);
    if (
      value === "" ||
      value == null ||
      value === undefined ||
      value.length === 0
    ) {
      this.setState({ actualAccount: actualBanks, searchedBanks: [] });
    } else {
      for (var k = 0; k < actualBanks.length; k++) {
        if (actualBanks[k]["name"].toLowerCase().includes(value)) {
          //console.log("Found");
        } else {
          //console.log("Not Found");
        }
      }
    }
  };
  render() {
    return (
      <React.Fragment>
        <div class="widget widget-table-one">
          <div class="widget-content">
            <div
              class="table-responsive example "
              style={{ maxHeight: "55vh" }}
            >
              <table class="table" id="mydatatable">
                <thead>
                  <tr>
                    <th>
                      <div class="th-content">Bank Logo</div>
                    </th>
                    <th>
                      <div class="th-content">Bank Name</div>
                    </th>
                    <th>
                      <div class="th-content">Bank Api Url</div>
                    </th>

                    <th>
                      <div class="th-content th-heading">Creation Date</div>
                    </th>
                    <th>
                      <div class="th-content th-heading">Edit</div>
                    </th>
                    <th>Remove</th>
                    <th>Change Status</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.searchedBanks && this.state.searchedBanks > 0
                    ? this.state.searchedBanks.map((pointer) => (
                        <tr>
                          <td>
                            <img
                              alt="avatar"
                              class="img-thumbnail"
                              src={`${api_link.GET_IMAGE}${pointer.logo}`}
                            />
                          </td>
                          <td
                            style={{
                              fontSize: "2vh",
                            }}
                          >
                            <div class="td-content customer-name">
                              {pointer.name}
                            </div>
                          </td>
                          <td
                            style={{
                              fontSize: "2vh",
                            }}
                          >
                            <div class="td-content">
                              <a
                                href={pointer.url}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {" "}
                                {pointer.url}
                              </a>
                            </div>
                          </td>
                          <td
                            style={{
                              fontSize: "2vh",
                            }}
                          >
                            <div class="td-content product-brand">
                              <span className="text-success">
                                {" "}
                                {pointer.createdAt.substring(
                                  0,
                                  pointer.createdAt.indexOf("T")
                                )}
                              </span>
                            </div>
                          </td>
                          <td>
                            <button
                              type="button"
                              class="  btn btn-outline-secondary mt-2"
                              onClick={() =>
                                this.props.renderOnEdit(pointer._id)
                              }
                            >
                              <i class="fas fa-edit pl-1 pr-1 "></i>
                            </button>
                          </td>
                          <td>
                            <button
                              type="button"
                              class="ml-2 btn btn-outline-danger"
                              onClick={() => this.props.removeBank(pointer._id)}
                            >
                              <i class="fas fa-times pl-1 pr-1"></i>
                            </button>
                          </td>
                          <td>
                            {pointer.status === "Active" ? (
                              <button
                                className="ml-2 btn btn-outline-warning "
                                onClick={() =>
                                  this.props.markAsInactive(pointer._id)
                                }
                              >
                                Mark as Inactive
                              </button>
                            ) : (
                              <button
                                className="ml-2 btn btn-outline-success"
                                onClick={() =>
                                  this.props.markAsActive(pointer._id)
                                }
                              >
                                Mark as Active
                              </button>
                            )}
                          </td>
                        </tr>
                      ))
                    : this.props.accounts.map((pointer) => (
                        <tr>
                          <td style={{ width: "15%" }}>
                            <img
                              alt="avatar"
                              src={`${api_link.GET_IMAGE}${pointer.logo}`}
                              style={{
                                height: "auto",
                                width: "100%",
                              }}
                            />
                          </td>
                          <td
                            style={{
                              fontSize: "2vh",
                            }}
                          >
                            <div class="td-content customer-name">
                              {pointer.name}
                            </div>
                          </td>
                          <td
                            style={{
                              fontSize: "2vh",
                            }}
                          >
                            <div class="td-content">{pointer.url}</div>
                          </td>
                          <td
                            style={{
                              fontSize: "2vh",
                            }}
                          >
                            <div class="td-content product-brand">
                              <span className="text-success">
                                {" "}
                                {pointer.createdAt.substring(
                                  0,
                                  pointer.createdAt.indexOf("T")
                                )}
                              </span>
                            </div>
                          </td>
                          <td>
                            <button
                              type="button"
                              class="  btn btn-outline-secondary"
                              onClick={() =>
                                this.props.renderOnEdit(pointer._id)
                              }
                            >
                              <i class="fas fa-edit pl-1 pr-1 "></i>
                            </button>
                          </td>
                          <td>
                            <button
                              type="button"
                              class="ml-2 btn btn-outline-danger"
                              onClick={() => this.props.removeBank(pointer._id)}
                            >
                              <i class="fas fa-times pl-1 pr-1"></i>
                            </button>
                          </td>
                          <td>
                            {pointer.status === "Active" ? (
                              <button
                                className="ml-2 btn btn-outline-warning"
                                onClick={() =>
                                  this.props.markAsInactive(pointer._id)
                                }
                              >
                                Mark as Inactive
                              </button>
                            ) : (
                              <button
                                className="ml-2 btn btn-outline-success"
                                onClick={() =>
                                  this.props.markAsActive(pointer._id)
                                }
                              >
                                Mark as Active
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default BankListTable;
