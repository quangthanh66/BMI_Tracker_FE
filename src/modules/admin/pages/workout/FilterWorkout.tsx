import { ChangeEvent } from 'react';
import { Card, Col, Row } from 'antd';
import { BaseInput } from '@app/components/common/inputs/BaseInput/BaseInput';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { PlusOutlined } from '@ant-design/icons';
import { debounce } from 'debounce';

type TFilterWorkout = {
  addNewWorkout: () => void;
  searchWorkout: (event: ChangeEvent<HTMLInputElement>) => void;
};

const FilterWorkout = ({ addNewWorkout, searchWorkout }: TFilterWorkout) => {
  return (
    <Card size="small">
      <div className="flex items-center justify-between">
        <Row gutter={[14, 14]} className="flex-1">
          <Col span={6}>
            <BaseInput placeholder="Search... " onChange={debounce(searchWorkout, 1000)} />
          </Col>
        </Row>

        {/* <BaseButton type="primary" icon={<PlusOutlined />} onClick={addNewWorkout}>
          Add new Workout
        </BaseButton> */}
      </div>
    </Card>
  );
};

export default FilterWorkout;
