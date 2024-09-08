/* eslint-disable no-unused-vars */
import { Breadcrumb, Row, Space } from "antd";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  Container,
  NavbarBrand,
} from "reactstrap";
import style from './style.module.scss'
import AdminRoutes from "routes/AdminRoutes";
import NameMap from "routes/BreadcrumbNameMap";
import classNames from 'classnames';
import { UserOutlined } from "@ant-design/icons";
import LogoutBlackIcon from 'assets/img/black/logout.png'

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      dropdownOpen: false,
      color: "transparent",
    };
    this.toggle = this.toggle.bind(this);
    this.dropdownToggle = this.dropdownToggle.bind(this);
    this.sidebarToggle = React.createRef();
  }
  toggle() {
    if (this.state.isOpen) {
      this.setState({
        color: "transparent",
      });
    } else {
      this.setState({
        color: "dark",
      });
    }
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }
  dropdownToggle(e) {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }
  getRouteName() {
    let brandName = "Dashboard";
    AdminRoutes.map((prop, key) => {
      if (window.location.href.indexOf(prop.layout + prop.path) !== -1) {
        brandName = prop.name;
      }
      return null;
    });
    return brandName;
  }
  getBreadcrumbItems() {
    const pathSnippets = this.props.location.pathname
      .split("/")
      .filter((i) => i);
    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
      return NameMap[url] ? (
        <Breadcrumb.Item className="bread-crumb-item" key={url} style={{ color: "black", fontSize: 17, cursor: "pointer" }}>
          {NameMap[url]}
        </Breadcrumb.Item>
      ) : (
        ""
      );
    });
    return extraBreadcrumbItems;
  }

  openSidebar() {
    document.documentElement.classList.toggle("nav-open");
    this.sidebarToggle.current.classList.toggle("toggled");
  }
  // function that adds color dark/transparent to the navbar on resize (this is for the collapse)
  updateColor() {
    if (window.innerWidth < 993 && this.state.isOpen) {
      this.setState({
        color: "dark",
      });
    } else {
      this.setState({
        color: "transparent",
      });
    }
  }
  componentDidMount() {
    window.addEventListener("resize", this.updateColor.bind(this));
  }

  componentDidUpdate(e) {
    if (
      window.innerWidth < 993 &&
      e.history.location.pathname !== e.location.pathname &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
      this.sidebarToggle.current.classList.toggle("toggled");
    }
  }
  handleLogout = () => {
    localStorage.clear();
    this.props.history.push("/");
  };
  handleProfile = () => {
    this.props.history.push("/admin/profileAndpassword");
  };
  render() {
    return (
      // add or remove classes depending if we are on full-screen-maps page or not
      <Navbar
        color={
          this.props.location.pathname.indexOf("full-screen-maps") !== -1
            ? "dark"
            : this.state.color
        }
        expand="lg"
        className={
          this.props.location.pathname.indexOf("full-screen-maps") !== -1
            ? ""
            : "" +
              (this.state.color === "transparent" ? "navbar-transparent " : "")
        }
      >
        <Container fluid>
          <div className="navbar-wrapper">
            <div className="navbar-toggle">
              <button
                type="button"
                ref={this.sidebarToggle}
                className="navbar-toggler navbar-toggler"
                onClick={() => this.openSidebar()}
              >
                <span className="navbar-toggler-bar bar1" />
                <span className="navbar-toggler-bar bar2" />
                <span className="navbar-toggler-bar bar3" />
              </button>
            </div>
            <Breadcrumb separator={"/"}>{this.getBreadcrumbItems()}</Breadcrumb>
          </div>
          <NavbarToggler onClick={this.toggle}>
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
          </NavbarToggler>
          <Collapse
            isOpen={this.state.isOpen}
            navbar
            className="justify-content-end"
          >
            <Nav navbar>
              {/* <Dropdown
                nav
                isOpen={this.state.dropdownOpen}
                toggle={(e) => this.dropdownToggle(e)}
              >
                <DropdownToggle caret nav>
                  <i className="nc-icon nc-single-02" />
                  Profile
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem tag="a" onClick={this.handleLogout}>
                    Logout
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown> */}
              {process.env.REACT_APP_BASE_URL ? (
                process.env.REACT_APP_BASE_URL ===
                "https://api.ens.sch.ae:8444/" ? (
                  <div
                    className={classNames(
                      style.btnDevEnv,
                      "nav-link btn-rotate"
                    )}
                    style={{
                      color: "red",
                      backgroundColor: "lightgrey",
                      borderRadius: "5px",
                      height: "40px",
                    }}
                  >
                    <i className="nc-icon nc-alert-circle-i" />
                    <b>Dev ENV</b>
                  </div>
                ) : (
                  ""
                )
              ) : (
                ""
              )}
              {this.props.user?.userName && (
                <NavItem>
                  <Link className="nav-link btn-rotate">
                    <Row
                      align={"center"}
                      justify={"space-between"}
                      style={{ width: "70px" }}
                    >
                      <UserOutlined className={style.adminIcon} />
                      <p className={style.userName}>
                        {this.props.user.userName}
                      </p>
                    </Row>
                  </Link>
                </NavItem>
              )}

              <NavItem>
                <Link
                  to="/"
                  className="nav-link btn-rotate"
                  onClick={this.handleLogout}
                >
                  <Row className={style.logoutRow}  >
                    <img  src={LogoutBlackIcon} alt="logout" />
                    <p className={style.userName}>Logout</p>
                  </Row>
                </Link>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.login.userInfo,
  };
};
export default connect(mapStateToProps, null)(Header);
