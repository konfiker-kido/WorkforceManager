import { Route, Routes } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminDashboard from "../Dashboard/AdminDashboard";
import Employee from "../Employee/Employee";
import Project from "../Project/Project";

const Admin = () => {
  return (
    <div>
      <div className="lg:flex justify-between">
        <div>
          <AdminSidebar />
        </div>
        <div className="lg:w-[80%]">
          <Routes>
            <Route path="/" element={<AdminDashboard />} />
            <Route path="/employees" element={<Employee />} />
            <Route path="/projects" element={<Project />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Admin;
