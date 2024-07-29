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
  onFilterFeedbackStatus: (status: boolean) => void;
};

const FeedbackFilter = ({ onCreateFeedback, onSearchFeedback }: FilterFeedbackTypes) => {
  const onSearchDataValue = (event: ChangeEvent<HTMLInputElement>) => {
    const keySearch = event.target.value;
    onSearchFeedback(keySearch);
  };
  return (
    <div className="flex justify-between items-center w-full py-2">
      <Row gutter={[20, 20]} className="w-[90%]">
        <Col span={6}>
          <BaseInput placeholder={'Search...'} onChange={debounce(onSearchDataValue, 1000)} />
        </Col>

        {/* <Col span={6}>
          <Select
            className="w-full"
          
            placeholder="Choose your feedback type"
            options={[
              { value: 'all', label: 'All' },
              { value: FeedbackStatus.active, label: 'Active' },
              { value: FeedbackStatus.deactive, label: 'Waiting' },
            ]}
          ></Select>
        </Col> */}
      </Row>

      {/* <BaseButton type="primary" className="flex items-center " icon={<PlusOutlined />} onClick={onCreateFeedback}>
        Create a new feedback
      </BaseButton> */}
    </div>
  );
};

export default FeedbackFilter;
