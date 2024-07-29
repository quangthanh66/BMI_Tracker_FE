import { PlusOutlined } from '@ant-design/icons';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BaseInput } from '@app/components/common/inputs/BaseInput/BaseInput';
import { Col, Row, Select } from 'antd';
import { debounce } from 'debounce';
import { ChangeEvent } from 'react';
import { AdvisorStatus } from './constant';

type FilterAdvisorTypes = {
  onCreateAdvisor: () => void;
  onSearchAdvisor: (keyValue: string) => void;
  onFilterAdvisorStatus: (status: boolean) => void;
};

const AdvisorFilter = ({ onCreateAdvisor, onSearchAdvisor, onFilterAdvisorStatus }: FilterAdvisorTypes) => {
  const onSearchDataValue = (event: ChangeEvent<HTMLInputElement>) => {
    const keySearch = event.target.value;
    onSearchAdvisor(keySearch);
  };
  return (
    <div className="">
      {/* <Row gutter={[20, 20]} className="w-[90%]">
        <Col span={6}>
          <BaseInput placeholder={'Enter your advisor name'} onChange={debounce(onSearchDataValue, 1000)} />
        </Col>

        <Col span={6}>
          <Select
            className="w-full"
            onChange={onFilterAdvisorStatus}
            placeholder="Choose your Advisor type"
            options={[
              { value: 'all', label: 'All' },
              { value: AdvisorStatus.active, label: 'Active' },
              { value: AdvisorStatus.deactive, label: 'DeActive' },
            ]}
          ></Select>
        </Col>
      </Row>

      <BaseButton type="primary" className="flex items-center " icon={<PlusOutlined />} onClick={onCreateFeedback}>
        Create a new feedback
      </BaseButton> */}
    </div>
  );
};

export default AdvisorFilter;
