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
import { useSelector } from "react-redux";
const { Option } = Select;
const FaqsForm = ({ onSubmit, loading, formName, }) => {
  const _faqsCategories = useSelector(
    (state) => state.faqsCategories.faqsCategories
  );
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
            <Form.Item
              label={"Faqs Category"}
              name={"categoryId"}
              rules={setRules("categoryId")}
            >
              <Select>
                {_faqsCategories?.map((el, i) => {
                  return (
                    <Option key={i} value={el.id}>
                      {el.title}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          rules={setRules("Question (EN)")}
          label={"Question (EN)"}
          name={"question"}
          valuePropName={"data"}
          getValueFromEvent={(event, editor) => editor?.getData() ?? null}
        >
          <CKEditor
            config={
              {
                //toolbar: EditorToolbar,
              }
            }
            editor={ClassicEditor}
            key={"question"}
          />
        </Form.Item>
        <Form.Item
          rules={setRules("Question (AR)")}
          label={"Question (AR)"}
          name={"questionAr"}
          valuePropName={"data"}
          getValueFromEvent={(event, editor) => editor?.getData() ?? null}
        >
          <CKEditor
            config={{
              //toolbar: EditorToolbar,
              language: "ar",
            }}
            editor={ClassicEditor}
            key={"questionAr"}
          />
        </Form.Item>
        <Form.Item
          rules={setRules("Answer (EN)")}
          label={"Answer (EN)"}
          name={"answer"}
          valuePropName={"data"}
          getValueFromEvent={(event, editor) => editor?.getData() ?? null}
        >
          <CKEditor
            config={
              {
                //toolbar: EditorToolbar,
              }
            }
            editor={ClassicEditor}
            key={"Answer"}
          />
        </Form.Item>
        <Form.Item
          rules={setRules("Answer (AR)")}
          label={"Answer (AR)"}
          name={"answerAr"}
          valuePropName={"data"}
          getValueFromEvent={(event, editor) => editor?.getData() ?? null}
        >
          <CKEditor
            config={{
              //toolbar: EditorToolbar,
              language: "ar",
            }}
            editor={ClassicEditor}
            key={"answerAr"}
          />
        </Form.Item>
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

export default FaqsForm;
