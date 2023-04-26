// import { useRef, useState } from 'react';
import { useState } from 'react';

import { Inter } from 'next/font/google';

import Container from '@/components/Layout/Container';
import Button from '@/components/UI/Button';
import ChatMessage from '@/components/UI/ChatMessage';
import FeedbackModal from '@/components/UI/FeedbackModal';

const inter = Inter({ subsets: ['latin'] });

const Chat = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div
      className={`ruler-grid-light w-full overflow-hidden bg-white ${inter.className}`}
    >
      <Container className=" flex h-full flex-col lg:flex-row ">
        <div className="">
          <ChatMessage
            message={{
              role: 'system',
              content: 'Reading and interpreting this IEP',
            }}
          />
          <ChatMessage
            message={{
              role: 'assistant',
              content:
                "To write an article, follow these steps: \n 1. **Choose a topic**: Pick a subject that you are interested in or knowledgeable about.\n2. **Research**: Gather information and supporting facts about your topic from trustworthy sources. Take notes and organize your findings.\n3. **Define your audience**: Determine who you are writing for and what their interests are. This will guide your writing style and tone.\n4. **Outline**: Create an outline to organize your thoughts and ensure logical flow. Break down your article into sections, such as introduction, main points, and conclusion.\n5. **Write the introduction**: Grab your readers' attention with a strong opening that introduces your topic and provides context.\n6. **Develop your main points**: For each section of your outline, write a few paragraphs. Use a clear, concise, and informative writing style. Include supporting evidence and facts, and connect your ideas in a logical sequence.",
            }}
          />
          <ChatMessage
            message={{
              role: 'user',
              content: 'lorem',
            }}
          />

          <div className="my-8 pl-[62px] md:pl-[82px] md:pr-5">
            <div className="flex max-w-[928px] flex-col md:flex-row md:gap-2 lg:gap-[25px]">
              <Button
                label="submit promt"
                onClick={() => {}}
                className="mt-3 first-of-type:mt-0 md:mt-0"
                variant="yellow"
              >
                How can I help my child start and finish homework?
              </Button>
              <Button
                label="submit promt"
                onClick={() => {}}
                className="mt-3 first-of-type:mt-0 md:mt-0"
                variant="yellow"
              >
                How can I help my kid make friends at school?
              </Button>
              <Button
                label="submit promt"
                onClick={() => {}}
                className="mt-3 first-of-type:mt-0 md:mt-0"
                variant="yellow"
              >
                What could I do to motivate my kid when they don’t want to do
                it?
              </Button>
              <Button
                label="submit promt"
                onClick={() => {}}
                className="mt-3 first-of-type:mt-0 md:mt-0"
                variant="yellow"
              >
                What behavior skills does my kid need to improve the most?
              </Button>
              <Button
                label="submit promt"
                onClick={() => {}}
                className="mt-3 first-of-type:mt-0 md:mt-0"
                variant="yellow"
              >
                What behavior skills does my kid need to improve the most?
              </Button>
            </div>
          </div>
        </div>
        <div className="relative mt-auto flex items-center justify-center after:absolute after:-left-[50%] after:h-full after:w-[150vw] after:bg-purple/50 md:mt-0 lg:min-w-[200px] lg:items-end lg:justify-end  lg:after:left-0 xl:min-w-[250px]   ">
          <Button
            label="Give feedback"
            onClick={() => {
              setShowModal(true);
            }}
            className="relative z-10 my-8"
            variant="yellow"
          >
            Did ChatIEP help you?
            <br />
            Give feedback{' '}
            <span className="underline underline-offset-2">here</span>
          </Button>
        </div>
      </Container>

      {showModal && <FeedbackModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default Chat;
