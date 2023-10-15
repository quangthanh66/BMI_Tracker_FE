import { USER_LIST_DATA, UserItemTypes } from '@app/api/users/type';
import { BaseTable } from '@app/components/common/BaseTable/BaseTable';
import CreateNewUser from '@app/modules/admin/pages/users/CreateNewUser';
import FilterUser from '@app/modules/admin/pages/users/Filter';
import UpdateUser from '@app/modules/admin/pages/users/UpdateUser';
import { UserColumns } from '@app/modules/admin/pages/users/type';
import { Card, Col, Row, Table, Typography } from 'antd';
import { useRef, useState } from 'react';

const UsersManagement = () => {
  const [users, setUsers] = useState<UserItemTypes[]>(USER_LIST_DATA);
  const createNewUserRef = useRef<any>();
  const updateUserRef = useRef<any>();

  const openCreateNewUserModal = () => {
    createNewUserRef.current.openModal();
  };

  const openUpdateUserModal = () => {
    updateUserRef.current.openModal();
  };

  const onSearchUser = async (keyValue: string) => {
    const result = await USER_LIST_DATA.filter((user) =>
      user.user_full_name.toLowerCase().includes(keyValue.toLowerCase()),
    );

    setUsers(result);
  };

  return (
    <Row gutter={[14, 14]}>
      <Col span={24}>
        <Card>
          <Typography.Text className="text-xl font-bold">User management</Typography.Text>
        </Card>
      </Col>
      <CreateNewUser ref={createNewUserRef} />
      <UpdateUser ref={updateUserRef} />
      <Col span={24}>
        <Card size="small">
          <FilterUser onCreateNewUser={openCreateNewUserModal} onSearchUser={onSearchUser} />
        </Card>
      </Col>

      <Col span={24}>
        <BaseTable
          columns={UserColumns({ updateUserModal: openUpdateUserModal })}
          dataSource={users}
          scroll={{
            y: (1 - 565 / window.innerHeight) * window.innerHeight,
            x: 1200,
          }}
        />
      </Col>
    </Row>
  );
};

export default UsersManagement;
