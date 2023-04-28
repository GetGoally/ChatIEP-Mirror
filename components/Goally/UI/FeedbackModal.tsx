import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import Button from '@/components/Goally/UI/Button';

import CloseIcon from '@/assets/close-icon.svg';

type Props = {
  onClose?: (e: any) => void;
};

const FeedbackModal: React.FC<Props> = ({ onClose }) => {
  const [isBrowser, setIsBrowser] = useState(false);
  const [suggestion, setSuggestion] = useState('');
  const [rating, setRating] = useState('5');
  const sliderBuble = useRef(null);

  const handleSubmit = async (ev: React.SyntheticEvent) => {
    ev.preventDefault();
  };

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  useEffect(() => {
    if (sliderBuble.current) {
      // 5 - 100%
      // sliderBuble.current.style.paddingLeft = `${+rating * 10}px`;
    }
    // console.log();

    // const ele = document.querySelector('.buble');
    // if (ele) {
    //   ele.style.left = `${Number(value / 4)}px`;
    // }
  });

  console.log(rating);

  if (isBrowser) {
    return createPortal(
      <div>
        <div
          className="fixed top-0 left-0 z-40 h-full w-full bg-white opacity-60"
          onClick={onClose}
        />
        <div className="modal-shadow fixed top-2/4 left-2/4  z-50 w-4/5 max-w-[600px] -translate-x-2/4 -translate-y-2/4  rounded-lg border bg-white py-[26px] px-8">
          <CloseIcon
            className="absolute right-[-20px] top-[-20px] cursor-pointer"
            onClick={onClose}
          />
          <form onSubmit={handleSubmit}>
            <h3 className="text-center text-[#1A1C1E]">
              ChatIEP Feedback Form
            </h3>
            <div className="mt-7 flex items-center">
              <div className="basis-2/4">
                <p>How useful was this chat?</p>
              </div>
              <div className="basis-2/4">
                <div className="relative">
                  <div ref={sliderBuble}>
                    <span
                    style={{
                      marginLeft: `${(Number(rating) - 1) * 25}%`
                    }}
                    className="inline-flex -translate-x-2/4 rounded-[10px] bg-[#32A6F9] px-2 text-[20px] text-white">
                      {/* {rating} */}
                      Meh32
                    </span>
                  </div>
                  <input
                    className="range"
                    type="range"
                    min="1"
                    step={1}
                    max="5"
                    value={rating}
                    style={{
                      background: `linear-gradient(to right, rgba(50, 166, 249, 1) 0%, rgba(50, 166, 249, 1) ${
                        (Number(rating) - 1) * 25
                      }%, rgba(50, 166, 249, 0.2) ${
                        (Number(rating) - 1) * 25
                      }%, rgba(50, 166, 249, 0.2) 100%)`,
                    }}
                    onChange={(ev) => {
                      setRating(ev.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
            <textarea
              name="suggestion"
              value={suggestion}
              onChange={(ev) => {
                setSuggestion(ev.target.value);
              }}
              className="mt-8 block w-full resize-none border px-[18px] py-2 text-[20px] outline-none"
              rows={4}
              placeholder="Suggestion box"
            ></textarea>
            <div className="mt-8 text-center">
              <Button
                label="Submit feed back"
                variant="primary"
                className=""
                type="submit"
              >
                Save
              </Button>
            </div>
          </form>
        </div>
      </div>,
      document.getElementById('overlays')!,
    );
  }

  return null;
};
export default FeedbackModal;
