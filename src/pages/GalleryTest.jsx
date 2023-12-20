// GalleryTest component
import React, { useState } from 'react';
import Slider from '../components/Swiper/Slider';
import Modal from '../components/Modal';

// 이미지 import
import gallery1 from '../../public/img/April/gallery1.jpg';
import gallery2 from '../../public/img/Ideaton/gallery2.jpg';
import gallery3 from '../../public/img/HangoutDay/gallery3.jpg';
import gallery4 from '../../public/img/August/gallery4.jpg';
import gallery5 from '../../public/img/TecheerParty/gallery5.jpg';
import gallery6 from '../../public/img/December/gallery6.jpg';

const textData = [
  '4월 테커인의 낮',
  '테커 아이디어톤',
  '여름 부트캠프 행아웃데이',
  '8월 테커인의 낮',
  '10월 테커파티',
  '12월 팀준인의 겨울',
];

function GalleryTest() {
  const [isSliderVisible, setSliderVisible] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(null);

  const images = [gallery1, gallery2, gallery3, gallery4, gallery5, gallery6];

  const handleSliderClose = () => {
    setSliderVisible(false);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handleImageClick = (index) => {
    setActiveImageIndex(index);
    setSliderVisible(true);
    setModalVisible(false);
  };

  return (
    <div className="m-16 grid grid-cols-2 grid-rows-3 gap-6">
      {images.map((image, index) => (
        <div
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          role="button"
          tabIndex={0}
          className="relative flex h-80 w-full cursor-pointer items-center justify-center overflow-hidden"
          onClick={() => handleImageClick(index)}
          onKeyDown={(e) => e.key === 'Enter' && handleImageClick(index)}>
          <div className="inset-0 flex items-center justify-center bg-white opacity-70">
            <img
              src={image}
              loading="lazy"
              alt={`img${index}`}
              className="h-full w-full object-cover"
            />
            <span className="absolute top-1/2 z-10 -translate-y-1/2 transform text-3xl font-bold text-white drop-shadow-2xl">
              {textData[index]}
            </span>
          </div>
        </div>
      ))}
      {isSliderVisible && (
        <div className="fixed bottom-0 left-0 w-full">
          <Slider
            onImageClick={(index) => {
              setActiveImageIndex(index);
              setModalVisible(true);
            }}
            images={images} // 현재 보여지는 이미지 배열을 넘겨줍니다.
            onClose={handleSliderClose}
          />
        </div>
      )}
      {isModalVisible && (
        <Modal
          imageUrl={images[activeImageIndex]}
          altText={`img${activeImageIndex}`}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
}

export default GalleryTest;
