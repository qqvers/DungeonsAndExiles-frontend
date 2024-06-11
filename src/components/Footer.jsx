import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="absolute bottom-0 z-50 w-[1920px] bg-black/70">
        <div className="mx-auto w-full p-4 2xl:flex 2xl:max-w-screen-xl 2xl:items-center 2xl:justify-between">
          <span className="text-sm text-gray-300 2xl:text-center dark:text-gray-400">
            <div className="cursor-default">© 2024 Dungeons And Exiles™</div>
          </span>
          <ul className="mt-3 flex flex-wrap items-center text-sm font-medium text-gray-300 sm:mt-0 dark:text-gray-400">
            <li>
              <Link
                to="https://github.com/qqvers/DungeonsAndExiles-frontend"
                className="me-4 hover:underline 2xl:me-6"
              >
                Frontend
              </Link>
            </li>
            <li>
              <Link
                to="https://github.com/qqvers/DungeonsAndExiles"
                className="me-4 hover:underline 2xl:me-6"
              >
                Backend
              </Link>
            </li>
            <li>
              <Link
                to="https://github.com/qqvers"
                className="me-4 hover:underline 2xl:me-6"
              >
                My GitHub
              </Link>
            </li>
            <li>
              <Link
                to="https://www.linkedin.com/in/szbart/"
                className="hover:underline"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
};

export default Footer;
