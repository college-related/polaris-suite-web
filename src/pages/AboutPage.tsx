import React from "react";
import {
  auto_test,
  bg,
  collab_test,
  github_logo,
  unit_test,
} from "../assets/images";

const AboutPage = () => {
  return (
    <div>
      <div className="about_header">
        <div className="heading_text flex flex-col items-center">
          <p className="font-sen text-h3 font-bold sm:text-h1">
            Automate Test with Ease
          </p>
          <p className="text-center font-quicksand mx-7 my-2 sm:w-1/3">
            A successful website or application is not just about great design
            and functionality, but also about rigorous testing to ensure a
            flawless user experience
          </p>
        </div>
      </div>

      <div className="our_story_section w-full h-auto mt-32">
        <div className="outer_container flex flex-col items-center">
          <img
            src={bg}
            alt="bg_main"
            className="absolute w-72 top-52 ss:top-36 smd:top-28  md:top-28 sm:w-1/3 mt-4 sm:mt-44 lg:top-24"
          />
          <div className="container">
            <div className="bg-gradient-to-b from-indigo-300 to-white w-full h-auto sm:h-screen">
              <div
                className="bg_img w-full h-auto flex items-center justify-center flex-col
              
              "
              >
                <div className="bg-bg bg-center bg-contain bg-repeat-x sm:bg-center sm:bg-cover sm:h-screen">
                  <div className="flex flex-col items-center pt-20 px-9 md:mt-36">
                    <p className="font-sen text-h3 mt-2">Our Story</p>
                    <p className="font-quicksand sm:w-2/3 text-center pb-5">
                      Polaris Suite is a final year project build by{" "}
                      <b>Alson Garbuja</b>, <b>Salipa Gurung</b> and
                      <b> Prasiddha Khadka</b>. A group of three student
                      studying Software Engineering at Gandaki College of
                      Engineering and Science.
                    </p>
                    <p className="font-quicksand sm:w-2/3 text-center">
                      It is important academic endeavour for us while pursuing
                      degrees in information technology or related fields. This
                      project typically involves in-depth research, analysis,
                      design, implementation, and evaluation of a testing
                      application. We have applied all the theoretical concepts
                      and practical skills learned throughout their academic
                      journey to solve real-world problems.It also provides an
                      opportunity for upcoming engineers to analyze and learn
                      from our project.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Below Section */}
      <div className="px-8 pt-10 flex justify-start items-center sm:mx-10 ">
        <p className="font-sen text-h3 ss:text-2xl text- font-bold">Our Team</p>
      </div>

      <div className="font-quicksand bg-gray-100 flex flex-col sm:flex-row sm:items-baseline space-y-7 justify-around items-center pt-12 pb-12 sm:flex">
        {/*  */}
        <div className="max-w-xs container bg-white rounded-xl shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl mt-2 ml-4 font-bold text-gray-800 cursor-pointer hover:text-gray-900 transition duration-100 pt-5 pb-4">
              Alson
              <br />
              Garbuja
            </h1>
            <a href="https://github.com/alsongarbuja" target="_blank">
              <img src={github_logo} alt="" className="w-10 h-10 mr-5" />
            </a>
          </div>
          <img
            className="w-full cursor-pointer"
            src="https://avatars.githubusercontent.com/u/42911859?v=4"
            alt="alson_img"
          />
        </div>

        {/*  */}
        <div className="max-w-xs container bg-white rounded-xl shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl mt-2 ml-4 font-bold text-gray-800 cursor-pointer hover:text-gray-900 transition duration-100 pt-5 pb-4">
              Salipa
              <br />
              Gurung
            </h1>
            <a href="https://github.com/salipa-gurung" target="_blank">
              <img src={github_logo} alt="" className="w-10 h-10 mr-5" />
            </a>
          </div>
          <img
            className="w-full cursor-pointer"
            src="https://avatars.githubusercontent.com/u/53458341?v=4"
            alt="salipa_img"
          />
        </div>

        {/*  */}
        <div className="max-w-xs container bg-white rounded-xl shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl mt-2 ml-4 font-bold text-gray-800 cursor-pointer hover:text-gray-900 transition duration-100 pt-5 pb-4">
              Prasiddha <br />
              Khadka
            </h1>
            <a href="https://github.com/Prasiddha777" target="_blank">
              <img src={github_logo} alt="" className="w-10 h-10 mr-5" />
            </a>
          </div>
          <img
            className="w-full cursor-pointer"
            src="https://avatars.githubusercontent.com/u/53443661?v=4"
            alt="prasid_img"
          />
        </div>
      </div>

      {/*  */}
      <div className="our_features mb-9">
        <div className="text_features px-8 pt-10 flex justify-start items-center sm:mx-10">
          <p className="font-sen ss:text-2xl font-bold">Our Features</p>
        </div>
        <div className="pt-6 px-8 pb-12 font-quicksand flex flex-col space-y-7 font-bold ss:flex ss:flex-row space-x-7 ss:justify-around relative items-center">
          <div className="flex flex-col items-center">
            <img src={unit_test} alt="unit_testing" />
            <p className="">Unit Test</p>
          </div>
          <div className="flex flex-col items-center">
            <img src={collab_test} alt="collaborative_testing" />

            <p className="sm:pt-5 md:pt-7">Collaborative Test</p>
          </div>
          <div className="flex flex-col items-center">
            <img src={auto_test} alt="automation_test" />
            <p>Automation Test</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
