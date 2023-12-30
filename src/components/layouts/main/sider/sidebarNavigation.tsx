import { AiOutlineUser, AiOutlineHome, AiOutlineCustomerService } from 'react-icons/ai';
import { IoFastFoodOutline } from 'react-icons/io5';
import { VscFeedback } from 'react-icons/vsc';
import { BsChatDots } from 'react-icons/bs';
import { AreaChartOutlined, CoffeeOutlined, ReadOutlined } from '@ant-design/icons';
import { PAGE_ROUTES } from '@app/utils/router';
import { MdOutlineFastfood } from 'react-icons/md';

export interface SidebarNavigationItem {
  title: string;
  key: string;
  url?: string;
  children?: SidebarNavigationItem[];
  icon?: React.ReactNode;
}

export const sidebarNavigation: SidebarNavigationItem[] = [
  {
    title: 'Charts',
    key: 'charts',
    url: '/charts',
    icon: <AreaChartOutlined />,
  },
  {
    title: 'Users',
    key: 'users-management',
    url: '/users',
    icon: <AiOutlineUser />,
  },
  {
    title: 'Food',
    key: 'food',
    url: PAGE_ROUTES.FOOD,
    icon: <MdOutlineFastfood />,
  },
  {
    title: 'Inventory',
    key: 'inventory',
    url: '/inventory',
    icon: <IoFastFoodOutline />,
  },
  {
    title: 'Feedback',
    key: 'feedback',
    url: '/feedback',
    icon: <VscFeedback />,
  },
  {
    title: 'Services',
    key: 'services',
    url: '/services',
    icon: <AiOutlineCustomerService />,
  },
  {
    title: 'Chatting',
    key: 'chatting',
    url: '/chatting',
    icon: <BsChatDots />,
  },
  {
    title: 'Feed',
    key: 'feed',
    url: '/feed',
    icon: <ReadOutlined />,
  },
  {
    title: 'Blog',
    key: 'blog',
    url: '/blog',
    icon: <CoffeeOutlined />,
  },
];
