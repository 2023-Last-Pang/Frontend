import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './styles.css';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import 팀준인의겨울_1 from '../../../public/img/December/팀준인의겨울_1.jpg';
import 팀준인의겨울_2 from '../../../public/img/December/팀준인의겨울_2.jpg';
import 팀준인의겨울_3 from '../../../public/img/December/팀준인의겨울_3.jpg';
import 팀준인의겨울_4 from '../../../public/img/December/팀준인의겨울_4.jpg';
import 팀준인의겨울_5 from '../../../public/img/December/팀준인의겨울_5.jpg';

function Slider6({ onClose }) {
  const images = [
    팀준인의겨울_1,
    팀준인의겨울_2,
    팀준인의겨울_3,
    팀준인의겨울_4,
    팀준인의겨울_5,
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
    <div className="bg-[rgba(255, 255, 255, 0.6)] inset-0 z-50 h-screen w-screen -ml-4">
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
        modules={[Autoplay, Pagination, Navigation]}>
        {images.map((image, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <SwiperSlide key={index}>
            <div
              className="w-3/4 h-4/6"
              role="button"
              tabIndex={0}
              onClick={() => handleImageClick(index)}
              onKeyDown={(e) => e.key === 'Enter' && handleImageClick(index)}>
              <img
                src={image}
                loading="lazy"
                className="w-full h-full"
                alt={`img${index}`}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {isModalVisible && (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <div className="fixed inset-0 flex items-center justify-center ">
          <div className="relative items-center w-full">
            <img
              src={images[activeImageIndex]}
              loading="lazy"
              className="object-cover w-full h-full"
              alt={`img${activeImageIndex}`}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Slider6;
