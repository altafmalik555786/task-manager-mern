import * as React from "react";
import { Table } from "antd";
import style from './style.module.scss'

const CommonTable = ({
  data,
  header,
  columns,
  loading,
  fetchRecords,
  totalRecord,
  hidePagination,
  pageSize = 10,
  className,
  ...rest
}) => {
  return (
    <div>
      <Table
        dataSource={data}
        title={header}
        columns={columns}
        className={`${style.commonTableContainer} ${className}`}
        rowKey={columns[0]?.key}
        pagination={
          hidePagination
            ? false
            : {
                pageSize: pageSize,
                total: totalRecord,
                showTotal: (total, range) =>
                  `${range[0]}-${range[1]} of ${total} items`,
                onChange: (page, pageSize) => {
                  fetchRecords(page, pageSize);
                },
              }
        }
        {...rest}
      ></Table>
    </div>
  );
};
export default CommonTable;
