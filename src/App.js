import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/AdminDashboard";
import AddEmployee from "./pages/AddEmployee";
import ViewEmployees from "./pages/ViewEmployees";
import ViewContacts from "./pages/ViewContacts";
import RealTalkBlog from "./pages/RealTalkBlog";
import Header from "./components/Header";
import Footer from "./components/Footer";
import RequireAuth from "./components/RequireAuth";
import Login from "./pages/Login";
import Register from "./pages/Register";
import WebDevelopment from "./pages/Web";
import AppDevelopment from "./pages/AppD";
import Accounting from "./pages/Acc";
import OracleEBS from "./pages/EBS";
import OracleDatabase from "./pages/DB";
import EditStats from "./pages/EditStats";
import Chatbot from "./components/Chatbot";
import ForgotPassword from "./pages/ForgotPassword";
import CMSManager from "./pages/CMSManager";
import Career from "./pages/Career";
import ViewApplications from "./pages/ViewApplications";
import Portfolio from "./pages/Portfolio";
import Welcome from "./pages/Welcome";
import HRDashboard from "./pages/HRDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import HRViewProfiles from "./pages/HRViewProfiles";
import EmployeeProfile from "./pages/EmployeeProfile";
import ApplyLeave from "./pages/ApplyLeave";
import HRLeavePanel from "./pages/HRLeavePanel";
import MyLeaveStatus from "./pages/MyLeaveStatus";

import "./App.css";

function App() {
  const [dark, setDark] = useState(false);
  const [refreshStats, setRefreshStats] = useState(false);
  const [employeeList, setEmployeeList] = useState([]);

  useEffect(() => {
    document.body.className = dark ? "dark-theme" : "light-theme";
    return () => {
      document.body.className = "";
    };
  }, [dark]);

  return (
    <Router>
      <MainApp
        dark={dark}
        setDark={setDark}
        refreshStats={refreshStats}
        setRefreshStats={setRefreshStats}
        employeeList={employeeList}
        setEmployeeList={setEmployeeList}
      />
    </Router>
  );
}

function MainApp({ dark, setDark, refreshStats, setRefreshStats, employeeList, setEmployeeList }) {
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith("/admin") ||
                       location.pathname.startsWith("/hr") ||
                       location.pathname.startsWith("/employee");

  return (
    <>
      {/* ✅ Show header/footer/chatbot only for public pages */}
      {!isAdminRoute && <Header dark={dark} setDark={setDark} />}
      
      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<RequireAuth><Home dark={dark} /></RequireAuth>} />
        <Route path="/about" element={<RequireAuth><About dark={dark} /></RequireAuth>} />
        <Route path="/services" element={<RequireAuth><Services dark={dark} /></RequireAuth>} />
        <Route path="/blog" element={<RequireAuth><Blog dark={dark} /></RequireAuth>} />
        <Route path="/contact" element={<RequireAuth><Contact dark={dark} /></RequireAuth>} />
        <Route path="/portfolio" element={<RequireAuth><Portfolio /></RequireAuth>} />
        <Route path="/real-talk" element={<RequireAuth><RealTalkBlog /></RequireAuth>} />
        <Route path="/career" element={<RequireAuth><Career /></RequireAuth>} />
        <Route path="/services/web-development" element={<RequireAuth><WebDevelopment dark={dark} /></RequireAuth>} />
        <Route path="/services/app-development" element={<RequireAuth><AppDevelopment dark={dark} /></RequireAuth>} />
        <Route path="/services/accounting" element={<RequireAuth><Accounting dark={dark} /></RequireAuth>} />
        <Route path="/services/oracle-ebs" element={<RequireAuth><OracleEBS dark={dark} /></RequireAuth>} />
        <Route path="/services/oracle-database" element={<RequireAuth><OracleDatabase dark={dark} /></RequireAuth>} />

        {/* Public Auth Pages */}
        <Route path="/login" element={<Login dark={dark} setDark={setDark} />} />
        <Route path="/register" element={<Register dark={dark} setDark={setDark} />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/welcome" element={<Welcome />} />

        {/* Admin Pages */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<RequireAuth><Dashboard employeeList={employeeList} /></RequireAuth>} />
        <Route path="/admin/add-employee" element={<RequireAuth><AddEmployee onAdded={() => setRefreshStats(prev => !prev)} /></RequireAuth>} />
        <Route path="/admin/view-employees" element={<RequireAuth><ViewEmployees onDataFetched={setEmployeeList} /></RequireAuth>} />
        <Route path="/admin/applications" element={<RequireAuth><ViewApplications /></RequireAuth>} />
        <Route path="/admin/view-contacts" element={<RequireAuth><ViewContacts /></RequireAuth>} />
        <Route path="/admin/edit-stats" element={<RequireAuth><EditStats /></RequireAuth>} />
        <Route path="/admin/cms" element={<RequireAuth><CMSManager /></RequireAuth>} />
        <Route path="/admin/leave-panel" element={<RequireAuth><HRLeavePanel /></RequireAuth>} />

        {/* HR Pages */}
        <Route path="/hr" element={<RequireAuth><HRDashboard /></RequireAuth>} />
        <Route path="/hr/view-profiles" element={<RequireAuth><HRViewProfiles /></RequireAuth>} />

        {/* Employee Pages */}
        <Route path="/employee" element={<RequireAuth><EmployeeDashboard /></RequireAuth>} />
        <Route path="/employee/profile" element={<RequireAuth><EmployeeProfile /></RequireAuth>} />
        <Route path="/employee/apply-leave" element={<RequireAuth><ApplyLeave /></RequireAuth>} />
        <Route path="/employee/my-leaves" element={<RequireAuth><MyLeaveStatus /></RequireAuth>} />
      </Routes>

      {!isAdminRoute && <Footer dark={dark} />}
      {!isAdminRoute && <Chatbot />}
    </>
  );
}

export default App;
