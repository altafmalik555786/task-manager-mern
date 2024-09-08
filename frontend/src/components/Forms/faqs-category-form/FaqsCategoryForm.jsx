import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  Row,
  Checkbox,
  Col,
  InputNumber,
} from "antd";

import React, { useState } from "react";
import { EditorToolbar } from "utils/constants";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const { Option } = Select;

const FaqsCategoryForm = ({ onSubmit, loading, formName, _requestTypes }) => {
  const [campusId, setCampusId] = useState("");
  const setRules = (title) => {
    return [
      {
        required: true,
        message: `${title} is required`,
      },
    ];
  };
  return (
    <div>
      <Form layout="vertical" form={formName} onFinish={onSubmit}>
        <Row gutter={10}>
          <Col md={12}>
            <Form.Item label={"Title"} name={"title"} rules={setRules("title")}>
              <Input />
            </Form.Item>
          </Col>
          <Col md={12}>
            <Form.Item
              label={"Title Ar"}
              rules={setRules("Title Ar")}
              name={"titleAr"}
            >
              <Input dir="rtl" />
            </Form.Item>
          </Col>
        </Row>

        <br />

        <Row justify="end">
          <Button htmlType="submit" loading={loading}>
            {loading ? "Saving..." : "Save"}
          </Button>
        </Row>
      </Form>
    </div>
  );
};

export default FaqsCategoryForm;
