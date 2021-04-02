import React from "react";
import { Route } from "react-router-dom";
import { Redirect } from "react-router-dom";

const PublisherRoute = ({ component: Component, ...rest }) => {
  //console.log(localStorage.getItem("Role"), localStorage.getItem("token"));
  return (
    <Route
      {...rest}
      render={(props) => {
        const role = localStorage.getItem("Role");
        const token = localStorage.getItem("token");
        if (token && role === "Publisher") {
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

export default PublisherRoute;
