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
      className="odd:relative odd:after:absolute odd:after:top-0 odd:after:-left-[50%] odd:after:h-full odd:after:w-[150vw] odd:after:bg-purple/50 lg:odd:after:left-auto lg:odd:after:right-0"
      style={{ overflowWrap: 'anywhere' }}
    >
      <div className="group relative z-10 flex gap-3 py-6 md:gap-8 md:pt-4 md:pb-[18px]">
        <Avatar message={message} />
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
