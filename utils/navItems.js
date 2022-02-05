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
  },
  {
    title: 'Trade',
    icon: <BiTrendingUp />,
  },
  {
    title: 'Pay',
    icon: <RiCoinsLine />,
  },
  {
    title: 'Create Your Token',
    icon: <GiToken />,
  },
  {
    title: 'List Your Token',
    icon: <AiOutlinePlusCircle />,
  },
  {
    title: 'Notifications',
    icon: <RiNotification3Line />,
  },
  {
    title: 'Send a gift',
    icon: <AiOutlineGift />,
  },
];
