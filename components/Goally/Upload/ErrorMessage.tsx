import {
  ERROR_AGREE,
  ERROR_FORMAT,
  ERROR_REQUEST,
  ERROR_REQUIRED,
  ERROR_SIZE,
  MAX_ALLOWED_SIZE_MB,
} from '@/utils/app/const';

type ErrorProps = {
  type: String;
};

const ErrorMessage: React.FC<ErrorProps> = ({ type }) => {
  switch (type) {
    case ERROR_FORMAT:
      return (
        <p>
          That’s not a PDF file.
          <br />
          Sorry but I can only accept PDFs now.{' '}
        </p>
      );
    case ERROR_SIZE:
      return (
        <p>
          This file is too big.
          <br />
          Max PDF size is {MAX_ALLOWED_SIZE_MB}mb.
        </p>
      );
    case ERROR_AGREE:
      return <p>Agree to terms of service before proceeding</p>;
    case ERROR_REQUIRED:
      return <p>Please select a file.</p>;
    case ERROR_REQUEST:
      return (
        <p>
          Something go wrong.
          <br />
          Please try later.
        </p>
      );
    default:
      return null;
  }
};

export default ErrorMessage;
