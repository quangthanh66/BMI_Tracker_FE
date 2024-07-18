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
  onFilterSubscriptionStatus: (status: boolean) => void;
};

const SubscriptionFilter = ({ onCreateSubscription, onSearchSubscription, onFilterSubscriptionStatus }: FilterSubscriptionTypes) => {
  const onSearchDataValue = (event: ChangeEvent<HTMLInputElement>) => {
    const keySearch = event.target.value;
    onSearchSubscription(keySearch);
  };
  return (
    <div className="flex justify-between items-center w-full py-2">
      <Row gutter={[20, 20]} className="w-[90%]">
        <Col span={6}>
          <BaseInput placeholder={'Enter your Subscription name'} onChange={debounce(onSearchDataValue, 1000)} />
        </Col>

        <Col span={6}>
          <Select
            className="w-full"
            onChange={onFilterSubscriptionStatus}
            placeholder="Choose your Subscription type"
            options={[
              { value: 'all', label: 'All' },
              { value: SubscriptionStatus.active, label: 'Active' },
              { value: SubscriptionStatus.deactive, label: 'DeActive' },
            ]}
          ></Select>
        </Col>
      </Row>

      {/* <BaseButton type="primary" className="flex items-center " icon={<PlusOutlined />} onClick={onCreateFeedback}>
        Create a new feedback
      </BaseButton> */}
    </div>
  );
};

export default SubscriptionFilter;
