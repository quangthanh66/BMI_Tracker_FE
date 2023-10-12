import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Input, Row } from 'antd';
import React from 'react';

type FilterUserTypes = {
  onCreateNewUser: () => void;
};

const FilterUser = ({ onCreateNewUser }: FilterUserTypes) => {
  return (
    <div className="flex justify-between items-center w-full py-2">
      <Row gutter={[20, 20]} className="w-[90%]">
        <Col span={6}>
          <Input placeholder={'Enter your user name'} />
        </Col>
      </Row>

      <Button className="flex items-center " icon={<PlusOutlined />} onClick={onCreateNewUser}>
        Create a new user
      </Button>
    </div>
  );
};

export default FilterUser;
