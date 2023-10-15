import type { TabsProps } from 'antd';
import MenuInventory from './menu';
import FoodInventory from './food';
import IngredientInventory from './ingredients';

export const INVENTORY_ITEMS: TabsProps['items'] = [
  {
    key: 'menu',
    label: 'Menu',
    children: <MenuInventory />,
  },
  {
    key: 'food',
    label: 'Food',
    children: <FoodInventory />,
  },
  {
    key: 'ingredients',
    label: 'Ingredients',
    children: <IngredientInventory />,
  },
];
