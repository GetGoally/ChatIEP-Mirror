import { useRef, useState } from 'react';

import { Inter } from 'next/font/google';

import Button from '@/components/UI/Button';
import ChatMessage from '@/components/UI/ChatMessage';

const inter = Inter({ subsets: ['latin'] });

export default function Chat() {
  return (
    <div className={`ruler-grid-light w-full bg-white ${inter.className}`}>
      <div className="flex flex-col w-full h-full lg:flex-row">
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

          <div className="pl-[82px] pr-5 my-8  md:pl-[116px] md:pr-[52px]">
            <div className="flex flex-col md:flex-row md:gap-2 lg:gap-[25px] max-w-[928px]">
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
        <div className="bg-purple/50 flex items-center justify-center px-5 py-9 sm:flex-1">
          <Button
            label="Give feedback"
            onClick={() => {}}
            className=""
            variant="yellow"
          >
            Did ChatIEP help you?
            <br />
            Give feedback here
          </Button>
        </div>
      </div>
    </div>
  );
}
