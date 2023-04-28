import { useState } from 'react';

import { UploadResponse } from '@/types/goally-chat';

import { v4 as uuidv4 } from 'uuid';

type requestType = (data: FormData) => Promise<UploadResponse>;

const useUpload = () => {
  const [progress, setProgress] = useState(0);

  const uploadRequest: requestType = (data) => {
    return new Promise(function (resolve, reject) {
      const xhr = new XMLHttpRequest();
      xhr.upload.addEventListener('progress', function (event) {
        if (event.lengthComputable) {
          const complete = ((event.loaded / event.total) * 100) | 0;
          setProgress(complete);
        }
      });

      xhr.onload = function () {
        if (this.status >= 200 && this.status < 300) {
          resolve(JSON.parse(xhr.response));
        } else {
          reject({
            status: this.status,
            statusText: xhr.statusText,
          });
        }
      };

      xhr.onerror = function () {
        reject({
          status: this.status,
          statusText: xhr.statusText,
        });
      };

      xhr.open(
        'POST',
        `${process.env.NEXT_PUBLIC_API_URL}/upload?username=${uuidv4()}`,
      );

      xhr.setRequestHeader(
        'Authorization',
        `${process.env.NEXT_PUBLIC_API_KEY}`,
      );

      xhr.send(data);
    });
  };

  return {
    progress,
    setProgress,
    uploadRequest,
  };
};

export default useUpload;
