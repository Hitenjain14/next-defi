import {
  AiOutlinePieChart,
  AiOutlinePlusCircle,
  AiOutlineGift,
} from 'react-icons/ai';
import { BiTrendingUp } from 'react-icons/bi';
import { RiCoinsLine, RiNotification3Line } from 'react-icons/ri';
import { MdWeb } from 'react-icons/md';
import { BsPersonPlus } from 'react-icons/bs';
import { GiToken } from 'react-icons/gi';

export const navItems = [
  {
    title: 'Assets',
    icon: <AiOutlinePieChart />,
    link: '/',
  },
  {
    title: 'Trade',
    icon: <BiTrendingUp />,
    link: '/',
  },
  {
    title: 'Pay',
    icon: <RiCoinsLine />,
    link: '/',
  },
  {
    title: 'Create Your Token',
    icon: <GiToken />,
    link: '/createToken',
  },
  {
    title: 'List Your Token',
    icon: <AiOutlinePlusCircle />,
    link: '/',
  },
  {
    title: 'Notifications',
    icon: <RiNotification3Line />,
    link: '/',
  },
  {
    title: 'Send a gift',
    icon: <AiOutlineGift />,
    link: '/',
  },
];
