import React from 'react';

import { Message } from '@/types/goally-chat';

type Props = {
  message: Message;
  loading: boolean;
};

const UserContent: React.FC<Props> = ({ message, loading }) => {
  return (
    <div className={`prose whitespace-pre-wrap ${loading && 'blink'}`}>
      {message.content}
    </div>
  );
};

export default UserContent;
