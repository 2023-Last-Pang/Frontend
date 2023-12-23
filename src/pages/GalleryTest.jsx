// GalleryTest 컴포넌트
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
  const [activeZIndex, setActiveZIndex] = useState(1000);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleBodyScroll = (shouldHide) => {
    console.log(`handleBodyScroll: ${shouldHide}`);
    if (shouldHide) {
      console.log('Adding overflow-hidden to body');
      document.body.classList.add('overflow-hidden');
    } else {
      console.log('Removing overflow-hidden from body');
      document.body.classList.remove('overflow-hidden');
    }
  };

  const handleImageClick = (slider) => {
    console.log('Opening modal...'); // 모달 열림 로그
    handleBodyScroll(true); // 스크롤 비활성화
    setIsModalVisible(true);
    setActiveSlider(() => slider);
  };

  const handleSliderClose = () => {
    console.log('Closing modal...');
    setActiveSlider(null);

    // 스테이트 업데이트 후 스크롤 재활성화를 지연시켜 호출
    setTimeout(() => {
      handleBodyScroll(false);
    }, 0);

    // 모달 닫힘을 스테이트에 반영
    setIsModalVisible(false);
  };

  return (
    <div className="bg-[rgba(255, 255, 255, 0.6)]">
      <div
        className={`m-16 grid grid-cols-2 grid-rows-3 gap-6 ${
          isModalVisible ? 'blur-background' : ''
        }`}>
        {galleryData.map((gallery, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={index} className="flex h-[28rem]">
            <div
              role="button"
              tabIndex={0}
              className="relative h-full w-full cursor-pointer overflow-hidden"
              onClick={() => handleImageClick(gallery.slider)}
              onKeyDown={(e) =>
                e.key === 'Enter' && handleImageClick(gallery.slider)
              }>
              <div className="inset-0 flex items-center justify-center bg-white opacity-70 transition-shadow duration-300 hover:shadow-lg">
                <img
                  src={gallery.image}
                  loading="lazy"
                  alt={`img${index}`}
                  className="h-full w-full transform object-cover object-center transition duration-300 ease-in-out hover:scale-105"
                />
                <span className="absolute top-1/2 z-10 -translate-y-1/2 transform text-3xl font-bold text-white drop-shadow-2xl">
                  {textData[Math.floor(index / 2)][index % 2]}
                </span>
              </div>
            </div>
            {activeSlider === gallery.slider && gallery.slider && (
              <div
                // className="fixed inset-0 z-10"
                style={{ zIndex: activeZIndex }}>
                <div className="relative max-w-3xl p-4">
                  {gallery.slider &&
                    React.createElement(gallery.slider, {
                      onImageClick: handleImageClick,
                      onClose: handleSliderClose, // 여기에서 handleSliderClose를 전달합니다.
                      images: [gallery.image],
                    })}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default GalleryTest;
