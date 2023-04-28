import React from 'react';

import Container from '@/components/Goally/Layout/Container';
import HamburgerBtn from '@/components/Goally/Layout/HamburgerBtn';
import Logo from '@/components/Goally/Layout/Logo';
import Navigation from '@/components/Goally/Layout/Navigation';

import HandsIcon from '@/assets/hands.svg';

const Header: React.FC = () => {
  return (
    <header className="header-shadow fixed z-20 h-[100px] w-full bg-white lg:h-[130px]">
      <Container className="lg:flex lg:items-center lg:py-[15px]">
        <Logo className="shrink-0 basis-[23%]" />
        <div className="relative z-50 flex items-center justify-between py-[15px] lg:order-1 lg:shrink-0 lg:basis-[23%] lg:justify-end lg:p-0">
          <HamburgerBtn />
          <a
            className="flex items-center justify-center rounded-[10px] border px-6 py-3 font-rubik text-sm font-bold leading-[1.31] lg:px-6 lg:py-3 lg:text-xl lg:font-bold lg:leading-[1.31]"
            href="https://getgoally.com/pricing/"
          >
            Get Started
            <span className="ml-[9px] inline-block w-[18px] lg:w-[28px]">
              <HandsIcon />
            </span>
          </a>
        </div>
        <Navigation />
      </Container>
    </header>
  );
};

export default Header;
