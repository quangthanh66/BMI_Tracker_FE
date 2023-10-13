import type { ColumnsType } from 'antd/es/table';
import { UserItemTypes } from '@app/api/users/type';
import { Alert, Button, Grid } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

export const UserColumns: ColumnsType<UserItemTypes> = [
  {
    title: 'Full Name',
    dataIndex: 'user_full_name',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: 'Sex',
    dataIndex: 'sex',
  },
  {
    title: 'Birthday',
    dataIndex: 'birth_day',
  },
  {
    title: 'Phone number',
    dataIndex: 'phone_number',
  },
  {
    title: 'Role',
    dataIndex: 'role_id',
  },
  {
    title: 'Is Active',
    dataIndex: 'is_activate',
    render: (isActive: boolean) => (
      <Alert type={isActive ? 'success' : 'error'} message={isActive ? 'Active' : 'In Active'}></Alert>
    ),
  },
  {
    title: 'Actions',
    dataIndex: 'actions',
    render: () => (
      <div className="flex items-center gap-x-4">
        <Button icon={<DeleteOutlined />} danger type="text"></Button>
      </div>
    ),
  },
];
