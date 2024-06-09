import { Route, Routes } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Home from "../Home/Home";
import EmployeeDashboard from "../Employee/EmployeeDashboard";
import { useEffect, useState } from "react";

const EmployeeRouter = () => {
  // const [authState, setAuthState] = useState({
  //   jwt: null,
  //   employee: null,
  //   admin: null,
  // });

  const [authState, setAuthState] = useState(() => {
    const storedAuthState = localStorage.getItem("authState");
    return storedAuthState
      ? JSON.parse(storedAuthState)
      : {
          jwt: null,
          employee: null,
          admin: null,
        };
  });

  useEffect(() => {
    localStorage.setItem("authState", JSON.stringify(authState));
  }, [authState]);

  return (
    <div>
      <Navbar authState={authState} setAuthState={setAuthState} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/employee/:id"
          element={
            <EmployeeDashboard
              authState={authState}
              setAuthState={setAuthState}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default EmployeeRouter;
