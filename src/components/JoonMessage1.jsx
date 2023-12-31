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
    }, 3000);
  };

  return (
    <div className="absolute bottom-0 left-[15%] flex -translate-x-1/2 transform flex-col items-center">
      <div
        role="button"
        tabIndex={0}
        onClick={handleImageClick}
        className="w-[24vw] cursor-pointer">
        <img src={tree} alt="Tree" className="w-full" draggable="false" />
        {isClicked && (
          <div className="height-[60vh] font-omyu_pretty absolute bottom-[20vh] left-[15%] z-30 aspect-square w-[30vw]">
            <img src={message} alt="Message" className="w-full h-full" />
            <p className="absolute left-[50%] top-[40%] w-[36%] -translate-x-1/2 -translate-y-1/2 transform text-sm leading-6 text-black md:text-lg">
              여러분이 있어서 23년이 정말 행복했습니다. 꿈을 향해 함께 성장하는
              24년을 만들어봅시다.
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
