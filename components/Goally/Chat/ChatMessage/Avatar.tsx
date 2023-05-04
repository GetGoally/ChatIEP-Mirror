import React from 'react';

import PennyIcon from '@/assets/penny-penguin.svg';

type Props = {};

const Avatar: React.FC<Props> = () => {
  return (
    <div className="flex h-[50px] min-w-[50px] items-center justify-center border border-black bg-[#74F288] pt-1">
      <PennyIcon />
    </div>
  );
  // if (message.role == 'assistant' || message.role === 'system') {
  //   return (
  //     <div className="flex h-[50px] min-w-[50px] items-center justify-center border border-black bg-[#74F288] pt-1">
  //       <PennyIcon />
  //     </div>
  //   );
  // }

  // return (
  //   <div className="h-[50px] min-w-[50px] border border-black bg-[#74A7F2]"></div>
  // );
};

export default Avatar;