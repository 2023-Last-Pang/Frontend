/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';

import message2 from '../../public/img/Message/message2.png';
import snowman4 from '../../public/img/Message/snowman4.png';

function JoonMessage3() {
  const [isClicked, setIsClicked] = useState(false);

  const handleImageClick = () => {
    setIsClicked(true);

    setTimeout(() => {
      setIsClicked(false);
    }, 2000);
  };
  return (
    <div className="fixed bottom-10 left-[90%] flex -translate-x-1/2 transform flex-col items-center">
      <div
        role="button"
        tabIndex={0}
        onClick={handleImageClick}
        className="w-[20vw] cursor-pointer">
        <img src={snowman4} alt="Snowman" className="h-auto w-[45%]" />
        {isClicked && (
          <div className="absolute right-[7.5rem] top-[-7rem] z-20 flex aspect-video h-auto w-[22vw] md:w-[22vw]">
            <img
              src={message2}
              alt="Message"
              className="h-full w-full object-cover"
            />
            <div className="absolute right-[5.8rem] top-[2rem] flex w-[9vw] -translate-x-[2%] -translate-y-[0.2%] transform flex-col items-center md:w-[9vw]">
              <div className="flex w-full flex-col items-center justify-center text-center font-omyu_pretty text-base">
                <p className=" text-black">
                  24년에도 재밌는 추억 많이 쌓으면서 코딩해요!!😊 - 수현 -
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default JoonMessage3;
