import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './styles.css';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import 행아웃데이_1 from '../../../public/img/HangoutDay/행아웃데이_1.jpg';
import 행아웃데이_2 from '../../../public/img/HangoutDay/행아웃데이_2.jpg';
import 행아웃데이_3 from '../../../public/img/HangoutDay/행아웃데이_3.jpg';
import 행아웃데이_4 from '../../../public/img/HangoutDay/행아웃데이_4.jpg';

function Slider3({ onClose }) {
  const images = [행아웃데이_1, 행아웃데이_2, 행아웃데이_3, 행아웃데이_4];

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

export default Slider3;
