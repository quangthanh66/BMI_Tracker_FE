import { PlusOutlined } from '@ant-design/icons';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BaseInput } from '@app/components/common/inputs/BaseInput/BaseInput';
import { Col, Row, Select } from 'antd';
import { debounce } from 'debounce';
import { ChangeEvent } from 'react';
import { FeedbackStatus } from './constant';

type FilterFeedbackTypes = {
  onCreateFeedback: () => void;
  onSearchFeedback: (keyValue: string) => void;
  onFilterFeedbackStatus: (status: string) => void;
};

const FeedbackFilter = ({ onCreateFeedback, onSearchFeedback, onFilterFeedbackStatus }: FilterFeedbackTypes) => {
  const onSearchDataValue = (event: ChangeEvent<HTMLInputElement>) => {
    const keySearch = event.target.value;
    onSearchFeedback(keySearch);
  };

  const handleFilterChange = (value: string) => {
    onFilterFeedbackStatus(value);
  };

  return (
    <div className="flex justify-between items-center w-full py-2">
      <Row gutter={[20, 20]} className="w-[90%]">
        {/* <Col span={6}>
          <BaseInput placeholder={'Search...'} onChange={debounce(onSearchDataValue, 1000)} />
        </Col> */}

        <Col span={6}>
          <Select
            className="w-full"
            placeholder="Filter status"
            options={[
              { value: 'All', label: 'All' },
              { value: FeedbackStatus.APPROVED, label: 'Approved' },
              { value: FeedbackStatus.REJECTED, label: 'Rejected' },
              { value: FeedbackStatus.PENDING, label: 'Pending' },
            ]}
            onChange={handleFilterChange}
          />
        </Col>
      </Row>
    </div>
  );
};

export default FeedbackFilter;
