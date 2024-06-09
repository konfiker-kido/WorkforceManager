/* eslint-disable react/prop-types */
import {
  Button,
  Card,
  CardHeader,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

const ProjectEmployeeTable = ({ projects, projectId, setProjects }) => {
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddClose = () => {
    setOpen(false);
  };

  const handleAddEmployee = () => {
    setOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("jwt");
      const response = await axios.post(
        `http://localhost:9000/api/admin/projects/${projectId}/add/${formData.email}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // Fetch the updated project data
      const updatedProject = await axios.get(
        `http://localhost:9000/api/admin/projects/${projectId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setProjects((prevProjects) =>
        prevProjects.map((project) =>
          project.id === projectId ? updatedProject.data : project
        )
      );
      handleAddClose();
      console.log("Employee added successfully!", response.data);
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  const handleDeleteEmployee = async (employeeId) => {
    try {
      const token = localStorage.getItem("jwt");
      await axios.post(
        `http://localhost:9000/api/admin/projects/${projectId}/remove/${employeeId}`,{},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // Fetch the updated project data
      const updatedProject = await axios.get(
        `http://localhost:9000/api/admin/projects/${projectId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setProjects((prevProjects) =>
        prevProjects.map((project) =>
          project.id === projectId ? updatedProject.data : project
        )
      );
      console.log("Employee removed successfully!");
    } catch (error) {
      console.error("Error removing employee:", error);
    }
  };

  return (
    <div>
      <Card sx={{ mt: 1 }} className="border rounded-md border-indigo-200">
        <CardHeader
          action={
            <IconButton
              onClick={handleAddEmployee}
              aria-label="settings"
              sx={{ color: "#535bf2", fontSize: "5rem" }}
            >
              <PersonAddIcon />
            </IconButton>
          }
          title={"Employees"}
          sx={{ pt: 2 }}
        />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow sx={{ fontWeight: "bold" }}>
                <TableCell
                  align="left"
                  sx={{
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                  }}
                >
                  Id
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                  }}
                >
                  Name
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                  }}
                >
                  Email
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                  }}
                >
                  Years of Experience
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                  }}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projects.employees.map((item) => (
                <TableRow
                  key={item}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {item.id}
                  </TableCell>
                  <TableCell align="left">{item.name}</TableCell>
                  <TableCell align="left">{item.email}</TableCell>
                  <TableCell align="left">{"5"}</TableCell>
                  <TableCell align="left">
                    <Button
                      onClick={() => handleDeleteEmployee(item.id)}
                      color="error"
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
      <Dialog onClose={handleAddClose} open={open}>
        <DialogTitle>
          <div className="font-semibold text-2xl text-indigo-600">
            Add an Employee
            <IconButton
              onClick={handleAddClose}
              style={{ float: "right", color: "#646cff" }}
            >
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent>
          <div className="p-5">
            <form onSubmit={handleSubmit} className="space-y-5">
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Employee Email"
                variant="outlined"
                onChange={handleInputChange}
                value={formData.email}
              ></TextField>
              <Button
                variant="contained"
                type="submit"
                sx={{ bgcolor: "#646cff" }}
              >
                Add Employee
              </Button>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProjectEmployeeTable;
