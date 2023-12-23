/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from 'react';
import AuthenticationModal from '../components/Authentication/AuthenticationModal';
import MessageBtn from '../components/Message/MessageBtn';
import MessageModal from '../components/Message/MessageModal';

function MainPage() {
  const [openAuthenticationModal, setOpenAuthenticationModal] = useState(false);
  const [openMessage, setOpenMessage] = useState(false);
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [showMessageModal, setShowMessageModal] = useState(false); // 메시지 모달 상태 추가
  const [hasToken, setHasToken] = useState(false);
  const [role, setRole] = useState('');
  // const [role, setRole] = useState("");

  useEffect(() => {
    const token = localStorage.getItem('token');
    setHasToken(!!token);
    if(token) {
      setRole(localStorage.getItem('role'));
    }
  }, []);

  const handleOpenMessage = () => {
    setOpenMessage(!openMessage);
  };

  const handleMsgClick = (msg) => {
    setSelectedMessage(msg); // 선택된 메시지 설정
    setShowMessageModal(true); // 메시지 모달 열기
  };

  const addMessage = (msgContent) => {
    const newMessage = {
      id: Date.now(), // 현재 시간을 기반으로 한 고유 ID 생성
      content: msgContent,
      x: Math.random() * 100, // 랜덤 x 위치
      y: Math.random() * 100, // 랜덤 y 위치
    };
    setMessages([...messages, newMessage]);
  };

  const handleOpenAuthentication = () => {
    setOpenAuthenticationModal(!openAuthenticationModal);
  };

  return (
    <>
      <div className="bg-linear-gradient from-bottomColor to-topColor , [#193D60]) h-screen w-full bg-gradient-to-t overflow-hidden">
        {!hasToken && (
          <div className="flex items-center justify-center p-5">
            <p className="mr-3 text-white">메세지를 보시려면 테커인 코드 혹은 팀준 코드를 입력해주세요</p>
            <button 
              type="button"
              className="link-style" 
              onClick={() => handleOpenAuthentication()}
            >
              인증 코드 입력
            </button>
          </div>
        )}

        {hasToken && (
          <div className='flex justify-end'>
            <p className="p-5 text-white">{role}</p>
          </div>
        )}
        
        {hasToken && messages.map((msg, index) => (
          <div
            key={msg.id}
            className="absolute text-white cursor-pointer star"
            style={{
              left: `${msg.x}%`,
              top: `${msg.y}%`,
              animationDelay: `0s, ${3 + Math.floor(index / 3) * 0.5}s`,
            }}
            onClick={() => handleMsgClick(msg)} // 메시지 클릭 핸들러
          />
        ))}

        {hasToken && <MessageBtn handleOpenMessage={handleOpenMessage} />}
        {openMessage && hasToken && (
          <MessageModal
            handleOpenMessage={handleOpenMessage}
            addMessage={addMessage}
          />
        )}
      </div>

      {openAuthenticationModal && 
        <AuthenticationModal 
          handleOpenAuthentication={handleOpenAuthentication}
          // setRole={setRole}
        />
      
      }
      
      {showMessageModal && selectedMessage && (
        <MessageModal
          message={selectedMessage}
          closeModal={() => setShowMessageModal(false)}
        />
      )}
    </>
  );
}

export default MainPage;
