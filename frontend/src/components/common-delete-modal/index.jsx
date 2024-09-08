import CustomButton from "components/custom-button";
import { Row, Spin } from "antd";
import CustomModal from "components/CustomModal/CustomModal";
import React from "react";
import { renderLoader } from "utils/helpers/helpers";
import style from "./style.module.scss";

const CommonDeleteModal = ({
  visibleModal,
  handleCancel,
  title = "Delete",
  handleOk = () => {},
  loading = false,
  heading = "Are you sure!",
  para = "You are going to delete this item that will be deleted forever.",
  confimBtnTitle,
  loadingConfirmBtn,
  onClickConfirm,
  cancelBtnTitle,
  onClickCancel,
}) => {
  return (
    <CustomModal
      visibility={visibleModal}
      handleCancel={handleCancel}
      className={style.deleteModal}
      handleOk={handleOk}
      title={title}
    >
      <div className={style.commonDeleteModalContainer}>
        <Spin spinning={loading} indicator={renderLoader}>
          <Row className={style?.heading}>
            <h4>{heading}</h4>
          </Row>
          <Row className={style?.para}>
            <p> {para} </p>
          </Row>
          <Row className={style?.btnsRow}>
            {cancelBtnTitle && (
              <CustomButton
                title={cancelBtnTitle}
                onClick={onClickCancel}
              />
            )}
            {confimBtnTitle && (
              <CustomButton
                loading={loadingConfirmBtn}
                title={confimBtnTitle}
                onClick={onClickConfirm}
              />
            )}
          </Row>
        </Spin>
      </div>
    </CustomModal>
  );
};

export default CommonDeleteModal;
