import { useState } from "react";
import { polaris_logo } from "../assets/images";
import { Link, NavLink, useLocation } from "react-router-dom";
import { X } from "react-feather";
import { getToken } from "../helpers/cookie";
import InstallModel from "./portal/InstallModel";

const Navbar = () => {
  const location = useLocation();
  const [showNavbar, setShowNavbar] = useState(false);
  const [showInstallModel, setShowInstallModel] = useState(false);

  const handleShowNavbar = () => {
    setShowNavbar((prev) => !prev);
  };

  return (
    <header className="flex justify-between items-center py-10 w-[80%] mx-auto">
      <div className="flex items-center w-full sm:w-fit justify-between">
        <div className="logo_container w-10">
          <Link to="/">
            <img src={polaris_logo} alt="logo"></img>
          </Link>
        </div>
        <div className="hamburger_icon sm:hidden" onClick={handleShowNavbar}>
          <div className="w-7 h-1 mb-1 bg-black"></div>
          <div className="w-7 h-1 mb-1 bg-black"></div>
          <div className="w-5 h-1 bg-black"></div>
        </div>
      </div>

      <div
        className={`bg-primary w-full fixed h-screen top-0 ease-in-out transition-all duration-300 items-center font-extralight text-2xl z-30 ${
          showNavbar ? "right-0" : "-right-full"
        } `}
      >
        <div className="flex items-center justify-between  w-full  px-7 py-7 shadow-xl">
          <h1 className="font-sen text-white">Polaris Suite</h1>
          <X onClick={handleShowNavbar} />
        </div>
        <ul className="flex flex-col items-center pt-5">
          <Link
            to="/about"
            className={`${
              location.pathname === "/about" ? "text-white" : "text-black"
            }`}
            onClick={handleShowNavbar}
          >
            <li className="bg-primary h-16 flex items-center my-3">About</li>
          </Link>
          <a
            href="https://major-project-be2018se.github.io/polaris-suite-web/#/"
            target="_blank"
            className={`${
              location.pathname === "/docs" ? "text-white" : "text-black"
            }`}
          >
            <li className="bg-primary h-16 flex items-center my-3">Docs</li>
          </a>
          <li onClick={() => setShowInstallModel(true)} className="bg-primary h-16 flex items-center">Install</li>
        </ul>
      </div>
      <div className="nav_items hidden sm:flex">
        <ul className="flex space-x-14 items-center uppercase font-bold">
          <Link
            to="/about"
            className={`${
              location.pathname === "/about" ? "text-primary" : "text-black"
            }`}
          >
            <li>About</li>
          </Link>
          <a
            href="https://major-project-be2018se.github.io/polaris-suite-web/#/"
            target="_blank"
            className={`${
              location.pathname === "/docs" ? "text-primary" : "text-black"
            }`}
          >
            <li>Docs</li>
          </a>
          <li onClick={() => setShowInstallModel(true)} className="cursor-pointer">Install</li>
          <li>
            <NavLink to={getToken()?"/polaris/dashboard":"/auth/login"} className="bg-primary text-white px-4 py-2">
              {
                getToken()?"Dashboard":"Get Started"
              }
            </NavLink>
          </li>
        </ul>
      </div>

      {showInstallModel && (<InstallModel closeModel={()=>setShowInstallModel(false)} />)}
    </header>
  );
};

export default Navbar;
