import React from 'react';

type Props = {
  onClick: () => void;
  checked: boolean;
  className: string;
  name: string;
};

const CheckBox: React.FC<Props> = ({ className, name, onClick, checked }) => {
  return (
    <label
      htmlFor={name}
      onClick={onClick}
      className={`relative block cursor-pointer select-none pl-[66px] text-left text-base font-normal leading-[1.3] lg:text-xl ${className}`}
    >
      I understand Chat IEP is an experimental tool that I shouldn’t take
      seriously. I agree to abide by the terms of service specified here.
      <input
        type="checkbox"
        className="absolute cursor-pointer opacity-0"
        name={name}
      />
      <span className="absolute left-0 top-0 block h-[40px] w-[40px] border-[3px] border-dark_purple bg-white">
        {checked && (
          <svg
            width="32"
            height="26"
            viewBox="0 0 32 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute top-[4px] left-[1px]"
          >
            <path
              d="M1.62549 11.7157L16.1418 22.1832L29.6705 1.34692"
              stroke="black"
              strokeWidth="4"
            />
          </svg>
        )}
      </span>
    </label>
  );
};

export default CheckBox;
