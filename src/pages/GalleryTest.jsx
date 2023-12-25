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
    window.scrollTo(0, 0);
  };

  return (
    <div className="bg-[rgba(255, 255, 255, 0.6)] overflow-hidden">
      <div className="grid grid-cols-3 grid-rows-2 gap-6 mx-6 mt-32">
        {galleryData.map((gallery, index) => (
          <div key={index} className="flex h-[16rem]">
            <div
              role="button"
              tabIndex={0}
              className="relative w-full h-full overflow-hidden cursor-pointer"
              onClick={() => handleImageClick(gallery.slider)}
              onKeyDown={(e) =>
                e.key === 'Enter' && handleImageClick(gallery.slider)
              }>
              <div className="inset-0 flex items-center justify-center transition-shadow duration-300 bg-white opacity-70 hover:shadow-lg">
                <img
                  src={gallery.image}
                  loading="lazy"
                  alt={`img${index}`}
                  className="object-cover object-center w-full h-full transition duration-300 ease-in-out transform hover:scale-105"
                />
                <span className="absolute z-10 p-2 text-3xl font-bold text-white transform -translate-y-1/2 bg-gray-500 bg-opacity-50 rounded top-1/2 drop-shadow-md">
                  {textData[Math.floor(index / 2)][index % 2]}
                </span>
              </div>
            </div>
            {activeSlider === gallery.slider && gallery.slider && (
              <div className="relative w-full max-w-3xl p-4">
                {gallery.slider &&
                  React.createElement(gallery.slider, {
                    onImageClick: handleImageClick,
                    onClose: () => handleImageClick(gallery.slider), // 슬라이더를 다시 클릭하면 닫히게 함
                    images: [gallery.image],
                  })}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default GalleryTest;
