import React from "react";
import { Checkbox, Input, Form } from "antd";

export default function FormElementCheckBox({ checkBoxName }) {
  return (
    <div>
      <Form.Item
        label={
          <>
            <br />
          </>
        }
        name={"name"}
        // rules={[{  message: "Field is required!" }]}
      >
        {" "}
        <Checkbox
        //   checked={this.state.checked}
        //   disabled={this.state.disabled}
        //   onChange={this.onChange}
        >
          Approve
        </Checkbox>
      </Form.Item>
    </div>
  );
}
