import React, { useState } from 'react';

import Button from '../UI/Button';
import FeedbackModal from '../UI/FeedbackModal';

type Props = {};

const Sidebar: React.FC<Props> = (props) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <Button
        label="Give feedback"
        onClick={() => {
          setShowModal(true);
        }}
        className="relative z-10 my-8 lg:fixed lg:bottom-0"
        variant="yellow"
      >
        Did ChatIEP help you?
        <br />
        Give feedback <span className="underline underline-offset-2">here</span>
      </Button>
      {showModal && <FeedbackModal onClose={() => setShowModal(false)} />}
    </>
  );
};

export default Sidebar;
