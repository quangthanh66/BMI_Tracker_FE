import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseTable } from '@app/components/common/BaseTable/BaseTable';
import { BaseTypography } from '@app/components/common/BaseTypography/BaseTypography';
import { Card } from 'antd';
import { IngredientColumns } from './constant';
import FilterIngredient from './FilterIngredient';
import { useRef } from 'react';
import CreateIngredient from './CreateIngredient';
import UpdateIngredient from './UpdateIngredient';

const IngredientInventory = () => {
  const createIngredientRef = useRef<any>();
  const updateIngredientRef = useRef<any>();

  const onSearchIngredient = (value: string) => {};
  const onCreateIngredient = () => {
    createIngredientRef.current.openModal();
  };

  const onUpdateIngredient = () => {
    updateIngredientRef.current.openModal();
  };

  return (
    <BaseRow gutter={[20, 20]}>
      <CreateIngredient ref={createIngredientRef} />
      <UpdateIngredient ref={updateIngredientRef} />

      <BaseCol span={24}>
        <Card>
          <BaseTypography className="text-xl font-bold">Ingredient management</BaseTypography>
        </Card>
      </BaseCol>

      <BaseCol span={24}>
        <Card size="small">
          <FilterIngredient onCreateIngredient={onCreateIngredient} onSearchIngredient={onSearchIngredient} />
        </Card>
      </BaseCol>

      {/* <BaseCol span={24}>
        <BaseTable
          columns={IngredientColumns({ updateIngredientModal: onUpdateIngredient })}
          dataSource={INGREDIENTS_DATA}
          scroll={{
            y: (1 - 565 / window.innerHeight) * window.innerHeight,
            x: 1200,
          }}
        />
      </BaseCol> */}
    </BaseRow>
  );
};

export default IngredientInventory;
