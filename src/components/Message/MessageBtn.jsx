export default function MessageBtn({ handleOpenMessage }) {
  return (
    <div>
      <div className="flex items-center justify-center">
        <button
          type="button"
          className="relative flex h-10 w-48 items-center justify-center overflow-hidden rounded-full border border-white bg-gray-800 text-white shadow-2xl transition-all before:absolute before:h-0 before:w-0 before:rounded-full before:bg-white before:duration-500 before:ease-out hover:text-[#204569] hover:shadow-[#204569] hover:before:h-56 hover:before:w-56"
          onClick={() => {
            handleOpenMessage();
          }}
        >
          <span className="relative z-10">메시지 작성</span>
        </button>
      </div>

      {/* <button
        type="button"
        // eslint-disable-next-line prettier/prettier
        className="w-48 px-4 py-2 font-semibold text-white bg-transparent bg-gray-800 border border-white rounded-full hover:border-transparent hover:bg-white hover:text-gray-800"
      >
        메시지 작성
      </button> */}

      {/* <button
        type="button"
        // eslint-disable-next-line prettier/prettier
        className="relative w-48 h-10 overflow-hidden text-white transition-all duration-200 bg-gray-800 border border-white rounded-full shadow-2xl hover:text-gray-800 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:h-0 before:w-0 before:rounded-sm before:bg-white before:duration-300 before:ease-out hover:shadow-gray-800 hover:before:h-48 hover:before:w-48 hover:before:opacity-80"
      >
        <span className="relative z-10">메시지 작성</span>
      </button> */}
    </div>
  );
}
