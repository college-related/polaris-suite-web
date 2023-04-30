import React from "react";
import { Footer, Navbar } from "../components";

interface MasterLayoutProps {
  children: JSX.Element;
}

const MasterLayout = ({ children }: MasterLayoutProps) => {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default MasterLayout;
