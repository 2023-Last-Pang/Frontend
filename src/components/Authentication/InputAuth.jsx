/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
import axios from 'axios';
import { useState } from 'react';

export default function InputAuth({ handleOpenAuthentication, color }) {
  const [role, setRole] = useState('');
  const [isError, setIsError] = useState(false);

  function handleRole(code) {
    setRole(code);
  }

  const authAPI = async () => {
    try {
      await axios
        .post('http://localhost:8000/api/v1/auth/verify', {
          code: role,
        })
        .then((response) => {
          alert('로그인 성공');
          localStorage.setItem('token', response.data.accessToken);
          window.location.reload();
        });
    } catch (error) {
      console.log(error);
      setIsError(true);
    }
  };

  const handleSubmit = async () => {
    if (!role) {
      alert('코드를 입력해주세요.');
      return;
    }
    setIsError(false);
    authAPI();
  };

  return (
    <div>
      <div className="w-64 mt-2 border-b-2 focus-within:border-blue-500">
        <input
          type="text"
          onChange={(e) => handleRole(e.target.value)}
          className="w-64 ml-1 appearance-none focus:outline-none"
          placeholder="인증코드 입력"
        />
      </div>
      {isError && (
        <div className="absolute text-xs text-red-600">
          <span>앗! 인증코드가 올바르지 않아요</span>
          <br />
        </div>
      )}

      <div className="flex justify-end mt-8">
        <button
          type="button"
          className={`px-4 h-8 py-1 mr-3 text-sm text-[${color}] bg-white rounded hover:bg-[#e7e7e7] shadow-md`}
          onClick={() => handleOpenAuthentication()}
        >
          취소
        </button>

        <button
          type="submit"
          className={`px-4 h-8 py-1 text-sm text-white bg-[${color}] rounded hover:bg-[${color}] shadow-md`}
          onClick={() => handleSubmit()}
        >
          완료
        </button>
      </div>
    </div>
  );
}
