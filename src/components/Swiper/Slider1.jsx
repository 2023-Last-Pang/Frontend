import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './styles.css';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import gallery1 from '../../../public/img/April/gallery1.jpg';
import April1 from '../../../public/img/April/April1.jpg';
import April2 from '../../../public/img/April/April2.jpg';
import April3 from '../../../public/img/April/April3.jpg';
import April4 from '../../../public/img/April/April4.jpg';

function Slider1({ onClose }) {
  const images = [gallery1, April1, April2, April3, April4];

  const [isModalVisible, setModalVisible] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(null);

  const handleImageClick = () => {
    setModalVisible(false);
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="bg-[rgba(255, 255, 255, 0.6)] inset-0 z-50 -ml-4 h-screen w-screen">
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
        <div className="fixed inset-0 flex items-center justify-center overflow-hidden">
          <div className="relative items-center w-full overflow-y-auto">
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

export default Slider1;
