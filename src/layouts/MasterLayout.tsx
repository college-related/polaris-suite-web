import { Footer, Navbar } from "../components";

interface IMasterLayoutProps {
  children: JSX.Element;
}

const MasterLayout = ({ children }: IMasterLayoutProps) => {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default MasterLayout;
