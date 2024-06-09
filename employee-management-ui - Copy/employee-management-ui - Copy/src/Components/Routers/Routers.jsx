import { Route, Routes } from "react-router-dom";
import EmployeeRouter from "./EmployeeRouter";
import AdminRouter from "./AdminRouter";

const Routers = () => {
  return (
    <Routes>
      <Route path="/admin/*" element={<AdminRouter />} />
      <Route path="/*" element={<EmployeeRouter />} />
    </Routes>
  );
};

export default Routers;
