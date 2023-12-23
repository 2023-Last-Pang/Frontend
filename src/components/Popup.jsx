import React from 'react';

function Popup({ images, activeImageIndex, onClose }) {
  const imageUrl = images[activeImageIndex];

  return (
    <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-75">
      <div className="relative max-w-3xl bg-white p-4">
        <img
          src={imageUrl}
          alt={`img${activeImageIndex}`}
          className="h-auto w-full"
        />
        {/* eslint-disable-next-line */}
        <button
          onClick={onClose}
          className="absolute right-2 top-2 cursor-pointer text-xl text-white focus:outline-none">
          닫기
        </button>
      </div>
    </div>
  );
}

export default Popup;
