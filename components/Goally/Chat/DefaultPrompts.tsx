import React from 'react';

import { DEFAULT_PROMTS } from '@/utils/app/const';

import Button from '../UI/Button';

import { twMerge } from 'tailwind-merge';
import { v4 as uuidv4 } from 'uuid';

type Props = {
  onClick: (msg: string) => void;
  disabled: boolean;
};

const DefaultPrompts: React.FC<Props> = ({ onClick, disabled }) => {
  return (
    <div className="flex max-w-[928px] flex-col md:flex-row md:gap-2 lg:gap-[25px]">
      {DEFAULT_PROMTS.map((message) => {
        return (
          <Button
            label="submit promt"
            onClick={() => {
              if (disabled) {
                return;
              }
              onClick(message);
            }}
            className={twMerge(
              'mt-3 first-of-type:mt-0 md:mt-0',
              disabled ? 'pointer-events-none opacity-70' : '',
            )}
            variant="yellow"
            key={uuidv4()}
          >
            {message}
          </Button>
        );
      })}
    </div>
  );
};

export default DefaultPrompts;
