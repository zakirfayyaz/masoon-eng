import React from "react";
import { Route } from "react-router-dom";
import { Redirect } from "react-router-dom";
// import api_link from "../config.json";
// import axios from "axios";

const AdminRoute = ({ component: Component, ...rest }) => {
  const role = localStorage.getItem("Role");
  const token = localStorage.getItem("token");

  //const response  = await axios.get(api_link.API_LINK+"admin/dashboard",{headers: { Authorization: token }})

  return (
    <Route
      {...rest}
      render={(props) => {
        if (token && role === "Admin") {
          return <Component {...rest} {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/404",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};

export default AdminRoute;
