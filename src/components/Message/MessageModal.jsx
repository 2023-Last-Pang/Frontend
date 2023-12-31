/* eslint-disable prettier/prettier */
import RetryAuth from '../Authentication/RetryAuth';
import AddMessage from './AddMessage';

export default function MessageModal({
  handleOpenMessage,
  addMessage,
  message,
  closeModal,
}) {
  const role = localStorage.getItem('role');
  const techeerRole = import.meta.env.VITE_TECHEER_ROLE;
  const joonRole = import.meta.env.VITE_JOON_ROLE;

  if (message) {
    return (
      <div className="fixed left-0 top-0 z-20 flex h-screen w-full items-center justify-center bg-black bg-opacity-20 text-center">
        <div className="flex h-80 w-80 flex-col justify-center bg-message-image bg-cover">
          <div className="relative mt-7 p-10 ">
            <div className="flex h-44 w-60 flex-col items-center justify-center overflow-auto font-omyu_pretty">
              <p className="message-content flex text-lg">{message.content}</p>
              <p className="absolute bottom-[72px] right-10 text-right font-omyu_pretty">
                - {message.nickname} -
              </p>
            </div>
            <button
              type="button"
              onClick={() => closeModal()}
              className="bottom-0 mt-7 h-8 rounded bg-white px-4 py-1 font-omyu_pretty text-sm text-[#e26a68] shadow-md hover:bg-[#e7e7e7]">
              닫기
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed left-0 top-0 z-10 flex h-full w-full items-center justify-center">
      <div className="w-84 mt-[32rem] flex h-80 flex-col justify-center bg-message-image bg-cover">
        {role === techeerRole && (
          <RetryAuth handleOpenMessage={handleOpenMessage} color="#e26a68" />
        )}
        {role === joonRole && (
          <AddMessage
            handleOpenMessage={handleOpenMessage}
            addMessage={addMessage}
          />
        )}
      </div>
    </div>
  );
}
