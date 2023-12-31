/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-unused-vars */
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
import { FaStar } from 'react-icons/fa6';
import { MdLogout } from 'react-icons/md';
import moment from 'moment';
import AuthenticationModal from '../components/Authentication/AuthenticationModal';
import MessageBtn from '../components/Message/MessageBtn';
import MessageModal from '../components/Message/MessageModal';
import sunSample from '../assets/img/sun.svg';
import moonSample from '../assets/img/moon.svg';
import ClockTest from '../components/ClockTest';
import apiV1Instance from '../apiV1Instance';
import GalleryPage from './GalleryPage';
import 'moment-timezone';

import JoonMessage1 from '../components/JoonMessage1';
import JoonMessage2 from '../components/JoonMessage2';
import JoonMessage3 from '../components/JoonMessage3';

import snowfield from '../../public/img/Message/snowfield.png';

import andrew from '../assets/images/andrew.png';
import Footer from '../components/Footer';

function MainPage() {
  const [openAuthenticationModal, setOpenAuthenticationModal] = useState(false);
  const [openMessage, setOpenMessage] = useState(false);
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [showMessageModal, setShowMessageModal] = useState(false); // 메시지 모달 상태 추가
  const [hasToken, setHasToken] = useState(false);
  const [AuthRole, setAuthRole] = useState('');

  const [viewMessageModal, setViewMessageModal] = useState(false);

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
      if (error.response.status === 401) {
        alert('세션이 만료되었습니다. 다시 로그인해주세요!');
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
    document.body.style.overflowX = 'hidden';

    // 모달 상태 변경 감지
    toggleScroll(openAuthenticationModal);

    // 컴포넌트가 언마운트 될 때 스크롤을 다시 허용
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [openAuthenticationModal]);

  // Date 객체 시간
  // const [currentTime, setCurrentTime] = useState(new Date());

  // 로컬 시간을 전 세계 어디서든 한국시간으로 변환
  const krCurr = moment().tz('Asia/Seoul');

  const [currentTime, setCurrentTime] = useState(krCurr);

  // 배경색 상태
  // eslint-disable-next-line no-unused-vars
  const [backgroundColor, setBackgroundColor] = useState();

  // 배경색을 시간에 따라 변경하는 함수
  const updateBackgroundColor = () => {
    const hour = currentTime.hours();
    // eslint-disable-next-line no-unused-vars
    const minute = currentTime.minutes();
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
    const hour = currentTime.hours();
    const minute = currentTime.minutes();
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
    const x = 50 + (progress - 0.5) * 93; // 중앙(50%)을 기준으로 좌우로 50%씩 움직임
    const y = 60 - Math.abs(Math.sin(progress * Math.PI)) * 50; // 중앙(50%)을 기준으로 위아래로 50% 움직임

    return { left: `${x}%`, top: `${y}%` };
  };

  // 해와 달의 위치 상태
  const [sunPosition, setSunPosition] = useState(calculatePosition());
  const [moonPosition, setMoonPosition] = useState(calculatePosition());

  // let eventSource = null; // EventSource 객체를 위한 전역 변수
  let intervalTime = null;

  // 탭이 활성화될 때 서버로부터 시간을 가져오는 함수
  // const fetchServerTime = () => {
  //   if (eventSource) {
  //     eventSource.close(); // 기존 연결이 있다면 닫기
  //   }

  //   eventSource = new EventSource(`${apiV1Instance.defaults.baseURL}/sse/time`);

  //   eventSource.onmessage = (e) => {
  //     const serverTime = moment(JSON.parse(e.data).unixTime);

  //     // 로컬 시간을 전 세계 어디서든 한국시간으로 변환
  //     const clientTime = new Date();

  //     // const utc = clientTime.getTime() + clientTime.getTimezoneOffset() * 60 * 1000;
  //     // const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
  //     // const krCurr = moment().tz('Asia/Seoul');

  //     const timeGap = serverTime - clientTime.getTime();
  //     console.log(timeGap);

  //     setCurrentTime(moment(serverTime + timeGap).tz('Asia/Seoul'));

  //     if (intervalTime) {
  //       clearInterval(intervalTime);
  //     }

  //     intervalTime = setInterval(() => {
  //       setCurrentTime((prevTime) => {
  //         // prevTime을 밀리초 단위로 변환
  //         const prevTimeMillis = prevTime.valueOf();

  //         // 1초 (1000 밀리초)와 timeGap을 더함
  //         const newTimeMillis = prevTimeMillis + 1000;

  //         // moment를 사용하여 한국 시간대의 Date 객체로 변환
  //         return moment(newTimeMillis).tz('Asia/Seoul');
  //       });
  //     }, 1000);
  //   };

  //   eventSource.onerror = (e) => {
  //     eventSource.close();
  //     // 에러 처리 로직
  //   };
  // };

  useEffect(() => {
    // fetchServerTime();

    // 매초 시간 업데이트
    intervalTime = setInterval(() => {
      setCurrentTime((prevTime) => {
        // prevTime을 밀리초 단위로 변환
        const prevTimeMillis = prevTime.valueOf();

        // 1초 (1000 밀리초)와 timeGap을 더함
        const newTimeMillis = prevTimeMillis + 1000;

        // moment를 사용하여 한국 시간대의 Date 객체로 변환
        return moment(newTimeMillis).tz('Asia/Seoul');
      });
    }, 1000);

    // 매 5초마다 서버 시간 업데이트
    // const serverTimeUpdateInterval = setInterval(() => {
    //   fetchServerTime();
    // }, 5000);

    // 탭 활성화 감지
    // const handleVisibilityChange = () => {
    //   if (document.visibilityState === 'visible') {
    //     if (eventSource) {
    //       // 이벤트 소스가 이미 존재하지 않을 때만 새로운 연결을 생성
    //       eventSource.close();
    //       fetchServerTime();
    //     }
    //   }
    // };
    // document.addEventListener('visibilitychange', handleVisibilityChange);

    // // 정리
    return () => {
      if (intervalTime) {
        clearInterval(intervalTime);
      }
      // if (eventSource) {
      //   eventSource.close(); // 컴포넌트 정리 시 EventSource 인스턴스 닫기
      // }
      // document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
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

  const handleLogoutClick = () => {
    localStorage.clear();
    alert('로그아웃되었습니다');
    window.location.reload();
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
  const [showAndrew, setShowAndrew] = useState(false);
  const [andrewPosition, setAndrewPosition] = useState({
    left: '50%',
    top: '50%',
  });

  const handleMoonClick = (type) => {
    // 'sun' 또는 'moon'에 따라 위치 설정
    const position = type === 'sun' ? sunPosition : moonPosition;
    setAndrewPosition(position);

    setShowAndrew(true);
    setTimeout(() => {
      setShowAndrew(false);
    }, 2000); // 2초 후에 setShowAndrew(false)를 호출하여 상태 업데이트
  };

  return (
    <div className="overflow-hidden">
      <div
        style={{ backgroundImage: backgroundColor }}
        className="relative w-full h-screen overflow-hidden first-page scrollbar-hide">
        {/* 해 이미지 */}
        {currentTime.hours() >= 6 && currentTime.hours() < 18 && (
          <img
            src={sunSample}
            style={{
              position: 'absolute',
              left: sunPosition.left,
              top: sunPosition.top,
              width: '200px',
              transform: 'translate(-50%, -50%)',
            }}
            onClick={() => handleMoonClick('sun')}
            alt="Sun"
            draggable="false"
          />
        )}
        {/* 달 이미지 */}
        {(currentTime.hours() >= 18 || currentTime.hours() < 6) && (
          <img
            src={moonSample}
            style={{
              position: 'absolute',
              left: moonPosition.left,
              top: moonPosition.top,
              width: '180px',
              transform: 'translate(-50%, -50%)',
              cursor: 'pointer',
            }}
            onClick={() => handleMoonClick('moon')}
            alt="Moon"
            draggable="false"
          />
        )}
        {/* 낮 시간 */}
        {!hasToken && currentTime.hours() >= 6 && currentTime.hours() < 18 && (
          <div className="flex items-center justify-center p-5 font-omyu_pretty">
            <p className="mr-3 text-white font-omyu_pretty">
              메세지를 보시려면 테커인 코드 혹은 팀준 코드를 입력해주세요
            </p>
            <button
              type="button"
              className="z-10 text-blue-700 link-style font-omyu_pretty"
              onClick={() => handleOpenAuthentication()}>
              인증 코드 입력
            </button>
          </div>
        )}
        {/* 밤 시간 */}
        {!hasToken &&
          (currentTime.hours() >= 18 || currentTime.hours() < 6) && (
            <div className="flex items-center justify-center p-5 font-omyu_pretty">
              <p className="mr-3 text-white font-omyu_pretty">
                메세지를 보시려면 테커인 코드 혹은 팀준 코드를 입력해주세요
              </p>
              <button
                type="button"
                className="z-10 link-style font-omyu_pretty"
                onClick={() => handleOpenAuthentication()}>
                인증 코드 입력
              </button>
            </div>
          )}

        {hasToken && (
          <div className="flex justify-end text-lg">
            <p className="flex p-5 text-white font-omyu_pretty">
              {AuthRole}
              <MdLogout
                className="ml-5 mt-1 cursor-pointer"
                onClick={handleLogoutClick}
              />
            </p>
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
              className={`absolute z-10 transform cursor-pointer text-[#fffff0] transition duration-300 ease-in-out hover:scale-150  ${
                msg.isNew ? 'new-message' : ''
              }`}
              style={{
                left: `${msg.x}%`,
                top: `${msg.y}%`,
                animationDelay: `0s, ${Math.floor(index % 3) * 5}s`,
              }}
              onClick={() => handleMsgClick(msg)} // 메시지 클릭 핸들러
            >
              {!msg.isNew &&
                (index % 2 === 0 ? (
                  <FaStar className="faStarAnimation" />
                ) : (
                  <div className="star" />
                ))}
            </div>
          ))}

        {hasToken && !viewMessageModal && (
          <MessageBtn handleOpenMessage={handleOpenMessage} />
        )}
        {openMessage && hasToken && (
          <MessageModal
            handleOpenMessage={handleOpenMessage}
            addMessage={addMessage}
          />
        )}

        <div className="absolute bottom-0 left-0 right-0">
          <img
            src={snowfield}
            className="h-auto w-full object-cover"
            alt="Snowfield Background"
          />
          <div className="z-20 flex flex-row">
            <JoonMessage1 />
            <JoonMessage2 />
            <JoonMessage3 />
          </div>
        </div>
      </div>

      <a>
        <span />
      </a>

      <GalleryPage />

      {/* Footer */}
      <Footer />

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

      <ClockTest setViewMessageModal={setViewMessageModal} />

      {showAndrew && (
        <img
          src={andrew}
          className="fade-out"
          style={{
            position: 'absolute',
            left: andrewPosition.left,
            top: andrewPosition.top,
            width: '180px',
            transform: 'translate(-50%, -50%)',
            opacity: 0.5,
          }}
          alt="Andrew"
        />
      )}
    </>
  );
}

export default MainPage;
