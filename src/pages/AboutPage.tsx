import React from "react";
import { auto_test, bg, collab_test, unit_test } from "../assets/images";

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
        <p className="font-sen ss:text-2xl text- font-bold">Our Team</p>
      </div>

      <div className="pt-6 px-8 pb-12 font-quicksand flex space-x-7 ss:justify-around relative md:mb-36">
        <div className="container_first w-fit h-36 shadow-2xl sm:w-1/5 sm:h-56">
          <a href="https://github.com/alsongarbuja" target="_blank">
            <p className="pt-4 px-1 ss:pt-9">
              Alson
              <br />
              Garbuja
            </p>
          </a>

          <img
            src="https://avatars.githubusercontent.com/u/42911859?v=4"
            alt="alson_img"
            className="w-28 sm:w-full"
          />
        </div>
        <div className="container_first w-fit h-36 shadow-2xl sm:w-1/5 sm:h-56">
          <a href="https://github.com/salipa-gurung" target="_blank">
            <p className="pt-4 px-1 ss:pt-9">
              Salipa <br />
              Gurung
            </p>
          </a>
          <img
            src="https://avatars.githubusercontent.com/u/53458341?v=4"
            alt="salipa_img"
            className="w-28 sm:w-full"
          />
        </div>
        <div className="container_first w-fit h-36 shadow-2xl sm:w-1/5 sm:h-56 ">
          <a href="https://github.com/prasiddha777" target="_blank">
            <p className="pt-4 px-1 ss:pt-9">
              Prasiddha <br />
              Khadka
            </p>
          </a>

          <img
            className="w-28 sm:w-full"
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
