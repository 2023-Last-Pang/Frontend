/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from 'react';
import AuthenticationModal from '../components/Authentication/AuthenticationModal';
import MessageBtn from '../components/Message/MessageBtn';
import MessageModal from '../components/Message/MessageModal';
import apiV1Instance from '../apiV1Instance';
import GalleryTest from './GalleryTest';

function MainPage() {
  const [openAuthenticationModal, setOpenAuthenticationModal] = useState(false);
  const [openMessage, setOpenMessage] = useState(false);
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [showMessageModal, setShowMessageModal] = useState(false); // 메시지 모달 상태 추가
  const [hasToken, setHasToken] = useState(false);
  const [AuthRole, setAuthRole] = useState('');

  const techeerRole = import.meta.env.VITE_TECHEER_ROLE;
  const joonRole = import.meta.env.VITE_JOON_ROLE;

  const getMessageAPI = async () => {
    try {
      const response = await apiV1Instance.get('/messages');
      const fetchedMessages = response.data.data.map(msg => ({
        ...msg,
        x: Math.random() * 100, // 랜덤 x 위치
        y: Math.random() * 50, // 랜덤 y 위치
      }));
      setMessages(fetchedMessages);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    setHasToken(!!token);
    if (token) {
      getMessageAPI();
      
      const role = localStorage.getItem('role');
      if (role === techeerRole) {
        setAuthRole('테커인');
      } else if (role === joonRole) {
        setAuthRole('팀준인');
      }
    }
  }, []);

  useEffect(() => {
    const toggleScroll = (isModalOpen) => {
      document.body.style.overflow = isModalOpen ? 'hidden' : 'auto';
    };

    // 모달 상태 변경 감지
    toggleScroll(openAuthenticationModal || showMessageModal || openMessage);

    // 컴포넌트가 언마운트 될 때 스크롤을 다시 허용
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [openAuthenticationModal, showMessageModal, openMessage])

  const handleOpenMessage = () => {
    setOpenMessage(!openMessage);
  };

  const handleMsgClick = (msg) => {
    setSelectedMessage(msg); // 선택된 메시지 설정
    setShowMessageModal(true); // 메시지 모달 열기
  };

  const addMessage = (msgContent) => {
    const newMessage = {
      createdAt: Date.now(), // 현재 시간을 기반으로 한 고유 ID 생성
      nickname: msgContent.userName,
      content: msgContent.message,
      x: Math.random() * 100, // 랜덤 x 위치
      y: Math.random() * 50, // 랜덤 y 위치
      isNew: true, // 새로 추가된 메시지 표시
    };
    setMessages([...messages, newMessage]);
  };

  const handleOpenAuthentication = () => {
    setOpenAuthenticationModal(!openAuthenticationModal);
  };
  
  return (
    <>
      <div className="first-page bg-linear-gradient from-bottomColor to-topColor , [#193D60]) h-screen w-full bg-gradient-to-t overflow-hidden">
        {!hasToken && (
          <div className="flex items-center justify-center p-5">
            <p className="mr-3 text-white">
              메세지를 보시려면 테커인 코드 혹은 팀준 코드를 입력해주세요
            </p>
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
          <div className="flex justify-end">
            <p className="p-5 text-white">{AuthRole}</p>
          </div>
        )}

        {hasToken &&
          messages.map((msg, index) => (
            <div
              key={msg.createdAt}
              className={`absolute text-white cursor-pointer  ${msg.isNew ? 'new-message' : 'star'}`}
              style={{
                left: `${msg.x}%`,
                top: `${msg.y}%`,
                animationDelay: `0s, ${Math.floor(index % 3) * 5}s`,
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

      <div className='fixed left-0 w-full h-screen overflow-hidden top-50 second-page'>
        <GalleryTest/>
      </div>

      {openAuthenticationModal && (
        <AuthenticationModal
          handleOpenAuthentication={handleOpenAuthentication}
        />
      )}

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
