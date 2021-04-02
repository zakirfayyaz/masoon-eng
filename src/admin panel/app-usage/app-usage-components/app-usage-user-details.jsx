import React, { Component } from "react";
import $ from "jquery";
import reverseDate from "./../../../utils/reverse-date";
class AppUsageUserDetailTable extends Component {
  state = {};
  componentDidMount = async () => {
    setTimeout(() => {
      if (this.props.users.length > 0) {
        $(document).ready(function () {
          $("#userDetail").dataTable();
          $("#userDetail2").dataTable();
        });
      }
    }, 2000);
  };
  render() {
    return (
      <React.Fragment>
        <div
          class="widget widget-table-one
        "
        >
          <div class="widget-heading">
            <h5 class="">
              <span className="pl-2 badge badge-secondary pr-2 mr-2 h4">
                {this.props.count}
              </span>
              Users{" "}
            </h5>
          </div>

          {this.props.id === 1 ? (
            <div class="widget-content">
              <div class="table-responsive">
                <table class="table" id="userDetail">
                  <thead>
                    <tr>
                      <th>
                        <div class="th-content"></div>
                      </th>
                      <th>
                        <div class="th-content">User Name</div>
                      </th>
                      <th>
                        <div class="th-content">User Email</div>
                      </th>
                      {/* <th>
                        <div class="th-content">Active On</div>
                      </th> */}
                      <th>
                        <div class="th-content">Action</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.users.map((pointer) => (
                      <tr>
                        <td>
                          <div class="td-content customer-name">
                            <img
                              src="https://img.icons8.com/color/48/000000/gender-neutral-user.png"
                              alt="avatar"
                            />
                          </div>
                        </td>
                        <td>
                          <div class="td-content product-brand">
                            {pointer._id.username}
                          </div>
                        </td>
                        <td>
                          <div class="td-content">{pointer._id.user_email}</div>
                        </td>
                        {/* <td>
                          <div class="td-content pricing">
                            <span class="">
                              {pointer.time &&
                                reverseDate(
                                  pointer.time.substring(
                                    0,
                                    pointer.time.indexOf("T")
                                  )
                                )}{" "}
                              AT{" "}
                              {pointer.time.substring(
                                pointer.time.indexOf("T") + 1,
                                pointer.time.lastIndexOf(".")
                              )}
                            </span>
                          </div>
                        </td> */}
                        <td>
                          <div class="td-content">
                            <button
                              class="btn btn-secondary"
                              onClick={
                                pointer._id.roll === "Publisher"
                                  ? () =>
                                      this.props.props.history.push(
                                        "/en-admin/publisher-detail/" +
                                          pointer._id.user_id
                                      )
                                  : () =>
                                      this.props.props.history.push(
                                        "/en-admin/user-Detail/" +
                                          pointer._id.user_id
                                      )
                              }
                            >
                              SHOW DETAIL
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div class="widget-content">
              <div class="table-responsive">
                <table class="table" id="userDetail2">
                  <thead>
                    <tr>
                      <th></th>
                      <th>
                        <div class="th-content">Name</div>
                      </th>
                      <th>
                        <div class="th-content">Email</div>
                      </th>
                      <th>
                        <div class="th-content">Contact</div>
                      </th>
                      <th>
                        <div class="th-content">Role</div>
                      </th>
                      <th>
                        <div class="th-content th-heading">Joining Date</div>
                      </th>
                      <th>
                        <div class="th-content">Status</div>
                      </th>
                      <th>
                        <div class="th-content">Action</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.users.map((pointer) => (
                      <tr>
                        <td>
                          <div class="td-content customer-name">
                            <img
                              src="https://img.icons8.com/color/48/000000/gender-neutral-user.png"
                              alt="avatar"
                            />
                          </div>
                        </td>
                        <td>
                          <div class="td-content product-brand">
                            {pointer.firstname} {pointer.lastname}
                          </div>
                        </td>
                        <td>
                          <div class="td-content">{pointer.email}</div>
                        </td>
                        <td>
                          <div class="td-content">{pointer.phone_number}</div>
                        </td>
                        <td>
                          <div class="td-content pricing">
                            <span class="">{pointer.roll}</span>
                          </div>
                        </td>
                        <td>
                          <div class="td-content pricing">
                            <span class="">
                              {pointer.createdAt &&
                                reverseDate(
                                  pointer.createdAt.substring(
                                    0,
                                    pointer.createdAt.indexOf("T")
                                  )
                                )}
                            </span>
                          </div>
                        </td>
                        <td>
                          <div class="td-content">
                            {pointer.active === false ? (
                              <span class="badge outline-badge-warning">
                                Offline
                              </span>
                            ) : (
                              <span class="badge outline-badge-success">
                                Online
                              </span>
                            )}
                          </div>
                        </td>
                        <td>
                          <div class="td-content">
                            {pointer.roll === "Admin" ? (
                              <button
                                class="btn btn-secondary"
                                onClick={() =>
                                  (window.location.href = "/en-admin/aProfile")
                                }
                              >
                                SHOW DETAIL
                              </button>
                            ) : (
                              <button
                                class="btn btn-secondary"
                                onClick={
                                  pointer.roll === "Publisher"
                                    ? () =>
                                        this.props.props.history.push(
                                          "/en-admin/publisher-detail/" +
                                            pointer._id
                                        )
                                    : () =>
                                        this.props.props.history.push(
                                          "/en-admin/user-Detail/" + pointer._id
                                        )
                                }
                              >
                                SHOW DETAIL
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default AppUsageUserDetailTable;
