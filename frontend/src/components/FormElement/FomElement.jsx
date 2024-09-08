import React from "react";
import { Input, Form, Checkbox, Row, Col } from "antd";
import { CommentOutlined } from "@ant-design/icons";

const componentMapping = {
  input: Input,
  password: Input.Password,
  checkbox: Checkbox,
};

export default function FomElement({
  component,
  label,
  required,
  name,
  value,
  status,
  approvedTitle,
  formName,
  comment,
  disableStatus,
  onCheckValChange,
}) {
  const Component = componentMapping[component];

  return (
    <div>
      <Row justify="center" align="bottom">
        <Col md={8}>
          <Form.Item
            label={label}
            name={name}
            rules={[{ required, message: "Field is required!" }]}
          >
            <Component />
          </Form.Item>
        </Col>

        <Col md={5}>
          <Form.Item
            name={name + status}
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Checkbox onChange={onCheckValChange}>Approve</Checkbox>
          </Form.Item>
        </Col>
        <Col md={8}>
          <Form.Item name={name + comment}>
            <Input
              placeholder="Add Comment"
              prefix={<CommentOutlined />}
              disabled={disableStatus}
            />
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
}
