import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  if (localStorage.getItem("token") && localStorage.getItem("Role")) {
    return (
      <Route {...rest} render={(props) => <Component {...rest} {...props} />} />
    );
  } else {
    return <Redirect to="/" />;
  }
};

export default ProtectedRoute;
