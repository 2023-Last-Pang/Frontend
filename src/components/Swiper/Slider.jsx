// Slider component
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './styles.css';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

function Slider({ onImageClick, images }) {
  return (
    <Swiper
      spaceBetween={30}
      centeredSlides
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
      {images.map((src, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <SwiperSlide key={index}>
          <div
            className="h-1/2 w-4/6"
            role="button"
            tabIndex={0}
            onClick={() => onImageClick(index)}
            onKeyDown={(e) => e.key === 'Enter' && onImageClick(index)}>
            <img src={src} className="h-full w-full" alt={`img${index}`} />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default Slider;
