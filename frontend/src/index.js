/* eslint-disable no-unused-vars */
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import {
  NotificationContainer,
} from "react-notifications";
import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/paper-dashboard.scss?v=1.1.0";
import "assets/demo/demo.css";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import "./styles/result.css";
// import "./styles/result.css";
import "./index.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import "react-notifications/lib/notifications.css";
import AdminLayout from "layouts/Admin.jsx";
import { Provider } from "react-redux";
import store, { persistor } from "store";
import { PersistGate } from "redux-persist/integration/react";
import { loginRedirect } from "utils/helpers/helpers";
const hist = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <NotificationContainer />
      <Router history={hist}>
        <Switch>
          <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
          <Route path="/" render={loginRedirect} />
        </Switch>
      </Router>
    </PersistGate>
  </Provider>,

  document.getElementById("root")
);
