import React, { Component } from "react";
import { Link } from "react-router-dom";

class SessionTimeout extends Component {
  state = {};
  componentDidMount() {
    setTimeout(() => {
      localStorage.clear();
      window.location.href = "/";
    }, 3000);
  }
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

            <title>Session Expired</title>

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
                <h1>401</h1>
                <h2>Oops! Access Denied</h2>
                <p style={{ fontSize: "2vh" }}>
                  Your Session has Expired , please login to cntinue
                </p>
                <Link
                  to="/signin"
                  className="text-secondary"
                  onClick={() => localStorage.setItem("lang", "en")}
                >
                  Back to Login Page
                </Link>
              </div>
            </div>
          </body>
        </html>
      </React.Fragment>
    );
  }
}

export default SessionTimeout;
