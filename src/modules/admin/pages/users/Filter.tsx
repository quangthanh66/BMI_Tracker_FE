import { PlusOutlined } from '@ant-design/icons';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BaseSelect } from '@app/components/common/selects/BaseSelect/BaseSelect';
import { Button, Col, Input, Row } from 'antd';
import { debounce } from 'debounce';
import { ChangeEvent } from 'react';

type FilterUserTypes = {
  onCreateNewUser: () => void;
  onSearchUser: (keyValue: string) => void;
};

const FilterUser = ({ onCreateNewUser, onSearchUser }: FilterUserTypes) => {
  const onSearchDataValue = (event: ChangeEvent<HTMLInputElement>) => {
    const keySearch = event.target.value;
    onSearchUser(keySearch);
  };
  return (
    <div className="flex justify-between items-center w-full py-2">
      <Row gutter={[20, 20]} className="w-[90%]">
        <Col span={6}>
          <Input placeholder={'Enter your user name'} onChange={debounce(onSearchDataValue, 1000)} />
        </Col>

        <Col span={6}>
          <BaseSelect
            placeholder="Choose your role"
            width="100%"
            options={[
              { value: 'Admin', label: 'Admin' },
              { value: 'User', label: 'User' },
              { value: 'Trainer', label: 'Trainer' },
            ]}
          ></BaseSelect>
        </Col>
      </Row>

      <BaseButton type="primary" className="flex items-center " icon={<PlusOutlined />} onClick={onCreateNewUser}>
        Create a new user
      </BaseButton>
    </div>
  );
};

export default FilterUser;
