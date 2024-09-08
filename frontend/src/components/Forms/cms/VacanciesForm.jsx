import { Button, Form, Input, Select, Row, Checkbox, Col } from "antd";
import React from "react";
import { FileExclamationOutlined, FilePdfOutlined } from "@ant-design/icons";
import { useEffect } from "react";

const { Option } = Select;

const VacanciesForm = ({
  onSubmit,
  loading,
  uploading,
  formName,
  onChooseFile,
  _campuses,
  file,
  valuesForEdit,
  _vacancyLocation,
}) => {
  const setRules = (title) => {
    return [
      {
        required: true,
        message: `${title} is required`,
      },
    ];
  };

  let [forCentralAdministration, setForCentralAdministration] =
    React.useState(false);

  useEffect(() => {
    if (valuesForEdit != null) {
      setForCentralAdministration(
        valuesForEdit.campuses.length == 0 ? true : false
      );
    }
  }, [valuesForEdit]);

  return (
    <div>
      <Form layout="vertical" form={formName} onFinish={onSubmit}>
        {/* subject */}
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
        <Form.Item
          label={"Department (EN)"}
          name={"department"}
          rules={setRules("Department")}
        >
          <Input />
        </Form.Item>
        {/* department */}
        <Form.Item
          rules={setRules("Department AR")}
          label={"Department (AR)"}
          name={"departmentAr"}
        >
          <Input />
          {/* <Select></Select> */}
        </Form.Item>
        {/* campueses */}

        <Form.Item
          initialValue={forCentralAdministration}
          label={"Location"}
          name={"forCentralAdministration"}
          valuePropName={"checked"}
        >
          <Checkbox
            onChange={(e) => setForCentralAdministration(e.target.checked)}
          >
            Central Administration
          </Checkbox>
        </Form.Item>
        {!forCentralAdministration && (
          <Form.Item
            label={"Campuses"}
            name={"campuses"}
            rules={setRules("Campuses")}
          >
            <Select mode="multiple" value={_campuses?.map((el) => el.code)}>
              {_campuses?.map((campus) => (
                <Option key={campus.code} value={campus.code}>
                  {campus.code}
                </Option>
              ))}
            </Select>
          </Form.Item>
        )}
        {/* body */}
        {/* <Form.Item
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
        </Form.Item> */}
        <Form.Item
          initialValue={true}
          label={"Status"}
          name={"status"}
          valuePropName={"checked"}
        >
          <Checkbox>Is Active</Checkbox>
        </Form.Item>
        <br />
        <Row>
          <p style={{ color: "red" }}>*</p>{" "}
          <p style={{ marginLeft: 2 }}>Description Document</p>
        </Row>
        <Row align="bottom" gutter={[20]}>
          <Col>
            {file ? (
              <a href={file} target={"_blank"}>
                <FilePdfOutlined
                  style={{ color: "#007575", fontSize: "5rem" }}
                />
                <p>{file}</p>
              </a>
            ) : (
              <FileExclamationOutlined
                style={{ color: "#007575", fontSize: "5rem" }}
              />
            )}
          </Col>
          <input
            type="file"
            onChange={(e) => onChooseFile(e)}
            name="descDocument"
            required={!file}
            style={{ marginLeft: 10 }}
            accept="doc, .docx,.txt,.pdf"
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

export default VacanciesForm;
