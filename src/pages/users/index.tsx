import { USER_LIST_DATA, UserItemTypes } from '@app/api/users/type';
import CreateNewUser from '@app/modules/admin/pages/users/CreateNewUser';
import FilterUser from '@app/modules/admin/pages/users/Filter';
import { UserColumns } from '@app/modules/admin/pages/users/type';
import { Card, Col, Row, Table, Typography } from 'antd';
import { useRef, useState } from 'react';

const UsersManagement = () => {
  const [users, setUsers] = useState<UserItemTypes[]>([]);
  const createNewUserRef = useRef<any>();

  const openCreateNewUserModal = () => {
    createNewUserRef.current.openModal();
  };

  return (
    <Row gutter={[14, 14]}>
      <Col span={24}>
        <Card>
          <Typography.Text className="text-xl font-bold">User management</Typography.Text>
        </Card>
      </Col>
      <CreateNewUser ref={createNewUserRef} />
      <Col span={24}>
        <Card size="small">
          <FilterUser onCreateNewUser={openCreateNewUserModal} />
        </Card>
      </Col>

      <Col span={24}>
        <Table
          columns={UserColumns}
          dataSource={USER_LIST_DATA}
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
