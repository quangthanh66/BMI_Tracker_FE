import { PlusOutlined } from '@ant-design/icons';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BaseInput } from '@app/components/common/inputs/BaseInput/BaseInput';
import { Col, Row, Select } from 'antd';
import { debounce } from 'debounce';
import { ChangeEvent } from 'react';
import { SubscriptionStatus } from './constant';

type FilterSubscriptionTypes = {
  onCreateSubscription: () => void;
  onSearchSubscription: (keyValue: string) => void;
  onFilterSubscriptionStatus: (status: string) => void;
};


const SubscriptionFilter = ({ onCreateSubscription, onSearchSubscription, onFilterSubscriptionStatus }: FilterSubscriptionTypes) => {
  const onSearchDataValue = (event: ChangeEvent<HTMLInputElement>) => {
    const keySearch = event.target.value;
    onSearchSubscription(keySearch);
  };
  const handleFilterChange = (value: string) => {
    onFilterSubscriptionStatus(value);
  };
  return (
    <div className="flex justify-between items-center w-full py-2">
      <Row gutter={[20, 20]} className="w-[90%]">

        <Col span={6}>
          <Select
            className="w-full"
            placeholder="Filter status"
            options={[
              { value: 'All', label: 'All' },
              { value: SubscriptionStatus.NOT_START, label: 'Not start' },
              { value: SubscriptionStatus.PENDING, label: 'Pending' },
              { value: SubscriptionStatus.FINISHED, label: 'Finished' },
              { value: SubscriptionStatus.CANCELED, label: 'Canceled' },
            ]}
            onChange={handleFilterChange}
          ></Select>
        </Col>
      </Row>

    </div>
  );
};

export default SubscriptionFilter;
