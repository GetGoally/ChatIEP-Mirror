import { useRef, useState } from 'react';

import { useRouter } from 'next/router';

import {
  ERROR_AGREE,
  ERROR_FORMAT,
  ERROR_REQUEST,
  ERROR_REQUIRED,
  ERROR_SIZE,
  MAX_ALLOWED_SIZE_MB,
} from '@/utils/app/const';
import { useChatContext } from '@/utils/context/ChatContext';
import useUpload from '@/utils/use-upload';

import Button from '@/components/Goally/UI/Button';
import CheckBox from '@/components/Goally/UI/Checkbox';
import ErrorMessage from '@/components/Goally/Upload/ErrorMessage';

import UploadIcon from '@/assets/upload.svg';

export default function Home() {
  const router = useRouter();
  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const [termsAccepted, setTermsAccepted] = useState(false);
  const [error, setError] = useState<String>('');
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const { setS3Path } = useChatContext();
  const { progress, uploadRequest } = useUpload();

  const handleChooseFile = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.currentTarget;

    if (!files || !files[0]) {
      return;
    }

    if (files[0].type.indexOf('application/pdf') === -1) {
      setError(ERROR_FORMAT);
      return;
    }

    const sizeInMB = files[0].size / (1024 * 1024);

    if (sizeInMB >= MAX_ALLOWED_SIZE_MB) {
      setError(ERROR_SIZE);
      return;
    }

    setError('');
    setFile(files[0]);
  };

  const handleSubmit = async () => {
    if (!termsAccepted) {
      setError(ERROR_AGREE);
      return;
    }

    if (!file) {
      setError(ERROR_REQUIRED);
      return;
    }

    setLoading(true);

    try {
      const data = new FormData();
      data.append('pdf_file', file, file.name);
      const response = await uploadRequest(data);

      if (response.s3_file_path) {
        setS3Path(response.s3_file_path);
        router.push('chat');
      } else {
        setError(ERROR_REQUEST);
      }
    } catch (error) {
      setError(ERROR_REQUEST);
      setLoading(false);
      console.log(error);
    }
  };

  let arcLength = 2 * 3.14 * 76;
  let arcOffset = arcLength * ((100 - progress) / 100);

  return (
    <div className="ruler-grid w-full bg-purple px-5 py-7 lg:py-11">
      <div className="mx-auto w-full max-w-[760px] text-center">
        <h1>Chat IEP</h1>
        <p>Make sense of your kid’s individualized education plan</p>
        <div className="mt-5 flex min-h-[250px]  flex-col items-center justify-center rounded-[30px] border-2 border-lime bg-white py-7 md:flex-row">
          {loading ? (
            <div className="flex flex-col items-center justify-center">
              <div className="relative h-[160px] w-[160px] ">
                <span className="absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 text-[33px] font-medium">
                  {progress}%
                </span>
                <svg
                  className="svg-indicator -rotate-90"
                  width={160}
                  height={160}
                >
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
              </div>

              <p className="mt-3">Uploading to Goally’s Antarctica server...</p>
            </div>
          ) : (
            <>
              <div className="order-1 basis-1/3 px-1 pt-5 text-center text-red md:pt-0">
                {error && <ErrorMessage type={error} />}
              </div>
              <div
                className="flex basis-1/3 cursor-pointer flex-col items-center md:order-2"
                onClick={handleChooseFile}
              >
                <UploadIcon />
                <span className="mt-3 inline-block text-[26px] leading-[1.19] text-blue underline">
                  Select File
                </span>
                <input
                  type="file"
                  accept="application/pdf"
                  ref={inputRef}
                  onChange={handleOnChange}
                  className="hidden"
                />
                {file && (
                  <div className="mt-5 p-2 text-blue underline   underline-offset-4">
                    {file.name}
                  </div>
                )}
              </div>
              <div className="order-3 basis-1/3"></div>
            </>
          )}
        </div>
        {!loading && (
          <>
            <CheckBox
              onClick={() => {
                setError('');
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
                handleSubmit();
              }}
              label="Upload"
              className="mt-5"
            />
          </>
        )}
      </div>
    </div>
  );
}
