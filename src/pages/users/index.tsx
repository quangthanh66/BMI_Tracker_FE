import USERS_API from '@app/api/users';
import { UserItemTypes } from '@app/api/users/type';
import { BaseTable } from '@app/components/common/BaseTable/BaseTable';
import ChangeUserRole from '@app/modules/admin/pages/users/ChangeUserRole';
import CreateNewUser from '@app/modules/admin/pages/users/CreateNewUser';
import FilterUser from '@app/modules/admin/pages/users/Filter';
import UpdateUser from '@app/modules/admin/pages/users/UpdateUser';
import { UserColumns } from '@app/modules/admin/pages/users/type';
import { useQuery } from '@tanstack/react-query';
import { Card, Col, Row, Spin, Table, Typography, message } from 'antd';
import { useRef, useState, useEffect } from 'react';

const UsersManagement = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [users, setUsers] = useState<UserItemTypes[]>([]);
  const createNewUserRef = useRef<any>();
  const updateUserRef = useRef<any>();
  const changeUserRoleRef = useRef<any>();
  const { isLoading, refetch } = useQuery(['get-users-list'], USERS_API.GET_LIST, {
    enabled: false,
    onSuccess: (response: any) => {
      setUsers(response);
    },
    onError: () => {
      messageApi.open({
        type: 'error',
        content: 'Get users is failed',
      });
    },
  });

  useEffect(() => {
    refetch();
  }, []);

  const openCreateNewUserModal = () => {
    createNewUserRef.current.openModal();
  };

  const openUpdateUserModal = () => {
    updateUserRef.current.openModal();
  };

  const openChangeUserRoleModal = () => {
    changeUserRoleRef.current.openModal();
  };

  const onSearchUser = async (keyValue: string) => {
    // const result = await USER_LIST_DATA.filter((user) =>
    //   user.user_full_name.toLowerCase().includes(keyValue.toLowerCase()),
    // );
    // setUsers(result);
  };

  console.log(users);

  return (
    <Row gutter={[14, 14]}>
      <Col span={24}>
        <Card>
          <Typography.Text className="text-xl font-bold">User management</Typography.Text>
        </Card>
      </Col>
      <CreateNewUser ref={createNewUserRef} />
      <UpdateUser ref={updateUserRef} />
      <ChangeUserRole ref={changeUserRoleRef} />

      <Col span={24}>
        <Card size="small">
          <FilterUser onCreateNewUser={openCreateNewUserModal} onSearchUser={onSearchUser} />
        </Card>
      </Col>

      <Spin spinning={isLoading} tip="Loading data...">
        <Col span={24}>
          <Table
            columns={UserColumns({ updateUserModal: openUpdateUserModal, changeUserRole: openChangeUserRoleModal })}
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
