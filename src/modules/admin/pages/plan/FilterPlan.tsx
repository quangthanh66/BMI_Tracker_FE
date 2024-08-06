import { PlusOutlined } from '@ant-design/icons';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BaseInput } from '@app/components/common/inputs/BaseInput/BaseInput';
import { Card, Col, Row } from 'antd';
import { debounce } from 'debounce';
import { ChangeEvent } from 'react';

type TFilterPlan = {
  addNewPlan: () => void;
  searchPlan: (event: ChangeEvent<HTMLInputElement>) => void;
};

const FilterPlan = ({ addNewPlan, searchPlan }: TFilterPlan) => {
  return (
    <Card size="small">
      <div className="flex items-center justify-between">
        <Row gutter={[14, 14]} className="flex-1">
          <Col span={6}>
            <BaseInput placeholder="Search... " onChange={debounce(searchPlan, 1000)} />
          </Col>
        </Row>

        {/* <BaseButton type="primary" icon={<PlusOutlined />} onClick={addNewPlan}>
          Add new plan
        </BaseButton> */}
      </div>
    </Card>
  );
};




export default FilterPlan;
