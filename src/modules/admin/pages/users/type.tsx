import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { UserItemTypes } from "@app/api/users/type";
import { USER_ROLES_ENUM } from "@app/utils/constant";
import { Button, Tag, Tooltip } from "antd";
// import { USER_STATUS } from '@app/utils/constant';

type UserColumnsTypes = {
  updateUserModal: (user: UserItemTypes) => void;
  addMoreAccount: (accountId: number) => void;
  deleteUserRole: (
    event: any,
    accountId: number,
    roleName: USER_ROLES_ENUM
  ) => void;
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
  deleteUserRole,
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
    render: (roleNames: any, userProfile: UserItemTypes) => {
      return (
        <div className="flex-wrap items-center gap-x-2">
          {roleNames.map((role: any) => {
            return (
              <Tag
                closable
                onClose={(e) => deleteUserRole(e, +userProfile.accountID, role)}
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
