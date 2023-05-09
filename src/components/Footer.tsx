import { Link } from "react-router-dom";
import {
  polaris_logo,
  github_logo,
  twitter_logo,
  insta_logo,
} from "../assets/images";

const Footer = () => {
  return (
    <div className="footer w-full h-auto bg-primary px-7 py-12 sm:px-24 sm:py-14 font-quicksand">
      <div className="search_bar_flex ">
        <div className="h-44 sm:h-32 rounded-md bg-slate-100 bg-opacity-40 sm:flex sm:items-center sm:justify-between sm:px-28 md:px-20">
          <div className="text text-center sm:text-start font-sen pt-6 pb-2 text-white  sm:pt-0 sm:pb-0">
            <p className=" text-h5 sm:font-bold">Join our newsletter</p>
            <p className="font-quicksand">
              Once per week all the updates to Polaris
            </p>
          </div>
          <div className="search_bar px-2 py-2  sm:px-0 sm:py-0 font-sen sm:w-5/12 sm:pt-7">
            <input
              type="text"
              placeholder="Enter your email"
              className="rounded-full px-4 py-2 text-gray-700 focus:outline-none w-full "
            />
            <button className="bg-primary text-white rounded-full font-semibold px-8 py-2  shadow-2xl hover:shadow-sm  hover:bg-primary focus:bg-primary focus:outline-none absolute right-9 sm:relative sm:left-3/4 sm:bottom-10 font-quicksand">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Mid footer */}
      <div className="footer_content pt-9 sm:flex sm:justify-between ">
        <div className="polaris_logo text-white font-lato flex items-center pt-12">
          <div className="flex flex-col">
            <div className="inline-flex">
              <img src={polaris_logo} alt="polaris_logo" className="w-10" />
              <p className="text-2xl font-bold"> Polaris Suite</p>
            </div>

            <div className="text-white font-quicksand px-2 sm:w-80">
              Automating your test with the best experience you can have.
            </div>
          </div>
        </div>

        {/*  */}
        <div className="items pt-5 text-white flex justify-between sm:w-1/2">
          <div className="products">
            <p className="font-bold">Products</p>
            <ul>
              <li className="my-1 sm:my-2">
                <a href="">Feature</a>
              </li>
              <li className="my-1 sm:my-2">
                <a href="">Tutorials</a>
              </li>
              <li className="my-1 sm:my-2">
                <a href="">Releases</a>
              </li>
            </ul>
          </div>

          {/*  */}
          <div className="About">
            <p className="font-bold">About</p>
            <ul>
              <li className="my-1 sm:my-2">
                <Link to="/about">Polaris</Link>
              </li>
              <li className="my-1 sm:my-2">
                <a href="">Developers</a>
              </li>
            </ul>
          </div>

          {/*  */}
          <div className="social">
            <p className="font-bold">Social</p>
            <ul>
              <li className="my-1 sm:my-2">
                <a href="">Twitter</a>
              </li>
              <li className="my-1 sm:my-2">
                <a href="">LinkedIn</a>
              </li>
              <li className="my-1 sm:my-2">
                <a href="https://github.com/Major-Project-BE2018SE" target="_blank" rel="noopener noreferrer">Github</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* footer end section */}

      <div className="flex pt-9 pb-0 sm:pt-14 sm:justify-between items-center font-quicksand">
        <div className="text-white text-sm tracking-widest">
          <p>©2023 POLARIS SUITE. ALL RIGHTS RESERVED</p>
        </div>
        <div className="flex space-x-2 sm:space-x-16">
          <img src={github_logo} alt="github" className="w-7 h-7 " />
          <img src={twitter_logo} alt="twitter" className="w-7 h-7 " />
          <img src={insta_logo} alt="insta" className="w-7 h-7" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
