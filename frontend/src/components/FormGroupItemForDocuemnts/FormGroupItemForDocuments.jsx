/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/alt-text */
import React, { useRef, useState } from "react";

import {
  Input,
  Form,
  Popconfirm,
  Tooltip,
  Button,
  Modal,
} from "antd";
import styles from "../UploadedDocumentListItem/style.module.css";
import defaultImg from "../../assets/img/default.png";
import checkedImg from "../../assets/img/checked.png";
import uncheckedImg from "../../assets/img/unchecked.png";
import moment from "moment";

import {
  CommentOutlined,
  SyncOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
  FilePdfOutlined,
} from "@ant-design/icons";

import { NotificationManager } from "react-notifications";

export default function FormGroupItemForDocuments(props) {
  const ref = useRef();
  const inputFile = useRef();
  const [visible, setVisible] = useState(false);
  const [profileImagePreviewState, setProfileImagePreviewState] =
    useState(null);
  const [imageView, setImageViewer] = useState(null);

  const [approveField, setApproveField] = useState(
    props.doc.status === "approved" ? true : false
  );
  const replaceImage = (e, element) => {
    inputFile.current.click();
  };

  const generateImagePreview = async (e) => {
    var file = e.target.files[0];
    if (file.type.split("/")[1] === "pdf") {
      setProfileImagePreviewState(file);
    } else {
      const objectUrl = URL.createObjectURL(file);

      setProfileImagePreviewState(objectUrl);
    }
  };

  const targetImage = (item) => {
    if (item) {
      const path = item.split(".");
      const fileName = path[path.length - 1];
      if (fileName == "pdf") {
        window.open(item);
      } else {
        setImageViewer(item);
      }
    } else {
      setImageViewer(profileImagePreviewState);
    }
  };

  const changeCheckedStatus = (
    approveField,
    name,
    formElement,
    ref,
    inputFieldRef
  ) => {
    // if (formElement.hasExpiryDate) {
    //   if (formElement.issueDate === "") {
    //     NotificationManager.error("Please enter issue date");
    //     return;
    //   }
    //   if (formElement.expiryDate === "") {
    //     NotificationManager.error("Please enter expiry date");
    //     return;
    //   }
    // }
    let newStatus = !approveField;

    setApproveField(newStatus);
    changeStatus(newStatus, name, formElement, ref, inputFieldRef);
  };

  const changeStatus = (e, name, formElement, ref, inputFieldRef) => {
    // props.switchOnChangeForParent(
    //   newStatus,
    //   name,
    //   formElement,
    //   ref,
    //   inputFieldRef
    // );
    if (e) {
      formElement.status = "approved";
      formElement.oldNote = formElement.note;
      formElement.note = "";
      ref.current.input.value = "";
      ref.current.input.disabled = true;
      ref.current.input.className =
        ref.current.input.className + " ant-input-disabled";
      ref.current.input.parentElement.className =
        ref.current.input.parentElement.className +
        " ant-input-affix-wrapper-disabled";

      props.form.setFieldsValue({ [name]: formElement });
    } else {
      formElement.status = "needAmendment";
      ref.current.input.value = formElement.oldNote ?? "";
      formElement.note = formElement.oldNote ?? "";
      ref.current.input.disabled = false;
      ref.current.input.parentElement.classList.remove(
        "ant-input-affix-wrapper-disabled"
      );
      ref.current.input.classList.remove("ant-input-disabled");
      props.form.setFieldsValue({ [name]: formElement });
    }
  };
  // check if document has dates property enabled
  const documentExpiryDate = () => {
    //if (props.doc.hasExpiryDate)
    return (
      <>
        <div
          // style={{
          //   display: "flex",
          //   width: "100%",
          //   justifyContent: "space-between",
          // }}
          className="documentExpiryDateWrapper"
        >
          <div style={{ width: "45%" }}>
            <p>Issue Date: </p>
            <Form.Item
              name={[props.doc.index, "issueDate"]}
              rules={[
                ({ getFieldValue }) => {
                  let issueDate = getFieldValue([props.doc.index, "issueDate"]);
                  return props.doc.status === "approved" ||
                    props.doc.notAvailable ||
                    props.isFieldsDisabled ||
                    !props.doc.hasExpiryDate ||
                    !issueDate.length > 0
                    ? {
                        validator: () => Promise.resolve(),
                      }
                    : {
                        validator: () => {
                          return moment(issueDate).isValid() &&
                            moment(issueDate).isAfter(
                              moment("01-01-1960"),
                              "year"
                            ) &&
                            issueDate.length >= 10
                            ? Promise.resolve()
                            : Promise.reject(
                                new Error("The entered issue date is not valid")
                              );
                          // : Promise.resolve();
                        },
                        message: "Issue date entered is not valid",
                      };
                },
              ]}
            >
              <input
                type="date"
                label={"datePicker"}
                name={[props.doc.index, "issueDate"]}
                disabled={
                  props.doc.status === "approved" ||
                  props.doc.notAvailable ||
                  props.isFieldsDisabled ||
                  !props.doc.hasExpiryDate
                    ? true
                    : false
                }
                style={{
                  color:
                    props.doc.status === "approved" ||
                    props.doc.notAvailable ||
                    props.isFieldsDisabled ||
                    !props.doc.hasExpiryDate
                      ? "lightgrey"
                      : "black",
                }}
                onChange={(e) => {
                  props.doc.issueDate = e.target.value;
                  props.form
                    .validateFields([[props.doc.index, "issueDate"]])
                    .then((res) => {})
                    .catch((e) => console.log({ e }));
                }}
              />
            </Form.Item>
          </div>
          <div style={{ width: "45%" }}>
            <p>Expiry Date: </p>
            <Form.Item
              name={[props.doc.index, "expiryDate"]}
              rules={[
                ({ getFieldValue }) => {
                  let expiryDate = getFieldValue([
                    props.doc.index,
                    "expiryDate",
                  ]);
                  return props.doc.status === "approved" ||
                    props.doc.notAvailable ||
                    props.isFieldsDisabled ||
                    !props.doc.hasExpiryDate ||
                    !expiryDate.length > 0
                    ? {
                        validator: () => Promise.resolve(),
                      }
                    : {
                        validator: () => {
                          return moment(expiryDate).isValid() &&
                            moment(expiryDate).isAfter(
                              moment("01-01-1960"),
                              "year"
                            ) &&
                            expiryDate.length >= 10
                            ? Promise.resolve()
                            : Promise.reject(
                                new Error(
                                  "The entered expiry date is not valid"
                                )
                              );
                        },
                        message: "Expiry date entered is not valid",
                      };
                },
              ]}
            >
              <input
                type="date"
                disabled={
                  props.doc.status === "approved" ||
                  props.doc.notAvailable ||
                  props.isFieldsDisabled ||
                  !props.doc.hasExpiryDate
                    ? true
                    : false
                }
                style={{
                  color:
                    props.doc.status === "approved" ||
                    props.doc.notAvailable ||
                    props.isFieldsDisabled ||
                    !props.doc.hasExpiryDate
                      ? "lightgrey"
                      : "black",
                }}
                onChange={(e) => {
                  props.doc.expiryDate = e.target.value;
                }}
              />
            </Form.Item>
          </div>
        </div>
      </>
    );
    //else return null;
  };

  // check if document has dates property enabled
  const docNotAvailable = () => {
    // if (
    //   props.doc.allowNotAvailable &&
    //   props.doc.value == "" &&
    //   props.doc.notAvailable
    // )
    return (
      <>
        <div style={{ cursor: "not-allowed" }}>
          <Form.Item name={[props.doc.index, "notAvailable"]}>
            <img
              style={{
                maxHeight: "18px",
                maxWidth: "18px",
                cursor: "not-allowed",
                opacity: 0.3,
              }}
              src={props.doc.notAvailable ? checkedImg : uncheckedImg}
            ></img>
            <span style={{ marginLeft: "5px" }}>Not Available</span>
          </Form.Item>
          <Form.Item
            name={[props.doc.index, "parentNote"]}
            rules={[
              {
                required:
                  approveField ||
                  props.doc.status == "approved" ||
                  !props.doc.notAvailable
                    ? false
                    : true,
                message: "Reason for not available document is required",
              },
            ]}
          >
            <Input
              className={styles.documentCommentTextarea}
              disabled={true}
              ref={ref}
              placeholder="Reason for not available document"
            />
          </Form.Item>
        </div>
      </>
    );
    //else return null;
  };

  const renderFiles = (item) => {
    const path = item.split(".");
    const fileName = path[path.length - 1];

    if (
      fileName === "pdf" ||
      profileImagePreviewState?.type?.split("/")[1] === "pdf"
    ) {
      return (
        <div
          // style={{ display: "flex", gap: "20px", flexDirection: "column" }}
          onClick={(e) => {
            // setVisible(true);
            targetImage(props.doc.value);
          }}
        >
          <div>
            <FilePdfOutlined style={{ fontSize: "205%", color: "red" }} />
            <br />{" "}
            <p
              style={{
                width: "105px",
                padding: "0.5rem 0.1rem 0 0",
                fontSize: "12px",
              }}
            >
              {/* {profileImagePreviewState?.name} */}
            </p>
          </div>
        </div>
      );
    } else {
      return (
        <>
          <img
            src={
              profileImagePreviewState === null &&
              (props.doc.value === "" || !props.doc.value.includes("http"))
                ? defaultImg
                : profileImagePreviewState != null
                ? profileImagePreviewState
                : props.doc.value
            }
            alt="File"
            onClick={(e) => {
              setVisible(true);
              targetImage(props.doc.value);
            }}
          />
        </>
      );
    }
  };
  const onChangeNotes = () => {
    const name = props.doc.index;
    const formElement = props.doc;
    if (ref.current.input.value.length > 0) {
      //if (formElement.status !== "needAmendment") {
      formElement.status = "needAmendment";
      formElement.note = ref.current.input.value;
      props.form.setFieldsValue({ [name]: formElement });
      //}
    } else {
      formElement.status = "submitted";
      formElement.note = "";
      props.form.setFieldsValue({ [name]: formElement });
    }
  };

  return (
    <div className={styles.uploadedDocumentItemWrapper}>
      <div className={styles.documentItemDescWrapper}>
        <div className={styles.uploadedDocumentThumbnail}>
          <Form.Item name={[props.doc.index, "value"]}>
            {renderFiles(props.doc.value)}
          </Form.Item>
          <Form.Item
            style={{ display: "none" }}
            name={[props.doc.index, "id"]}
            label={props.doc?.title}
            rules={[
              {
                required: true,
                message: `${props.doc?.title} is required   `,
              },
            ]}
          >
            <Input style={{}} placeholder="" />
          </Form.Item>
        </div>
        <div className={styles.documentItemTitle}>
          <input
            type="file"
            id="file"
            ref={inputFile}
            style={{ display: "none" }}
            onChange={(e) => {
              props.handleFileInputChange(e, props?.doc, props.doc.id);
              generateImagePreview(e);
            }}
            disabled={props.isFieldsDisabled}
          />
          <p> {props.doc?.title ? props.doc?.title : "File"}</p>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          {/* if value is null, show add new document else show replace document */}

          {props.isFieldsDisabled || approveField ? null : (
            <Popconfirm
              disabled={props.isFieldsDisabled}
              title={
                props.doc.value !== ""
                  ? "Are you sure to replace this document?"
                  : "Are you sure to replace this document?"
              }
              okText="Yes"
              cancelText="No"
              onConfirm={(e) => replaceImage(e)}
            >
              <Tooltip
                title={
                  props.doc.value !== "" ? "Replace document" : "Add document"
                }
              >
                <Button
                  disabled={props.isFieldsDisabled}
                  className="d-flex justify-content-center align-items-center"
                  shape="circle"
                  icon={
                    props.doc.value !== "" ? (
                      <SyncOutlined />
                    ) : (
                      <PlusCircleOutlined />
                    )
                  }
                />
              </Tooltip>
            </Popconfirm>
          )}
          {/* show delete button if file type is additional */}
          {props.doc.isAdditionalDocument ? (
            <Popconfirm
              title="Are you sure to delete this document?"
              okText="Yes"
              cancelText="No"
              onConfirm={() =>
                props.doc.isAdditionalDocument
                  ? props.onDelete(props.doc)
                  : NotificationManager.error(
                      "Only additional documents can be deleted!"
                    )
              }
            >
              <Tooltip title="Delete document">
                <Button
                  disabled={props.isFieldsDisabled}
                  className="d-flex justify-content-center align-items-center"
                  shape="circle"
                  icon={<DeleteOutlined />}
                />
              </Tooltip>
            </Popconfirm>
          ) : null}
        </div>
      </div>

      {documentExpiryDate()}
      {docNotAvailable()}
      <div className={styles.uploadedDocumentItemActions}>
        <Form.Item name={[props.doc.index, "status"]}>
          <img
            style={{
              maxHeight: "18px",
              maxWidth: "18px",
              cursor: props.isFieldsDisabled
                ? "not-allowed"
                : profileImagePreviewState === null &&
                  (props.doc.value === "" ||
                    !props.doc.value.includes("http")) &&
                  !props.doc.notAvailable
                ? "not-allowed"
                : "pointer",
              opacity: props.isFieldsDisabled
                ? 0.3
                : profileImagePreviewState === null &&
                  (props.doc.value === "" ||
                    !props.doc.value.includes("http")) &&
                  !props.doc.notAvailable
                ? 0.3
                : 1,
              //props.isFieldsDisabled ? 0.3 : 1,
            }}
            onClick={(e) => {
              if (
                props.isFieldsDisabled ||
                (profileImagePreviewState === null &&
                  (props.doc.value === "" ||
                    !props.doc.value.includes("http")) &&
                  !props.doc.notAvailable)
              ) {
                return;
              }
              //setApproveField(!approveField);
              changeCheckedStatus(
                approveField,
                props.doc.index,
                props.doc,
                ref
                //inputFieldRef
              );
            }}
            src={
              approveField || props.doc.status === "approved"
                ? checkedImg
                : uncheckedImg
            }
          ></img>
          <span style={{ marginLeft: "4px" }}>
            {props.doc.status === "approved" ? "Approved" : "Approve"}
          </span>
        </Form.Item>

        <Form.Item
          name={[props.doc.index, "note"]}
          rules={[
            {
              required:
                approveField ||
                props.doc.status == "approved" ||
                props.doc.status == "submitted"
                  ? false
                  : true,
              message: "Note for amendment is required",
            },
          ]}
        >
          <Input
            className={styles.documentCommentTextarea}
            disabled={
              props.doc.status === "approved" || props.isFieldsDisabled
                ? true
                : false
            }
            ref={ref}
            placeholder="Add note for amendment"
            prefix={<CommentOutlined />}
            onChange={onChangeNotes}
          />
        </Form.Item>

        <Form.Item name={[props.doc.index, "adminNote"]}>
          <Input
            className={styles.documentCommentTextarea}
            disabled={
              props.doc.status === "approved" || props.isFieldsDisabled
                ? true
                : false
            }
            ref={ref}
            placeholder="Notes by the admin (optional)"
            prefix={<CommentOutlined />}
          />
        </Form.Item>
      </div>
      <Modal
        getContainer={false}
        className="image-previewer-modal"
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        {imageView ? (
          <img src={imageView} width={"100%"} height={"100%"} alt="file" />
        ) : (
          <img src={defaultImg} width={"100%"} height={"100%"} alt="file" />
        )}
      </Modal>
    </div>
  );
}
