import USERS_API from "@app/api/users";
import { UserItemTypes } from "@app/api/users/type";
import CreateNewUser from "@app/modules/admin/pages/users/CreateNewUser";
import FilterUser from "@app/modules/admin/pages/users/Filter";
import ProveCertificate from "@app/modules/admin/pages/users/ProveCertificate";
import UpdateUser from "@app/modules/admin/pages/users/UpdateUser";
import { UserColumns } from "@app/modules/admin/pages/users/type";
import { useQuery } from "@tanstack/react-query";
import { Card, Col, Row, Spin, Table, Typography, message } from "antd";
import { useRef, useState, useEffect } from "react";
import AddMoreAccountModal from "./AddMoreAccountModal";

const UsersManagement = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [userUpdate, setUserUpdate] = useState<UserItemTypes>();
  const [users, setUsers] = useState<UserItemTypes[]>([]);
  const createNewUserRef = useRef<any>();
  const updateUserRef = useRef<any>();
  const provideUserRef = useRef<any>();
  const addMoreAccountRef = useRef<any>();

  const {
    isLoading,
    refetch,
    data: usersListServer,
  } = useQuery(["get-users-list"], USERS_API.GET_LIST, {
    enabled: false,
    onSuccess: (response: any) => {
      setUsers(response);
    },
    onError: () => {
      messageApi.open({
        type: "error",
        content: "Get users is failed",
      });
    },
  });

  useEffect(() => {
    refetch();
  }, []);

  const openCreateNewUserModal = () => {
    createNewUserRef.current.openModal();
  };

  const openUpdateUserModal = (userUpdate: UserItemTypes) => {
    updateUserRef.current.openModal();
    setUserUpdate(userUpdate);
  };

  const onSearchUser = (keyValue: string) => {
    const result = usersListServer.filter((user: UserItemTypes) =>
      user.fullName.toLowerCase().includes(keyValue.toLowerCase())
    );
    setUsers(result);
  };

  const onChangeRole = (role: string) => {
    let result: UserItemTypes[] = [];
    if (role === "All") {
      result = usersListServer;
    } else {
      result = usersListServer.filter(
        (user: UserItemTypes) => user.role.toLowerCase() === role.toLowerCase()
      );
    }

    setUsers(result);
  };

  const onAddMoreAccount = (accountId: number) => {
    addMoreAccountRef.current.openModal(accountId);
  };

  return (
    <Row gutter={[14, 14]}>
      {contextHolder}
      <Col span={24}>
        <Card>
          <Typography.Text className="text-xl font-bold">
            User management
          </Typography.Text>
        </Card>
      </Col>
      <CreateNewUser
        ref={createNewUserRef}
        onUpdateAfterCreateNew={() => refetch()}
      />
      <UpdateUser
        ref={updateUserRef}
        userUpdate={userUpdate as UserItemTypes}
        onRefreshAfterUpdate={() => refetch()}
      />
      <ProveCertificate
        ref={provideUserRef}
        userProps={userUpdate as UserItemTypes}
        onRefreshPage={() => refetch()}
      />

      <AddMoreAccountModal
        ref={addMoreAccountRef}
        refreshPage={() => refetch()}
      />

      <Col span={24}>
        <Card size="small">
          <FilterUser
            onCreateNewUser={openCreateNewUserModal}
            onSearchUser={onSearchUser}
            onChangeRole={onChangeRole}
          />
        </Card>
      </Col>

      <Spin spinning={isLoading} tip="Loading data...">
        <Col span={24}>
          <Table
            className="max-w-[82vw]"
            columns={UserColumns({
              updateUserModal: openUpdateUserModal,
              addMoreAccount: onAddMoreAccount,
            })}
            dataSource={users}
            scroll={{
              y: (1 - 465 / window.innerHeight) * window.innerHeight,
              x: 600,
            }}
          />
        </Col>
      </Spin>
    </Row>
  );
};

export default UsersManagement;
