import React, { Component } from "react";
import { Link } from "react-router-dom";
import sidebarLinks from "./sidebar";
import pointingSvg from "./pointingSvg";

class AdminTopbar extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div class="sidebar-wrapper sidebar-theme">
          <nav id="compactSidebar">
            <ul class="menu-categories">
              {sidebarLinks.map((item) => (
                <li class="menu">
                  <Link
                    to="#"
                    onClick={() => this.props.history.push(item.link)}
                    class="menu-toggle"
                  >
                    <div class="base-menu">
                      <div class="base-icons"> {item.svgIcon}</div>
                      <span>{item.title}</span>
                    </div>
                  </Link>
                  {pointingSvg}
                </li>
              ))}
            </ul>
          </nav>
          <div id="compact_submenuSidebar" className="submenu-sidebar"></div>
        </div>
      </React.Fragment>
    );
  }
}

export default AdminTopbar;
