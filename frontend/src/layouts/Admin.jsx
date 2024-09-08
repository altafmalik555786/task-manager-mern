import React from "react";
import PerfectScrollbar from "perfect-scrollbar";
import { Route, Switch } from "react-router-dom";
import DemoNavbar from "components/Navbars/DemoNavbar.jsx";
import Footer from "components/Footer/Footer.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";

import { ClipLoader } from "react-spinners";
import { connect } from "react-redux";

import { UserRoles } from "utils/constants";
import EmployeeRoutes from "routes/EmployeeRoutes";
import AdminRoutes from "routes/AdminRoutes";
import { constRoute } from "utils/constants";
import TaskForm from "views/screens/Task-Manager/TaskForm";

var ps;

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: "white",
      activeColor: "info",
      loading: false,
    };
    this.mainPanel = React.createRef();
  }
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.mainPanel.current);
      document.body.classList.toggle("perfect-scrollbar-on");
    }

  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
      document.body.classList.toggle("perfect-scrollbar-on");
    }
  }
  componentDidUpdate(e) {
    if (e.history.action === "PUSH") {
      this.mainPanel.current.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
    }
  }
  handleActiveClick = (color) => {
    this.setState({ activeColor: color });
  };
  handleBgClick = (color) => {
    this.setState({ backgroundColor: color });
  };
  permissions = this.props?.user?.permissions;
  hasCashierAccess = this.props?.user?.hasCashierAccess;

  hasPermission = (route) => {
    switch (route.path) {

      default:
        return true;
    }
  };

  render() {
    let isEmployee = this.props.user?.role === UserRoles.employee;

    return (
      <div>
        {this.state.loading ? (
          <div style={{ height: "50vh" }}>
            <ClipLoader size={50} color="#1A60A6" loading />
          </div>
        ) : (
          <div>
            {
              <Sidebar
                {...this.props}
                routes={isEmployee ? EmployeeRoutes : AdminRoutes}
                bgColor={this.state.backgroundColor}
                activeColor={this.state.activeColor}
              />
            }
            <div
              className={
                "main-panel d-flex flex-column justify-content-between h-100"
              }
              ref={this.mainPanel}
            >
              <DemoNavbar {...this.props} />
              <Switch>
                {false
                  ? EmployeeRoutes.map((el, key) => {
                    return el.subMenu && el.subMenu?.length > 0 ? (
                      el.subMenu.map((subMenuProp, subMenuKey) =>
                        this.hasPermission(subMenuProp.path) ? (
                          <Route
                            path={subMenuProp.layout + subMenuProp.path}
                            component={subMenuProp.component}
                            key={subMenuKey}
                            exact
                          />
                        ) : null
                      )
                    ) : this.hasPermission(el.path) ? (
                      <Route
                        path={el.layout + el.path}
                        component={el.component}
                        key={key}
                        exact
                      />
                    ) : null;
                  })
                  : AdminRoutes.map((prop, key) => {
                    return prop.subMenu && prop.subMenu?.length > 0 ? (
                      <>
                        <Route
                          path={
                            "/admin" +
                            constRoute?.tasks +
                            constRoute?.createTask
                          }
                          component={TaskForm}
                          key={constRoute?.createTask}
                          exact
                        />
                        {prop.subMenu.map((subMenuProp, subMenuKey) => (
                          <Route
                            path={subMenuProp.layout + subMenuProp.path}
                            component={subMenuProp.component}
                            key={subMenuKey}
                            exact
                          />
                        ))}
                      </>
                    ) : (
                      <Route
                        path={prop.layout + prop.path}
                        component={prop.component}
                        key={key}
                        exact
                      />
                    );
                  }
                  )}
                  
              </Switch>
              <Footer fluid />
            </div>
            {/* <FixedPlugin
          bgColor={this.state.backgroundColor}
          activeColor={this.state.activeColor}
          handleActiveClick={this.handleActiveClick}
          handleBgClick={this.handleBgClick}
        /> */}
          </div>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.login.userInfo,
  };
};
const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
