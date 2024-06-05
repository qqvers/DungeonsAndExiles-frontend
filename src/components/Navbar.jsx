import React from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const { pathname } = useLocation();
  const selectedOptionStyles =
    "block rounded-md px-3 py-2 font-medium text-base bg-gray-700 text-white";
  const unselectedOptionStyles =
    "block rounded-md px-3 py-2 font-medium text-base text-gray-300 hover:bg-gray-800 hover:text-white";
  return (
    <>
      {String(pathname) !== "/" && (
        <nav className="absolute w-[1920px] bg-black/90">
          <div className="max-w-7xl px-2 sm:mx-auto sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-start justify-between sm:items-center">
              <div className="flex flex-1 items-center justify-start sm:items-stretch">
                <div className="flex flex-shrink-0 items-start sm:items-center">
                  <span className="cursor-default px-2 pt-4 text-3xl text-white sm:px-0 sm:pt-0 sm:text-base">
                    Dungeons and Exiles
                  </span>
                </div>
                <div className="hidden sm:ml-6 sm:block">
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
                      to="/ranking"
                      className={({ isActive }) =>
                        isActive ? selectedOptionStyles : unselectedOptionStyles
                      }
                    >
                      Ranking
                    </NavLink>
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <div className="relative ml-3">
                  <div>
                    <NavLink
                      to="/"
                      className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-red-500"
                    >
                      Logout
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[500px] sm:hidden" id="mobile-menu">
            <div className="space-y-1 px-2 pb-3 pt-2">
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
                to="/ranking"
                className={({ isActive }) =>
                  isActive ? selectedOptionStyles : unselectedOptionStyles
                }
              >
                Ranking
              </NavLink>
              <NavLink
                to="/"
                className={`${unselectedOptionStyles} hover:text-red-500`}
              >
                Logout
              </NavLink>
            </div>
          </div>
        </nav>
      )}
    </>
  );
};

export default Navbar;
