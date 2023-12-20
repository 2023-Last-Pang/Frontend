/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
import { useState } from 'react';

export default function InputAuth({ handleOpenAuthentication, color }) {
  const [roleInput, setRoleInput] = useState("");

  function handleRole(role) {
    setRoleInput(role);
  }

  function handleSubmit() {
    console.log('role: ', roleInput);
  }

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
      <div className="absolute text-xs text-red-600">
        <span>앗! 인증코드가 올바르지 않아요</span><br/>
      </div>
      
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
