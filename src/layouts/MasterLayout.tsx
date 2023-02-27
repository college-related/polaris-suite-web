import React from "react";
import { Navbar } from "../components";

interface MasterLayoutProps {
  children: JSX.Element;
}

const MasterLayout = ({ children }: MasterLayoutProps) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default MasterLayout;
