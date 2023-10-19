import { PlusOutlined } from '@ant-design/icons';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BaseInput } from '@app/components/common/inputs/BaseInput/BaseInput';
import { BaseSelect } from '@app/components/common/selects/BaseSelect/BaseSelect';
import { Col, Row } from 'antd';
import { debounce } from 'debounce';
import { ChangeEvent } from 'react';

type FilterFeedbackTypes = {
  onCreateFeedback: () => void;
  onSearchFeedback: (keyValue: string) => void;
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
          <BaseInput placeholder={'Enter your feedback name'} onChange={debounce(onSearchDataValue, 1000)} />
        </Col>

        <Col span={6}>
          <BaseSelect
            placeholder="Choose your feedback type"
            width="100%"
            options={[
              { value: 'Accept', label: 'Accept' },
              { value: 'Reject ', label: 'Reject' },
            ]}
          ></BaseSelect>
        </Col>
      </Row>

      <BaseButton type="primary" className="flex items-center " icon={<PlusOutlined />} onClick={onCreateFeedback}>
        Create a new feedback
      </BaseButton>
    </div>
  );
};

export default FeedbackFilter;
