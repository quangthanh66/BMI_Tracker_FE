import USERS_API from "@app/api/users";
import { UserItemTypes } from "@app/api/users/type";
import CreateNewUser from "@app/modules/admin/pages/users/CreateNewUser";
import FilterUser from "@app/modules/admin/pages/users/Filter";
import ProveCertificate from "@app/modules/admin/pages/users/ProveCertificate";
import UpdateUser from "@app/modules/admin/pages/users/UpdateUser";
import { UserColumns } from "@app/modules/admin/pages/users/type";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Card, Col, Row, Spin, Table, Typography, message } from "antd";
import { useEffect, useRef, useState } from "react";

const UserTrainer = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [userUpdate, setUserUpdate] = useState<UserItemTypes>();
  const [users, setUsers] = useState<UserItemTypes[]>([]);
  const createNewUserRef = useRef<any>();
  const updateUserRef = useRef<any>();
  const provideUserRef = useRef<any>();

  const {
    isLoading,
    refetch,
    data: usersListServer,
  } = useQuery(["get-users-list"], USERS_API.GET_LIST, {
    enabled: false,
    onSuccess: (response: UserItemTypes[]) => {
      setUsers(response);
    },
    onError: () => {
      messageApi.open({
        type: "error",
        content: "Get users is failed",
      });
    },
  });
  const { isLoading: isLoadingDeleteUser, mutate: mutateDeleteUser } =
    useMutation(USERS_API.DELETE_USER, {
      onSuccess: () => {
        messageApi.open({
          type: "success",
          content: "Delete user is successful",
        });

        refetch();
      },
      onError: () => {
        messageApi.open({
          type: "error",
          content: "Delete user is failed",
        });
      },
    });

  const { mutate: mutateApproveTrainer } = useMutation(
    USERS_API.APPROVE_TRAINER,
    {
      onSuccess: () => {
        messageApi.open({
          type: "success",
          content: "Approve trainer is success",
        });

        refetch();
      },
      onError: () => {
        messageApi.open({
          type: "error",
          content: "Approve trainer is failed",
        });
      },
    }
  );

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
    if (usersListServer) {
      const result = usersListServer.filter((user: UserItemTypes) =>
        user.fullName.toLowerCase().includes(keyValue.toLowerCase())
      );
      setUsers(result);
    }
  };

  const onChangeRole = (role: string) => {
    let result: UserItemTypes[] = [];

    // if (usersListServer) {
    //   if (role === 'All') {
    //     result = usersListServer;
    //   } else {
    //     result = usersListServer.filter(
    //       (user: UserItemTypes) => user.roleName.toLowerCase() === role.toLowerCase(),
    //     );
    //   }
    // }

    setUsers(result);
  };

  const onProvideCertificate = (user: UserItemTypes) => {
    setUserUpdate(user);
    provideUserRef.current.openModal();
  };

  const onDeleteUserRole = (userId: string) => {
    console.log(userId);
  };

  const onDeleteUser = (userId: string) => {
    mutateDeleteUser(userId);
  };

  const onApproveTrainer = (userId: string) => {
    mutateApproveTrainer(userId);
  };

  return (
    <Row gutter={[14, 14]}>
      {contextHolder}
      <Col span={24}>
        <Card>
          <Typography.Text className="text-xl font-bold">
            User management 333
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

      <Col span={24}>
        <Card size="small">
          <FilterUser
            onCreateNewUser={openCreateNewUserModal}
            onSearchUser={onSearchUser}
            onChangeRole={onChangeRole}
          />
        </Card>
      </Col>

      <Spin spinning={isLoading || isLoadingDeleteUser} tip="Loading data...">
        <Col span={24}>
          <Table
            className="max-w-[82vw]"
            columns={UserColumns({
              updateUserModal: openUpdateUserModal,
              deleteUser: onDeleteUser,
              provideCertificate: onProvideCertificate,
              approveTrainer: onApproveTrainer,
              deleteUserRole: onDeleteUserRole,
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

export default UserTrainer;
