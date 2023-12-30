/* eslint-disable prettier/prettier */
export default function Footer() {
  return (
    // <footer className="fixed bottom-0 w-full p-2 text-center bg-gray-200">
    //   <div className="mb-2">© Team Joon. All rights reserved.</div>
    //   <div className="text-sm">
    //     <span className="font-semibold">contributors:</span>
    //     <ul className="list-none">
    //       <li>홍길동</li>
    //       <li>김철수</li>
    //       <li>박영희</li>
    //       {/* 여기에 추가 제작자 이름을 넣으세요 */}
    //     </ul>
    //   </div>
    // </footer>
    <footer className="m-4 -mt-20 bg-white rounded-lg shadow dark:bg-gray-800">
      <div className="w-full max-w-screen-xl p-4 mx-auto md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © [Techeer] Team Joon . All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 sm:mt-0 dark:text-gray-400">
          <li>
            <a
              href="https://team-joon.oopy.io/"
              className="me-4 hover:underline md:me-6">
              About
            </a>
          </li>
          <li>
            <a
              href="https://medium.com/team-joon"
              className="me-4 hover:underline md:me-6">
              Medium
            </a>
          </li>
          {/* <li>
            <a href="#" className="me-4 hover:underline md:me-6">
              Licensing
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Contact
            </a>
          </li> */}
        </ul>
      </div>
    </footer>
  );
}
