/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
import { useState } from 'react';
import apiV1Instance from '../../apiV1Instance';

export default function InputAuth({ handleOpenAuthentication, color }) {
  const [role, setRole] = useState('');
  const [isError, setIsError] = useState(false);

  function handleRole(code) {
    setRole(code);
  }

  const authAPI = async () => {
    try {
      await apiV1Instance
        .post('/auth/verify', {
          code: role,
        })
        .then((response) => {
          alert('로그인 성공');
          localStorage.setItem('token', response.data.accessToken);
          localStorage.setItem('role', response.data.role);
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
      <div className="mt-2 w-64 border-b-2 focus-within:border-blue-500">
        <input
          type="text"
          onChange={(e) => handleRole(e.target.value)}
          className="font-omyu_pretty ml-1 w-64 appearance-none focus:outline-none"
          placeholder="인증코드 입력"
        />
      </div>
      {isError && (
        <div className="font-omyu_pretty absolute text-xs text-red-600">
          <span>앗! 인증코드가 올바르지 않아요</span>
          <br />
        </div>
      )}

      <div className="mt-8 flex justify-end">
        <button
          type="button"
          className={`font-omyu_pretty mr-3 h-8 px-4 py-1 text-sm text-[${color}] rounded bg-white shadow-md hover:bg-[#e7e7e7]`}
          onClick={() => handleOpenAuthentication()}>
          취소
        </button>

        <button
          type="submit"
          className={`font-omyu_pretty h-8 px-4 py-1 text-sm text-white bg-[${color}] rounded hover:bg-[${color}] shadow-md`}
          onClick={() => handleSubmit()}>
          완료
        </button>
      </div>
    </div>
  );
}
