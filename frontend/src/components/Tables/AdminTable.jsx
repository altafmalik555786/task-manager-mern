import React from 'react';
import { Table, Switch, Popconfirm, Tooltip, Button } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

const AdminTable = ({ data, deleteAdmin, editAdmin }) => {
  return (
    <Table
      columns={[
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
        },
        {
          title: 'Company',
          dataIndex: 'company',
          key: 'company',
          render: (record) => <span>{record ? record.name : null}</span>,
        },
        // {
        //   title: 'Driving license',
        //   dataIndex: 'driving_license',
        //   key: 'driving_license',
        // },
        {
          title: 'Action',
          dataIndex: '',
          key: 'x',
          render: (record) => (
            <div style={{ display: 'flex' }} className="d-flex">
              <div style={{ marginRight: '10px' }}>
                <Popconfirm
                  title="Are you sure to Edit this Company?"
                  okText="Yes"
                  cancelText="No"
                  onConfirm={() => editAdmin(record)}
                >
                  <Tooltip title="Edit Company">
                    <Button
                      className="d-flex justify-content-center align-items-center"
                      shape="circle"
                      icon={<EditOutlined />}
                      // onClick={(e) => handleEdit(e, record)}
                    />
                  </Tooltip>
                </Popconfirm>
              </div>

              <Popconfirm
                title="Are you sure to delete this Company?"
                okText="Yes"
                cancelText="No"
                style={{ marginLeft: '30px' }}
                onConfirm={() => deleteAdmin(record.id)}
              >
                <Tooltip title="Delete Company">
                  <Button
                    className="d-flex justify-content-center align-items-center"
                    shape="circle"
                    icon={<DeleteOutlined />}
                  />
                </Tooltip>
              </Popconfirm>
            </div>
          ),
        },
      ]}
      dataSource={data}
    />
  );
};

export default AdminTable;
