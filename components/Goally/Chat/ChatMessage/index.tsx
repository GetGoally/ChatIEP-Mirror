import React from 'react';

import { Message } from '@/types/goally-chat';

import Avatar from './Avatar';
import BotContent from './BotContent';
import UserContent from './UserContent';

type Props = {
  message: Message;
};

const ChatMessage: React.FC<Props> = ({ message }) => {
  return (
    <div
      className="even:relative even:after:absolute even:after:top-0 even:after:-left-[50%] even:after:h-full even:after:w-[150vw] even:after:bg-purple/50 lg:even:after:left-auto lg:even:after:right-0"
      style={{ overflowWrap: 'anywhere' }}
    >
      <div className="group relative z-10 flex gap-3 py-6 md:gap-8 md:pt-4 md:pb-[18px]">
        <Avatar />
        <div className="relative w-full pt-[15px] md:pr-6">
          {message.role === 'user' || message.role === 'system' ? (
            <UserContent message={message} />
          ) : (
            <BotContent message={message} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
