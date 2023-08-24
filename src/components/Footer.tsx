import { Link } from "react-router-dom";
import {
  polaris_logo,
  github_logo,
  twitter_logo,
  insta_logo,
} from "../assets/images";

const Footer = () => {
  return (
    <footer className="w-full py-12 text-white bg-dark">
      <div className="w-[80%] mx-auto">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center">
            <div className="flex flex-col">
              <div className="inline-flex">
                <img src={polaris_logo} alt="polaris_logo" className="w-10" />
                <p className="text-2xl font-bold"> Polaris Suite</p>
              </div>

              <div className="px-2 text-white sm:w-80">
                Automating your test with the best experience you can have.
              </div>
            </div>
          </div>

          <div className="flex gap-20">
            <div className="">
              <p className="font-bold">Links</p>
              <ul>
                <li className="my-1 sm:my-2">
                  <Link to="https://npmjs.org/polaris-suite" rel="noreferrer" target="_blank">NpmJs</Link>
                </li>
                <li className="my-1 sm:my-2">
                  <Link to="https://major-project-be2018se.github.io/polaris-suite-web/#/" rel="noreferrer" target="_blank">Docs</Link>
                </li>
                <li className="my-1 sm:my-2">
                  <Link to="https://github.com/Major-Project-BE2018SE/polaris-suite/releases" rel="noreferrer" target="_blank">Releases</Link>
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
                  <Link to="/about">Developers</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 mt-6 sm:flex-row">
          <p className="text-sm tracking-widest">©2023 POLARIS SUITE. ALL RIGHTS RESERVED</p>
          <div className="flex space-x-2 sm:space-x-16">
            <Link to="https://github.com/Major-Project-BE2018SE/polaris-suite" rel="noreferrer" target="_blank">
              <img src={github_logo} alt="github" className="w-7 h-7 " />
            </Link>
            <Link to="https://twitter.com/alsongarbuja" rel="noreferrer" target="_blank">
              <img src={twitter_logo} alt="twitter" className="w-7 h-7 " />
            </Link>
            <Link to="https://instagram.com/alsongarbuja" rel="noreferrer" target="_blank">
              <img src={insta_logo} alt="insta" className="w-7 h-7" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
