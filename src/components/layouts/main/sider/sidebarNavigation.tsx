import { AiOutlineUser, AiOutlineHome, AiOutlineCustomerService } from 'react-icons/ai';
import { IoFastFoodOutline } from 'react-icons/io5';
import { VscFeedback } from 'react-icons/vsc';
import { BsChatDots } from 'react-icons/bs';

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
    url: '/',
    icon: <AiOutlineHome />,
  },
  {
    title: 'Users',
    key: 'users-management',
    url: '/users',
    icon: <AiOutlineUser />,
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
];
