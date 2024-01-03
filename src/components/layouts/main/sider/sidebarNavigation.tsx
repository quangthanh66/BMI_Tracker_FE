import { AiOutlineUser, AiOutlineCustomerService } from 'react-icons/ai';
import { VscFeedback } from 'react-icons/vsc';
import { BsChatDots } from 'react-icons/bs';
import { CoffeeOutlined } from '@ant-design/icons';
import { PAGE_ROUTES } from '@app/utils/router';
import { MdOutlineFastfood } from 'react-icons/md';
import { GiFoodChain } from 'react-icons/gi';

export interface SidebarNavigationItem {
  title: string;
  key: string;
  url?: string;
  children?: SidebarNavigationItem[];
  icon?: React.ReactNode;
}

export const sidebarNavigation: SidebarNavigationItem[] = [
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
    title: 'Blog',
    key: 'blog',
    url: '/blog',
    icon: <CoffeeOutlined />,
  },
];
