import React from "react";
import { polaris_logo } from "../assets/images";
import Button from "../components/Button";

const Navbar = () => {
  return (
    <div className=" navbar font-lato font-extralight flex justify-between items-center px-6 py-7 sm:px-24 sm:pt-20">
      <div className="logo_container">
        <img src={polaris_logo} alt="logo"></img>
      </div>
      <div className="hamburger_icon sm:hidden">
        <div className="w-7 h-1 mb-1 bg-black"></div>
        <div className="w-7 h-1 mb-1 bg-black"></div>
        <div className="w-5 h-1 bg-black"></div>
      </div>
      <div className="nav_items hidden sm:flex">
        <ul className="flex space-x-14 items-center">
          <li>About</li>
          <li>Docs</li>
          <li className="text-primary ">Install</li>
          <li className="shadow-lg">
            <Button
              onClick={() => alert("Button 1 is clicked !")}
              variant="default"
              size="lg"
            >
              Get Started
            </Button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
