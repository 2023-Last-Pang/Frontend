/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable react/button-has-type */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/sort-comp */
/* eslint-disable class-methods-use-this */
// import React from 'react';
// import useWindowSize from 'react-use/lib/useWindowSize';
// import Confetti from 'react-confetti';
// import newYearBg from '../assets/images/newyearbg2.png';

// function NewyearPage() {
//   const { width, height } = useWindowSize();
//   return (
//     <div className="w-screen h-full text-white bg-black">
//       ㄴㅇㄹㄴ
//       <div className="bg-black">
//         <Confetti
//           width={width}
//           height={height}
//           // recycle={true}
//           numberOfPieces={300}
//         />
//       </div>
//     </div>
//   );
// }

// export default NewyearPage;

// ****************************************************************************************
// 폭죽 애니메이션
// import React, { useCallback, useEffect, useRef, useState } from 'react';
// import ReactCanvasConfetti from 'react-canvas-confetti';
// import newYearBg from '../assets/images/newyearbg2.png';

// function randomInRange(min, max) {
//   return Math.random() * (max - min) + min;
// }

// const canvasStyles = {
//   position: 'fixed',
//   pointerEvents: 'none',
//   width: '100%',
//   height: '100%',
//   background: 'black',
//   backgroundImage: `url(${newYearBg})`, // 이미지 경로 설정
//   backgroundSize: 'cover', // 배경 이미지 크기 조절
//   top: 0,
//   left: 0,
// };

// function getAnimationSettings(originXA, originXB) {
//   return {
//     startVelocity: 45,
//     spread: 360,
//     gravity: 0.7,
//     ticks: 100,
//     // decay: 0.1,
//     zIndex: 10,
//     shapes: ['square', 'circle', 'circle'],
//     particleCount: 400,
//     origin: {
//       x: randomInRange(originXA, originXB),
//       y: Math.random(),
//     },
//   };
// }

// export default function Fireworks() {
//   const refAnimationInstance = useRef(null);
//   const [intervalId, setIntervalId] = useState();

//   const getInstance = useCallback((instance) => {
//     refAnimationInstance.current = instance;
//   }, []);

//   const nextTickAnimation = useCallback(() => {
//     if (refAnimationInstance.current) {
//       refAnimationInstance.current(getAnimationSettings(0.1, 0.3));
//       refAnimationInstance.current(getAnimationSettings(0.7, 0.9));
//     }
//   }, []);

//   const startAnimation = useCallback(() => {
//     if (!intervalId) {
//       setIntervalId(setInterval(nextTickAnimation, 900));
//     }
//   }, [intervalId, nextTickAnimation]);

//   useEffect(() => {
//     startAnimation(); // 페이지에 처음 접속했을 때 애니메이션 자동 시작
//     return () => {
//       clearInterval(intervalId);
//     };
//   }, []);

//   const centerTextStyle = {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: '100%',
//     height: '100%',
//     color: 'white', // 텍스트 색상을 흰색으로 설정
//     fontSize: '72px', // 텍스트 크기 설정
//     position: 'fixed', // 화면에 고정
//     top: '50%', // 화면 상단에서 절반 지점으로 이동
//     left: '50%', // 화면 왼쪽에서 절반 지점으로 이동
//     transform: 'translate(-50%, -50%)', // 중앙 정렬을 위한 트랜스폼
//   };

//   return (
//     <>
//       <div>
//         <div style={centerTextStyle}>2024</div>
//       </div>
//       <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />
//     </>
//   );
// }

// ****************************************************************************************
// 촤르르
import React, { useCallback, useEffect, useRef, useState } from 'react';
import ReactCanvasConfetti from 'react-canvas-confetti';
import newYearBg from '../assets/images/newyearbg2.png';

const canvasStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  width: '100%',
  height: '100%',
  background: 'black',
  backgroundImage: `url(${newYearBg})`, // 이미지 경로 설정
  backgroundSize: 'cover', // 배경 이미지 크기 조절
  top: 0,
  left: 0,
};

function getAnimationSettings(angle, originX) {
  return {
    particleCount: 5,
    angle,
    spread: 55,
    origin: { x: originX },
    // colors: ['#bb0000', '#ffffff'],
  };
}

export default function NewyearPage(callback, deps) {
  const refAnimationInstance = useRef(null);
  const [intervalId, setIntervalId] = useState();

  const getInstance = useCallback((instance) => {
    refAnimationInstance.current = instance;
  }, []);

  const nextTickAnimation = useCallback(() => {
    if (refAnimationInstance.current) {
      refAnimationInstance.current(getAnimationSettings(60, 0));
      refAnimationInstance.current(getAnimationSettings(120, 1));
    }
  }, []);

  const startAnimation = useCallback(() => {
    if (!intervalId) {
      setIntervalId(setInterval(nextTickAnimation, 16));
    }
  }, [nextTickAnimation, intervalId]);

  // const pauseAnimation = useCallback(() => {
  //   clearInterval(intervalId);
  //   setIntervalId(null);
  // }, [intervalId]);

  // const stopAnimation = useCallback(() => {
  //   clearInterval(intervalId);
  //   setIntervalId(null);
  //   refAnimationInstance.current && refAnimationInstance.current.reset();
  // }, [intervalId]);

  useEffect(() => {
    return () => {
      clearInterval(intervalId);
    };
  }, [intervalId]);

  useEffect(() => {
    startAnimation(); // 페이지에 처음 접속했을 때 애니메이션 자동 시작
    // playJoonAudio(); //  페이지에 처음 접속했을 때 음성메세지 자동 시작
    return () => {
      clearInterval(intervalId);
    };
  }, []); // 빈 배열을 전달하여 컴포넌트가 처음 렌더링될 때 한 번만 실행되도록 설정

  return (
    <div className="w-screen h-screen">
      <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />
    </div>
  );
}
