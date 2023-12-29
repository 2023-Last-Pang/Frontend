/* eslint-disable react/jsx-boolean-value */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable prettier/prettier */
/* eslint-disable react/self-closing-comp */
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import './style.css';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function Slider({ setModalIsOpen, images }) {
  return (
    <div
      id="outside"
      onClick={(e) => {
        if (e.target.id === 'swiperSlide') setModalIsOpen(false);
      }}
      className="w-screen h-screen cursor-pointer">
      <Swiper
        loop
        tabIndex={0}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper">
        {images.map((image) => (
          <SwiperSlide
            id="swiperSlide"
            className="flex items-center justify-center w-full h-full">
            <div className="flex items-center justify-center w-3/4 h-4/6">
              <img
                src={image}
                loading="lazy"
                className="w-screen h-screen rounded-lg"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
