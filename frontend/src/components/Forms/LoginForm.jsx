import React from "react";
import { Button, Form, Label, Input, FormGroup } from "reactstrap";
import { ClipLoader } from "react-spinners";
import Logo from "../../assets/img/logo.png";
import "./style.scss";

const LoginFrom = ({ isLoading, handleSubmit, handleChange }) => {
  return (
    <div className="login-container">
      <div className="login-box">
        <div className="form-wrapper">
          <div className="login-heading-container">
            <img width={60} height={60} src={Logo} alt="logo" />
            <h1 className="login-heading">Login</h1>
            <h5>Hello! Log in with your username</h5>
          </div>
          <Form onSubmit={handleSubmit} className="login-form">
            <FormGroup>
              <Label>User Name</Label>
              <Input
                className="login-input"
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label>Password</Label>
              <Input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
              />
            </FormGroup>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button className="login-form-button" onClick={handleSubmit}>
                {isLoading ? (
                  <ClipLoader size={20} color="#1A60A6" loading />
                ) : (
                  "LOG IN"
                )}
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginFrom;
