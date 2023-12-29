/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './styles.css';
import { css } from '@emotion/react';
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
    <div onClick={() => onClose()} className="z-10 w-screen h-screen cursor-pointer">
      <Swiper
        spaceBetween={0}
        centeredSlides
        loop
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        css={css`
          display: flex;
          .swiper-pagination-bullet {
            width: 0.7rem;
            height: 0.7rem;
            border-radius: 100%;
            margin: 0;
            line-height: 40px;
            background-color: '#000';
          }
        `}
        pagination={{ clickable: true }}
        navigation
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper">
        {images.map((image, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <SwiperSlide key={index}>
            <div
              className="w-3/4 h-4/6"
              role="button"
              tabIndex={0}>
              <img
                src={image}
                loading="lazy"
                className="w-full h-full rounded-lg"
                alt={`img${index}`}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {isModalVisible && (
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
