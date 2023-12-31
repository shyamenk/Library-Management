import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../assets/logo.svg";
import { useAuth } from "../../context/authContext";

const MobileMenu: React.FC<{ isOpen: boolean }> = ({ isOpen }) => {
  const { user, signOut } = useAuth();

  const location = useLocation();

  return (
    <>
      {isOpen && (
        <div className="px-6 bg-white rounded-md md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-8">
            <Link
              to="/userProfile"
              className={`block  rounded-md text-sm ${
                location.pathname === "/userProfile" ? "" : "text-grey-800"
              }`}
            >
              Accounts
            </Link>
            <Link
              to="/"
              className={`block  rounded-md text-sm ${
                location.pathname === "/" ? "" : "text-grey-800"
              }`}
            >
              Browse
            </Link>

            {user ? (
              <button
                onClick={() => signOut()}
                className="block w-full px-3 py-2 mt-4 text-sm text-white rounded-md bg-brand"
              >
                Sign Out
              </button>
            ) : (
              <Link to="/signin" className="block w-full px-3 py-2 mt-4 rounded-md text-grey-800">
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
};

const DesktopMenu: React.FC = () => {
  const location = useLocation();
  const { user, signOut } = useAuth();

  return (
    <div className="items-center hidden space-x-4 md:flex">
      {user && (
        <>
          <Link
            to="/"
            className={`px-4 py-1 rounded-full text-full ${
              location.pathname === "/"
                ? "text-black bg-gray-100"
                : "text-grey-800 hover:bg-gray-100 "
            }`}
          >
            Browse
          </Link>
          <Link
            to="/userProfile"
            className={`px-4 py-1 rounded-full text-md ${
              location.pathname === "/userProfile"
                ? "text-black bg-gray-100"
                : "text-grey-800 hover:bg-gray-100 "
            }`}
          >
            Account
          </Link>
        </>
      )}

      {user ? (
        <button
          onClick={() => signOut()}
          className="px-4 py-2 text-sm text-white rounded-md bg-brand"
        >
          Sign Out
        </button>
      ) : (
        <Link to="/signin" className="px-6 py-2 text-white bg-gray-700 rounded-md">
          Sign In
        </Link>
      )}
    </div>
  );
};

const SiteHeader: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white border border-b">
      <div className="px-8 mx-auto md:px-16 max-w-7xl">
        <div className="flex justify-between h-20">
          <div className="flex items-center gap-4">
            <Link to="/">
              <img src={Logo} alt="" className="w-8 h-10 md:w-10 md:h-16" />
            </Link>
            <Link to="/" className="text-2xl font-semibold tracking-wide text-grey-600">
              Bookipedia
            </Link>
          </div>

          <div className="flex items-center md:hidden">
            <button
              onClick={toggleNavbar}
              className="inline-flex items-center justify-center p-2 text-gray-800 rounded-md hover:text-gray-900 "
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>

          <DesktopMenu />
        </div>
      </div>

      <MobileMenu isOpen={isOpen} />
    </nav>
  );
};

export default SiteHeader;
