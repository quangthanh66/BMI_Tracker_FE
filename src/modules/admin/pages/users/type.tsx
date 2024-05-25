import { UserItemTypes } from '@app/api/users/type';
import { Button, Tag, Tooltip } from 'antd';
import { CheckCircleOutlined, DeleteOutlined, EditOutlined, EyeOutlined, FileTextOutlined } from '@ant-design/icons';
import { BasePopconfirm } from '@app/components/common/BasePopconfirm/BasePopconfirm';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { USER_STATUS } from '@app/utils/constant';

type UserColumnsTypes = {
  updateUserModal: (user: UserItemTypes) => void;
  deleteUser: (userId: string) => void;
  provideCertificate: (user: UserItemTypes) => void;
  approveTrainer: (userId: string) => void;
};

export const UserColumns: any = ({
  updateUserModal,
  deleteUser,
  provideCertificate,
  approveTrainer,
}: UserColumnsTypes) => [
  {
    title: 'Full Name',
    dataIndex: 'fullName',
    sortDirections: ['descend'],
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },

  {
    title: 'Phone number',
    dataIndex: 'phoneNumber',
  },
  {
    title: 'Role',
    dataIndex: 'rolenName',
    render: (role: any) => <Tag color="geekblue">{role.roleName}</Tag>,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    render: (status: string) => (
      <Tag
        color={
          status === USER_STATUS.true || status === USER_STATUS.true
            ? 'green'
            : status === USER_STATUS.false
            ? 'geekblue'
            : 'volcano'
        }
      >
        {status}
      </Tag>
    ),
  },
  // {
  //   title: 'Change role',
  //   dataIndex: 'change_role',
  //   render: () => {
  //     return (
  //       <Tooltip title="Change user role">
  //         <BaseButton onClick={changeUserRole}>Change role</BaseButton>
  //       </Tooltip>
  //     );
  //   },
  // },
  {
    title: 'Actions',
    dataIndex: 'accountID',
    render: (id: string, user: UserItemTypes) => (
      <div className="flex items-center gap-x-4">
        <Tooltip title="Edit user profile">
          <Button icon={<EditOutlined />} type="text" onClick={() => updateUserModal(user)}></Button>
        </Tooltip>

        <Tooltip title="Provide certificate for user">
          <Button icon={<FileTextOutlined />} type="text" onClick={() => provideCertificate(user)}></Button>
        </Tooltip>

        {user.isActive === USER_STATUS.true && (
          <Tooltip title="Approve trainer">
            <Button icon={<CheckCircleOutlined />} type="text" onClick={() => approveTrainer(id)}></Button>
          </Tooltip>
        )}

        <Tooltip title="Delete user">
          <BasePopconfirm
            placement="rightTop"
            title="Delete the user"
            okText="Yes"
            cancelText="No"
            onConfirm={() => deleteUser(id)}
          >
            <Button icon={<DeleteOutlined />} danger type="text"></Button>
          </BasePopconfirm>
        </Tooltip>
      </div>
    ),
  },
];
