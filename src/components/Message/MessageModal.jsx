/* eslint-disable prettier/prettier */
import messageModal from '../../assets/images/messageModal.png';
import AddMessage from './AddMessage';

export default function MessageModal({ handleOpenMessage, addMessage, message, closeModal }) {
  if (message) {
    return (
      <div className="fixed top-0 left-0 z-10 flex items-center justify-center w-full h-screen text-center bg-black bg-opacity-20">
        <img src={messageModal} alt="message modal" className="w-80 h-80" />
        <div className="absolute p-4 mt-5">
          <div className='flex flex-col justify-between overflow-auto w-60 h-52 font-nanumPen'>
            <p className="text-lg">{message.content.message}</p>
            <p className="text-right font-nanumPen">- {message.content.userName} -</p>
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
    );
  } 
  return (
    <div className="flex items-center justify-center align-center">
      <img src={messageModal} alt="message modal" className="absolute w-80 bottom-20" />
      
      <AddMessage handleOpenMessage={handleOpenMessage} addMessage={addMessage}/>
    </div>
  );
}
