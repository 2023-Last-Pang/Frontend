/* eslint-disable prettier/prettier */
import { useState } from 'react';

export default function AddMessage({ handleOpenMessage, addMessage }) {
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
    addMessage({userName, message});
    console.log(userName);
    console.log(message);
    handleOpenMessage();
  }
  
  return (
    <>
      <input
        type="text"
        placeholder="작성자"
        value={userName}
        onChange={(e) => handleUserName(e.target.value)}
        className="absolute w-64 h-8 p-1 text-xl border align-center left-1/2 font-nanumPen outline-[#f1c1c1]"
        style={{ left: '50%', transform: 'translate(-50%, -990%)' }}
      />
      
      <textarea
        placeholder="내용"
        value={message}
        onChange={(e) => handleMessage(e.target.value)}
        className="absolute w-64 h-40 p-1 text-xl border resize-none align-center left-1/2 font-nanumPen outline-[#f1c1c1]"
        style={{ left: '50%', transform: 'translate(-50%, -135%)' }}
      />
      
      <button 
        type="button"
        className="absolute px-4 h-8 py-1 text-sm text-[#e26a68] bg-white rounded hover:bg-[#e7e7e7] shadow-md mt-56"
        onClick={() => handleOpenMessage()}
        style={{ transform: 'translate(15%, -710%)' }}
      >
        취소
      </button>

      <button 
        type="submit"
        className="absolute px-4 h-8 py-1 text-sm text-white bg-[#e26a68] rounded hover:bg-[#c25a58] shadow-md mt-56 ml-40"
        onClick={() => handleSubmit()}
        style={{ transform: 'translate(8%, -710%)' }}
      >
        작성 완료
      </button>
    </>
  );
}
