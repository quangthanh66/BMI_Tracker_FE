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
  onFilterCommissionStatus: (status: string) => void;
};

const CommissionFilter = ({ onCreateCommission, onSearchCommission, onFilterCommissionStatus }: FilterCommissionTypes) => {
  const onSearchDataValue = (event: ChangeEvent<HTMLInputElement>) => {
    const keySearch = event.target.value;
    onSearchCommission(keySearch);
  };

  const handleFilterChange = (value: string) => {
    onFilterCommissionStatus(value);
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
              { value: CommissionStatus.PAID, label: 'Paid' },
              { value: CommissionStatus.UNPAID, label: 'Unpaid' },
            ]}
            onChange={handleFilterChange}
          ></Select>
        </Col>
      </Row>

    </div>
  );
};

export default CommissionFilter;
