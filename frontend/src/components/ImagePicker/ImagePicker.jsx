import React from "react";
import { Col, Row, Image, Button, Tooltip } from "antd";
import placeholderImage from "../../assets/img/default.png";
import { DeleteOutlined } from "@ant-design/icons";

const ImagePicker = ({ file, required, label, onChooseFile, onRemoveFile }) => {
  return (
    <div style={{ margin: "1rem 0" }}>
      <Row>
        {required && <p style={{ color: "red" }}>*</p>}{" "}
        <p style={{ marginLeft: 2 }}>{label ?? "Image"}</p>
      </Row>

      <Row align="bottom" gutter={[10]}>
        <Col>{<Image width={"10rem"} src={file ?? placeholderImage} />}</Col>

        {file && onRemoveFile ? (
          <Tooltip title={"Remove Image"}>
            <Button
              onClick={onRemoveFile}
              icon={<DeleteOutlined />}
              shape={"default"}
            />
          </Tooltip>
        ) : (
          <input
            type="file"
            onChange={(e) => onChooseFile(e)}
            name="image"
            required={required && !file}
            style={{ marginLeft: 10 }}
            accept="image/png, image/gif, image/jpeg"
          />
        )}
        <br />
      </Row>
    </div>
  );
};
export default ImagePicker;
