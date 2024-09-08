import React, { Component } from "react";
import { Modal, Row, Col, Input, Button } from "antd";
import { ValidationRules } from "utils/validation";
import { imageBaseUrl } from "../../utils/api";
import { ClipLoader } from "react-spinners";
const { TextArea } = Input;

class DeleteModel extends Component {
  state = {};
  render() {
    const {
      showDeleteModel,
      closeDeleteModel,
      checkboxData,
      reason,
      handleReasonChange,
      handleDeleteSubmit,
      doneLoader,
    } = this.props;
    return (
      <Modal
        getContainer={false}
        className="image-modal-container"
        visible={showDeleteModel}
        // onOk={closeDeleteModel}
        onCancel={closeDeleteModel}
        footer={null}
      >
        <Row>
          <Col span={24}>
            <Row>
              {checkboxData.map((item) => (
                <Col span={9}>
                  {item?.ext.split("/")[0] === "video" ? (
                    <div className="video-tag-parent p-1">
                      <video className="video-tag">
                        <source
                          src={`${imageBaseUrl}/${item.url}`}
                          type="video/mp4"
                        ></source>
                      </video>
                    </div>
                  ) : (
                    <div className="p-1">
                      <img
                        src={`${imageBaseUrl}/${item.url}`}
                        className="dashboard-image-list"
                      />
                    </div>
                  )}
                </Col>
              ))}
            </Row>
            <TextArea
              value={reason}
              onChange={handleReasonChange}
              placeholder="Reason of deleting images"
              autoSize={{ minRows: 6, maxRows: 10 }}
            />
          </Col>
          <div className="w-100 d-flex justify-content-center mt-1">
            <Button type="primary" onClick={handleDeleteSubmit}>
              {doneLoader ? (
                <ClipLoader size={20} color="#1A60A6" loading />
              ) : (
                "Confirm"
              )}
            </Button>
          </div>
        </Row>
      </Modal>
    );
  }
}

export default DeleteModel;
