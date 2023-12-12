import React, { useState } from 'react';
import MessageBtn from '../components/Message/MessageBtn';
import MessageModal from '../components/Message/MessageModal';

function MainPage() {
  const [openMessage, setOpenModal] = useState(false);

  const handleOpenMessage = () => {
    setOpenModal(!openMessage);
  };

  return (
    <>
      <div className="bg-[#193D60]">
        <MessageBtn handleOpenMessage={handleOpenMessage} />
      </div>
      {openMessage && <MessageModal handleOpenMessage={handleOpenMessage} />}
    </>
  );
}

export default MainPage;
