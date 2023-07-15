import { BrowserRouter, Route, Routes, useParams } from "react-router-dom"

import MasterLayout from "../layouts/MasterLayout";
import ProjectLayout from "../layouts/ProjectLayout";
import ProtectedLayout from "../layouts/ProtectedLayout";
import AuthenticationLayout from "../layouts/AuthenticationLayout";

import AboutPage from "../pages/AboutPage";
import LandingPage from "../pages/LandingPage";
import { LoginPage, RegisterPage, ForgotPasswordPage, ResetPasswordPage } from "../pages/authentication";
import { 
  Dashboard, 
  ProjectsPage, 
  Settings, 
  SingleProject, 
  TestCases, 
  ProjectActivityPage, 
  ProjectSettingPage 
} from "../pages/(protected)";

import { useApiRead } from "../utils/hooks/useApiRead";

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
        <Route path="/settings" element={<Settings />} />
        <Route path="/projects/*" element={<ProjectRoutes />} />
      </Routes>
    </ProtectedLayout>
  )
}

const ProjectRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ProjectsPage />} />
      <Route path="/:projectId/*" element={<ProjectTabRoutes />} />
    </Routes>
  )
}

const ProjectTabRoutes = () => {
  const { projectId } = useParams();
  const { data, isLoading, setData } = useApiRead(`/projects/${projectId}`, "project");

  if(isLoading) return <div>Loading...</div>;

  return (
    <ProjectLayout title={data?.name || ""} description={data?.description || ""}>
      <Routes>
        <Route path="/" element={<SingleProject project={data!} projectId={projectId!} setProject={setData} />} />
        <Route path="test-cases" element={<TestCases />} />
        <Route path="settings" element={<ProjectSettingPage project={data!} setProject={setData} />} />
        <Route path="activities" element={<ProjectActivityPage />} />
      </Routes>
    </ProjectLayout>
  );
}

export default AppRoute