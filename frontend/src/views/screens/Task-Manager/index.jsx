import CommonTable from "components/Tables/CommonTable";
import {
  Input,
  Row,
  Select,
  Spin,
  Tooltip,
} from "antd";
import React, { useEffect, useState } from "react";
import { renderLoader } from "utils/helpers/helpers";
import style from "./style.module.scss";
import { ColTextCheck } from "components/export-common-components/table-columns-text-check";
import classNames from "classnames";
import DeleteRedIcon from "assets/img/red/delete.svg";
import CustomButton from "components/custom-button";
import { successMessage } from "utils/helpers/helpers";
import { requestErrorHandel } from "utils/helpers/helpers";
import CommonDeleteModal from "components/common-delete-modal";
import { EyeOutlined, PlusOutlined } from "@ant-design/icons";
import { getTasksApi, deleteTaskApi } from "apis/Task/TasksApi";
import { NotificationManager } from "react-notifications";
import { patchTaskApi } from "apis/Task/TasksApi";

const TasksList = (props) => {
  const [page, setPage] = useState(1);
  const [auctionsListData, setTasksListData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visibleDeleteModal, setVisibleDeleteModal] = useState(false);
  const [rowId, setRowId] = useState(null)
  const [totalNumberOfRecords, setTotalNumberOfRecords] = useState(0);
  const [filterByPriority, setFilterByPriority] = useState("");
  const [searchAuctions, setSearchAuctions] = useState("");

  const fetchDataApi = async () => {
    try {
      setLoading(true);
      setTasksListData([]);
      const response = await getTasksApi(
        page,
        filterByPriority,
        searchAuctions,
      );
      if (response.status === 200 && response.data?.data) {
        setTasksListData(response.data.data);
        setTotalNumberOfRecords(response.data?.total);
      } else {
        throw response;
      }
    } catch (e) {
      requestErrorHandel({ error: e });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDataApi();
  }, []);

  useEffect(() => {
    fetchDataApi();
  }, [page, filterByPriority, searchAuctions]);


  const onSuccessApi = () => {
    fetchDataApi();
  };

  const onPatchTask = async (row, isStatus) => {
    try {
      setLoading(true);
      if (row) {
        const response = await patchTaskApi(row);
        if (response.data.success) {
          if (isStatus) {
            if (row.status === "completed") {
              successMessage({message: "Marked as completed"})
            } else {
              successMessage({message: "Updated status"})
            }
          } else {
            successMessage({message: "Updated priority"})
          }
          onSuccessApi();
        } else {
          throw response;
        }
      }
    } catch (e) {
      requestErrorHandel({ error: e });
    } finally {
      setLoading(false);
    }
  };


  const columnsData = [
    {
      title: "Title",
      key: "title",
      dataIndex: "title",
      render: (text, row) => {
        return (
          <p>{ColTextCheck(text)}</p>
        );
      },
    },
    {
      title: "Description",
      key: "description",
      width: "60%",
      dataIndex: "description",
      render: ColTextCheck,
    },
    {
      title: "Priority",
      key: "priority",
      dataIndex: "priority",
      render: (text, row) => {
        return (
          <Select
            defaultValue={text}
            style={{ width: "100px" }}
            onChange={(e) => onRequestPriority(e, row)}
            options={[
              { value: "high", label: "High" },
              { value: "medium", label: "Medium" },
              { value: "low", label: "Low" },
            ]}
          />
        );
      },
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (text, row) => {
        return (
          <Select
            defaultValue={text}
            style={{ width: "120px" }}
            onChange={(e) => onRequestStatus(e, row)}
            options={[
              { value: "completed", label: "Completed" },
              { value: "inprogress", label: "In Progress" },
            ]}
          />
        );
      },
    },
    {
      title: "Actions",
      key: "Actions",
      dataIndex: "Actions",
      render: (text, row) => {
        const isDisabled = row.status === "completed"
        return (
          <Row justify={"center"} className={style.actions}>
            <Tooltip placement="top" title={"Edit"}>
              <EyeOutlined
                style={{
                  fontSize: "15px",
                  color: isDisabled ? '#d9d9d9' : '#899499',
                  cursor: isDisabled ? 'not-allowed' : 'pointer',
                  opacity: isDisabled ? 0.7 : 1,
                }}
                onClick={() => {
                  if (isDisabled) {
                    NotificationManager.info(
                      "Locked! Task has been completed"
                    )
                  } else {
                    props.history.push("tasks/create-task", row);
                  }
                }}
              />
            </Tooltip>
            <Tooltip placement="top" title={"Delete"}>
              <img
                onClick={() => {
                  setRowId(row?._id);
                  setVisibleDeleteModal(true);
                }}
                src={DeleteRedIcon}
                alt="icon"
              />
            </Tooltip>
          </Row>
        );
      },
    },
  ];

  const onChangeSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchAuctions(searchValue);
  };

  const onRequestStatus = (e, row) => {
    onPatchTask({ status: e.toLowerCase(), id: row?._id }, true)
  };

  const onRequestPriority = (e, row) => {
    onPatchTask({ priority: e.toLowerCase(), id: row?._id }, false)
  };

  const onFilterPriority = (e) => {
    const filterValue = e.toLowerCase();
    setFilterByPriority(filterValue);
  };

  const onConfirmDelete = async () => {
    try {
      setLoading(true);
      const response = await deleteTaskApi(rowId);
      if (response?.data?.success) {
        successMessage(response?.data);
        fetchDataApi();
        setVisibleDeleteModal(false);
      } else {
        throw response;
      }
    } catch (e) {
      requestErrorHandel({ error: e });
      setVisibleDeleteModal(false)
    } finally {
      setLoading(false);
      setVisibleDeleteModal(false)
    }
  };

  return (
    <div className={classNames(style.userListContainer, "both-side-padding")}>
      <Spin spinning={loading} indicator={renderLoader}>
        <CommonDeleteModal
          visibleModal={visibleDeleteModal}
          title={"Deleting Task"}
          para="You are going to delete this task that will be deleted forever."
          confimBtnTitle={"Confirm"}
          cancelBtnTitle="Cancel"
          loadingConfirmBtn={loading}
          onClickConfirm={onConfirmDelete}
          onClickCancel={() => {
            setVisibleDeleteModal(false)
          }}
          handleCancel={() => {
            setVisibleDeleteModal(false)
          }}
        />
        <Row
          justify={"end"}
          alignItem="center"
          className={style.searchBoxContainer}
        >
          <Select
            defaultValue=""
            style={{ minWidth: 100 }}
            onChange={onFilterPriority}
            className={style.selectBox}
            options={[
              { value: "", label: "All" },
              { value: "high", label: "High" },
              { value: "medium", label: "Medium" },
              { value: "low", label: "Low" },
            ]}
          />
          <CustomButton
            title="Create New"
            onClick={() => props.history.push("tasks/create-task")}
            variant="one"
            startData={<PlusOutlined color="black" />}
          />
          <Input
            placeholder="Search Task"
            onChange={onChangeSearch}
            style={{ width: "20%", height: "40px", fontSize: "15px" }}
          />
        </Row>

        <CommonTable
          className={style.customerTable}
          data={auctionsListData}
          fetchRecords={(page) => setPage(page)}
          totalRecord={totalNumberOfRecords}
          columns={columnsData}
        />

      </Spin>
    </div>
  );
};

export default TasksList;
