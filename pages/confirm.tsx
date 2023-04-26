import { useState, useRef, ChangeEvent } from 'react';

import UploadIcon from '@/assets/upload.svg';
import Button from '@/components/UI/Button';
import CheckBox from '@/components/UI/Checkbox';

export default function Confirm() {
  const [email, setEmail] = useState('');
  const [isTouched, setIsTouched] = useState(false);
  const [error, setError] = useState('');

  const emailIsValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
    email,
  );
  const hasError = !emailIsValid && isTouched;

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const blurHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setIsTouched(true);
  };

  const handleSubmit = (ev: React.SyntheticEvent) => {
    ev.preventDefault();
    console.log(email);
  };

  return (
    <div className="ruler-grid w-full bg-purple px-5 py-7 lg:py-11">
      <div className="mx-auto w-full max-w-[800px] text-center">
        <h1>Chat IEP</h1>
        <p>Make sense of your kid’s individualized education plan</p>
        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-[30px] block max-w-[400px]"
        >
          <input
            type="email"
            placeholder="Email Address"
            required
            className="w-full  rounded-md border bg-[#F0F7FD] px-2 py-2 text-base font-normal  leading-[1.3] text-black outline-none placeholder:text-black md:text-xl lg:rounded-lg lg:px-4"
            value={email}
            onChange={changeHandler}
            onBlur={blurHandler}
          />
          {hasError && (
            <p className="mt-2 text-red">Please enter a valid email</p>
          )}
          {error && <p className="mt-2 text-red">error</p>}
          <Button type="submit" label="Chat With My IEP" className="mt-5" />
        </form>
        <div className="mt-8">
          <h3 className="underline">Will You Send Me SPAM?</h3>
          <p className="mt-[14px]">
            No. We send occasional love letters and product updates.No, we will
            never sell your data. All data stored here will be used to improve
            ChatIEP and develop more products to help families.
          </p>
          <h3 className="underline mt-8 lg:mt-10">Is There a Usage Limit?</h3>
          <p className="mt-[14px]">
            We limit users to 4 per week. It’s free so... be patient with us.
          </p>
          <h3 className="underline mt-8 lg:mt-10">I Want More Privacy</h3>
          <p className="mt-[14px]">
            If you want more privacy, black out any sensitive details in your
            PDF before uploading it. When reading the document we try to ignore
            all information presented in tables. That usually includes name,
            date of birth, etc... We try to focus on the Present Levels of
            Performance (PLOP).
          </p>
        </div>
      </div>
    </div>
  );
}
