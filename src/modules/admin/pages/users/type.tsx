import { UserItemTypes } from "@app/api/users/type";
import { Button, Tag, Tooltip } from "antd";
import {
  CheckCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  FileTextOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { BasePopconfirm } from "@app/components/common/BasePopconfirm/BasePopconfirm";
import { BaseButton } from "@app/components/common/BaseButton/BaseButton";
import { USER_ROLES_ENUM } from "@app/utils/constant";
// import { USER_STATUS } from '@app/utils/constant';

type UserColumnsTypes = {
  updateUserModal: (user: UserItemTypes) => void;
  addMoreAccount: (accountId: number) => void;
};

const getRoleName = (role: USER_ROLES_ENUM) => {
  if (role === USER_ROLES_ENUM.ROLE_ADMIN) {
    return "Admin";
  }

  if (role === USER_ROLES_ENUM.ROLE_ADVISOR) {
    return "Advisor";
  }
  if (role === USER_ROLES_ENUM.ROLE_MANAGER) {
    return "Manager";
  }
  return "Member";
};

export const UserColumns: any = ({
  updateUserModal,
  addMoreAccount,
}: UserColumnsTypes) => [
  {
    title: "Full Name",
    dataIndex: "fullName",
    sortDirections: ["descend"],
  },
  {
    title: "Email",
    dataIndex: "email",
  },

  {
    title: "Phone number",
    dataIndex: "phoneNumber",
  },
  {
    title: "Status",
    dataIndex: "isActive",
    render: (isActive: boolean) => (
      <Tag
        color={
          isActive === true
            ? "green"
            : isActive === false
            ? "geekblue"
            : "volcano"
        }
      >
        {isActive ? "Active" : "Deactivate"}
      </Tag>
    ),
    sortDirections: ["descend"],
  },
  {
    title: "Role",
    dataIndex: "roleNames",
    render: (roleNames: any) => {
      return (
        <div className="flex-wrap items-center gap-x-2">
          {roleNames.map((role: any) => {
            return (
              <Tag
                color={
                  role === "ROLE_ADMIN"
                    ? "red"
                    : role === "ROLE_ADVISOR"
                    ? "blue"
                    : role === "ROLE_MANAGER"
                    ? "silver"
                    : role === "ROLE_MEMBER"
                    ? "green"
                    : "geekblue"
                }
              >
                {getRoleName(role)}
              </Tag>
            );
          })}
        </div>
      );
    },
  },

 

  {
    title: "Actions",
    dataIndex: "accountID",
    render: (id: string, user: UserItemTypes) => (
      <div className="flex items-center gap-x-4">
        <Tooltip title="Edit user profile">
          <Button
            icon={<EditOutlined />}
            type="text"
            onClick={() => updateUserModal(user)}
          ></Button>
        </Tooltip>

        <Tooltip title="Add more account">
          <Button
            icon={<PlusOutlined />}
            type="text"
            onClick={() => addMoreAccount(Number(id))}
          ></Button>
        </Tooltip>
      </div>
    ),
  },
];
