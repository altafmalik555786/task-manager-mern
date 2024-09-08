/*!

=========================================================
* Paper Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import { NavLink } from "react-router-dom";
import { Nav } from "reactstrap";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
import { Link, Redirect } from "react-router-dom";
import { UserRoles } from "utils/constants";
import { LOCAL_STORAGE_KEYS } from "utils/constants";
import classNames from "classnames";
import style from "./style.module.scss";
import LogoSideBar from "assets/img/logo.png";

var ps;

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.activeRoute.bind(this);
    this.sidebar = React.createRef();
    this.state = {
      subMenuActive: false,
    };
  }
  permissions = true; //// remove
  isAdmin = this.props?.user?.role === UserRoles.admin;
  hasCashierAccess = true; // remove
  hasCmsAccess = true; // remove

  // verifies if routeName is the one active (in browser input)
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.sidebar.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
    }
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
    }
  }
  renderCashier(prop) {
    return this.isAdmin || this.hasCashierAccess ? (
      <NavLink
        to={{
          pathname: `${prop.layout}${prop.path}`,
          state: prop.state,
        }}
        className="nav-link"
        activeClassName="active"
        exact
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={prop.icon}
            style={{
              width: "20px",
              height: "20px",
              marginRight: "10px",
            }}
            alt="icon"
          />
          <p>{prop.name}</p>
        </div>
      </NavLink>
    ) : null;
  }
  shouldRenderApplications = () => {
    return (
      this.isAdmin ||
      this.permissions?.ENR ||
      this.permissions?.ASR ||
      this.permissions?.TRP ||
      this.permissions?.UPD ||
      this.permissions?.TFD
    );
  };

  renderGroupedMenu(type, props) {
    return this.renderAdministration(props);
  }

  renderAdministration(prop) {
    return (
      <NavLink
        to={{
          pathname: `${prop.layout}${prop.path}`,
          state: prop.state,
        }}
        className={classNames(style.sideBarTab, "nav-link")}
        activeClassName={classNames(style.acitveSidebarTab, "active")}
        exact
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={
              window.location.pathname?.includes(`${prop.layout}${prop.path}`)
                ? prop.icon
                : prop.activeIcon
            }
            style={{
              width: "20px",
              height: "20px",
              marginRight: "10px",
            }}
            alt="icon"
          />
          <p className={style.sideMenuTitle}>{prop?.sideMenuTitle}</p>
        </div>
      </NavLink>
    );
    // }
  }

  renderApplications(prop) {
    if (this.isAdmin) {
      return (
        <NavLink
          to={{
            pathname: `${prop.layout}${prop.path}`,
            state: prop.state,
          }}
          className="nav-link"
          activeClassName="active"
          exact
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src={prop.icon}
              style={{
                width: "20px",
                height: "20px",
                marginRight: "10px",
              }}
              alt="icon"
            />
            <p>{prop?.sideMenuTitle}</p>
          </div>
        </NavLink>
      );
    } else {
      switch (prop.path) {
        case "/enr-applications":
          return this.permissions?.ENR ? (
            <NavLink
              to={{
                pathname: `${prop.layout}${prop.path}`,
                state: prop.state,
              }}
              className="nav-link"
              activeClassName="active"
              exact
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src={prop.icon}
                  style={{
                    width: "20px",
                    height: "20px",
                    marginRight: "10px",
                  }}
                  alt="icon"
                />
                <p>{prop.sideMenuTitle}</p>
              </div>
            </NavLink>
          ) : null;
        case "/trp-applications":
          return this.permissions?.TRP ? (
            <NavLink
              to={{
                pathname: `${prop.layout}${prop.path}`,
                state: prop.state,
              }}
              className="nav-link"
              activeClassName="active"
              exact
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src={prop.icon}
                  style={{
                    width: "20px",
                    height: "20px",
                    marginRight: "10px",
                  }}
                  alt="icon"
                />
                <p>{prop.sideMenuTitle}</p>
              </div>
            </NavLink>
          ) : null;
        case "/asr-applications":
          return this.permissions?.ASR ? (
            <NavLink
              to={{
                pathname: `${prop.layout}${prop.path}`,
                state: prop.state,
              }}
              className="nav-link"
              activeClassName="active"
              exact
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src={prop.icon}
                  style={{
                    width: "20px",
                    height: "20px",
                    marginRight: "10px",
                  }}
                  alt="icon"
                />
                <p>{prop.sideMenuTitle}</p>
              </div>
            </NavLink>
          ) : null;
        case "/update-details-applications":
          return this.permissions?.UPD ? (
            <NavLink
              to={{
                pathname: `${prop.layout}${prop.path}`,
                state: prop.state,
              }}
              className="nav-link"
              activeClassName="active"
              exact
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src={prop.icon}
                  style={{
                    width: "20px",
                    height: "20px",
                    marginRight: "10px",
                  }}
                  alt="icon"
                />
                <p>{prop.sideMenuTitle}</p>
              </div>
            </NavLink>
          ) : null;
        case "/discount-applications":
          return this.permissions?.TFD ? (
            <NavLink
              to={{
                pathname: `${prop.layout}${prop.path}`,
                state: prop.state,
              }}
              className="nav-link"
              activeClassName="active"
              exact
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src={prop.icon}
                  style={{
                    width: "20px",
                    height: "20px",
                    marginRight: "10px",
                  }}
                  alt="icon"
                />
                <p>{prop.sideMenuTitle}</p>
              </div>
            </NavLink>
          ) : null;
        case "/sch-applications":
          return this.permissions?.SCH ? (
            <NavLink
              to={{
                pathname: `${prop.layout}${prop.path}`,
                state: prop.state,
              }}
              className="nav-link"
              activeClassName="active"
              exact
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src={prop.icon}
                  style={{
                    width: "20px",
                    height: "20px",
                    marginRight: "10px",
                  }}
                  alt="icon"
                />
                <p>{prop.sideMenuTitle}</p>
              </div>
            </NavLink>
          ) : null;
        default:
          return null;
      }
    }
  }
  renderDashboard(prop) {
    return this.isAdmin ||
      this.permissions?.ENR ||
      this.permissions?.ASR ||
      this.permissions?.TRP ||
      this.permissions?.UPD ||
      this.permissions?.TFD ? (
      <NavLink
        to={{
          pathname: `${prop.layout}${prop.path}`,
          state: prop.state,
        }}
        className="nav-link"
        activeClassName="active"
        exact
        onClick={() =>
          localStorage.removeItem(LOCAL_STORAGE_KEYS.DASHBOARD_TAB)
        }
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={prop.icon}
            style={{
              width: "20px",
              height: "20px",
              marginRight: "10px",
            }}
            alt="icon"
          />
          <p>{prop.name}</p>
        </div>
      </NavLink>
    ) : null;
  }
  render() {
    const currentUser = JSON.parse(localStorage.getItem("currentUserRol"));
    return (
      <div
        className={classNames(style.mainSideBarContainer, "sidebar")}
        data-color={this.props.bgColor}
        data-active-color={this.props.activeColor}
      >
        <div className="logo d-flex justify-content-center align-items-center mt-2">
          <Link className={style.sideLogoLink} to={"/admin"}>
            <img width={50} height={50} src={LogoSideBar} className={style.JadeLgo} alt="" />
          </Link>
        </div>
        <div className="sidebar-wrapper" ref={this.sidebar}>
          {!currentUser ? (
            <Redirect to="/" />
          ) : (
            <Nav>
              <>
                {this.props.routes.map((prop, key) => {
                  return (
                    <li
                      className={
                        this.activeRoute(prop.path) +
                        (prop.pro ? " active-pro" : "")
                      }
                      key={key}
                    >
                      {prop.subMenu && this.shouldRenderApplications() ? (
                        <>
                          {prop.type == "cms" && !this.hasCmsAccess ? null : (
                            <>
                              {/* <Collapse
                                activeColor={true}
                                ghost
                                expandIcon={(panel) =>
                                  panel.isActive ? (
                                    <CaretDownFilled
                                      className="BranchColor expand-icon"
                                      style={{ opacity: 0.6 }}
                                    />
                                  ) : (
                                    <CaretRightFilled
                                      className="BranchColor expand-icon"
                                      style={{ opacity: 0.6 }}
                                    />
                                  )
                                }
                                expandIconPosition={"right"}
                                onChange={(e) =>
                                  this.setState({ subMenuActive: e.length > 0 })
                                }
                              >
                                <Panel
                                  showArrow={true}
                                  header={
                                    <div
                                      style={{ textTransform: "uppercase" }}
                                      className="nav-stages"
                                      activeclassname="active"
                                    >
                                      <div
                                        style={{
                                          display: "flex",
                                          alignItems: "center",
                                        }}
                                      >
                                        <img
                                          src={prop.icon}
                                          style={{
                                            width: "20px",
                                            height: "20px",
                                            marginRight: "10px",
                                          }}
                                          alt="icon"
                                        />
                                        <p>{prop.name}</p>
                                      </div>
                                    </div>
                                  }
                                >
                                  {prop.subMenu.map((el, i) => (
                                    <li
                                      className={
                                        this.activeRoute(el.path) +
                                        (prop.pro ? " active-pro" : "")
                                      }
                                      key={prop.path + i}
                                      style={{ marginLeft: 10 }}
                                    >
                                      {this.renderGroupedMenu(prop.type, el)}
                                    </li>
                                  ))}
                                </Panel>
                              </Collapse> */}
                              {prop.subMenu.map((el, i) => {
                                return (
                                  <li
                                    className={
                                      this.activeRoute(el.path) +
                                      (prop.pro ? " active-pro" : "")
                                    }
                                    key={prop.path + i + el?.path}
                                    style={{ marginLeft: 10 }}
                                  >
                                    {this.renderGroupedMenu(prop.type, el)}
                                  </li>
                                );
                              })}
                            </>
                          )}
                        </>
                      ) : !prop.subPath ? (
                        prop.path === "/cashier-app" ? (
                          this.renderCashier(prop)
                        ) : prop.path === "/dashboard" ? (
                          this.renderDashboard(prop)
                        ) : (
                          <NavLink
                            to={{
                              pathname: `${prop.layout}${prop.path}`,
                              state: prop.state,
                            }}
                            className="nav-link"
                            activeClassName="active"
                            exact
                          >
                            <div
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <img
                                src={prop.icon}
                                style={{
                                  width: "20px",
                                  height: "20px",
                                  marginRight: "10px",
                                }}
                                alt="icon"
                              />
                              <p>{prop.name}</p>
                            </div>
                          </NavLink>
                        )
                      ) : null}
                    </li>
                  );
                })}
              </>
            </Nav>
          )}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.login.userInfo,
  };
};

export default Sidebar;
