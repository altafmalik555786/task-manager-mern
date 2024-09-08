import {
  Form,
  Input,
  Select,
  Row,
  Col,
  Spin,
} from "antd";
import React, { useState } from "react";
import style from "./style.module.scss";
import TableHeader from "components/TableHeader/TableHeader";
import { successMessage, requestErrorHandel } from "utils/helpers/helpers";
import { setRules } from "utils/common-functions";
import { renderLoader } from "utils/helpers/helpers";
import { useEffect } from "react";
import { goBack } from "utils/common-functions";
import CustomButton from "components/custom-button";
import { postTasksApi, updateTaskApi } from "apis/Task/TasksApi";

const { Option } = Select;

const TaskForm = (props) => {
  const { location } = props;
  const taskData = location.state;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onSetFieldsValues = (res) => {
    form.setFieldsValue({
      title: res.title,
      description: res.description,
      status: res.status,
      priority: res.priority
    });
  };

  useEffect(() => {
    if (taskData) {
      onSetFieldsValues(taskData);
    }

  }, [taskData]);

  const renderHeader = (title) => {
    return (
      <>
        <TableHeader
          onAddNew={() => { }}
          headerTitle={title}
          headerBtnTitle={""}
          loading={false}
        />
      </>
    );
  };

  const onSubmit = async (values) => {
    setLoading(true);
    if (taskData) {
      // updating task
      values["id"] = taskData?._id;
      try {
        await updateTaskApi(values).then((res) => {
          if (res.data.success) {
            props.history.goBack();
            successMessage(res.data);
          }
        });
      } catch (error) {
        requestErrorHandel({ error });
      }
    } else {
      // creating task
      await createTask(values);
    }
    setLoading(false);
  };

  const createTask = async (data) => {
    let res = null;
    try {
      setLoading(true);
      const response = await postTasksApi(data);
      setLoading(false);
      res = response;
      if (response.data.success) {
        successMessage(response?.data);
        props.history.goBack();
      } else throw response;
    } catch (e) {
      setLoading(false);
      requestErrorHandel({ error: e });
    } finally {
      return res;
    }
  };

  return (
    <div className={style?.auctionFormContainer}>
      <Spin spinning={loading} indicator={renderLoader}>
        {renderHeader(
          `${taskData ? "Update Task" : "Create Task"}`
        )}
        <Form
          layout="vertical"
          className={style.createAuctionForm}
          form={form}
          name="task"
          onFinish={onSubmit}
          initialValues={{
            status: 'inprogress',
            priority: 'medium',
          }}
        >
          <Row justify="space-between" gutter={[20]}>
            <Col md={12} xs={24}>
              <Form.Item label={"Title"} name={"title"} rules={setRules("Title")}>
                <Input />
              </Form.Item>
            </Col>

            <Col md={6} xs={24}>
              <Form.Item
                rules={setRules("Status")}
                label={"Status"}
                name={"status"}
              >
                <Select
                >
                  <Option value={"inprogress"}>
                    In Progress
                  </Option>
                  <Option value={"completed"}>
                    Completed
                  </Option>
                </Select>
              </Form.Item>
            </Col>
            <Col md={6} xs={24}>
              <Form.Item
                rules={setRules("Priority")}
                label={"Priority"}
                name={"priority"}
              >
                <Select
                >
                  <Option value={"low"}>
                    Low
                  </Option>
                  <Option value={"medium"}>
                    Medium
                  </Option>
                  <Option value={"high"}>
                    High
                  </Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label={"Description"} name={"description"}>
                <Input.TextArea
                  rows={4}
                />
              </Form.Item>
            </Col>
          </Row>
          <br />
          <Row justify="space-between">
            <CustomButton
              title={"Cancel"}
              style={{
                backgroundColor: "white",
                color: "black",
                border: "1px solid black",
              }}
              onClick={() => {
                goBack(null, props);
              }}
            />
            <CustomButton
              htmlType="submit"
              disabled={loading}
              loading={loading}
              variant={!taskData && "two"}
              style={{ backgroundColor: "#36454f", color: "#fff" }}
              title={
                loading
                  ? taskData
                    ? "Updating"
                    : "Saving..."
                  : taskData
                    ? "Update"
                    : "Save"
              }
            />
          </Row>
        </Form>
      </Spin>
    </div>
  );
};

export default TaskForm;
