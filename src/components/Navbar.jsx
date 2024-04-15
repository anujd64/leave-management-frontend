import { Link, NavLink } from "react-router-dom";
import { useContext } from 'react';
import GlobalContext from '../context/GlobalContext';

export default function Navbar() {
  const token = useContext(GlobalContext).token;
  const username = useContext(GlobalContext).username;
  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <nav className="flex sticky justify-between items-center content-center top-0 py-4 backdrop-blur-sm text-xl font-bold shadow-lg z-50 w-full"
      role="navigation"
    >
      <ul className="flex flex-row items-center justify-between gap-4 font-bold text-white lg:px-12 md:px-12 px-4">
        <div className="flex flex-row gap-4">
        <li>
          <NavLink to={token ? "/": "/login"}>Home</NavLink>
        </li>
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
        <li>
          <NavLink to="/contact">Contact Us</NavLink>
        </li>
        </div>
        <div>
        {token && <li className=" cursor-pointer" onClick={logout}>Logout</li>}
        </div>
        <p className="font-semibold text-gray-400">
          {token && <NavLink to="/profile">{username}</NavLink>}
        </p>
      </ul>
    </nav>
  );
}
