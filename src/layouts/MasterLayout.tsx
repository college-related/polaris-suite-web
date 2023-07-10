import { PropsWithChildren } from "react";
import { Footer, Navbar } from "../components";

interface IMasterLayoutProps {}

const MasterLayout = ({ children }: PropsWithChildren<IMasterLayoutProps>) => {
  return (
    <main>
      <Navbar />
      {children}
      <Footer />
    </main>
  );
};

export default MasterLayout;
