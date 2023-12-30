/* eslint-disable prettier/prettier */
export default function Footer() {
  return (
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
