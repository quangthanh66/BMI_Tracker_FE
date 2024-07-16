import { PlusOutlined } from '@ant-design/icons';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BaseSelect } from '@app/components/common/selects/BaseSelect/BaseSelect';
import { Col, Input, Row, Select } from 'antd';
import { debounce } from 'debounce';
import { ChangeEvent } from 'react';

type FilterUserTypes = {
  onCreateNewUser: () => void;
  onSearchUser: (keyValue: string) => void;
  onChangeRole: (role: string) => void;
};

const FilterUser = ({ onCreateNewUser, onSearchUser, onChangeRole }: FilterUserTypes) => {
  const onSearchDataValue = (event: ChangeEvent<HTMLInputElement>) => {
    const keySearch = event.target.value;
    onSearchUser(keySearch);
  };
  return (
    <div className="flex justify-between items-center w-full py-2">
      <Row gutter={[20, 20]} className="w-[90%]">
        <Col span={6}>
          <Input placeholder={'Search...'} onChange={debounce(onSearchDataValue, 1000)} />
        </Col>

        <Col span={6}>
          <Select
            className="w-full"
            onChange={onChangeRole}
            placeholder="Choose your role"
            options={[
              { value: 'All', label: 'All' },
              { value: 'ROLE_ADMIN', label: 'Admin' },
              { value: 'ROLE_MEMBER', label: 'Member' },
              { value: 'ROLE_ADVISOR', label: 'Advisor' },
            ]}
          ></Select>
        </Col>
      </Row>
      <BaseButton icon={<PlusOutlined />} type="primary" onClick={onCreateNewUser}>
        Create
      </BaseButton>
    </div>
  );
};

export default FilterUser;
