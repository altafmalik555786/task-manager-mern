import React from "react";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import styles from "./style.module.scss";


export default function TableHeader({
  onAddNew,
  headerTitle,
  headerSubTitle,
  headerBtnTitle,
  hideBtnIcon,
  headerIcon = "",
}) {
  return (
    <div className={styles.tableHeaderWrapper}>
      <div className={styles.tableWrappeInnerContainer} >
        <div className={styles.headerIconTitleContainer} >
        <img src={headerIcon} alt="" />
        <h4 className={styles.hederTitle} >{headerTitle ? headerTitle : "Applications"}</h4>
        </div>
        <p className={styles.tableHeaderSubTitle}>{headerSubTitle || ""}</p>
      </div>

      {headerBtnTitle !== "" && (
        <Button
          className={styles.headerActionBtn}
          type="primary"
          icon={hideBtnIcon ? undefined : <PlusOutlined />}
          size={"large"}
          onClick={onAddNew}
        >
          {headerBtnTitle ? headerBtnTitle : ""}
        </Button>
      )}
    </div>
  );
}
