import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
} from "antd";
const CategoryForm = ({
  renderForm,
  handleChange,
  handleSubmit,
  onChangeFiles,
  editFlag,
  name_en,
  name_fr,
  catImage,
  ViewFlag,
  handleEditSubmit
}) => {
  const [componentSize, setComponentSize] = useState("medium");
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  return (
    <div>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        initialValues={{ size: componentSize }}
        onValuesChange={onFormLayoutChange}
        size={componentSize}
        onSubmit={handleSubmit}
      >
        {!editFlag && !ViewFlag ? (
          <>
            <Form.Item label="Name (English)">
              <Input name="name_en" onChange={handleChange} />
            </Form.Item>
            <Form.Item label="Name (French)">
              <Input name="name_fr" onChange={handleChange} />
            </Form.Item>
            <Form.Item label="Image">
              <Input type="file" onChange={onChangeFiles} />
            </Form.Item>
            <div style={{ display: "flex", float: "right" }}>
              <Form.Item>
                <Button onClick={renderForm}>Back</Button>
              </Form.Item>
              <Form.Item>
                <Button onClick={handleSubmit} className="submit-button">
                  Submit
                </Button>
              </Form.Item>
            </div>
          </>
        ) : ViewFlag ? (
          <>
            <Form.Item label="Name (English)">
              <Input
                disabled={true}
                value={name_en}
                name="name_en"
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item label="Name (French)">
              <Input
                disabled={true}
                value={name_fr}
                name="name_fr"
                onChange={handleChange}
              />
            </Form.Item>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img src={catImage} style={{ width: "100px", height: "100px" }} />
            </div>
            <div style={{ display: "flex", float: "right" }}>
              <Form.Item>
                <Button onClick={renderForm}>Back</Button>
              </Form.Item>
            </div>
          </>
        ) : (
          <>
            <>
              <Form.Item label="Name (English)">
                <Input value={name_en} name="name_en" onChange={handleChange} />
              </Form.Item>
              <Form.Item label="Name (French)">
                <Input value={name_fr} name="name_fr" onChange={handleChange} />
              </Form.Item>
              <Form.Item label="Image">
                <Input type="file" onChange={onChangeFiles} />
              </Form.Item>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <img
                  src={catImage}
                  style={{ width: "100px", height: "100px" }}
                />
              </div>
              <div style={{ display: "flex", float: "right" }}>
                <Form.Item>
                  <Button onClick={renderForm}>Back</Button>
                </Form.Item>
                <Form.Item>
                  <Button onClick={handleEditSubmit} className="submit-button">
                    Edit
                  </Button>
                </Form.Item>
              </div>
            </>
          </>
        )}
      </Form>
    </div>
  );
};
export default CategoryForm;
