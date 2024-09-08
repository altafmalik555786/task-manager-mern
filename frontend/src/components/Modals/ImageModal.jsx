import React from "react";
import { Modal, Button, Input } from "antd";
import { imageBaseUrl } from "../../utils/api";
import { ClipLoader } from "react-spinners";

const { TextArea } = Input;

const ImageModal = ({
  handleReview,
  visible,
  handleVisible,
  type,
  finalReviewStatus,
  // setImage,
  vehicleSide,
  addReview,
  doneLoader,
  handleCheckbox,
  currentUser,

  specificFile,
}) => {
  let check = "";
  return (
    <div className="image-modal">
      <Modal
        getContainer={false}
        className="image-modal-container"
        visible={visible}
        onOk={() => handleVisible(false, null, {})}
        onCancel={() => handleVisible(false, null, {})}
        footer={false}
        // footer={[
        //   <div>
        //     {/* <TextArea
        //       placeholder="Write Review"
        //       rows={4}
        //       disabled={finalReviewStatus === 'REVIEWED' ? true : false}
        //       value={vehicleSide.comments ? vehicleSide.comments : ''}
        //       name="comments"
        //       onChange={handleChange}
        //     /> */}
        //     {finalReviewStatus !== 'REVIEWED' ? (
        //       <div className="modal-footer-btn-container">
        //         <Button
        //           className="btn-image-modal btn-image-fail"
        //           // onClick={() => {
        //           //   addReview(false);
        //           // }}
        //         >
        //           Submit
        //         </Button>
        //         {/* <Button
        //           className="btn-image-modal btn-image-pass"
        //           onClick={() => {
        //             addReview(true);
        //           }}
        //         >
        //           Pass
        //         </Button> */}
        //       </div>
        //     ) : null}
        //   </div>,
        // ]}
      >
        {type === "video" ? (
          <video width="100%" height="350" controls>
            <source src={`${imageBaseUrl}/${vehicleSide.url}`} />
          </video>
        ) : (
          <img
            src={`${imageBaseUrl}/${vehicleSide.url}`}
            className="modal-image-main"
          />
        )}
        <>
          {" "}
          <div className="d-flex justify-content-end">
            <div
              className="d-flex justify-content-between"
              style={{ width: "68px" }}
            >
              <p>
                <b>Pass</b>
              </p>
              <p>
                <b>Fail</b>
              </p>
            </div>
          </div>
          {specificFile &&
            specificFile.map((i, index) => {
              if (i.status === null) {
                check = "abc";
              }
              return (
                <div className="d-flex justify-content-between mt-2">
                  <label>{i.name}</label>
                  <div
                    style={{ width: "60px" }}
                    className="d-flex justify-content-between"
                  >
                    {/* <input type="radio" value={true} checked={i.status === 1 || i.status === true ? true : false} onChange={(e) => handleCheckbox(e, i)} /> */}
                    <label class="modal-container">
                      <input
                        type="radio"
                        value={true}
                        checked={
                          i.status === 1 || i.status === true ? true : false
                        }
                        onChange={(e) => handleCheckbox(e, i)}
                        disabled={
                          (currentUser.isMaster === false &&
                            currentUser.isAdmin === true) ||
                          (currentUser.isMaster === 0 &&
                            currentUser.isAdmin === 1) ||
                          finalReviewStatus === "REVIEWED"
                            ? true
                            : false
                        }
                      />
                      <span class="modal-checkmark"></span>
                    </label>
                    {/* <input type="radio" value={false} checked={i.status === 0 || i.status === false ? true : false} onChange={(e) => handleCheckbox(e, i)} /> */}

                    <label class="modal-container">
                      <input
                        type="radio"
                        value={false}
                        checked={
                          i.status === 0 || i.status === false ? true : false
                        }
                        onChange={(e) => handleCheckbox(e, i)}
                        disabled={
                          (currentUser.isMaster === false &&
                            currentUser.isAdmin === true) ||
                          (currentUser.isMaster === 0 &&
                            currentUser.isAdmin === 1) ||
                          finalReviewStatus === "REVIEWED"
                            ? true
                            : false
                        }
                      />
                      <span class="modal-checkmark"></span>
                    </label>
                  </div>
                </div>
              );
            })}
          <div className="d-flex justify-content-center align-items-center">
            {(currentUser.isMaster === false && currentUser.isAdmin === true) ||
            (currentUser.isMaster === 0 && currentUser.isAdmin === 1) ||
            finalReviewStatus === "REVIEWED" ? null : (
              <Button
                disabled={check !== "" ? true : false}
                type="primary"
                onClick={() => handleReview(vehicleSide.id)}
              >
                {doneLoader ? (
                  <ClipLoader size={20} color="#1A60A6" loading />
                ) : (
                  "Done"
                )}
              </Button>
            )}
          </div>
        </>
      </Modal>
    </div>
  );
};

export default ImageModal;
