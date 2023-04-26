import React from 'react';

import { Message } from '@/types/goally-chat';

type Props = {
  message: Message;
};

const UserContent: React.FC<Props> = ({ message }) => {
  return (
    <div
      className={`prose whitespace-pre-wrap ${
        message.role === 'system' && 'blink'
      }`}
    >
      {message.content}
    </div>
  );
};

export default UserContent;
