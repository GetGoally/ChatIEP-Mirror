import React from 'react';

import ChevronIcon from '@/assets/chevron-right.svg';

type Props = {
  onClick?: () => void;
  className?: string;
  label: string;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'default' | 'yellow' | 'primary';
  children?: React.ReactNode;
};

const Button: React.FC<Props> = ({
  className,
  label,
  onClick,
  type,
  variant = 'default',
  children,
}) => {
  switch (variant) {
    case 'yellow': {
      return (
        <button
          className={`promt-shadow cursor-pointer rounded-[15px] border bg-light_yellow p-[10px] text-base transition-all hover:bg-[#fffb95] md:text-left md:text-sm ${className}`}
          type={type}
          onClick={onClick}
          aria-label={label}
        >
          {children}
        </button>
      );
    }
    case 'primary': {
      return (
        <button
          onClick={onClick}
          type={type}
          className={`button-shadow relative inline-flex items-center border border-dark bg-lime px-[42px] py-[3px] font-medium text-[26px] ${className}`}
          aria-label={label}
        >
          {children}
        </button>
      );
    }
    default:
      return (
        <button
          onClick={onClick}
          type={type}
          className={`button-shadow relative inline-flex items-center border border-dark bg-lime px-[15px] py-3 ${className}`}
          aria-label={label}
        >
          <span className="mr-5 inline-block text-xl leading-[1.19] lg:text-[26px]">
            {label}
          </span>
          <ChevronIcon className="h-auto w-[15px]" />
          <ChevronIcon className="h-auto w-[15px]" />
          <ChevronIcon className="h-auto w-[15px]" />
        </button>
      );
  }
};

export default Button;
