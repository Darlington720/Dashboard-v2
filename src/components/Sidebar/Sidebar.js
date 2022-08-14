import React from "react";
import { NavLink } from "react-router-dom";
import { Nav } from "reactstrap";
import PerfectScrollbar from "perfect-scrollbar";

// import logo from "src/logo.svg";

var ps;

function Sidebar(props) {
  const sidebar = React.useRef();
  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(sidebar.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
    }
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
    };
  });
  return (
    <div
      className="sidebar"
      data-color={props.bgColor}
      data-active-color={props.activeColor}
    >
      <div className="logo">
        {/* <a href="/dashboard" className="simple-text logo-mini">
          <div className="logo-img">
            <img src={logo} alt="react-logo" />
          </div>
        </a> */}
        <a
          href="/dashboard"
          className="simple-text"
          style={{ textAlign: "center" }}
        >
          Nkumba University
        </a>
      </div>
      {props.sidebar.map(
        (item, index) =>
          item.sidebarName && (
            <div className="sidebar-wrapper" key={index} ref={sidebar}>
              <Nav>
                {props.routes.map((prop, key) => {
                  return (
                    <li
                      className={
                        (prop.sidebarName ? activeRoute(prop.path) : "") +
                        (prop.pro ? " active-pro" : "")
                      }
                      key={key}
                    >
                      {prop.sidebarName ? (
                        <NavLink
                          to={prop.layout + prop.path}
                          className="nav-link"
                          activeClassName="active"
                        >
                          {prop.sidebarName && <i className={prop.icon} />}
                          {prop.sidebarName && <p>{prop.sidebarName}</p>}
                        </NavLink>
                      ) : (
                        ""
                      )}
                    </li>
                  );
                })}
              </Nav>
            </div>
          )
      )}
    </div>
  );
}

export default Sidebar;
