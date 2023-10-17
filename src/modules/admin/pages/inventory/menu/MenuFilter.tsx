import { PlusOutlined } from '@ant-design/icons';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BaseInput } from '@app/components/common/inputs/BaseInput/BaseInput';
import { BaseSelect } from '@app/components/common/selects/BaseSelect/BaseSelect';
import { Col, Row } from 'antd';
import { debounce } from 'debounce';
import { ChangeEvent } from 'react';

type FilterMenuTypes = {
  onCreateNewMenu: () => void;
  onSearchMenu: (keyValue: string) => void;
};

const MenuFilter = ({ onCreateNewMenu, onSearchMenu }: FilterMenuTypes) => {
  const onSearchDataValue = (event: ChangeEvent<HTMLInputElement>) => {
    const keySearch = event.target.value;
    onSearchMenu(keySearch);
  };
  return (
    <div className="flex justify-between items-center w-full py-2">
      <Row gutter={[20, 20]} className="w-[90%]">
        <Col span={6}>
          <BaseInput placeholder={'Enter your menu name'} onChange={debounce(onSearchDataValue, 1000)} />
        </Col>

        <Col span={6}>
          <BaseSelect
            placeholder="Choose your menu type"
            width="100%"
            options={[
              { value: 'Vegetarian', label: 'Vegetarian' },
              { value: 'Salty ', label: 'Salty' },
              { value: 'Weight gain', label: 'Weight gain' },
              { value: 'Weight loss ', label: 'Weight loss' },
              { value: 'Muscle gain', label: 'Muscle gain' },
              { value: 'Muscle loss', label: 'Muscle loss' },
            ]}
          ></BaseSelect>
        </Col>
      </Row>

      <BaseButton type="primary" className="flex items-center " icon={<PlusOutlined />} onClick={onCreateNewMenu}>
        Create a new menu
      </BaseButton>
    </div>
  );
};

export default MenuFilter;
