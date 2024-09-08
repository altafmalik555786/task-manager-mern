import React from "react";
import style from "./style.module.scss";
import { renderItemDataOrEmptyNull } from "utils/common-functions";
import { renderStatusColor } from "utils/common-functions";
import { renderStatusBackgroundColor } from "utils/common-functions";
import { capitalizeString } from "utils/common-functions";

export const ColTextCheck = (text, toFixed = 0) => {
  return (
    <p className={style.colTextCheck}>
      {toFixed
        ? renderItemDataOrEmptyNull(text, toFixed)
        : renderItemDataOrEmptyNull(text)}
    </p>
  );
};

export const renderStatusTag = (status) => {
  return (
    <span
      style={{
        color: renderStatusColor(status),
        backgroundColor: renderStatusBackgroundColor(status),
        fontSize: "18spanx",
        padding: "5px 10px",
        borderRadius: "5px",
      }}
    >
      {" "}
      {capitalizeString(renderItemDataOrEmptyNull(status))}{" "}
    </span>
  );
};
