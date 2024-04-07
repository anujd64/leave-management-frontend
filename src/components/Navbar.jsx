import { Link } from "react-router-dom";
import { useContext } from 'react';
import GlobalContext from '../context/GlobalContext';

export default function Navbar() {
  const token = useContext(GlobalContext).token;
  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <nav className="flex sticky justify-between items-center content-center top-0 py-4 backdrop-blur-sm text-xl font-bold shadow-lg z-50 w-full"
      role="navigation"
    >
      <ul className="flex flex-row items-center justify-between gap-4 font-bold text-white px-12">
        <div className="flex flex-row gap-4">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/contact">Contact Us</Link>
        </li>
        </div>
        <div>
        {token && <li className=" cursor-pointer" onClick={logout}>Logout</li>}
        </div>
      </ul>
    </nav>
  );
}
