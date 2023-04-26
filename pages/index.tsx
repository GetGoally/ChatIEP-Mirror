import { useState, useRef } from 'react';

import UploadIcon from '@/assets/upload.svg';
import Button from '@/components/UI/Button';
import CheckBox from '@/components/UI/Checkbox';

export default function Home() {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.currentTarget;

    if (!files || !files[0]) {
      return;
    }
  };

  const handleChooseFile = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  let arcLength = 2 * 3.14 * 76;
  let progress = 75;
  let arcOffset = arcLength * ((100 - progress) / 100);

  return (
    <div className="ruler-grid w-full bg-purple px-5 py-7 lg:py-11">
      <div className="mx-auto w-full max-w-[760px] text-center">
        <h1>Chat IEP</h1>
        <p>Make sense of your kid’s individualized education plan</p>
        <div className="mt-5 flex min-h-[250px]  flex-col items-center justify-center rounded-[30px] border-2 border-lime bg-white py-7 md:flex-row">
          <div className="order-1 basis-1/3 px-1 pt-5 text-center text-red md:pt-0">
            {/* <p>
              This file is too big.
              <br />
              Max PDF size is 20mb.
            </p> */}
            {/* <p>
              That’s not a PDF file.
              <br />
              Sorry but I can only accept PDFs now.{' '}
            </p> */}
            <p>Agree to terms of service before proceeding</p>
          </div>
          <div className="flex basis-1/3 flex-col items-center md:order-2">
            <UploadIcon />
            <span
              className="mt-3 inline-block cursor-pointer text-[26px] leading-[1.19] text-blue underline"
              onClick={handleChooseFile}
            >
              Select File
            </span>
            <input
              type="file"
              accept="application/pdf"
              ref={inputRef}
              onChange={handleOnChange}
              className="hidden"
            />
          </div>

          <div className="order-3 basis-1/3"></div>

          {/* <div className="relative h-[160px] w-[160px] hidden">
            <span className="absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 text-[33px] font-medium">
              {progress}%
            </span>
            <svg className="svg-indicator -rotate-90" width={160} height={160}>
              <circle
                className="svg-indicator-track"
                cx={80}
                cy={80}
                r={76}
                strokeWidth={4}
                fill="transparent"
                stroke="#000"
              />
              <circle
                className="svg-indicator-indication"
                strokeDasharray={arcLength}
                strokeDashoffset={arcOffset}
                cx={80}
                cy={80}
                r={76}
                strokeWidth={5}
                fill="transparent"
                stroke="#49B0AB"
                strokeLinecap="round"
              />
            </svg>
          </div> */}

          {/* <p>Uploading to Goally’s Antarctica server...</p> */}
        </div>
        <CheckBox
          onClick={() => {
            setTermsAccepted((prevState) => {
              return !prevState;
            });
          }}
          checked={termsAccepted}
          className="mt-5"
          name="terms"
        />
        <Button
          onClick={() => {
            console.log(22);
          }}
          label="Upload"
          className="mt-5"
        />
      </div>
    </div>
  );
}
