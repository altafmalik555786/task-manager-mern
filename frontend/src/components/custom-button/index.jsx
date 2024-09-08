import React from "react";
import { Button } from "antd";
import style from "./style.module.scss";
import classNames from "classnames";

const CustomButton = (props) => {
  const { variant = "secondary" } = props;

  return (
    <Button
      className={classNames(
        variant === "secondary"
          ? style.secondaryBtn
          : variant === "primary"
          ? style.primary
          : variant === "three"
          ? style.three
          : variant === "two"
          ? style.two
          : variant === "one"
          ? style.one
          : style.simpleBtn,
        props.className
      )}
      block={props.block}
      danger={props.danger}
      disabled={props.disabled || props.loading}
      ghost={props.ghost}
      href={props.href}
      htmlType={props.htmlType}
      icon={props.icon}
      loading={props.loading}
      shape={props.shape}
      style={props.style}
      size={props.size}
      target={props.target}
      type={props.type}
      onClick={props.onClick}
    >
      {props.startData || ""} {props.title} {props.endData || ""}
    </Button>
  );
};

export default CustomButton;
