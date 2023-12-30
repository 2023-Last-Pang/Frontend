/* eslint-disable no-plusplus */
/* eslint-disable no-unreachable */
/* eslint-disable react/no-unknown-property */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useCountdown from '@bradgarropy/use-countdown';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import moment from 'moment';
import 'moment-timezone';

function ClockTest() {
  const [timeDifference, setTimeDifference] = useState('');
  const [startCountDown, setStartCountDown] = useState(false);
  const [complete, setComplete] = useState(false);
  const navigate = useNavigate();

  // 로컬 시간을 전 세계 어디서든 한국시간으로 변환
  // const clientTime = new Date();

  // const utc = clientTime.getTime() + clientTime.getTimezoneOffset() * 60 * 1000;
  // const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
  const krCurr = moment().tz('Asia/Seoul');

  const [currentTime, setCurrentTime] = useState(krCurr);

  // 숫자가 한자리 수일때 앞에 0을 붙여줌
  const padWithZero = (number) => {
    return number < 10 ? `0${number}` : number;
  };

  const calculateTimeDifference = () => {
    const now = currentTime;
    const newYear = moment('2024-1-1 00:00:00').tz('Asia/Seoul');
    const diff = newYear - now;

    // D-DAY 시간
    const countDays = Math.floor(diff / (1000 * 60 * 60 * 24));
    const countHours = Math.floor(
      (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const countMinutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const countSeconds = Math.floor((diff % (1000 * 60)) / 1000);

    // 현재 시간
    const days = now.date();
    const hours = now.hours();
    const minutes = now.minutes();
    const seconds = now.seconds();

    setTimeDifference(
      `${days} / ${padWithZero(hours)} : ${padWithZero(
        minutes,
      )} : ${padWithZero(seconds)}`,
    );

    if (
      countDays == 0 &&
      countHours === 0 &&
      countMinutes === 0 &&
      countSeconds <= 10
    ) {
      setStartCountDown(true);
    }

    // 0초가 되면 '/' 페이지로 이동
    if (
      countDays == 0 &&
      (countHours == 0) & (countMinutes == 0) & (countSeconds == 0)
    ) {
      navigate('/fire');
    }
  };

  const countdown = useCountdown({
    seconds: 10,
    onCompleted: () => setComplete(true),
  });

  if (!startCountDown) {
    countdown.pause();
  } else {
    countdown.resume();
  }

  let eventSource = null; // EventSource 객체를 위한 전역 변수
  let intervalTime = null;

  // 탭이 활성화될 때 서버로부터 시간을 가져오는 함수
  const fetchServerTime = () => {
    if (eventSource) {
      eventSource.close(); // 기존 연결이 있다면 닫기
    }

    eventSource = new EventSource(
      'https://lastpang-backend.fly.dev/api/v1/sse/time',
    );

    eventSource.onmessage = (e) => {
      const serverTime = moment(JSON.parse(e.data).unixTime);

      // 로컬 시간을 전 세계 어디서든 한국시간으로 변환
      const clientTime = new Date();

      // const utc = clientTime.getTime() + clientTime.getTimezoneOffset() * 60 * 1000;
      // const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
      // const krCurr = moment().tz('Asia/Seoul');

      const timeGap = serverTime - clientTime.getTime();
      console.log(timeGap);

      setCurrentTime(moment(serverTime + timeGap).tz('Asia/Seoul'));

      if (intervalTime) {
        clearInterval(intervalTime);
      }

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
    };

    eventSource.onerror = (e) => {
      eventSource.close();
      // 에러 처리 로직
    };
  };

  useEffect(() => {
    fetchServerTime();

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
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        fetchServerTime();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // 정리
    return () => {
      if (intervalTime) {
        clearInterval(intervalTime);
      }
      // clearInterval(serverTimeUpdateInterval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    if (currentTime) {
      console.log(`현재 시간: ${currentTime}`);
      calculateTimeDifference();
    }
  }, [currentTime]);

  return (
    <>
      {/* 카운트다운 */}
      {startCountDown != true && (
        <motion.span className="absolute left-1/2 top-80 flex w-full -translate-x-1/2 -translate-y-1/2 transform justify-center bg-gradient-to-tr from-[#e3e3e3] to-[#f9f9f9] bg-clip-text font-Taebaek text-3xl tracking-[9px] text-transparent sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
          {timeDifference}
        </motion.span>
      )}
      {startCountDown == true && (
        <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 transform items-center justify-center">
          <motion.span
            initial={{ opacity: 0, scale: 0.1 }}
            animate={{
              duration: 0.8,
              opacity: 1,
              scale: 2,
            }}
            key={countdown.seconds}
            className="bg-gradient-to-tr from-[#EEF1F0] to-[#71757E] bg-clip-text text-center font-Wanju text-[200px] text-transparent">
            {countdown.seconds}
          </motion.span>
        </div>
      )}
    </>
  );
}

export default ClockTest;
