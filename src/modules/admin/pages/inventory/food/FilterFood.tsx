import { PlusOutlined } from '@ant-design/icons';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseInput } from '@app/components/common/inputs/BaseInput/BaseInput';
import { BaseSelect } from '@app/components/common/selects/BaseSelect/BaseSelect';
import { debounce } from 'debounce';
import { ChangeEvent } from 'react';

type FilterFoodTypes = {
  onCreateFood: () => void;
  onSearchFood: (keyValue: string) => void;
};
const FilterFood = ({ onCreateFood, onSearchFood }: FilterFoodTypes, ref: any) => {
  const onSearchDataValue = (event: ChangeEvent<HTMLInputElement>) => {
    const keySearch = event.target.value;
    onSearchFood(keySearch);
  };
  return (
    <div className="flex justify-between items-center w-full py-2">
      <BaseRow gutter={[20, 20]} className="w-[90%]">
        <BaseCol span={6}>
          <BaseInput placeholder={'Enter your food name'} onChange={debounce(onSearchDataValue, 1000)} />
        </BaseCol>

        <BaseCol span={6}>
          <BaseSelect
            placeholder="Choose your food category"
            width="100%"
            options={[
              { value: 'Fast food', label: 'Fast food' },
              { value: 'Vegetarian ', label: 'Vegetarian' },
            ]}
          ></BaseSelect>
        </BaseCol>
      </BaseRow>

      <BaseButton type="primary" className="flex items-center " icon={<PlusOutlined />} onClick={onCreateFood}>
        Create a new food
      </BaseButton>
    </div>
  );
};

export default FilterFood;
