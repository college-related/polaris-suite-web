import { BrowserRouter, Route, Routes } from "react-router-dom"
import MasterLayout from "../layouts/MasterLayout";
import AboutPage from "../pages/AboutPage";
import DocsPage from "../pages/DocsPage";
import LandingPage from "../pages/LandingPage";

const AppRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<PublicRoutes />} />
        <Route path="/docs" element={<DocsPage />} />
      </Routes>
    </BrowserRouter>
  )
}

const PublicRoutes = () => {
    return (
      <MasterLayout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </MasterLayout>
    );
};
  

export default AppRoute