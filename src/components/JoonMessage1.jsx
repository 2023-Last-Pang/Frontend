/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';

import message from '../../public/img/Message/message.png';
import tree from '../../public/img/Message/tree.png';

function JoonMessage1() {
  const [isClicked, setIsClicked] = useState(false);

  const handleImageClick = () => {
    setIsClicked(true);

    setTimeout(() => {
      setIsClicked(false);
    }, 2000);
  };

  return (
    <div className="fixed bottom-0 left-[15%] flex -translate-x-1/2 transform flex-col items-center">
      <div
        role="button"
        tabIndex={0}
        onClick={handleImageClick}
        className="w-[24vw] cursor-pointer">
        <img src={tree} alt="Tree" className="w-full" />
        {isClicked && (
          <div className="height-[60vh] absolute bottom-[20vh] left-[15%] z-30 aspect-square w-[30vw] font-omyu_pretty">
            <img src={message} alt="Message" className="h-full w-full" />
            <p className="absolute left-[50%] top-[40%] w-[36%] -translate-x-1/2 -translate-y-1/2 transform text-sm leading-6 text-black md:text-lg">
              23년은 각자에게 특별한 시간이었고, 이제 우리는 꿈을 향해 더 멋진
              24년을 함께 만들어 나갑시다!
            </p>
            <p className="absolute left-1/2 top-[52%] -translate-x-1/2 transform text-sm text-black md:text-lg">
              - Joon -
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default JoonMessage1;
