import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseChimney, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { logout } from "../../services/authService";
import { useSignOut } from "react-auth-kit";

const Sidebar = () => {
  const signOut = useSignOut();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    signOut();
    navigate("/login");
  };

  return (
    <aside className="absolute top-0 left-0 bottom-0 z-20 w-60 bg-secondary overflow-y-auto transition-all duration-300 ease-in-out">
      <div className="sidebar-content px-4 py-2 h-full flex flex-col justify-between">
        <ul className="menu flex flex-col gap-5 w-full">
          <li className={`my-px rounded-lg ${location.pathname === '/' ? 'bg-primary' : 'hover:bg-[#d7d2d0]'}`}>
            <Link
              to="/"
              className={`cursor-pointer flex items-center justify-center px-3 py-1 rounded-lg my-2 ${location.pathname === '/' && 'active'}`}
            >
              <FontAwesomeIcon icon={faHouseChimney} className="text-xl" />
            </Link>
          </li>
          <li className={`my-px rounded-lg ${location.pathname === '/user' ? 'bg-primary' : 'hover:bg-[#d7d2d0]'}`}>
            <Link
              to="/user"
              className={`cursor-pointer flex justify-center py-1 px-3 rounded-lg my-2 ${location.pathname === '/user' && 'active'}`}
            >
              User
            </Link>
          </li>
          <li className={`my-px rounded-lg ${location.pathname === '/change-password' ? 'bg-primary' : 'hover:bg-[#d7d2d0]'}`}>
            <Link
              to="/change-password"
              className={`cursor-pointer flex justify-center py-1 px-3 rounded-lg my-2 ${location.pathname === '/change-password' && 'active'}`}
            >
              Change Password
            </Link>
          </li>
          <li className={`my-px rounded-lg ${location.pathname === '/post' ? 'bg-primary' : 'hover:bg-[#d7d2d0]'}`}>
            <Link
              to="/post"
              className={`cursor-pointer flex justify-center py-1 px-3 rounded-lg my-2 ${location.pathname === '/post' && 'active'}`}
            >
              Post
            </Link>
          </li>
        </ul>

        <button
          onClick={handleLogout}
          className="w-full text-gray-500 text-xs uppercase font-semibold hover:bg-[#d7d2d0] p-2 rounded-lg"
        >
          <FontAwesomeIcon icon={faSignOutAlt} className="mr-2 text-gray-800" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
