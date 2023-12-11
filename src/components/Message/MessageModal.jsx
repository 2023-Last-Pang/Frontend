/* eslint-disable prettier/prettier */
import messageModal from '../../assets/images/messageModal.png';

export default function MessageModal() {
  return (
    <div className="flex items-center justify-center ">
      <img src={messageModal} alt="message modal" className="w-80" />
      <input
        type="text"
        placeholder="작성자"
        className="absolute w-64 p-1 text-xl border top-28 left-1/2 font-nanumPen"
        style={{ left: '50%', transform: 'translate(-50%, -50%)' }}
      />
      
      <textarea
        placeholder="내용"
        className="absolute w-64 h-40 p-1 text-xl border top-56 left-1/2 font-nanumPen"
        style={{ left: '50%', transform: 'translate(-50%, -50%)' }}
      />
    </div>
  );
}
