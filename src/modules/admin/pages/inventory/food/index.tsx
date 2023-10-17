import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseTable } from '@app/components/common/BaseTable/BaseTable';
import { BaseTypography } from '@app/components/common/BaseTypography/BaseTypography';
import { Card } from 'antd';
import { FOODS_DATA, FoodColumns} from './constant';
import { useRef } from 'react';
import CreateFood from './CreateFood';
import UpdateFood from './UpdateFood';
import FilterFood from './FilterFood';

const FoodInventory = () => {
  const createFoodRef = useRef<any>();
  const updateFoodRef = useRef<any>();

  const onSearchFood = (value: string) => {};
  const onCreateFood = () => {
    createFoodRef.current.openModal();
  };

  const onUpdateFood = () => {
    updateFoodRef.current.openModal();
  };

  return (
    <BaseRow gutter={[20, 20]}>
      <CreateFood ref={createFoodRef} />
      <UpdateFood ref={updateFoodRef} />

      <BaseCol span={24}>
        <Card>
          <BaseTypography className="text-xl font-bold">Food management</BaseTypography>
        </Card>
      </BaseCol>

      <BaseCol span={24}>
        <Card size="small">
          <FilterFood onCreateFood={onCreateFood} onSearchFood={onSearchFood} />
        </Card>
      </BaseCol>

      <BaseCol span={24}>
        <BaseTable
          columns={FoodColumns({ updateFoodModal: onUpdateFood })}
          dataSource={FOODS_DATA}
          scroll={{
            y: (1 - 565 / window.innerHeight) * window.innerHeight,
            x: 1200,
          }}
        />
      </BaseCol>
    </BaseRow>
  );
};

export default FoodInventory;
