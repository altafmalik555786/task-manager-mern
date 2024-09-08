import React from "react";
import { Modal } from "antd";
import "./style.css";

export default function CustomModal({
  visibility,
  handleOk,
  handleCancel,
  children,
  title,
  width = "",
  className = "custom-modal",
  modalSmall = false,
  destroyOnClose = true,
  
}) {
  return (
    <div>
      <Modal
        centered
        className={!modalSmall ? className : ""}
        width={width}
        title={title}
        visible={visibility}
        onOk={handleOk}
        onCancel={handleCancel}
        maskClosable={false}
        footer={null}
        destroyOnClose={destroyOnClose}
        forceRender
      >
        {children}
      </Modal>
    </div>
  );
}
