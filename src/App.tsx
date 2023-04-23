import { HeroSection, Navbar } from "./components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MasterLayout from "./layouts/MasterLayout";
import AboutPage from "./pages/AboutPage";
import DocsPage from "./pages/DocsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<PublicRoutes />} />
        <Route path="/docs" element={<DocsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

const PublicRoutes = () => {
  return (
    <MasterLayout>
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </MasterLayout>
  );
};

export default App;
