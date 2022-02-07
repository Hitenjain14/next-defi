import React, { useState, useEffect } from 'react';
import tw from 'tailwind-styled-components';
import Image from 'next/image';
import Link from 'next/link';
import { navItems } from '../utils/navItems';
import { useRouter } from 'next/router';

function Side() {
  const router = useRouter();
  const [active, setActiveIcon] = useState(navItems[0].title);
  console.log(router.pathname);

  useEffect(() => {
    if (router.pathname === '/createToken') {
      setActiveIcon('Create Your Token');
    }
  }, []);

  return (
    <Wrapper>
      <LogoContainer>
        <Logo>
          <Image
            src="/cb-logo.png"
            width={300}
            height={300}
            objectFit="contain"
          />
        </Logo>
      </LogoContainer>
      <NavItemsContainer>
        {navItems.map((item, index) => (
          <Link key={index} href={item.link}>
            <NavItem onClick={() => setActiveIcon(item.title)}>
              <NavIcon
                className={
                  active === item.title ? 'text-blue-500' : 'text-white'
                }
              >
                {item.icon}
              </NavIcon>
              <NavTitle>{item.title}</NavTitle>
            </NavItem>
          </Link>
        ))}
      </NavItemsContainer>
    </Wrapper>
  );
}

export default Side;

const Wrapper = tw.div`
h-screen border-r-2 border-solid border-gray-800 w-1/5 p-1 
`;

const LogoContainer = tw.div`
my-0
`;

const Logo = tw.div`
w-2/5 object-contain ml-6
`;

const NavItemsContainer = tw.div`
mt-4 hover:cursor-pointer
`;

const NavItem = tw.div`
flex items-center text-lg font-medium rounded-lg mb-6 h-16 hover:bg-gray-900
`;

const NavIcon = tw.div`
bg-gray-900  p-3 rounded-full  m-1 grid place-items-center 
`;
const NavTitle = tw.div`text-white font-semibold text-xl ml-4`;
