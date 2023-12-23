import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './styles.css';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import 테커파티_1 from '../../../public/img/TecheerParty/테커파티_1.jpg';
import 테커파티_2 from '../../../public/img/TecheerParty/테커파티_2.jpg';
import 테커파티_3 from '../../../public/img/TecheerParty/테커파티_3.jpg';
import 테커파티_4 from '../../../public/img/TecheerParty/테커파티_4.jpg';
import 테커파티_5 from '../../../public/img/TecheerParty/테커파티_5.jpg';
import 테커파티_6 from '../../../public/img/TecheerParty/테커파티_6.jpg';

function Slider5({ onClose }) {
  const images = [
    테커파티_1,
    테커파티_2,
    테커파티_3,
    테커파티_4,
    테커파티_5,
    테커파티_6,
  ];

  const [isModalVisible, setModalVisible] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(null);

  const handleImageClick = () => {
    // 모달을 닫습니다.
    setModalVisible(false);
    if (onClose) {
      onClose(); // GalleryTest 컴포넌트의 handleSliderClose 함수를 호출
    }
  };

  return (
    <div
      className="bg-[rgba(255, 255, 255, 0.6)] fixed inset-0 z-50 flex items-center justify-center"
      style={{ zIndex: 1000 }}>
      <Swiper
        spaceBetween={0}
        centeredSlides
        loop
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper">
        {images.map((image, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <SwiperSlide key={index}>
            <div
              className="h-4/6 w-3/4"
              role="button"
              tabIndex={0}
              onClick={() => handleImageClick(index)}
              onKeyDown={(e) => e.key === 'Enter' && handleImageClick(index)}>
              <img
                src={image}
                loading="lazy"
                className="h-full w-full"
                alt={`img${index}`}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {isModalVisible && (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="relative w-full items-center">
            <img
              src={images[activeImageIndex]}
              loading="lazy"
              className="h-full w-full object-cover"
              alt={`img${activeImageIndex}`}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Slider5;
