import { PropsWithChildren } from "react";
import Sidebar from "../components/Sidebar";
import { polaris_logo } from "../assets/images";
import { Link } from "react-router-dom";

interface IProtectedLayoutProps {}

const ProtectedLayout = ({ children }: PropsWithChildren<IProtectedLayoutProps>) => {
  return (
    <main >
      <header className="bg-neutral_white flex justify-between items-center p-4 border-b">
        <Link to="/">
          <span className="font-bold flex items-center gap-2">
            <img src={polaris_logo} alt="polaris suite logo" className="w-10 h-10" />
            Poalris Suite
          </span>
        </Link>
        <span className="w-12 h-12 rounded-full bg-neutral_gray"></span>
      </header>
      <div className="flex justify-center">
        <Sidebar />
        <div className="p-5 w-full min-h-[85vh]">
          {children}
        </div>
      </div>
    </main>
  );
};

export default ProtectedLayout;
