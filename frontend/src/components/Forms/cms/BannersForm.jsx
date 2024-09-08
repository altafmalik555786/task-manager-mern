import { Button, Form, Input, Select, Row, Checkbox, Col } from "antd";
import ImagePicker from "components/ImagePicker/ImagePicker";
import React, { useEffect } from "react";

const { Option } = Select;

const BannersForm = ({
  onSubmit,
  loading,
  uploading,
  formName,
  onChooseFile,
  file,
  selectedRecord,
  targetOptions,
  actionTypeOptions,
  screenOptions,
}) => {
  // const targetOptions = [
  //   { title: "Website", value: "website" },
  //   { title: "Mobile App", value: "mobile_application" },
  //   { title: "Both", value: "both" },
  // ];
  // const actionTypeOptions = [
  //   { title: "Open In App", value: "application" },
  //   { title: "Open In Browser", value: "externalWeb" },
  // ];
  // const screenOptions = useSelector(
  //   (state) => state.metaData.dropDowns["screenName"]
  // );
  const setRules = (title) => {
    return [
      {
        required: true,
        message: `${title} is required`,
      },
    ];
  };

  let [target, setTarget] = React.useState("");
  let [actionType, setActionType] = React.useState("");

  useEffect(() => {
    setTarget(selectedRecord != null ? selectedRecord.target : "");
    setActionType(selectedRecord != null ? selectedRecord.actionType : "");
  }, [selectedRecord]);

  const rowProps = { justify: "space-between", gutter: [20] };
  const colProps = { md: 12 };
  return (
    <div>
      <Form layout="vertical" form={formName} onFinish={onSubmit}>
        {/* title */}
        <Row {...rowProps}>
          <Col {...colProps}>
            <Form.Item
              label={"Title (EN)"}
              name={"title"}
              rules={setRules("Title")}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col md={12}>
            <Form.Item
              rules={setRules("Title AR")}
              label={"Title (AR)"}
              name={"titleAr"}
            >
              <Input dir="rtl" />
            </Form.Item>
          </Col>
        </Row>

        {/* subtitle */}
        <Row {...rowProps}>
          <Col {...colProps}>
            <Form.Item
              label={"Subtitle (EN)"}
              name={"subTitle"}
              rules={setRules("Subtitle")}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col md={12}>
            <Form.Item
              rules={setRules("Subtitle AR")}
              label={"Subtitle (AR)"}
              name={"subTitleAr"}
            >
              <Input dir="rtl" />
            </Form.Item>
          </Col>
        </Row>

        {/* Action Text */}
        <Row {...rowProps}>
          <Col {...colProps}>
            <Form.Item
              label={"Action Text (EN)"}
              name={"actionText"}
              rules={setRules("Action Text")}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col {...colProps}>
            <Form.Item
              rules={setRules("Action Text AR")}
              label={"Action Text (AR)"}
              name={"actionTextAr"}
            >
              <Input dir="rtl" />
            </Form.Item>
          </Col>
        </Row>

        {/* Action Button */}
        <Row {...rowProps}>
          <Col {...colProps}>
            <Form.Item
              label={"Action Button (EN)"}
              name={"actionButton"}
              rules={setRules("Action Button")}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col {...colProps}>
            <Form.Item
              rules={setRules("Action Button AR")}
              label={"Action Button (AR)"}
              name={"actionButtonAr"}
            >
              <Input dir="rtl" />
            </Form.Item>
          </Col>
        </Row>

        {/* Action Type and Screen name */}
        <Row {...rowProps}>
          <Col {...colProps}>
            <Form.Item
              rules={setRules("Target")}
              name={"target"}
              label={"Target"}
            >
              <Select
                onChange={(value) => {
                  setTarget(value);
                }}
              >
                {targetOptions.map((el) => (
                  <Option key={el.value} value={el.value}>
                    {el.title}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col {...colProps}>
            <Form.Item
              rules={setRules("Action Type")}
              name={"actionType"}
              label={"Action Type"}
            >
              <Select
                onChange={(value) => {
                  setActionType(value);
                }}
              >
                {actionTypeOptions
                  .filter((item) => {
                    if (
                      (target == "website" || target == "both") &&
                      item.value == "Application"
                    )
                      return false;
                    else return true;
                  })
                  ?.map((el) => (
                    <Option key={el.value} value={el.value}>
                      {el.title}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        {/* Action Link */}
        {target !== "mobile_application" || target === "both" ? (
          <Row {...rowProps}>
            <Col {...colProps}>
              <Form.Item
                label={"Web Action Link (EN)"}
                name={"actionLink"}
                rules={setRules("Web Action Link")}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col {...colProps}>
              <Form.Item
                rules={setRules("Web Action Link AR")}
                label={"Web Action Link (AR)"}
                name={"actionLinkAr"}
              >
                <Input dir="rtl" />
              </Form.Item>
            </Col>
          </Row>
        ) : null}

        {target === "mobile_application" || target === "both" ? (
          <Row {...rowProps}>
            <Col {...colProps}>
              <Form.Item
                label={"Mobile Action Link (EN)"}
                name={"actionMblLink"}
                rules={setRules("Mobile Action Link")}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col {...colProps}>
              <Form.Item
                rules={setRules("Mobile Action Link AR")}
                label={"Mobile Action Link (AR)"}
                name={"actionMblLinkAr"}
              >
                <Input dir="rtl" />
              </Form.Item>
            </Col>
          </Row>
        ) : null}

        {actionType === "Application" ? (
          <Row {...rowProps}>
            <Col {...colProps}>
              <Form.Item
                rules={setRules("Screen Name")}
                name={"screenName"}
                label={"Screen Name"}
              >
                <Select>
                  {screenOptions?.map((el) => (
                    <Option key={el.value} value={el.value}>
                      {el.title}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        ) : null}

        <Form.Item
          initialValue={true}
          label={"Status"}
          name={"status"}
          valuePropName={"checked"}
        >
          <Checkbox>Is Active</Checkbox>
        </Form.Item>
        <br />

        <ImagePicker file={file} onChooseFile={onChooseFile} required />

        <Row justify="end">
          <Button htmlType="submit" loading={loading || uploading}>
            {loading ? "Saving..." : uploading ? "Uploading..." : "Save"}
          </Button>
        </Row>
      </Form>
    </div>
  );
};

export default BannersForm;
