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
      <div className="fixed left-0 top-0 z-10 flex h-screen w-full items-center justify-center bg-black bg-opacity-20 text-center">
        <div className="flex h-80 w-80 flex-col justify-center bg-message-image bg-cover">
          <div className="mt-5 p-10 ">
            <div className="font-omyu_pretty relative flex h-52 w-60 flex-col items-center justify-center overflow-auto">
              <p className="message-content flex text-lg">{message.content}</p>
              <p className="font-omyu_pretty absolute bottom-0 right-0 text-right">
                - {message.nickname} -
              </p>
            </div>
            <button
              type="button"
              onClick={() => closeModal()}
              className="font-omyu_pretty bottom-0 mt-1 h-8 rounded bg-white px-4 py-1 text-sm text-[#e26a68] shadow-md hover:bg-[#e7e7e7]">
              닫기
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center">
      <div className="w-84 mt-[30rem] flex h-80 flex-col justify-center bg-message-image bg-cover">
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
