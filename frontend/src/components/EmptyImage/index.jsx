import React from "react";
import { FileImageOutlined } from "@ant-design/icons";
import style from "./style.module.scss";

const EmptyImage = ({ fontSize = "40px", background = "" }) => {
  return (
    <div className={style.emptyImageContainer} style={{ background }}>
      <FileImageOutlined className={style.iconImage} style={{ fontSize }} />
    </div>
  );
};

export default EmptyImage;
