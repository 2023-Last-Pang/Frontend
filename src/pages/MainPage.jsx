import React, { useState } from 'react';
// import AuthenticationModal from '../components/Message/AuthenticationModal';
import MessageBtn from '../components/Message/MessageBtn';
import MessageModal from '../components/Message/MessageModal';

function MainPage() {
  // const [openAuthentication, setOpenAuthentication] = useState(false);
  const [openMessage, setOpenMessage] = useState(false);

  const handleOpenMessage = () => {
    setOpenMessage(!openMessage);
  };

  // const handleOpenAuthentication = () => {
  //   setOpenAuthentication(!openAuthentication);
  // };

  return (
    <>
      <div className="bg-linear-gradient from-bottomColor to-topColor , [#193D60]) h-screen w-full bg-gradient-to-t">
        <MessageBtn handleOpenMessage={handleOpenMessage} />
      </div>

      {/* {openAuthentication && <AuthenticationModal />} */}
      {openMessage && <MessageModal handleOpenMessage={handleOpenMessage} />}
    </>
  );
}

export default MainPage;
