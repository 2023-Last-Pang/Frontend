/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
import { useState } from 'react';
import apiV1Instance from '../../apiV1Instance';

export default function AddMessage({ handleOpenMessage, addMessage }) {
  const [userName, setUserName] = useState('');
  const [message, setMessage] = useState('');

  function handleUserName(name) {
    setUserName(name);
  }

  function handleMessage(content) {
    setMessage(content);
  }

  const addMessageAPI = async () => {
    try {
      await apiV1Instance
        .post('/messages', {
          nickname: userName,
          content: message,
        })
        .then(() => {
          alert('메세지 작성 완료!');
          addMessage({ userName, message });
          handleOpenMessage();
        });
    } catch (error) {
      alert(error.response.data.errors[0].constraints.maxLength);
      if (error.response.status === 401) {
        alert('세션이 만료되었습니다. 다시 로그인해주세요!');
        localStorage.clear();
        window.location.reload();
      }
    }
  };

  function handleSubmit() {
    if (!userName || !message) {
      alert('닉네임과 메세지 내용을 모두 입력해주세요!');
      return;
    }
    addMessageAPI();
  }

  return (
    <div className="p-8 mt-5">
      <input
        type="text"
        placeholder="작성자"
        value={userName}
        onChange={(e) => handleUserName(e.target.value)}
        className="align-center font-omyu_pretty h-8 w-64 border p-1 text-xl outline-[#f1c1c1]"
      />
      <br />

      <textarea
        placeholder="내용"
        value={message}
        onChange={(e) => handleMessage(e.target.value)}
        className="align-center font-omyu_pretty mt-1 h-40 w-64 resize-none border p-1 text-xl outline-[#f1c1c1]"
      />

      <div className="flex justify-end">
        <button
          type="button"
          className="mr-3 h-8 rounded bg-white px-4 py-1 text-sm text-[#e26a68] shadow-md hover:bg-[#e7e7e7]"
          onClick={() => handleOpenMessage()}>
          취소
        </button>

        <button
          type="submit"
          className="h-8 rounded bg-[#e26a68] px-4 py-1 text-sm text-white shadow-md hover:bg-[#c25a58]"
          onClick={() => handleSubmit()}>
          작성 완료
        </button>
      </div>
    </div>
  );
}
