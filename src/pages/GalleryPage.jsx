/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable prettier/prettier */
// prettier-ignore
// 이미지 import
import React, { useState } from 'react';

import gallery1 from '../../public/img/April/gallery1.jpg';
import gallery2 from '../../public/img/Ideaton/gallery2.jpg';
import gallery3 from '../../public/img/HangoutDay/gallery3.jpg';
import gallery4 from '../../public/img/August/gallery4.jpg';
import gallery5 from '../../public/img/TecheerParty/gallery5.jpg';
import gallery6 from '../../public/img/December/gallery6.jpg';

import April1 from '../../public/img/April/April1.jpg';
import April2 from '../../public/img/April/April2.jpg';
import April3 from '../../public/img/April/April3.jpg';
import April4 from '../../public/img/April/April4.jpg';

import 아이디어톤_1 from '../../public/img/Ideaton/아이디어톤_1.jpg';
import 아이디어톤_2 from '../../public/img/Ideaton/아이디어톤_2.jpg';
import 아이디어톤_3 from '../../public/img/Ideaton/아이디어톤_3.jpg';
import 아이디어톤_4 from '../../public/img/Ideaton/아이디어톤_4.jpg';
import 아이디어톤_5 from '../../public/img/Ideaton/아이디어톤_5.jpg';
import 아이디어톤_6 from '../../public/img/Ideaton/아이디어톤_6.jpg';
import 아이디어톤_7 from '../../public/img/Ideaton/아이디어톤_7.jpg';
import 아이디어톤_8 from '../../public/img/Ideaton/아이디어톤_8.jpg';

import HangoutDay1 from '../../public/img/HangoutDay/행아웃데이_1.jpg';
import HangoutDay2 from '../../public/img/HangoutDay/행아웃데이_2.jpg';
import HangoutDay3 from '../../public/img/HangoutDay/행아웃데이_3.jpg';
import HangoutDay4 from '../../public/img/HangoutDay/행아웃데이_4.jpg';

import August1 from '../../public/img/August/팀준인의여름1.jpg';
import August2 from '../../public/img/August/팀준인의여름2.jpg';
import August3 from '../../public/img/August/팀준인의여름3.jpg';
import August4 from '../../public/img/August/팀준인의여름4.jpg';

import TecheerParty1 from '../../public/img/TecheerParty/테커파티_1.jpg';
import TecheerParty2 from '../../public/img/TecheerParty/테커파티_2.jpg';
import TecheerParty3 from '../../public/img/TecheerParty/테커파티_3.jpg';
import TecheerParty4 from '../../public/img/TecheerParty/테커파티_4.jpg';
import TecheerParty5 from '../../public/img/TecheerParty/테커파티_5.jpg';
import TecheerParty6 from '../../public/img/TecheerParty/테커파티_6.jpg';

import December1 from '../../public/img/December/팀준인의겨울_1.jpg';
import December2 from '../../public/img/December/팀준인의겨울_2.jpg';
import December3 from '../../public/img/December/팀준인의겨울_3.jpg';
import December4 from '../../public/img/December/팀준인의겨울_4.jpg';
import December5 from '../../public/img/December/팀준인의겨울_5.jpg';

import Slider from '../components/Swiper/Slider';

const galleryData = [
  {
    title: '4월 테커인의 낮',
    image: gallery1,
    images: [gallery1, April1, April2, April3, April4],
  },
  {
    title: '테커 아이디어톤',
    image: gallery2,
    images: [
      gallery2,
      아이디어톤_1,
      아이디어톤_2,
      아이디어톤_3,
      아이디어톤_4,
      아이디어톤_5,
      아이디어톤_6,
      아이디어톤_7,
      아이디어톤_8,
    ],
  },
  {
    title: '여름 부트캠프 행아웃데이',
    image: gallery3,
    images: [gallery3, HangoutDay1, HangoutDay2, HangoutDay3, HangoutDay4],
  },
  {
    title: '8월 테커인의 낮',
    image: gallery4,
    images: [gallery4, August1, August2, August3, August4],
  },
  {
    title: '10월 테커파티',
    image: gallery5,
    images: [
      gallery5,
      TecheerParty1,
      TecheerParty2,
      TecheerParty3,
      TecheerParty4,
      TecheerParty5,
      TecheerParty6,
    ],
  },
  {
    title: '12월 팀준인의 겨울',
    image: gallery6,
    images: [gallery6, December1, December2, December3, December4, December5],
  },
];

export default function GalleryPage() {
  const [activeSlider, setActiveSlider] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleImageClick = (images) => {
    setActiveSlider(images);
    setModalIsOpen(!modalIsOpen);
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-[#EEF0F4]">
      {/* 제목 */}
      <div className="mb-6 text-4xl font-omyu_pretty">
        <span>{'< 2023 테커 갤러리 >'}</span>
      </div>

      <div className="grid grid-cols-3 grid-rows-2 gap-6 p-6">
        {galleryData.map((gallery, index) => (
          <div
            key={index}
            className="relative transition duration-300 ease-in-out transform bg-white cursor-pointer opacity-70 hover:scale-105"
            onClick={() => handleImageClick(gallery.images)}>
            {/* 갤러리 대표 이미지 띄우기 */}
            <img
              src={gallery.image}
              loading="lazy"
              className="object-cover w-full h-64 rounded-lg"
            />

            {/* 갤러리 제목 띄우기 */}
            <div
              className="absolute bottom-0 left-0 w-full p-5 bg-black bg-opacity-50 rounded"
              style={{
                background:
                  'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
              }}>
              <span className="text-lg font-bold text-white">
                {gallery.title}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* 갤러리 모달 */}
      {modalIsOpen && (
        <div className="fixed z-10 flex items-center justify-center w-screen h-screen">
          <Slider setModalIsOpen={setModalIsOpen} images={activeSlider} />
        </div>
      )}
    </div>
  );
}
