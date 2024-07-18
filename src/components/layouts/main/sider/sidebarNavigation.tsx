import { AiOutlineUser, AiOutlineCustomerService, AiFillProject } from 'react-icons/ai';
import { VscFeedback } from 'react-icons/vsc';
import { CoffeeOutlined, FormOutlined, SafetyCertificateOutlined, ProjectOutlined, ProjectFilled } from '@ant-design/icons';
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
    title: 'Feedback',
    key: 'feedback',
    url: '/feedback',
    icon: <VscFeedback />,
  },

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
  {
    title: 'Plan',
    key: 'plan',
    url: '/plan',
    icon: <AiFillProject />,
  },
  {
    title: 'Commission',
    key: 'commission-management',
    url: PAGE_ROUTES.TRAINER.COMMISSION,
    icon: <AiOutlineUser />,
  },
];

export const trainerSidebar: SidebarNavigationItem[] = [

  {
    title: 'Advisor',
    key: 'advisor',
    url: '/advisor',
    icon: <AiOutlineUser />,
  },
    {
    title: 'Certificate',
    key: 'certificate',
    url: '/certificate',
    icon: <SafetyCertificateOutlined />,
  },
  {
    title: 'Ingredients',
    key: 'ingredients',
    url: PAGE_ROUTES.INGREDIENTS,
    icon: <GiFoodChain />,
  },
  {
    title: 'Food',
    key: 'food',
    url: PAGE_ROUTES.FOOD,
    icon: <MdOutlineFastfood />,
  },

  {
    title: 'Menu',
    key: 'menu',
    url: PAGE_ROUTES.MENU,
    icon: <MdOutlineRestaurantMenu />,
  },
  {
    title: 'Exercise',
    key: 'exercise',
    url: '/exercise',
    icon: <ProjectOutlined />,
  },
  {
    title: 'Workout',
    key: 'workout',
    url: '/workout',
    icon: <ProjectFilled />,
  },
  {
    title: 'Subscription',
    key: 'subscription',
    url: '/subscription',
    icon: <CoffeeOutlined />,
  },
];
