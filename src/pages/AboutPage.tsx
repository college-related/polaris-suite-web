import {
  auto_test,
  collab_test,
  github_logo,
  unit_test,
} from "../assets/images";

const AboutPage = () => {
  return (
    <div>
      <div className="about_header pb-12">
        <div className="heading_text flex flex-col items-center mt-20">
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

      <div className="bg-bg text-center py-5 h-fit sm:h-[700px] flex flex-col justify-center">
          <p className="text-h4 font-bold font-sen">Our Story</p>
          <p className="w-3/4 mx-auto my-4">
            We are a group of 3 students from Gandaki College Of Engineering and Science who are
            passionate about software development. We have been working on
            various projects and have been using various testing tools. We
            realized that there is a need for a tool that can automate the
            testing process and make it easier for developers to collaborate and test their
            code with testers and other stakeholders of the project/product. So, as a major project
            for our final year we decided to build a tool that can automate the testing
            process and make it easier for developers, testers, and stakeholders to collaborate and test their product.
          </p>
          <p className="w-3/4 mx-auto">
            Polaris suite is a tool that can automate the testing process and make it easier for developers, testers, and stakeholders to collaborate and test their product.
            It has all the necessary tools and features that are required for testing a product. It has a unit testing tool, a collaborative testing tool, and an automation testing tool.
            Along side the package, we are also offering web and mobile application that can be used to manage the testing process and view the test results.
          </p>
      </div>

      {/* Below Section */}
      <div className="font-quicksand bg-gray-100 pt-12 pb-12 ">
        <div className="pl-8 sm:mx-10">
          <p className="font-sen text-h3 ss:text-2xl font-bold">Our Team</p>
        </div>
        {/*  */}
        <div className="flex flex-col sm:flex-row sm:items-baseline space-y-7 justify-around items-center sm:flex">
          <TeamCard firstname="Alson" lastname="Garbuja" username="alsongarbuja" github_profile_url="https://avatars.githubusercontent.com/u/42911859?v=4" />          
          <TeamCard firstname="Salipa" lastname="Gurung" username="salipa-gurung" github_profile_url="https://avatars.githubusercontent.com/u/53458341?v=4" />          
          <TeamCard firstname="Prasiddha" lastname="Khadka" username="Prasiddha777" github_profile_url="https://avatars.githubusercontent.com/u/53443661?v=4" />          
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

interface TeamCardProps {
  firstname: string;
  lastname: string;
  github_profile_url: string;
  username: string;
}

const TeamCard = ({ firstname, lastname, github_profile_url, username }: TeamCardProps) => {
  return (
    <div className="max-w-xs container bg-white rounded-xl shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl mt-2 ml-4 font-bold text-gray-800 cursor-pointer hover:text-gray-900 transition duration-100 pt-5 pb-4">
          {firstname}
          <br />
          {lastname}
        </h1>
        <a href={`https://github.com/${username}`} target="_blank">
          <img src={github_logo} alt="" className="w-10 h-10 mr-5" />
        </a>
      </div>
      <img
        className="w-full cursor-pointer"
        src={github_profile_url}
        alt={firstname+" "+lastname+" github profile image"}
      />
    </div>
  );
}

export default AboutPage;
