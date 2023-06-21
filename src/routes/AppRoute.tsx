import { BrowserRouter, Route, Routes } from "react-router-dom"
import MasterLayout from "../layouts/MasterLayout";
import AuthenticationLayout from "../layouts/AuthenticationLayout";
import AboutPage from "../pages/AboutPage";
import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/authentication/LoginPage";
import RegisterPage from "../pages/authentication/RegisterPage";
import ForgotPasswordPage from "../pages/authentication/ForgotPasswordPage";
import ResetPasswordPage from "../pages/authentication/ResetPasswordPage";
import Dashboard from "../pages/(protected)/Dashboard";
import ProtectedLayout from "../layouts/ProtectedLayout";
import ProjectsPage from "../pages/(protected)/projects";
import SettingPage from "../pages/(protected)/Settings";
import SingleProject from "../pages/(protected)/projects/project";

const AppRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<PublicRoutes />} />
        <Route path="/auth/*" element={<AuthenticationRoutes />} />
        <Route path="/polaris/*" element={<ProtectedRoutes />} />
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

const AuthenticationRoutes = () => {
  return (
    <AuthenticationLayout>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
      </Routes>
    </AuthenticationLayout>
  );
}
  
const ProtectedRoutes = () => {
  return (
    <ProtectedLayout>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<SettingPage />} />
        <Route path="/projects/*" element={<ProjectRoutes />} />
      </Routes>
    </ProtectedLayout>
  )
}

const ProjectRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ProjectsPage />} />
      <Route path="/:projectId" element={<SingleProject />} />
    </Routes>
  )
}

export default AppRoute