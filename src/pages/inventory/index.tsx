import { BaseTabs } from '@app/components/common/BaseTabs/BaseTabs';
import { INVENTORY_ITEMS } from '@app/modules/admin/pages/inventory/constant';

const InventoryManagement = () => {
  return <BaseTabs defaultActiveKey="menu" items={INVENTORY_ITEMS} />;
};

export default InventoryManagement;
