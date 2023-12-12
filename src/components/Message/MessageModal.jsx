/* eslint-disable prettier/prettier */
import { useState } from 'react';
import messageModal from '../../assets/images/messageModal.png';

export default function MessageModal({ handleOpenMessage }) {
  const [userName, setUserName] = useState('');
  const [message, setMessage] = useState('');

  function handleUserName(name) {
    setUserName(name);
  }

  function handleMessage(content) {
    setMessage(content);
  }

  function handleSubmit() {
    /* eslint-disable no-console */
    console.log(userName);
    console.log(message);
  }

  return (
    <div className="flex items-center justify-center">
      <img src={messageModal} alt="message modal" className="w-80" />
      <input
        type="text"
        placeholder="작성자"
        value={userName}
        onChange={(e) => handleUserName(e.target.value)}
        className="absolute w-64 p-1 text-xl border top-[107px] left-1/2 font-nanumPen outline-[#f1c1c1]"
        style={{ left: '50%', transform: 'translate(-50%, -50%)' }}
      />
      
      <textarea
        placeholder="내용"
        value={message}
        onChange={(e) => handleMessage(e.target.value)}
        className="absolute w-64 h-40 p-1 text-xl border resize-none top-52 left-1/2 font-nanumPen outline-[#f1c1c1]"
        style={{ left: '50%', transform: 'translate(-50%, -50%)' }}
      />

      {/* Cancel Button */}
      <button 
        type="button"
        className="fixed px-4 h-8 py-1 text-sm text-[#e26a68] bg-white rounded hover:bg-[#e7e7e7] shadow-md mt-56"
        onClick={() => handleOpenMessage()}
      >
        취소
      </button>

      {/* Submit Button */}
      <button 
        type="submit"
        className="absolute px-4 h-8 py-1 text-sm text-white bg-[#e26a68] rounded hover:bg-[#c25a58] shadow-md mt-56 ml-40"
        onClick={() => handleSubmit()}
      >
        작성 완료
      </button>

      {/* <button 
        type="submit"
        className="absolute px-4 h-8 py-1 font-bold text-[#3FA700] transform -translate-x-1/2 bg-white rounded top-[290px] right-[22%] hover:bg-[#e7e7e7] shadow-md"
        // onClick={() => handleSubmit()}
      >
        취소
      </button>

      <button 
        type="submit"
        className="absolute px-4 h-8 py-1 font-bold text-white transform -translate-x-1/2 bg-[#3FA700] rounded top-[290px] right-[10%] hover:bg-[#225801] shadow-md"
        onClick={() => handleSubmit()}
      >
        작성 완료
      </button> */}
    </div>
  );
}
