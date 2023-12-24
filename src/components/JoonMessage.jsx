import React, { useState } from 'react';

import message from '../../public/img/Message/message.png';
import snowman1 from '../../public/img/Message/snowman1.png';

function AndrewMessage() {
  const [isClicked, setIsClicked] = useState(false);

  const handleImageClick = () => {
    setIsClicked(true);

    // 2초 후에 메시지 숨기기
    setTimeout(() => {
      setIsClicked(false);
    }, 2000);
  };

  return (
    <div className="relative mt-80 flex flex-col justify-end">
      {/* eslint-disable-next-line */}
      <div
        role="button"
        tabIndex={0}
        onClick={handleImageClick}
        className="relative w-96 cursor-pointer">
        {' '}
        {/* 트리 이미지의 너비 조정 */}
        <img src={snowman1} alt="Snowman" className="w-38 h-60" />
        {isClicked && (
          <div
            className="absolute right-[90%] top-[-60%] z-20 translate-x-full transform"
            style={{
              width: '300px', // Tailwind CSS로 너비 조정
              height: '300px', // Tailwind CSS로 높이 조정
            }}>
            <img src={message} alt="Message" className="h-full w-full" />
            <p className="font-nanumPen absolute left-1/2 top-[43%] z-30 -translate-x-1/2 -translate-y-1/2 transform text-sm text-black">
              Joon님의 메시지
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AndrewMessage;
