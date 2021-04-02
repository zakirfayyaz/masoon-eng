import React, { Component } from "react";
import { Link } from "react-router-dom";
import sideBarLinks from "./publisher profile/sidebarLinks";
import sideBarPointer from "./sidebarPointer";
class PublisherSidebar extends Component {
  state = {};
  render() {
    return (
      <div className="sidebar-wrapper sidebar-theme">
        <nav id="compactSidebar">
          <ul className="menu-categories ps--scrolling-y">
            {sideBarLinks.map((item) => (
              <li className="menu">
                <Link
                  to="#"
                  onClick={() => {
                    this.props.history.push(item.link);
                  }}
                  className="menu-toggle"
                >
                  <div className="base-menu">
                    <div className="base-icons">{item.svgIcon}</div>
                    <span>{item.title}</span>
                  </div>
                </Link>
                {sideBarPointer}
              </li>
            ))}
          </ul>
        </nav>
        <div id="compact_submenuSidebar" className="submenu-sidebar"></div>
      </div>
    );
  }
}

export default PublisherSidebar;
