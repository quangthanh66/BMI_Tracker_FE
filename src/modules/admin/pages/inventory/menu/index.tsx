import { Card, Col, Row, Typography } from 'antd';
import { useRef } from 'react';
import MenuFilter from './MenuFilter';
import CreateMenuModal from './CreateMenuModal';
import UpdateMenuModal from './UpdateMenuModal';
import { MENU_TABLE_DATA, MenuColumns } from './constant';
import { BaseTable } from '@app/components/common/BaseTable/BaseTable';
import DescriptionModal from './DescriptionModal';
import ViewDetailFood from './ViewDetailFood';

const MenuInventory = () => {
  const createMenuRef = useRef<any>();
  const updateMenuRef = useRef<any>();
  const descriptionRef = useRef<any>();
  const viewDetailRef = useRef<any>();

  const onCreateNewMenu = () => {
    createMenuRef.current.openModal();
  };

  const onUpdateMenu = () => {
    updateMenuRef.current.openModal();
  };

  const onOpenDescriptionModal = () => {
    descriptionRef.current.openModal();
  };

  const onSearchMenuName = (value: string) => {
    console.log(value);
  };

  const onViewDetailFood = () => {
    viewDetailRef.current.openModal();
  };

  return (
    <Row gutter={[14, 14]}>
      <CreateMenuModal ref={createMenuRef} />
      <UpdateMenuModal ref={updateMenuRef} />
      <DescriptionModal ref={descriptionRef} content="This is a description of the menu" />
      <ViewDetailFood ref={viewDetailRef} />

      <Col span={24}>
        <Card>
          <Typography.Text className="text-xl font-bold">Menu management</Typography.Text>
        </Card>
      </Col>

      <Col span={24}>
        <Card size="small">
          <MenuFilter onCreateNewMenu={onCreateNewMenu} onSearchMenu={onSearchMenuName} />
        </Card>
      </Col>

      <Col span={24}>
        <BaseTable
          columns={MenuColumns({
            updateMenuModal: onUpdateMenu,
            descriptionModal: onOpenDescriptionModal,
            viewDetailModal: onViewDetailFood,
          })}
          dataSource={MENU_TABLE_DATA}
          scroll={{
            y: (1 - 565 / window.innerHeight) * window.innerHeight,
            x: 1200,
          }}
        />
      </Col>
    </Row>
  );
};

export default MenuInventory;
