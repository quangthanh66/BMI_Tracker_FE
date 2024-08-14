import { PlusOutlined } from '@ant-design/icons';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BaseInput } from '@app/components/common/inputs/BaseInput/BaseInput';
import { Card, Col, Row } from 'antd';
import { debounce } from 'debounce';
import { ChangeEvent } from 'react';

type TFilterExercise = {
  searchExercise: (event: ChangeEvent<HTMLInputElement>) => void;
  addNewExercise: () => void;
};

const FilterExercise = ({ searchExercise,  addNewExercise }: TFilterExercise) => {
  return (
    <Card size="small">
      <div className="flex items-center justify-between">
        <Row gutter={[14, 14]} className="flex-1">
          <Col span={6}>
            <BaseInput placeholder="Search... " onChange={debounce(searchExercise, 1000)} />
          </Col>
        </Row>

        <BaseButton type="primary" icon={<PlusOutlined />} onClick={addNewExercise}>
          Add
        </BaseButton>
      </div>
    </Card>
  );
};

export default FilterExercise;
