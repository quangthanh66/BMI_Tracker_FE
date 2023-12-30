import React, { ChangeEvent, useRef } from 'react';
import { Card, Col, Row, Select } from 'antd';
import { BaseInput } from '@app/components/common/inputs/BaseInput/BaseInput';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { PlusOutlined } from '@ant-design/icons';
import { EFoodStatus } from './type';
import { debounce } from 'debounce';

type TFilterFoods = {
  addNewFood: () => void;
  searchFood: (event: ChangeEvent<HTMLInputElement>) => void;
  filterFoodStatus: (status: string) => void;
};

const FilterFoods = ({ addNewFood, searchFood, filterFoodStatus }: TFilterFoods) => {
  return (
    <Card size="small">
      <div className="flex items-center justify-between">
        <Row gutter={[14, 14]} className="flex-1">
          <Col span={6}>
            <BaseInput placeholder="Search name food ... " onChange={debounce(searchFood, 1000)} />
          </Col>

          <Col span={6}>
            <Select
              className="w-full"
              placeholder="Food status"
              options={[
                { value: 'all', label: 'All' },
                { value: EFoodStatus.Available, label: 'Available ' },
                { value: EFoodStatus.Hidden, label: 'Hidden ' },
              ]}
              onChange={filterFoodStatus}
            />
          </Col>
        </Row>

        <BaseButton type="primary" icon={<PlusOutlined />} onClick={addNewFood}>
          Add new food
        </BaseButton>
      </div>
    </Card>
  );
};

export default FilterFoods;
