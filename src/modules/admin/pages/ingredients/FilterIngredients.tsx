import { PlusOutlined } from '@ant-design/icons';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BaseInput } from '@app/components/common/inputs/BaseInput/BaseInput';
import { Card, Col, Row } from 'antd';
import { debounce } from 'debounce';
import { ChangeEvent } from 'react';

type TFilterIngredients = {
  searchIngredients: (event: ChangeEvent<HTMLInputElement>) => void;
  addNewIngredient: () => void;
};

const FilterIngredients = ({ searchIngredients, addNewIngredient }: TFilterIngredients) => {
  return (
    <Card size="small">
      <div className="flex items-center justify-between">
        <Row gutter={[14, 14]} className="flex-1">
          <Col span={6}>
            <BaseInput placeholder="Search... " onChange={debounce(searchIngredients, 1000)} />
          </Col>
        </Row>

        <BaseButton type="primary" icon={<PlusOutlined />} onClick={addNewIngredient}>
          Add
        </BaseButton>
      </div>
    </Card>
  );
};

export default FilterIngredients;
