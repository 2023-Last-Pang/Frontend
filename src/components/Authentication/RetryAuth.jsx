import InputAuth from './InputAuth';

/* eslint-disable prettier/prettier */
export default function RetryAuth({ handleOpenMessage, color }) {
  return (
    <div className="p-8 mt-5 text-sm">
      <span>앗 팀준인이 아니면 입력하실 수 없어요ㅠ 🥺</span><br/>
      <span>팀준 코드로 재입력하시겠어요?</span>
      <InputAuth handleOpenAuthentication={handleOpenMessage} color={color}/>
    </div>
  );
}
