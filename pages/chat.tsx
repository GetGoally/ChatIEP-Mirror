import { useEffect } from 'react';

import { useRouter } from 'next/router';

import { useChatContext } from '@/utils/context/ChatContext';

import ChatInput from '@/components/Goally/Chat/ChatInput';
import ChatLoader from '@/components/Goally/Chat/ChatLoader';
import ChatMessage from '@/components/Goally/Chat/ChatMessage';
import DefaultPrompts from '@/components/Goally/Chat/DefaultPrompts';
import Sidebar from '@/components/Goally/Chat/Sidebar';
import Container from '@/components/Goally/Layout/Container';

import { v4 as uuidv4 } from 'uuid';

const Chat = () => {
  const router = useRouter();

  const {
    error,
    s3_file_path,
    index,
    loaded,
    messages,
    loading,
    showDefaultPromt,
    showInputBar,
    createIndex,
    sendMessage,
    sendInitialMessage,
  } = useChatContext();

  // Disable page until s3_file not avaiable
  useEffect(() => {
    if (!s3_file_path) {
      router.push('/');
      return;
    }

    // Creare Index Request
    if (!index) {
      createIndex();
    }
  }, []);

  // Trigger first initial message promt
  useEffect(() => {
    if (index) {
      sendInitialMessage();
    }
  }, [index]);

  return (
    <div
      className={`ruler-grid-light w-full overflow-hidden bg-white font-inter`}
    >
      <Container className=" flex h-full flex-col lg:flex-row ">
        <div className="w-full">
          <ChatMessage
            loading={!loaded}
            message={{
              id: uuidv4(),
              role: 'user',
              content: 'Reading and interpreting this IEP',
            }}
          />
          {messages.map(({ id, content, role }) => {
            return (
              <ChatMessage
                loading={false}
                key={id}
                message={{
                  id,
                  role,
                  content,
                }}
              />
            );
          })}

          {loading && <ChatLoader />}

          {showDefaultPromt && (
            <div className="my-8 pl-[62px] md:pl-[82px] md:pr-5">
              <DefaultPrompts
                onClick={(msg) => {
                  sendMessage(msg);
                }}
                disabled={loading}
              />
            </div>
          )}
          {showInputBar && (
            <ChatInput
              onSend={(msg) => {
                sendMessage(msg);
              }}
            />
          )}

          {error && (
            <div className="my-8 pl-[62px] md:pl-[82px] md:pr-5">
              <p className="text-red">{error}</p>
            </div>
          )}
        </div>
        <div className="relative mt-auto flex items-center justify-center after:absolute after:-left-[50%] after:h-full after:w-[150vw] after:bg-purple/50 md:mt-0 lg:min-w-[200px] lg:items-end lg:justify-end  lg:after:left-0 xl:min-w-[250px]   ">
          {showInputBar && <Sidebar />}
        </div>
      </Container>
    </div>
  );
};

export default Chat;
