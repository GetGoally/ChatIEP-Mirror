import { IconCheck, IconCopy } from '@tabler/icons-react';
import React, { useState } from 'react';

import { Message } from '@/types/goally-chat';

import { CodeBlock } from '../../Markdown/CodeBlock';
import { MemoizedReactMarkdown } from '../../Markdown/MemoizedReactMarkdown';

import rehypeMathjax from 'rehype-mathjax';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';

type Props = {
  message: Message;
};

const BotContent: React.FC<Props> = ({ message }) => {
  const [messagedCopied, setMessageCopied] = useState(false);

  const copyOnClick = () => {
    if (!navigator.clipboard) return;

    navigator.clipboard.writeText(message.content).then(() => {
      setMessageCopied(true);
      setTimeout(() => {
        setMessageCopied(false);
      }, 2000);
    });
  };

  return (
    <>
      <div
        className={`absolute bottom-[-20px] right-[-10px] overflow-hidden md:right-0 md:bottom-auto md:top-[26px]`}
      >
        {messagedCopied ? (
          <IconCheck size={20} className="text-green-500 dark:text-green-400" />
        ) : (
          <button
            className="text-gray-500 hover:text-gray-700 translate-x-[1000px] focus:translate-x-0 group-hover:translate-x-0"
            onClick={copyOnClick}
          >
            <IconCopy size={20} />
          </button>
        )}
      </div>
      <MemoizedReactMarkdown
        className="prose max-w-none prose-p:text-sm  prose-li:text-sm"
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeMathjax]}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');

            return !inline ? (
              <CodeBlock
                key={Math.random()}
                language={(match && match[1]) || ''}
                value={String(children).replace(/\n$/, '')}
                {...props}
              />
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
          table({ children }) {
            return (
              <table className="border-collapse border border-black px-3 py-1 dark:border-white">
                {children}
              </table>
            );
          },
          th({ children }) {
            return (
              <th className="bg-gray-500 break-words border border-black px-3 py-1 text-white dark:border-white">
                {children}
              </th>
            );
          },
          td({ children }) {
            return (
              <td className="break-words border border-black px-3 py-1 dark:border-white">
                {children}
              </td>
            );
          },
        }}
      >
        {message.content}
      </MemoizedReactMarkdown>
    </>
  );
};

export default BotContent;
