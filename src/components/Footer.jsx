import React from "react";
import { useLocation, Link } from "react-router-dom";

const Footer = () => {
  const { pathname } = useLocation();
  return (
    <>
      {String(pathname) !== "/" && (
        <footer className="absolute bottom-0 z-50 w-[1920px] bg-black/70">
          <div className="mx-auto w-full p-4 2xl:flex 2xl:max-w-screen-xl 2xl:items-center 2xl:justify-between">
            <span className="text-sm text-gray-300 2xl:text-center dark:text-gray-400">
              © 2024{" "}
              <Link href="/" className="hover:underline">
                Dungeons And Exiles™
              </Link>
            </span>
            <ul className="mt-3 flex flex-wrap items-center text-sm font-medium text-gray-300 sm:mt-0 dark:text-gray-400">
              <li>
                <Link className="me-4 hover:underline 2xl:me-6">About</Link>
              </li>
              <li>
                <Link className="me-4 hover:underline 2xl:me-6">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link className="me-4 hover:underline 2xl:me-6">Licensing</Link>
              </li>
              <li>
                <Link className="hover:underline">Contact</Link>
              </li>
            </ul>
          </div>
        </footer>
      )}
    </>
  );
};

export default Footer;
