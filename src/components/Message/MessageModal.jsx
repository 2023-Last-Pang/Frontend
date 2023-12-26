/* eslint-disable prettier/prettier */
import RetryAuth from '../Authentication/RetryAuth';
import AddMessage from './AddMessage';

export default function MessageModal({ handleOpenMessage, addMessage, message, closeModal }) {
  const role = localStorage.getItem('role');
  const techeerRole = import.meta.env.VITE_TECHEER_ROLE;
  const joonRole = import.meta.env.VITE_JOON_ROLE;

  if (message) {
    return (
      <div className="fixed top-0 left-0 z-10 flex items-center justify-center w-full h-screen text-center bg-black bg-opacity-20">
        <div loading="lazy" className="flex flex-col justify-center bg-cover h-80 w-80 bg-message-image">
          <div className="p-10 mt-5 ">
            <div className='flex flex-col justify-between w-60 h-52 font-nanumPen'>
              <p className="text-lg message-content">{message.content}</p>
              <p className="text-right font-nanumPen">- {message.nickname} -</p>
            </div>
            <button
              type="button"
              onClick={() => closeModal()} 
              className="bottom-0 px-4 h-8 mt-1 py-1 text-sm text-[#e26a68] bg-white rounded hover:bg-[#e7e7e7] shadow-md"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full">
      <div className="flex flex-col justify-center bg-cover mt-[30rem] h-80 w-84 bg-message-image">
        {role === techeerRole && <RetryAuth handleOpenMessage={handleOpenMessage} color="#e26a68"/>}
        {role === joonRole && <AddMessage handleOpenMessage={handleOpenMessage} addMessage={addMessage}/>}
      </div>
    </div>
  );
}
