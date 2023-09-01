import { Link } from "react-router-dom";
import {
  node_logo,
  type_script_logo,
  js_logo,
  react_logo,
  dart_logo,
  flutter_logo,
  domo_logo,
  hero_illustration,
  feature_illustration_1,
  feature_illustration_2,
  feature_illustration_3,
  feature_line,
} from "../assets/images";
import Button from "../components/Button";
import InstallModel from "../components/portal/InstallModel";
import { useState } from "react";
import Container from "../components/utility/Container";
import FeatureCard from "../components/landing/FeatureCard";
import { features } from "../utils/features";

const LandingPage = () => {
  const [showInsallModel, setShowInstallModel] = useState(false);

  return (
    <article>
      {/* Hero section */}
      <Container>
        <div className="w-full text-center lg:text-start lg:w-1/3">
          <h1 className="text-h1 lg:tracking-wide">
            Automate Test Case With Ease
          </h1>
          <p className="">
            Easy to learn, implement and use in your project
            <span className="font-bold text-primary"> polaris suite</span> is the testing tool you will ever need
          </p>
          <div className="flex items-center justify-center pt-3 space-x-4 lg:justify-start">
            <Button
              onClick={() => setShowInstallModel(true)}
              variant="primary"
              classes="font-bold"
              size="md"
            >
              &#62; Install Polaris
            </Button>
            <Link target="_blank" to="https://major-project-be2018se.github.io/polaris-suite-web/#/" className="font-bold text-deep_blue">Documentation</Link>
          </div>
        </div>
        <img src={hero_illustration} alt="ilustration of a man working in computer and laptop" className="w-[600px]" />
      </Container>

      {/* Features */}
      <Container margin="my-32">
        <div className="flex flex-col w-full gap-40 lg:w-1/3">
          {
            features.map(feature => <FeatureCard key={feature.id} title={feature.title} description={feature.description} />)
          }
        </div>
        <div className="relative flex-col items-end flex-1 hidden lg:flex">
          <img src={feature_illustration_1} alt="" className="w-[400px] mb-24" />
          <img src={feature_illustration_2} alt="" className="w-[400px] mr-72" />
          <img src={feature_illustration_3} alt="" className="w-[400px] mt-24" />
          <img src={feature_line} alt="" className="w-[350px] absolute top-0 bg-transparent" />
        </div>
      </Container>

      {/* Technologies Polaris Built on */}
      <div className="py-12 bg-primary_light">
        <Container margin="my-0">
          <div className="w-full">
            <h3 className="font-bold text-h3 sm:tracking-wider">
              Technologies Used in polaris suite
            </h3>
            <div className="flex flex-wrap justify-between w-full pt-6">
              <img className="w-16 h-16" src={node_logo} alt="node js logo" />
              <img className="w-16 h-16" src={type_script_logo} alt="typescript logo" />
              <img className="w-16 h-16" src={js_logo} alt="javascript logo" />
              <img className="w-16 h-16" src={react_logo} alt="react logo" />
              <img className="w-16 h-16" src={dart_logo} alt="dart logo" />
              <img className="w-16 h-16" src={flutter_logo} alt="flutter logo" />
            </div>
          </div>
        </Container>
      </div>

      {/* Usage */}
      <Container margin="my-24">
        <div className="w-full">
          <h3 className="text-center text-h3 sm:text-start">
            Used by all these amazing products
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-6 lg:justify-between">
            <img
              className="w-36 h-36 sm:w-56 sm:h-48"
              src="/client-logos/rails.svg"
              alt="rails logo"
            />
            <img
              className="w-36 h-36 sm:w-56 sm:h-48"
              src="/client-logos/talewears.svg"
              alt="talewears logo"
            />
            <img
              className="w-36 h-36 sm:w-56 sm:h-48"
              src="/client-logos/polaris.svg"
              alt="polaris logo"
            />
            <img
              className="w-36 h-36 sm:w-56 sm:h-48"
              src="/client-logos/thankadigital.svg"
              alt="thanka digital logo"
            />
          </div>
        </div>
      </Container>

      {showInsallModel && (<InstallModel closeModel={()=>setShowInstallModel(false)} />)}
    </article>
  );
};

export default LandingPage;
