import { AiOutlineUser, AiOutlineCustomerService, AiFillProject } from 'react-icons/ai';
import { VscFeedback } from 'react-icons/vsc';
import {
  CoffeeOutlined,
  FormOutlined,
  SafetyCertificateOutlined,
  ProjectOutlined,
  ProjectFilled,
} from '@ant-design/icons';
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
    url: PAGE_ROUTES.HOME,
    icon: <img src="https://cdn-icons-png.flaticon.com/128/12522/12522439.png" alt="Dashboard Icon" style={{ width: '35px', height: '35px' }} />,
  },
  {
    title: 'Users',
    key: 'users-management',
    url: PAGE_ROUTES.USERS,
    icon: <img src="https://cdn-icons-png.flaticon.com/128/7439/7439231.png" alt="Users Icon" style={{ width: '35px', height: '35px' }} />,
  },

  {
    title: 'Subscription',
    key: 'subscription',
    url: '/subscription',
    icon: <img src="https://cdn-icons-png.flaticon.com/128/2299/2299464.png" alt="Subscription" style={{ width: '35px', height: '35px' }} />,
  },
  {
    title: 'Commission',
    key: 'commission-management',
    url: PAGE_ROUTES.TRAINER.COMMISSION,
    icon: <img src="https://cdn-icons-png.flaticon.com/128/10044/10044628.png" alt="Commission Icon" style={{ width: '35px', height: '35px' }} />,
  }
];

export const trainerSidebar: SidebarNavigationItem[] = [
  {
    title: 'Advisor',
    key: 'advisor',
    url: '/advisor',
    icon: <img src="https://cdn-icons-png.flaticon.com/128/7439/7439231.png" alt="Advisor" style={{ width: '35px', height: '35px' }} />,
  },
    {
    title: 'Certificate',
    key: 'certificate',
    url: '/certificate',
    icon: <img src="https://cdn-icons-png.flaticon.com/128/7748/7748280.png" alt="Certificate" style={{ width: '35px', height: '35px' }} />,
  },
  {
    title: 'Subscription',
    key: 'subscription',
    url: '/subscription',
    icon: <img src="https://cdn-icons-png.flaticon.com/128/2299/2299464.png" alt="Subscription" style={{ width: '35px', height: '35px' }} />,
  },
  {
    title: 'Commission',
    key: 'commission-management',
    url: PAGE_ROUTES.TRAINER.COMMISSION,
    icon: <img src="https://cdn-icons-png.flaticon.com/128/10044/10044628.png" alt="Commission Icon" style={{ width: '35px', height: '35px' }} />,
  },
  {
    title: 'Blog',
    key: 'blog',
    url: '/blog',
    icon: <img src="https://cdn-icons-png.flaticon.com/128/9079/9079294.png" alt="Blog Icon" style={{ width: '35px', height: '35px' }} />,
  },
  {
    title: 'User request',
    key: 'feedback',
    url: '/feedback',
    icon: <img src="https://cdn-icons-png.flaticon.com/128/1541/1541419.png" alt="Feedback Icon" style={{ width: '35px', height: '35px' }} />,
  },
  {
    title: 'Ingredients',
    key: 'ingredients',
    url: PAGE_ROUTES.INGREDIENTS,
    icon: <img src="https://cdn-icons-png.flaticon.com/128/3521/3521770.png" alt="Ingredients" style={{ width: '35px', height: '35px' }} />,
  },
  {
    title: 'Food',
    key: 'food',
    url: PAGE_ROUTES.FOOD,
    icon: <img src="https://cdn-icons-png.flaticon.com/128/3765/3765493.png" alt="Food" style={{ width: '35px', height: '35px' }} />,
  },

  {
    title: 'Menu',
    key: 'menu',
    url: PAGE_ROUTES.MENU,
    icon: <img src="https://cdn-icons-png.flaticon.com/128/3837/3837791.png" alt="Menu" style={{ width: '35px', height: '35px' }} />,
  },
  {
    title: 'Exercise',
    key: 'exercise',
    url: '/exercise',
    icon: <img src="https://cdn-icons-png.flaticon.com/128/6984/6984145.png" alt="Exercise" style={{ width: '35px', height: '35px' }} />,
  },
  {
    title: 'Workout',
    key: 'workout',
    url: '/workout',
    icon: <img src="https://cdn-icons-png.flaticon.com/128/17063/17063716.png" alt="Workout" style={{ width: '35px', height: '35px' }} />,
  },

];
