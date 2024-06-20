import { AiOutlineUser, AiOutlineCustomerService } from 'react-icons/ai';
import { VscFeedback } from 'react-icons/vsc';
import { CoffeeOutlined, FormOutlined, SafetyCertificateOutlined } from '@ant-design/icons';
import { PAGE_ROUTES } from '@app/utils/router';
import { MdOutlineFastfood, MdOutlineRestaurantMenu } from 'react-icons/md';
import { GiFoodChain } from 'react-icons/gi';
import { FaChartSimple } from 'react-icons/fa6';

export interface SidebarNavigationItem {
  title: string;
  key: string;
  url?: string;
  children?: SidebarNavigationItem[];
  icon?: React.ReactNode;
}

export const sidebarNavigation: SidebarNavigationItem[] = [
  {
    title: 'Dashboard',
    key: 'dashboard',
    url: PAGE_ROUTES.DASHBOARD,
    icon: <FaChartSimple />,
  },
  {
    title: 'Users',
    key: 'users-management',
    url: PAGE_ROUTES.USERS,
    icon: <AiOutlineUser />,
  },
  {
    title: 'Food',
    key: 'food',
    url: PAGE_ROUTES.FOOD,
    icon: <MdOutlineFastfood />,
  },
  {
    title: 'Ingredients',
    key: 'ingredients',
    url: PAGE_ROUTES.INGREDIENTS,
    icon: <GiFoodChain />,
  },
  {
    title: 'Menu',
    key: 'menu',
    url: PAGE_ROUTES.MENU,
    icon: <MdOutlineRestaurantMenu />,
  },
  {
    title: 'Feedback',
    key: 'feedback',
    url: '/feedback',
    icon: <VscFeedback />,
  },
  // {
  //   title: 'Services',
  //   key: 'services',
  //   url: '/services',
  //   icon: <AiOutlineCustomerService />,
  // },

  {
    title: 'Blog',
    key: 'blog',
    url: '/blog',
    icon: <FormOutlined />,
  },
  {
    title: 'Certificate',
    key: 'certificate',
    url: '/certificate',
    icon: <SafetyCertificateOutlined />,
  },
];

export const trainerSidebar: SidebarNavigationItem[] = [
  {
    title: 'Users',
    key: 'users-management',
    url: PAGE_ROUTES.TRAINER.USERS,
    icon: <AiOutlineUser />,
  },
  {
    title: 'Services',
    key: 'service-management',
    url: PAGE_ROUTES.TRAINER.SERVICES,
    icon: <AiOutlineCustomerService />,
  },
  {
    title: 'Menu',
    key: 'menu',
    url: PAGE_ROUTES.TRAINER.MENU,
    icon: <MdOutlineRestaurantMenu />,
  },

  {
    title: 'Blog',
    key: 'blog',
    url: PAGE_ROUTES.TRAINER.BLOG,
    icon: <FormOutlined />,
  },
];
