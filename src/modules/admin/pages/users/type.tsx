import { UserItemTypes } from '@app/api/users/type';
import { Button, Tag, Tooltip } from 'antd';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { BasePopconfirm } from '@app/components/common/BasePopconfirm/BasePopconfirm';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';

type UserColumnsTypes = {
  updateUserModal: () => void;
  viewDetail: () => void;
  changeUserRole: () => void;
};

export const UserColumns: any = ({ updateUserModal, viewDetail, changeUserRole }: UserColumnsTypes) => [
  {
    title: 'Full Name',
    dataIndex: 'user_full_name',
    filters: [
      {
        text: 'Joe',
        value: 'Joe',
      },
      {
        text: 'Jim',
        value: 'Jim',
      },
      {
        text: 'Submenu',
        value: 'Submenu',
        children: [
          {
            text: 'Green',
            value: 'Green',
          },
          {
            text: 'Black',
            value: 'Black',
          },
        ],
      },
    ],
    sorter: (a: UserItemTypes, b: UserItemTypes) => a.user_full_name.length - b.user_full_name.length,
    sortDirections: ['descend'],
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
    title: 'Phone number',
    dataIndex: 'phone_number',
  },
  {
    title: 'Role',
    dataIndex: 'role_id',
    render: (role: string) => <Tag color="geekblue">{role}</Tag>,
  },
  {
    title: 'Is Active',
    dataIndex: 'is_activate',
    render: (isActive: boolean) => (
      <Tag color={isActive ? 'green' : 'volcano'}>{isActive ? 'Active' : 'In Active'}</Tag>
    ),
  },
  {
    title: 'Change role',
    dataIndex: 'change_role',
    render: () => {
      return (
        <Tooltip title="Change user role">
          <BaseButton onClick={changeUserRole}>Change role</BaseButton>
        </Tooltip>
      );
    },
  },
  {
    title: 'Actions',
    dataIndex: 'actions',
    render: () => (
      <div className="flex items-center gap-x-4">
        {/* <Tooltip title="Edit user profile">
          <Button icon={<EditOutlined />} type="text" onClick={updateUserModal}></Button>
        </Tooltip> */}

        <Tooltip title="Delete user">
          <BasePopconfirm placement="rightTop" title="Delete the user" okText="Yes" cancelText="No">
            <Button icon={<DeleteOutlined />} danger type="text"></Button>
          </BasePopconfirm>
        </Tooltip>
      </div>
    ),
  },
];
