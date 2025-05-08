import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/login";
import Register from "./pages/Auth/Register";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import { useAuth } from "./contexts/AuthContext";
import { Navigate } from "react-router-dom";
import Project from "./pages/Project";
import Builder from "./pages/Builder";
import LiveSite from "./pages/LiveSite";
import BuilderStandalone from "./pages/BuilderStandalone";
import Preview from "./pages/Preview";
import CreateProject from "./pages/CreateProject";
import UserPreview from "./pages/UserPreview";
import EditProject from "./pages/EditProject";
import ProjectBuilder from "./pages/ProjectBuilder";
import SitePreview from "./pages/SitePreview";
import AuthLanding from "./pages/Auth/AuthLanding";

function App() {
  document.documentElement.classList.add("dark");
  
  const { currentUser } = useAuth();
  return (
    <Router basename="/builder">
      <Routes>
        <Route
          path="/"
          element={<Navigate to={currentUser ? "/dashboard" : "/login"} />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/project/:id" element={<ProjectPage />} /> */}
        <Route path="/project/:id" element={<Project />} />
        <Route path="/project/:id/builder" element={<Builder />} />
        <Route path="/site/:domain" element={<LiveSite />} />
        <Route path="/builder" element={<BuilderStandalone />} />
        <Route path="/preview/:id" element={<Preview/>}/>
        <Route path="/u/:username" element={<UserPreview/>}/>
        <Route path="/create" element={<CreateProject />} />
        <Route path="/create-project" element={<CreateProject />} />
        <Route path="/project/:projectId/edit" element={<EditProject />} />
        <Route path="/project/:projectId/builder" element={<ProjectBuilder />} />
        <Route path="/site/:id" element={<SitePreview />} />
        <Route path="/auth" element={<AuthLanding/>} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}
export default App;
