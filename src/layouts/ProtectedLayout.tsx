import { PropsWithChildren } from "react";
import Sidebar from "../components/Sidebar";

interface IProtectedLayoutProps {}

const ProtectedLayout = ({ children }: PropsWithChildren<IProtectedLayoutProps>) => {
  return (
    <main className="grid grid-cols-5">
      <Sidebar />
      <div className="col-span-4 p-5 h-screen overflow-y-scroll bg-gray-100">
        {children}
      </div>
    </main>
  );
};

export default ProtectedLayout;
