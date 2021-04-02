import React from "react";
import { Route } from "react-router-dom";
import { Redirect } from "react-router-dom";
const UserRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        const role = localStorage.getItem("Role");
        const token = localStorage.getItem("token");
        if (token && role === "User") {
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

export default UserRoute;
