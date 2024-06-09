/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Button, TextField, Box } from "@mui/material";
import axios from "axios";

const EmployeeUpdateForm = ({ employeeId, onClose, onUpdate }) => {
  const [employeeData, setEmployeeData] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
    mobileNo: "",
  });

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const token = localStorage.getItem("jwt");
        const response = await axios.get(`/api/employees/${employeeId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEmployeeData(response.data);
      } catch (error) {
        console.error("Error fetching employee details:", error);
      }
    };

    if (employeeId) {
      fetchEmployeeDetails();
    }
  }, [employeeId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("jwt");
      await axios.put(
        `http://localhost:9000/api/admin/employees/${employeeId}`,
        employeeData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      onUpdate();
      onClose();
      console.log("Employee updated successfully.......!", employeeData);
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <TextField
        label="Name"
        name="name"
        value={employeeData.name}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Email"
        name="email"
        value={employeeData.email}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        value={employeeData.password}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Mobile No."
        name="mobileNo"
        value={employeeData.mobileNo}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
        <Button onClick={onClose} sx={{ mr: 2, color: "#646cff" }}>
          Cancel
        </Button>
        <Button type="submit" variant="contained" sx={{ bgcolor: "#646cff" }}>
          Update Project
        </Button>
      </Box>
    </Box>
  );
};

export default EmployeeUpdateForm;
