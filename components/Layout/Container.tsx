import React from "react";

type Props = {
  children: React.ReactNode;
  className?: String;
};

const Container: React.FC<Props> = ({ children, className }) => {
  return <div className={`mx-auto w-full px-5 md:px-[30px]  max-w-[1440px] ${className}`}>{children}</div>;
};

export default Container;
