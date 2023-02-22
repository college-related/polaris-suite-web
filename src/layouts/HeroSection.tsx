import React from "react";
import {
  bg,
  node_logo,
  type_script_logo,
  js_logo,
  react_logo,
  dart_logo,
  flutter_logo,
} from "../assets/images";
import Button from "../components/Button";

const HeroSection = () => {
  return (
    <div className="font-lato">
      <div className="main_container  w-full sm:flex sm:items-center  px-7 sm:px-14">
        <div className="text_container text-center sm:flex-col ">
          <p className="text-h3 font-bold sm:text-start sm:text-h1 sm:tracking-wide">
            Automate Test with ease
          </p>
          <p className="px-6 sm:text-start sm:px-0 md:mr-96">
            Polaris suite is your test automation tool that is easy to learn,
            implement and collaborate with your team.
          </p>
          <div className="buttons pt-3 flex items-center space-x-4 justify-center sm:justify-start">
            <Button
              onClick={() => alert("Button 1 is clicked !")}
              variant="default"
              size="sm"
            >
              &#62; Install Polaris
            </Button>
            <p className="text-primary">Documentation</p>
          </div>
        </div>
        <div className="img_container">
          <img src={bg} alt="bg_image" />
        </div>
      </div>

      {/* Technologies Polaris Built on */}
      <div className="hero_btm_section px-9  sm:px-12 py-7">
        <p className="text-h6 font-bold sm:text-h2 sm:font-light sm:tracking-wider sm:pb-6">
          Technologies Polaris is built on
        </p>
        <div className="images px-2 flex justify-between py-2 sm:justify-between  flex-wrap sm:flex">
          <img className="w-16 h-16" src={node_logo} alt="node_logo" />
          <img className="w-16 h-16" src={type_script_logo} alt="ts_logo" />
          <img className="w-16 h-16" src={js_logo} alt="js_logo" />
          <img className="w-16 h-16" src={react_logo} alt="react_logo" />
          <img className="w-16 h-16" src={dart_logo} alt="dart_logo" />
          <img className="w-16 h-16" src={flutter_logo} alt="flutter_logo" />
        </div>
      </div>

      {/* Features */}
      {/* <div className="feature_section w-full bg-primary text-white">
        <div className="feature_text px-9 py-10 ">
          <div className="border w-full border-dashed"></div>
          <p className="text-h5 font-bold pb-2 pt-2">Features</p>
          <p>
            Automate your test cases with all these features of Polaris Suite.
            It is easy to implement and readjust your test with all the awesome
            utility functions available to you.
          </p>
        </div>
      </div> */}
    </div>
  );
};

export default HeroSection;
