/* eslint-disable prettier/prettier */
import InputAuth from './InputAuth';

export default function AuthenticationModal({ handleOpenAuthentication }) {
  return (
    <div className="fixed top-0 left-0 z-10 flex items-center justify-center w-full h-screen text-center bg-black bg-opacity-40">
      <div className="flex flex-col justify-between h-40 p-3 bg-white rounded-md w-84">
        <div className='flex flex-col items-center p-5'>
          <div className="mr-2 text-sm w-72">
            <p>슬랙 채널에 공유된 인증코드를 입력해주세요</p>
          </div>
          <InputAuth
            handleOpenAuthentication={handleOpenAuthentication}
            color="#2B5981"
          />
        </div>
      </div>
    </div>
  );
}
