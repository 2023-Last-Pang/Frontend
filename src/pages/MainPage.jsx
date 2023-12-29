/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from 'react';
import AuthenticationModal from '../components/Authentication/AuthenticationModal';
import MessageBtn from '../components/Message/MessageBtn';
import MessageModal from '../components/Message/MessageModal';
import apiV1Instance from '../apiV1Instance';

import JoonMessage1 from '../components/JoonMessage1';
import JoonMessage2 from '../components/JoonMessage2';
import JoonMessage3 from '../components/JoonMessage3';

import snowfield from '../../public/img/Message/snowfield.png';

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
      const fetchedMessages = response.data.data.map((msg) => ({
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
      <div className="bg-linear-gradient from-bottomColor to-topColor , [#193D60]) h-screen w-full overflow-hidden bg-gradient-to-t">
        {!hasToken && (
          <div className="flex items-center justify-center p-5">
            <p className="mr-3 text-white">
              메세지를 보시려면 테커인 코드 혹은 팀준 코드를 입력해주세요
            </p>
            <button
              type="button"
              className="link-style"
              onClick={() => handleOpenAuthentication()}>
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
              className={`absolute cursor-pointer text-white  ${
                msg.isNew ? 'new-message' : 'star'
              }`}
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
        <div className="">
          <img
            src={snowfield}
            className="absolute bottom-0 w-full"
            alt="Snowfield Background"
          />
          <div className="z-20 flex flex-row">
            <JoonMessage1 />
            <JoonMessage2 />
            <JoonMessage3 />
          </div>
        </div>
      </div>

      {openAuthenticationModal && (
        <AuthenticationModal
          handleOpenAuthentication={handleOpenAuthentication}
          // setRole={setRole}
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
