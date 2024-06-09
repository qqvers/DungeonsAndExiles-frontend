import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const { pathname } = useLocation();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  const selectedOptionStyles =
    "block rounded-md px-3 py-2 font-medium text-base bg-gray-700 text-white";
  const unselectedOptionStyles =
    "block rounded-md px-3 py-2 font-medium text-base text-gray-300 hover:bg-gray-800 hover:text-white";
  const logoutStyles =
    "block rounded-md px-3 py-2 font-medium text-base text-gray-300 hover:text-red-500 hover:bg-gray-800";

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setShowMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {String(pathname) !== "/" && (
        <nav className="fixed z-50 bg-black/90 md:w-[1300px] xl:w-[1600px] 2xl:w-[1920px]">
          <div className="max-w-7xl px-2 lg:px-8 2xl:mx-auto 2xl:px-6">
            <div className="relative flex h-16 items-start justify-between 2xl:items-center">
              <div className="flex flex-1 items-center justify-start 2xl:items-stretch">
                <div className="flex flex-shrink-0 items-start 2xl:items-center">
                  <span className="cursor-default px-2 pt-4 text-3xl text-yellow-500 2xl:px-0 2xl:pt-0 2xl:text-xl">
                    Dungeons and Exiles
                  </span>
                </div>
                <div className="hidden 2xl:ml-6 2xl:block">
                  <div className="flex space-x-4">
                    <NavLink
                      to="/profile"
                      className={({ isActive }) =>
                        isActive ? selectedOptionStyles : unselectedOptionStyles
                      }
                    >
                      Profile
                    </NavLink>
                    <NavLink
                      to="/character"
                      className={({ isActive }) =>
                        isActive ? selectedOptionStyles : unselectedOptionStyles
                      }
                    >
                      Character
                    </NavLink>
                    <NavLink
                      to="/dungeons"
                      className={({ isActive }) =>
                        isActive ? selectedOptionStyles : unselectedOptionStyles
                      }
                    >
                      Dungeons
                    </NavLink>
                    <NavLink
                      to="/Leaderboard"
                      className={({ isActive }) =>
                        isActive ? selectedOptionStyles : unselectedOptionStyles
                      }
                    >
                      Leaderboard
                    </NavLink>
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 2xl:static 2xl:inset-auto 2xl:ml-6 2xl:pr-0">
                <div className="relative ml-3 hidden 2xl:block">
                  <div>
                    <NavLink to="/" className={logoutStyles}>
                      Logout
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-[500px] 2xl:hidden" id="mobile-menu">
            <div ref={menuRef} className="space-y-1 px-2 pb-3 pt-2">
              {!showMenu && (
                <button
                  className={unselectedOptionStyles + " w-full"}
                  onClick={() => setShowMenu(true)}
                >
                  Menu
                </button>
              )}
              {showMenu && (
                <>
                  <NavLink
                    to="/profile"
                    className={({ isActive }) =>
                      isActive ? selectedOptionStyles : unselectedOptionStyles
                    }
                    aria-current="page"
                  >
                    Profile
                  </NavLink>
                  <NavLink
                    to="/character"
                    className={({ isActive }) =>
                      isActive ? selectedOptionStyles : unselectedOptionStyles
                    }
                  >
                    Character
                  </NavLink>
                  <NavLink
                    to="/dungeons"
                    className={({ isActive }) =>
                      isActive ? selectedOptionStyles : unselectedOptionStyles
                    }
                  >
                    Dungeons
                  </NavLink>
                  <NavLink
                    to="/Leaderboard"
                    className={({ isActive }) =>
                      isActive ? selectedOptionStyles : unselectedOptionStyles
                    }
                  >
                    Leaderboard
                  </NavLink>
                  <NavLink to="/" className={logoutStyles}>
                    Logout
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </nav>
      )}
    </>
  );
};

export default Navbar;
