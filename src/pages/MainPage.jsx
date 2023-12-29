/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from 'react';
import { FaStar } from "react-icons/fa6";
import AuthenticationModal from '../components/Authentication/AuthenticationModal';
import MessageBtn from '../components/Message/MessageBtn';
import MessageModal from '../components/Message/MessageModal';
import sunSample from '../assets/img/sun.svg';
import moonSample from '../assets/img/moon.svg';
import ClockTest from '../components/ClockTest';
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
      if (error.response.data.statusCode === 401) {
        alert("세션이 만료되었습니다. 다시 로그인해주세요!");
        localStorage.clear();
        window.location.reload();
      }
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
  
  // Date 객체 시간
  const [currentTime, setCurrentTime] = useState(new Date());

  // 배경색 상태
  const [backgroundColor, setBackgroundColor] = useState();

  // 배경색을 시간에 따라 변경하는 함수
  const updateBackgroundColor = () => {
    const hour = currentTime.getHours();
    const minute = currentTime.getMinutes();
    let background;

    if (hour >= 6 && hour < 17) {
      // 낮 시간
      background =
        'linear-gradient(180deg, #38ABEC 25.08%, #8ECEF7 68.23%, #CAE7FF 100%)';
    } else if (hour >= 17 && hour < 18) {
      // 해지는 시간
      background = 'linear-gradient(180deg, #FC9245 25.08%, #FFF597 100%)';
    } else if (hour >= 18 || hour < 6) {
      // 밤 시간
      background = 'linear-gradient(180deg, #0D2847 35.42%, #2C5B83 100%)';
    }

    setBackgroundColor(background);
  };

  // 해와 달의 위치를 계산하는 함수
  const calculatePosition = (isSun) => {
    const hour = currentTime.getHours();
    const minute = currentTime.getMinutes();
    let totalMinutes;
    let progress;

    if (isSun) {
      // 해 : 오전 6시부터 오후 6시까지
      totalMinutes = hour >= 6 && hour < 18 ? (hour - 6) * 60 + minute : 0;
      progress = totalMinutes / (12 * 60);
    } else {
      // 달 : 오후 6시부터 오전 6시까지
      totalMinutes =
        hour >= 18 || hour < 6 ? ((hour + 6) % 24) * 60 + minute : 0;
      progress = totalMinutes / (12 * 60);
    }

    // 화면 범위 내에서 움직이도록 조정
    const x = 50 + (progress - 0.5) * 100; // 중앙(50%)을 기준으로 좌우로 50%씩 움직임
    const y = 60 - Math.abs(Math.sin(progress * Math.PI)) * 50; // 중앙(50%)을 기준으로 위아래로 50% 움직임

    return { left: `${x}%`, top: `${y}%` };
  };

  // 해와 달의 위치 상태
  const [sunPosition, setSunPosition] = useState(calculatePosition());
  const [moonPosition, setMoonPosition] = useState(calculatePosition());

  // 마운트 시 실행됨
  useEffect(() => {
    // SSE 시간을 받아오는 함수
    const fetchTime = () => {
      const eventSource = new EventSource(
        'https://lastpang-backend.fly.dev/api/v1/sse/time',
      );

      eventSource.onmessage = (e) => {
        const serverTime = JSON.parse(e.data);
        console.log(serverTime.unixTime); // 배포 시 삭제
        setCurrentTime(new Date(serverTime.unixTime * 1000));
      };

      eventSource.onerror = (e) => {
        eventSource.close();

        if (e.error) {
          // 에러 발생 시 할 일
        }

        if (e.target.readyState === EventSource.CLOSED) {
          // 종료 시 할 일
        }
      };
    };

    fetchTime();

    updateBackgroundColor(); // 컴포넌트 마운트 시 배경색 업데이트

    const timer = setInterval(() => {
      const newTime = new Date();
      setCurrentTime(newTime);
    }, 60000); // 1분마다 시간 업데이트

    return () => clearInterval(timer); // 컴포넌트 언마운트 시 타이머 정리
  }, []);

  // 1초마다 실행됨
  useEffect(() => {
    updateBackgroundColor(); // currentTime 상태가 변경될 때마다 배경색 업데이트
    setSunPosition(calculatePosition(true)); // 해 위치 업데이트
    setMoonPosition(calculatePosition(false)); // 달 위치 업데이트
  }, [currentTime]);

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

  // 시간을 12시간제로 변환하고 AM/PM 표시를 추가하는 함수 -> 배포 시 삭제
  // const formatTime = (date) => {
  //   let hours = date.getHours();
  //   const minutes = date.getMinutes();
  //   const ampm = hours >= 12 ? 'PM' : 'AM';

  //   hours %= 12;
  //   hours = hours || 12; // 0시는 12로 표시
  //   const minutesStr = minutes < 10 ? `0${minutes}` : minutes;

  //   return `${hours}:${minutesStr} ${ampm}`;
  // };

  // 시간 증가/감소 테스트 함수 -> 배포 시 삭제
  // const updateCurrentTime = (minutesChange) => {
  //   const newTime = new Date(currentTime.getTime()); // 현재 시간 복사
  //   newTime.setMinutes(currentTime.getMinutes() + minutesChange);

  //   if (newTime.getMinutes() >= 60) {
  //     newTime.setHours(newTime.getHours() + 1);
  //     newTime.setMinutes(newTime.getMinutes() - 60);
  //   } else if (newTime.getMinutes() < 0) {
  //     newTime.setHours(newTime.getHours() - 1);
  //     newTime.setMinutes(newTime.getMinutes() + 60);
  //   }

  //   setCurrentTime(newTime); // 상태 업데이트
  //   updateBackgroundColor(); // 배경색 업데이트
  // };

  return (
    <>
      <div
        style={{backgroundImage: backgroundColor}} 
        className="w-full h-screen overflow-hidden first-page scrollbar-hide">
        {/* 해 이미지 */}
        {currentTime.getHours() >= 6 && currentTime.getHours() < 18 && (
          <img
            src={sunSample}
            style={{
              position: 'absolute',
              left: sunPosition.left,
              top: sunPosition.top,
              width: '200px',
              transform: 'translate(-50%, -50%)',
            }}
            alt="Sun"
          />
        )}
        {/* 달 이미지 */}
        {(currentTime.getHours() >= 18 || currentTime.getHours() < 6) && (
          <img
            src={moonSample}
            style={{
              position: 'absolute',
              left: moonPosition.left,
              top: moonPosition.top,
              width: '180px',
              transform: 'translate(-50%, -50%)',
            }}
            alt="Moon"
          />
        )}

        {!hasToken && (
          <div className="z-30 flex items-center justify-center p-5">
            <p className="mr-3 text-white">
              메세지를 보시려면 테커인 코드 혹은 팀준 코드를 입력해주세요
            </p>
            <button
              type="button"
              className="z-10 link-style"
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
        
        {/* 테스트용 시간 조절 버튼 */}
        {/* <div>
          <button
            type="button"
            className="text-yellow-500 bg-blue-500"
            onClick={() => updateCurrentTime(-10)} // 30분 감소
          >
            -10분
          </button>
          <button
            type="button"
            className="text-yellow-500 bg-blue-500"
            onClick={() => updateCurrentTime(10)} // 30분 증가
          >
            +10분
          </button>
          <span className="text-yellow-500">{formatTime(currentTime)}</span>
        </div> */}
        {hasToken &&
          messages.map((msg, index) => (
            <div
              key={msg.createdAt}
              className={`absolute z-10 text-[#fffff0] cursor-pointer transition duration-300 ease-in-out transform hover:scale-150  ${msg.isNew ? 'new-message' : ''}`}
              style={{
                left: `${msg.x}%`,
                top: `${msg.y}%`,
                animationDelay: `0s, ${Math.floor(index % 3) * 5}s`,
              }}
              onClick={() => handleMsgClick(msg)} // 메시지 클릭 핸들러
            >
              {!msg.isNew && (index % 2 === 0 ? <FaStar className="faStarAnimation"/> : <div className="star"/>)}
            </div>
        ))}

        {hasToken && <MessageBtn handleOpenMessage={handleOpenMessage} />}
        {openMessage && hasToken && (
          <MessageModal
            handleOpenMessage={handleOpenMessage}
            addMessage={addMessage}
          />
        )}
      </div>

      <a>
        <span/> 
      </a>

      <div className='fixed left-0 w-full h-screen overflow-hidden second-page'>
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

      <ClockTest />
    </>
  );
}

export default MainPage;
