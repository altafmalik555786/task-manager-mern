/* eslint-disable eqeqeq */
import React from "react";
import Login from "../components/Forms/LoginForm.jsx";
import { login } from "../apis/login-apis/login-user-api";
import { NotificationContainer } from "react-notifications";
import { requestErrorHandel } from "utils/helpers/helpers";
import { _setLoginUser } from "actions/auth/authAction.js";
import { connect } from "react-redux";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }
  
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const params = {
        email: this.state.email,
        password: this.state.password,
      };
      this.setState({
        isLoading: true,
      });
      const response = await login(params);
       if (response.status == 200 && response.data) {
        console.log("resposne login", response)
        localStorage.setItem(
          "userToken",
          JSON.stringify(response.data.data?.token)
        );
        localStorage.setItem(
          "currentUserRol",
          JSON.stringify("admin")
        );
        this.props.setUserInfo({
          role: "admin",
          userName: response.data.data?.name,
        });
        this.props.history.push("/admin/tasks");
      }
    } catch (error) {
      this.setState({
        isLoading: false,
      });

      await requestErrorHandel({ error });
    }
  };
  render() {

    return (
      <>
        <Login
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          isLoading={this.state.isLoading}
        />
        <NotificationContainer />
      </>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  setUserInfo: (payload) => dispatch(_setLoginUser(payload)),
});

export default connect(null, mapDispatchToProps)(LoginForm);
