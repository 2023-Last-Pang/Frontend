import React, { useState } from 'react';

// 이미지 import
import gallery1 from '../../public/img/April/gallery1.jpg';
import gallery2 from '../../public/img/Ideaton/gallery2.jpg';
import gallery3 from '../../public/img/HangoutDay/gallery3.jpg';
import gallery4 from '../../public/img/August/gallery4.jpg';
import gallery5 from '../../public/img/TecheerParty/gallery5.jpg';
import gallery6 from '../../public/img/December/gallery6.jpg';

// 각 이미지에 해당되는 슬라이더 import
import Slider1 from '../components/Swiper/Slider1';
import Slider2 from '../components/Swiper/Slider2';
import Slider3 from '../components/Swiper/Slider3';
import Slider4 from '../components/Swiper/Slider4';
import Slider5 from '../components/Swiper/Slider5';
import Slider6 from '../components/Swiper/Slider6';

import '../styles/custom.css';

const textData = [
  ['4월 테커인의 낮', '테커 아이디어톤'],
  ['여름 부트캠프 행아웃데이', '8월 테커인의 낮'],
  ['10월 테커파티', '12월 팀준인의 겨울'],
];

const galleryData = [
  { image: gallery1, slider: Slider1 },
  { image: gallery2, slider: Slider2 },
  { image: gallery3, slider: Slider3 },
  { image: gallery4, slider: Slider4 },
  { image: gallery5, slider: Slider5 },
  { image: gallery6, slider: Slider6 },
];

function GalleryTest() {
  const [activeSlider, setActiveSlider] = useState(null);

  const handleImageClick = (slider) => {
    setActiveSlider((prevSlider) => (prevSlider === slider ? null : slider));
  };

  return (
    <div className="bg-[rgba(255, 255, 255, 0.6)] overflow-hidden">
      <div className="mx-6 mt-32 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {galleryData.map((gallery, index) => {
          const isSpecialImage = index === 0 || index === 1; // 첫 번째와 두 번째 이미지에 대한 특별한 조건

          return (
            <div
              key={index}
              className={`${isSpecialImage ? 'special-size' : 'h-auto'}`}>
              <div
                role="button"
                tabIndex={0}
                className="relative flex w-full cursor-pointer items-center justify-center bg-white opacity-70"
                onClick={() => handleImageClick(gallery.slider)}
                onKeyDown={(e) =>
                  e.key === 'Enter' && handleImageClick(gallery.slider)
                }>
                <img
                  src={gallery.image}
                  loading="lazy"
                  alt={`img${index}`}
                  className="h-auto w-full object-cover object-center transition duration-300 ease-in-out hover:scale-105"
                />
                <span
                  className="absolute top-1/2 z-10 -translate-y-1/2 transform rounded bg-gray-500 bg-opacity-50 px-2 text-white drop-shadow-md"
                  style={{ fontSize: 'clamp(1.5rem, 1.5vw, 2.5rem)' }}>
                  {textData[Math.floor(index / 2)][index % 2]}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      {activeSlider && (
        <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
          {React.createElement(activeSlider, {
            onImageClick: handleImageClick,
            onClose: () => setActiveSlider(null),
            images: galleryData.find(
              (gallery) => gallery.slider === activeSlider,
            ).image,
          })}
        </div>
      )}
    </div>
  );
}

export default GalleryTest;
