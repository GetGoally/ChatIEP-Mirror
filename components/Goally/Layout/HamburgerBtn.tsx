import React from "react";
import { twMerge } from "tailwind-merge";

import { useAppContext } from "@/utils/context/AppContext";

const HamburgerBtn = () => {
  const {
    isMenuOpen,
    actions: { toggleMenu },
  } = useAppContext();

  return (
    <button
      className={twMerge(
        "hamburger-transition relative block m-[10px] h-[42px] w-[42px] cursor-pointer lg:hidden",
        isMenuOpen ? "open" : ""
      )}
      aria-haspopup={true}
      aria-expanded={isMenuOpen}
      aria-label="Toggle Mobile Navigation Menu"
      onClick={toggleMenu}
    >
      <span
        className={twMerge(
          "absolute top-2/4 left-2/4 block h-1 w-full -translate-x-1/2 -translate-y-1/2 bg-black  before:absolute before:left-0 before:-top-2.5  before:h-1 before:w-full before:bg-black  after:absolute after:left-0 after:-bottom-2.5 after:h-1 after:w-full after:bg-black",
          isMenuOpen
            ? "bg-transparent before:top-0 before:-rotate-45 after:bottom-0 after:rotate-45"
            : ""
        )}
      ></span>
    </button>
  );
};

export default HamburgerBtn;
