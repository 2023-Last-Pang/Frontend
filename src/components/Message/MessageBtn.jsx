/* eslint-disable prettier/prettier */
export default function MessageBtn({ handleOpenMessage }) {
  return (
    <div className="flex items-center justify-center h-screen">
      <button
        type="button"
        className="relative z-10 flex h-10 w-48 items-center justify-center overflow-hidden rounded-full border border-white bg-gray-800 text-white shadow-2xl transition-all before:absolute before:h-0 before:w-0 before:rounded-full before:bg-white before:duration-500 before:ease-out hover:text-[#204569] hover:shadow-[#204569] hover:before:h-56 hover:before:w-56"
        onClick={() => {
          handleOpenMessage();
        }}
      >
        <span className="relative">메시지 작성</span>
      </button>
    </div>
  );
}
