import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  Row,
  Image,
  Checkbox,
  Col,
} from "antd";
import React from "react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import placeholderImage from "../../../assets/img/default.png";
import moment from "moment";

const { Option } = Select;

const NewsForm = ({
  onSubmit,
  loading,
  uploading,
  formName,
  onChooseFile,
  _campuses,
  file,
}) => {
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
        <Form.Item
          label={"Subject (EN)"}
          name={"subject"}
          rules={setRules("Subject")}
        >
          <Input />
        </Form.Item>
        <Form.Item
          rules={setRules("Title AR")}
          label={"Subject (AR)"}
          name={"subjectAr"}
        >
          <Input dir="rtl" />
        </Form.Item>
        <Row justify="space-between" gutter={[20]}>
          <Col md={12} xs={24}>
            <Form.Item
              rules={setRules("Date")}
              label={"Start Date"}
              name={"startAt"}
              initialValue={moment()}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col md={12} xs={24}>
            <Form.Item
              rules={[
                ...setRules("Date"),
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (moment(value).isBefore(getFieldValue("startAt")))
                      return Promise.reject(
                        new Error("End date can not be earlier than start date")
                      );
                    else return Promise.resolve();
                  },
                }),
              ]}
              label={"End Date"}
              name={"endAt"}
              initialValue={moment()}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          label={"Campuses"}
          name={"campuses"}
          rules={setRules("Campuses")}
        >
          <Select mode="multiple" value={_campuses?.map((el) => el.code)}>
            {_campuses?.map((campus) => (
              <Option value={campus.code}>{campus.code}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          initialValue={true}
          label={"Status"}
          name={"status"}
          valuePropName={"checked"}
        >
          <Checkbox>Is Active</Checkbox>
        </Form.Item>
        <Form.Item
          rules={setRules("Body (EN)")}
          label={"Body (EN)"}
          name={"body"}
          valuePropName={"data"}
          getValueFromEvent={(event, editor) => editor?.getData() ?? null}
        >
          <CKEditor
            config={{
              //toolbar: EditorToolbar,
            }}
            editor={ClassicEditor}
            key={"body"}
          />
        </Form.Item>
        <Form.Item
          rules={setRules("Body (AR)")}
          label={"Body (AR)"}
          name={"bodyAr"}
          valuePropName={"data"}
          getValueFromEvent={(event, editor) => editor?.getData() ?? null}
        >
          <CKEditor
            config={{
              //toolbar: EditorToolbar,
              language: "ar",
            }}
            editor={ClassicEditor}
            key={"bodyAr"}
          />
        </Form.Item>

        <br />
        <Row>
          <p style={{ color: "red" }}>*</p>{" "}
          <p style={{ marginLeft: 2 }}>Image</p>
        </Row>
        <Row align="bottom" gutter={[10]}>
          <Col>{<Image width={"10rem"} src={file ?? placeholderImage} />}</Col>

          <input
            type="file"
            onChange={(e) => onChooseFile(e)}
            name="image"
            required={!file}
            style={{ marginLeft: 10 }}
            accept="image/png, image/gif, image/jpeg"
          />
          <br />
        </Row>

        <Row justify="end">
          <Button htmlType="submit" loading={loading || uploading}>
            {loading ? "Saving..." : uploading ? "Uploading..." : "Save"}
          </Button>
        </Row>
      </Form>
    </div>
  );
};

export default NewsForm;
