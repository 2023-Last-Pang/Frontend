/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';

import message2 from '../../public/img/Message/message2.png';
import snowman3 from '../../public/img/Message/snowman3.png';

function JoonMessage2() {
  const [isClicked, setIsClicked] = useState(false);

  const handleImageClick = () => {
    setIsClicked(true);

    setTimeout(() => {
      setIsClicked(false);
    }, 3000);
  };

  return (
    <div className="fixed bottom-0 left-[70%] flex -translate-x-1/2 transform flex-col items-center">
      <div
        role="button"
        tabIndex={0}
        onClick={handleImageClick}
        className="w-[13vw] cursor-pointer">
        <img src={snowman3} alt="Snowman" />
        {isClicked && (
          <div className="absolute right-0 top-[-85%] z-20 aspect-square h-auto w-[24vw] md:top-[-85%] md:w-[24vw] ">
            <img src={message2} alt="Message" className="h-full w-full" />
            <div className="absolute left-[11.6rem] top-[44%] flex w-32 -translate-x-1/2 -translate-y-1/2 transform flex-col items-center md:w-32">
              <div className="flex w-full flex-col items-center">
                <p className="font-nanumPen text-lg text-black md:text-lg">
                  다음 해에도 함께 성장하는 팀준을 만들고 싶습니다! 화이팅!
                </p>
                <p className="font-nanumPen text-center text-base  text-black md:text-base">
                  - 정현 -
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default JoonMessage2;
