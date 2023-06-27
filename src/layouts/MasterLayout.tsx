import { PropsWithChildren } from "react";
import { Footer, Navbar } from "../components";

interface IMasterLayoutProps {}

const MasterLayout = ({ children }: PropsWithChildren<IMasterLayoutProps>) => {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default MasterLayout;
