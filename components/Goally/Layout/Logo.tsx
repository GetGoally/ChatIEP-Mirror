import React from "react";

import LogoIcon from "@/assets/logo.svg";
import Link from "next/link";

type Props = {
  className: String;
};

const Logo: React.FC<Props> = ({ className }) => {
  return (
    <Link className={`hidden items-center lg:flex ${className}`} href="http://getgoally.com/">
      <LogoIcon />
      <span className="ml-[15px] inline-block font-rubik text-[40px] font-medium leading-[1.31] text-black">
        Goally
      </span>
    </Link>
  );
};

export default Logo;
