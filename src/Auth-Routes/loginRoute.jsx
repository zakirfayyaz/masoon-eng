import React from "react";
import { Route } from "react-router-dom";
import { Redirect } from "react-router-dom";
import arabicEndpoint from "./../utils/arabicEndpoint";

const LoginRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        const role = localStorage.getItem("Role");
        const token = localStorage.getItem("token");
        const lang = localStorage.getItem("lang");
        const active = localStorage.getItem("active");

        if (token) {
          if (role == null) {
            if (lang != null && lang === "en") {
              localStorage.setItem("lang", "en");
              return (
                <Redirect
                  to={{
                    pathname: "/signin",
                    state: {
                      from: props.location,
                    },
                  }}
                />
              );
            } else if (lang != null && lang === "ar") {
              localStorage.setItem("language", "ar");
              return (
                // <Redirect
                //   to={{
                //     pathname: "/ar",
                //     state: {
                //       from: props.location,
                //     },
                //   }}
                // />
                (window.location.href = `${arabicEndpoint}/ar`)
              );
            } else {
              localStorage.setItem("lang", "en");
              return (
                <Redirect
                  to={{
                    pathname: "/signin",
                    state: {
                      from: props.location,
                    },
                  }}
                />
              );
            }
          }
          if (role === "Publisher" && active && active === true) {
            if (lang === "ar") {
              return (
                // <Redirect
                //   to={{
                //     pathname: "/ar-/advertiser-dashboard",
                //     state: {
                //       from: props.location,
                //     },
                //   }}
                // />
                (window.location.href = `${arabicEndpoint}/ar-/advertiser-dashboard`)
              );
            } else {
              return (
                <Redirect
                  to={{
                    pathname: "/en-publisher/pDashboard",
                    state: {
                      from: props.location,
                    },
                  }}
                />
              );
            }
          } else if (role === "Admin" && active && active === true) {
            return (
              <Redirect
                to={{
                  pathname: "/en-admin/aDashboard",
                  state: {
                    from: props.location,
                  },
                }}
              />
            );
          } else if (role === "User") {
            return (
              <Redirect
                to={{
                  pathname: "/en/uDashboard",
                  state: {
                    from: props.location,
                  },
                }}
              />
            );
          } else if (!token && localStorage.getItem("lang") === "en") {
            return (
              <Redirect
                to={{
                  pathname: "/signin",
                  state: {
                    from: props.location,
                  },
                }}
              />
            );
          } else {
            localStorage.clear();
            return (
              <Redirect
                to={{
                  pathname: "/signin",
                  state: {
                    from: props.location,
                  },
                }}
              />
            );
          }
        } else if (!token && localStorage.getItem("lang") === "ar") {
          return (
            // <Redirect
            //   to={{
            //     pathname: "/ar",
            //     state: {
            //       from: props.location,
            //     },
            //   }}
            // />
            (window.location.href = `${arabicEndpoint}/ar`)
          );
        } else if (localStorage.getItem("lang") === "ar") {
          return (
            // <Redirect
            //   to={{
            //     pathname: "/ar",
            //     state: {
            //       from: props.location,
            //     },
            //   }}
            // />
            (window.location.href = `${arabicEndpoint}/ar`)
          );
        } else if (localStorage.getItem("lang") === "en") {
          return (
            <Redirect
              to={{
                pathname: "/signin",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        } else {
          return (
            <Redirect
              to={{
                pathname: "/signin",
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

export default LoginRoute;
