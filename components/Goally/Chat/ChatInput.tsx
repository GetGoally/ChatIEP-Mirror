import React, { ChangeEvent, useState } from 'react';

import SendIcon from '@/assets/icon-send.svg';

type Props = {
  onSend: (msg: string) => void;
};

const ChatInput: React.FC<Props> = ({ onSend }) => {
  const [text, setText] = useState('');

  const handleSubmit = (ev: React.SyntheticEvent) => {
    ev.preventDefault();
    onSend(text);
    setText('');
  };

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };
  return (
    <div className="my-10 pl-[62px] md:pl-[82px] md:pr-5 lg:mt-[76px]">
      <form className="relative block max-w-[928px]" onSubmit={handleSubmit}>
        <input
          type="text"
          className="chat-input block w-full rounded-md border bg-white py-[14px] pl-[22px] pr-[40px] text-sm text-black"
          onChange={changeHandler}
          placeholder="Type a message"
          required
          value={text}
        />
        <button
          type="submit"
          className="absolute right-[22px] top-2/4 -translate-y-2/4 cursor-pointer"
        >
          <SendIcon />
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
