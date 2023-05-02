import React from 'react';

import Avatar from './ChatMessage/Avatar';

type Props = {};

const ChatLoader: React.FC<Props> = (props) => {
  return (
    <div
      className="even:relative even:after:absolute even:after:top-0 even:after:-left-[50%] even:after:h-full even:after:w-[150vw] even:after:bg-purple/50 lg:even:after:left-auto lg:even:after:right-0"
      style={{ overflowWrap: 'anywhere' }}
    >
      <div className="group relative z-10 flex gap-3 py-6 md:gap-8 md:pt-4 md:pb-[18px]">
        <Avatar />
        <div className="blink relative w-full pt-[15px] md:pr-6" />
      </div>
    </div>
  );
};

export default ChatLoader;
