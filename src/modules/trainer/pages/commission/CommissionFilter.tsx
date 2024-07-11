import { PlusOutlined } from '@ant-design/icons';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BaseInput } from '@app/components/common/inputs/BaseInput/BaseInput';
import { Col, Row, Select } from 'antd';
import { debounce } from 'debounce';
import { ChangeEvent } from 'react';
import { CommissionStatus } from './constant';

type FilterCommissionTypes = {
  onCreateCommission: () => void;
  onSearchCommission: (keyValue: string) => void;
  onFilterCommissionStatus: (status: boolean) => void;
};

const CommissionFilter = ({ onCreateCommission, onSearchCommission, onFilterCommissionStatus }: FilterCommissionTypes) => {
  const onSearchDataValue = (event: ChangeEvent<HTMLInputElement>) => {
    const keySearch = event.target.value;
    onSearchCommission(keySearch);
  };
  return (
    <div className="flex justify-between items-center w-full py-2">
      <Row gutter={[20, 20]} className="w-[90%]">
        <Col span={6}>
          <BaseInput placeholder={'Enter your Commission name'} onChange={debounce(onSearchDataValue, 1000)} />
        </Col>

        <Col span={6}>
          <Select
            className="w-full"
            onChange={onFilterCommissionStatus}
            placeholder="Choose your Commission type"
            options={[
              { value: 'all', label: 'All' },
              { value: CommissionStatus.active, label: 'Active' },
              { value: CommissionStatus.deactive, label: 'DeActive' },
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

export default CommissionFilter;
