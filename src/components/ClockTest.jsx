/* eslint-disable no-unreachable */
/* eslint-disable react/no-unknown-property */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ClockTest() {
  // 첫번째 시계
  const [timeDifference, setTimeDifference] = useState('');
  const [showCountDown, setShowCountDown] = useState(null);
  const navigate = useNavigate();

  const calculateTimeDifference = () => {
    const now = new Date();
    const newYear = new Date('December 12, 2023 21:41:00');
    const diff = newYear - now;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    setTimeDifference(`${days}일 ${hours}시간 ${minutes}분전 ${seconds}초전`);

    if (days === 0 && hours === 0 && minutes === 0 && seconds <= 10) {
      setShowCountDown(seconds);
    }
    // 0초가 되면 '/' 페이지로 이동
    if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
      navigate('/');
    }
  };

  useEffect(() => {
    const interval = setInterval(calculateTimeDifference, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-full w-full">
      {/* 카운트다운 */}
      {showCountDown == null ? (
        <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 transform text-5xl tracking-[7px] text-[#71ca6f]">
          {timeDifference}
        </div>
      ) : (
        <span className="font-Giants absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 transform text-[200px] text-yellow-50">
          {showCountDown}
        </span>
      )}
    </div>
  );
}

export default ClockTest;
