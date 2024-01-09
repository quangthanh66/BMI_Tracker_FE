import { PlusOutlined } from '@ant-design/icons';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BaseInput } from '@app/components/common/inputs/BaseInput/BaseInput';
import { Col, Row, Select } from 'antd';
import { debounce } from 'debounce';
import { ChangeEvent } from 'react';

interface IFilterServiceState {
  searchService: (event: ChangeEvent<HTMLInputElement>) => void;
  addNewService: () => void;
  selectServiceStatus: (value: string) => void;
}

const FilterServices = ({ searchService, addNewService, selectServiceStatus }: IFilterServiceState) => {
  return (
    <div className="flex justify-between items-center w-full py-2">
      <Row gutter={[20, 20]} className="w-[90%]">
        <Col span={6}>
          <BaseInput placeholder={'Enter your service name'} onChange={debounce(searchService, 1000)} />
        </Col>

        <Col span={6}>
          <Select
            className="w-full"
            onChange={selectServiceStatus}
            placeholder="Choose your service status"
            options={[
              { value: '', label: 'All' },
              { value: 'available-service', label: 'Available' },
              { value: 'hidden', label: 'Hidden' },
            ]}
          ></Select>
        </Col>
      </Row>

      <BaseButton type="primary" className="flex items-center " icon={<PlusOutlined />} onClick={addNewService}>
        Create a new service
      </BaseButton>
    </div>
  );
};

export default FilterServices;
