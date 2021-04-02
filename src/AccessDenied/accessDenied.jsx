import React, { Component } from "react";
import "./accessDenied.css";
import { Link } from "react-router-dom";
import arabicEndpoint from "./../utils/arabicEndpoint";
class AccessDenied extends Component {
  state = {};
  redirect = () => {
    localStorage.setItem("lang", "en");
    var token = localStorage.getItem("token");
    var role = localStorage.getItem("Role");
    var lang = localStorage.getItem("lang");
    // console.log(token, role);
    if (token) {
      if (role === "Admin") {
        this.props.history.replace("/en-admin/aDashboard");
      } else if (role === "User") {
        this.props.history.replace("/en/uDashboard");
      } else if (role === "Publisher") {
        this.props.history.replace("/en-publisher/pDashboard");
      } else {
        this.props.history.replace("/signin");
      }
    } else {
      if (lang === "en") {
        window.location.href = "/signin";
      } else {
        window.location.href = `${arabicEndpoint}/ar`;
      }
    }
  };
  render() {
    return (
      <React.Fragment>
        <html lang="en">
          <head>
            <meta charset="utf-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />

            <title>404 Access Denied</title>

            <link
              href="https://fonts.googleapis.com/css?family=Nunito:400,700"
              rel="stylesheet"
            />
            <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
            <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
          </head>

          <body
          // className="bg_1 home-slide"
          // style={{ backgroundColor: "#35C1CF" }}
          >
            <div id="notfound">
              <div className="notfound">
                <div className="notfound-404"></div>
                <h1>404</h1>
                <h2>Oops! Access Denied</h2>
                <p>
                  Sorry you don't have permission to the page you are looking
                  for!
                </p>
                <Link to="#" onClick={this.redirect}>
                  Back to homepage
                </Link>
              </div>
            </div>
          </body>
        </html>
      </React.Fragment>
    );
  }
}

export default AccessDenied;
