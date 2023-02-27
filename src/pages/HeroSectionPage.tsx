import React from "react";
import {
  bg,
  node_logo,
  type_script_logo,
  js_logo,
  react_logo,
  dart_logo,
  flutter_logo,
  dot_line,
  square,
} from "../assets/images";
import Button from "../components/Button";

const HeroSection = () => {
  return (
    <div className="font-lato">
      <div className="main_container  w-full sm:flex sm:items-center  px-7 sm:px-24">
        <div className="text_container text-center sm:flex-col ">
          <p className="text-h3 font-bold sm:text-start sm:text-h1 sm:tracking-wide font-sen">
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
      <div className="hero_btm_section px-9  sm:px-24 py-7">
        <p className="text-h6 font-bold sm:font-lato sm:text-h2 sm:font-light sm:tracking-wider sm:pb-6">
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
      <div className="feature_section w-full bg-primary text-white sm:w-fit">
        <div className="feature_text py-10 ">
          <div className="flex justify-end pl-12">
            <img src={dot_line}></img>
          </div>

          <div className="for_flex_box flex flex-col">
            <div className="sm:flex sm:flex-row-reverse sm:justify-between">
              <p className="pb-1 pt-2 text-center sm:text-start sm:w-1/3 sm:pr-16">
                <p className="font-sen text-h3">Features</p>
                <p className="text-center  text-body font-lato font-thin pl-12 pr-9 pb-7  sm:text-start sm:pl-0 sm:pr-9 sm:pb-0 sm:text-body ">
                  Automate your test cases with all these features of Polaris
                  Suite. It is easy to implement and readjust your test with all
                  the awesome utility functions available to you.
                </p>
              </p>

              <div className="first_row_flex flex space-x-4 pr-11 sm:pt-16 sm:w-2/3  sm:flex sm:space-x-8">
                <img
                  src={square}
                  className="w-24 relative right-12 h-24 sm:w-48 sm:h-48"
                ></img>
                <div className="container w-24 h-24 rounded-md bg-white bg-opacity-90 sm:w-48 sm:h-48"></div>
                <div className="container w-24 h-24 rounded-md bg-white bg-opacity-90 sm:w-48 sm:h-48"></div>
              </div>
            </div>

            {/* dotted lines */}
            {/* <div>
              <img
                className="rotate-90 relative top-48 left-16 mt-3 xs:hidden ss:hidden"
                src={dot_line}
              ></img>
            </div> */}
            {/* Boxes */}

            <div className="second_third_box_container w-fit  flex flex-col xs:flex xs:flex-row  xs:w-fit sm:flex sm:flex-row sm:justify-start sm:items-center sm:space-x-28 ">
              <div className="second_boxes pt-6  sm:ml-2">
                <div className="first_row_flex flex space-x-4 pr-11 sm:pt-18 sm:pr-0 sm:flex sm:items-center sm:space-x-7">
                  <img
                    src={square}
                    className="w-24 relative h-24 sm:w-48 sm:h-48 ml-0 sm:mb-10"
                  ></img>
                  <div className="container w-24 h-24 rounded-md bg-white bg-opacity-90 mt-4 sm:w-48 sm:h-48"></div>
                  <div className="container w-24 h-24 mt-4 rounded-md bg-white bg-opacity-90 sm:w-48 sm:h-48"></div>
                </div>
              </div>

              {/* Boxes */}
              {/* <div className="third_boxes pt-6 border-2 border-red">
                <div className="first_row_flex flex justify-end space-x-4 pr-14 sm:pt-18 sm:pr-0 sm:flex sm:items-center  ">
                  <div className="container w-24 h-24 rounded-md bg-white bg-opacity-90 mt-4 sm:w-48 sm:h-48"></div>
                  <div className="container w-24 h-24 mt-4 rounded-md bg-white bg-opacity-90 sm:w-48 sm:h-48"></div>
                </div>
              </div> */}

              <div className="second_boxes pt-6  sm:ml-2">
                <div className="first_row_flex flex space-x-4 pr-11 sm:pt-18 sm:pr-0 sm:flex sm:items-center sm:space-x-7">
                  <img
                    src={square}
                    className=" sm:hidden w-24 relative h-24 sm:w-48 sm:h-48 ml-0 sm:mb-10 opacity-0"
                  ></img>
                  <div className="container w-24 h-24 rounded-md bg-white bg-opacity-90 mt-4 sm:w-48 sm:h-48"></div>
                  <div className="container w-24 h-24 mt-4 rounded-md bg-white bg-opacity-90 sm:w-48 sm:h-48"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
