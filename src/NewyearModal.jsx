import React from 'react';

function NewyearModal({ onClickToggleModal }) {
  return (
    <div>
      <div className="text-3xl">2024</div>

      {/* 모달 배경 */}
      <button
        aria-label="Toggle modal"
        className="fixed bottom-0 left-0 right-0 top-0 z-40 h-full w-screen  bg-black opacity-90"
        onClick={(e) => {
          e.preventDefault();

          if (onClickToggleModal) {
            onClickToggleModal();
          }
        }}
        type="button"
      />
    </div>
  );
}

export default NewyearModal;
