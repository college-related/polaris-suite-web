import { HeroSection, Navbar } from "./components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MasterLayout from "./layouts/MasterLayout";
import AboutPage from "./pages/AboutPage";
import DocsPage from "./pages/DocsPage";

function App() {
  return (
    <BrowserRouter>
      <MasterLayout>
        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/docs" element={<DocsPage />} />
        </Routes>
      </MasterLayout>
    </BrowserRouter>
  );
}

export default App;
