import React, { Component } from "react";
import axios from "axios";
import api_link from "../../../config.json";
import Rating_Stars from "./stars";
import { Link } from "react-router-dom";
import decrypt from "./../../../utils/Encryption/Decrypt";
class RatingsTable extends Component {
  state = { total_ratings: "", ratings: "" };
  componentDidMount = async () => {
    const token = localStorage.getItem("token");
    let resp = await axios.get(api_link.API_LINK + "ratings", {
      headers: { Authorization: token },
    });
    // console.log(resp);
    resp["data"] = JSON.parse(decrypt(resp.data.resp));
    const ratings = resp["data"];

    this.setState({
      ratings: ratings,
      total_ratings: ratings.total_ratings,
      average_rating:
        ratings.average == null ? 0 : parseFloat(ratings.average.toFixed(1)),
    });
  };
  render() {
    return (
      <div class="widget widget-chart-two" style={{ height: "452px" }}>
        <div class="widget-heading">
          <h5 class="">
            User Feedback
            {Rating_Stars(
              this.state.average_rating && this.state.average_rating
            )}{" "}
            <Link
              to="/en-admin/aCollectiveFeedback"
              className="badge badge-primary mb-1"
            >
              View All
            </Link>
            <p className="mt-4">
              <b className="badge badge-warning" style={{ fontSize: "2vh" }}>
                {this.state.average_rating}
              </b>{" "}
              average based on {this.state.total_ratings} reviews.
            </p>
          </h5>
        </div>
        <div class="widget-content ml-5 mr-5 mt-4">
          <span className="text-dark">
            <b>5 Stars</b>{" "}
            <Link
              to="/en-admin/app-usage-ratings/5"
              className="badge badge-primary mb-1"
            >
              view
            </Link>
          </span>
          <span>
            <div class="progress br-30 ">
              <div
                class="progress-bar bg-success"
                role="progressbar"
                style={{
                  width:
                    (this.state.ratings.five_star_total /
                      this.state.ratings.total_ratings) *
                      100 +
                    "%",
                }}
                aria-valuenow="25"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </span>
          <span className="text-dark">
            <b>4 Stars</b>{" "}
            <Link
              to="/en-admin/app-usage-ratings/4"
              className="badge badge-primary mb-1"
            >
              view
            </Link>
          </span>
          <div class="progress br-30 ">
            <div
              class="progress-bar bg-info"
              role="progressbar"
              style={{
                width:
                  (this.state.ratings.four_star_total /
                    this.state.ratings.total_ratings) *
                    100 +
                  "%",
              }}
              aria-valuenow="25"
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
          <span className="text-dark">
            <b>3 Stars</b>{" "}
            <Link
              to="/en-admin/app-usage-ratings/3"
              className="badge badge-primary mb-1"
            >
              view
            </Link>
          </span>
          <div class="progress br-30 ">
            <div
              class="progress-bar bg-warning"
              role="progressbar"
              style={{
                width:
                  (this.state.ratings.three_star_total /
                    this.state.ratings.total_ratings) *
                    100 +
                  "%",
              }}
              aria-valuenow="25"
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
          <span className="text-dark">
            <b>2 Stars</b>{" "}
            <Link
              to="/en-admin/app-usage-ratings/2"
              className="badge badge-primary mb-1"
            >
              view
            </Link>
          </span>
          <div class="progress br-30 ">
            <div
              class="progress-bar bg-secondary"
              role="progressbar"
              style={{
                width:
                  (this.state.ratings.two_star_total /
                    this.state.ratings.total_ratings) *
                    100 +
                  "%",
              }}
              aria-valuenow="25"
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
          <span className="text-dark">
            <b>1 Stars</b>{" "}
            <Link
              to="/en-admin/app-usage-ratings/1"
              className="badge badge-primary mb-1"
            >
              view
            </Link>
          </span>
          <div class="progress br-30 ">
            <div
              class="progress-bar bg-dark"
              role="progressbar"
              style={{
                width:
                  (this.state.ratings.one_star_total /
                    this.state.ratings.total_ratings) *
                    100 +
                  "%",
              }}
              aria-valuenow="25"
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
        </div>
      </div>
    );
  }
}

export default RatingsTable;
