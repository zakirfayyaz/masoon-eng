import React, { Component } from "react";
import PublisherSidebar from "./publisherSidebar";
import PublisherNavbar from "./publisherNavbar";
import PublisherRoute from "./../Auth-Routes/publisherRoute";
import axios from "axios";
import api_link from "../config.json";
import publisherRoutes from "./publisherRoutes";
class PublisherLayout extends Component {
  state = { show: true };
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
      <html className>
        {this.state.show === true ? (
          <body className="" style={{ background: "white", height: "100vh" }}>
            <PublisherNavbar />
            <div className="main-container" id="container">
              <div className="overlay"></div>
              <div clasName="search-overlay"></div>
              <div className="sidebar-wrapper sidebar-theme">
                <PublisherSidebar history={this.props.history} />
              </div>
              {/*Publisher Routes Goes Here */}
              {publisherRoutes.map((route) => (
                <PublisherRoute path={route.path} component={route.component} />
              ))}
            </div>
          </body>
        ) : null}
      </html>
    );
  }
}

export default PublisherLayout;
