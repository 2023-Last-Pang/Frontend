/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-console */
/* eslint-disable react/style-prop-object */
/* eslint-disable prettier/prettier */
import InputAuth from './InputAuth';

export default function AuthenticationModal({ handleOpenAuthentication }) {
  return (
    <div className="fixed top-0 left-0 z-10 flex items-center justify-center w-full h-screen text-center bg-black bg-opacity-40">
      <div className="flex flex-col justify-between h-40 p-3 bg-white rounded-md w-96">
        <div className='flex flex-col items-center p-5'>
          <div className="w-72">
            <p>슬랙 채널에 공유된 인증코드를 입력해주세요</p>
          </div>
          <InputAuth 
            handleOpenAuthentication={handleOpenAuthentication}
            color="#2B5981"
          />
          {/* <div
            className="mt-2 ml-2 border-b-2 w-72 focus-within:border-blue-500"
          >
            <input 
              type="text"
              onChange={(e) => handleRole(e.target.value)}
              className="appearance-none focus:outline-none w-72"
              placeholder='인증코드 입력'
            />
          </div>
        </div>
        <div className="flex justify-end mt-2">
          <button 
            type="button"
            className="px-4 h-8 py-1 mr-3 text-sm text-[#2B5981] bg-white rounded hover:bg-[#e7e7e7] shadow-md"
            onClick={() => handleOpenAuthentication()}
          >
            취소
          </button>

          <button 
            type="submit"
            className="px-4 h-8 py-1 text-sm text-white bg-[#2B5981] rounded hover:bg-[#1b3953] shadow-md"
            onClick={() => handleSubmit()}
          >
            완료
          </button> */}
        </div>
      </div>
    </div>
  );
}
