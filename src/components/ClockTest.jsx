/* eslint-disable no-plusplus */
/* eslint-disable no-unreachable */
/* eslint-disable react/no-unknown-property */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import useCountdown from '@bradgarropy/use-countdown';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';

function ClockTest() {
  const [timeDifference, setTimeDifference] = useState('');
  const [startCountDown, setStartCountDown] = useState(false);
  const [complete, setComplete] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  // const navigate = useNavigate();

  // 숫자가 한자리 수일때 앞에 0을 붙여줌
  const padWithZero = (number) => {
    return number < 10 ? `0${number}` : number;
  };

  const calculateTimeDifference = () => {
    const now = currentTime;
    const newYear = new Date('January 1, 2024 00:00:00');
    const diff = newYear - now;

    // D-DAY 시간
    // const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    // const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    // const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    // const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    // 현재 시간
    // const days = now.getDate();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    setTimeDifference(
      `${padWithZero(hours)} : ${padWithZero(minutes)} : ${padWithZero(
        seconds,
      )}`,
    );

    if (hours === 0 && minutes === 0 && seconds <= 10) {
      setStartCountDown(true);
    }

    // 0초가 되면 '/' 페이지로 이동
    // if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
    // }
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

  useEffect(() => {
    // SSE 시간을 받아오는 함수
    const fetchTime = () => {
      const eventSource = new EventSource(
        'https://lastpang-backend.fly.dev/api/v1/sse/time',
      );

      eventSource.onmessage = (e) => {
        const serverTime = JSON.parse(e.data);
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
  }, []);

  useEffect(() => {
    if (currentTime) {
      calculateTimeDifference();
    }
  }, [currentTime]);

  return (
    <>
      {/* 카운트다운 */}
      {startCountDown != true && (
        <motion.span className="absolute left-1/2 top-80 flex -translate-x-1/2 -translate-y-1/2 transform bg-gradient-to-tr from-[#e3e3e3] to-[#f9f9f9] bg-clip-text font-Taebaek text-3xl tracking-[9px] text-transparent sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
          {timeDifference}
        </motion.span>
      )}
      {startCountDown == true && (
        <div className="absolute flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-80">
          <motion.span
            initial={{ opacity: 0, scale: 0.1 }}
            animate={{
              ease: 'easeOut',
              duration: 0.8,
              opacity: 1,
              scale: 1.2 + 3 / countdown.seconds,
            }}
            key={countdown.seconds}
            className="bg-gradient-to-tr from-[#EEF1F0] to-[#71757E] bg-clip-text text-center font-Wanju text-[200px] text-transparent"
          >
            {countdown.seconds}
          </motion.span>
        </div>
      )}
    </>
  );
}

export default ClockTest;
