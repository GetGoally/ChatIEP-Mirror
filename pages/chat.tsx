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
    loaded,
    messages,
    loading,
    haveFirstResponse,
    haveSecondResponse,
    createIndex,
    sendMessage,
  } = useChatContext();

  // Disable page until s3_file not avaiable
  useEffect(() => {
    if (!s3_file_path) {
      router.push('/');
      return;
    }

    // Creare Index Request
    createIndex();
  }, []);

  return (
    <div
      className={`ruler-grid-light w-full overflow-hidden bg-white font-inter`}
    >
      <Container className=" flex h-full flex-col lg:flex-row ">
        <div className="w-full">
          <ChatMessage
            message={{
              id: uuidv4(),
              role: 'system',
              content: 'Reading and interpreting this IEP',
            }}
          />
          <ChatMessage
            message={{
              id: uuidv4(),
              role: 'assistant',
              content:
                'Based on this IEP, here are some of the things this student is struggling with: \n - [orem ipsum dolor sit amet, consectetur adipiscing elit. Nunc arcu augue, porttitor ut tristique aliquet, imperdiet]. \n - [orem ipsum dolor sit amet, consectetur adipiscing elit. Nunc arcu augue, porttitor ut tristique aliquet, imperdiet]. \n - [orem ipsum dolor sit amet, consectetur adipiscing elit. Nunc arcu augue, porttitor ut tristique aliquet, imperdiet].',
            }}
          />
          {messages.map(({ id, content, role }) => {
            return (
              <ChatMessage
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

          {loaded && !haveSecondResponse && (
            <div className="my-8 pl-[62px] md:pl-[82px] md:pr-5">
              <DefaultPrompts
                onClick={(msg) => {
                  sendMessage(msg);
                }}
                disabled={loading}
              />
            </div>
          )}
          {haveFirstResponse && (
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
          {haveFirstResponse && <Sidebar />}
        </div>
      </Container>
    </div>
  );
};

export default Chat;
