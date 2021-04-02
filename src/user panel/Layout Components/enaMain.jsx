import React, { Component } from "react";
import AdminTopbar from "./../../admin panel/adminLayout/adminTopbar";
import AdminNavbar from "./../../admin panel/adminLayout/adminNavbar";
import AdminRoute from "./../../Auth-Routes/adminRoute";
import axios from "axios";
import api_link from "../../config.json";
import AdminRoutes from "./adminRoutes";

class EnaMain extends Component {
  state = { show: true, loading: false };
  componentDidMount = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.get(api_link.API_LINK + "verify/user", {
        headers: { Authorization: token },
      });
      //console.log(verify);
      this.setState({ show: true });
    } catch (e) {
      localStorage.clear();
      this.props.history.replace("/session-expired");
    }
    try {
      await window.OneSignal.getUserId();
      //console.log(playerId);
    } catch (e) {
      //console.log(e);
    }
  };

  render() {
    return (
      <React.Fragment>
        <body
          class="sidebar-noneoverflow"
          style={{ background: "white", height: "100vh" }}
        >
          <AdminNavbar />
          {/*  END NAVBAR  */}

          {/*  BEGIN MAIN CONTAINER  */}
          <div class="main-container" id="container">
            <div class="overlay"></div>
            <div class="search-overlay"></div>

            <AdminTopbar history={this.props.history} />
            {/*Admin Routes*/}
            {AdminRoutes.map((route) => (
              <AdminRoute exact path={route.path} component={route.component} />
            ))}
            {/*Admin Routes*/}
          </div>
        </body>
      </React.Fragment>
    );
  }
}

export default EnaMain;
