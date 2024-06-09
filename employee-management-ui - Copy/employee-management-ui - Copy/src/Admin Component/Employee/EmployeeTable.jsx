/* eslint-disable no-undef */
import {
  Box,
  Button,
  Card,
  CardHeader,
  Dialog,
  DialogActions,
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
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CloseIcon from "@mui/icons-material/Close";
import CreateEmployeeForm from "./CreateEmployeeForm";
import { useEffect, useState } from "react";
import EmployeeProfessionalDetails from "./EmployeeProfessionalDetails";
import employeeService from "../Utils/employeeService";
import EmployeeUpdateForm from "./EmployeeUpdateForm";
import EmployeeAdditionalDetails from "./EmployeeAdditionalDetails";

// const employees = [1, 1, 1, 1, 1, 1];
const EmployeeTable = () => {
  const [open, setOpen] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [selectedEmployeeDetails, setSelectedEmployeeDetails] = useState(null);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);

  const handleOpenUpdateEmployee = (id) => {
    setSelectedEmployeeId(id);
    setOpenUpdate(true);
  };

  const handleCLoseUpdateEmployee = () => {
    setOpenUpdate(false);
    setSelectedEmployeeId(null);
  };

  const handleCloseCreateEmployee = () => {
    setOpen(false);
  };
  const handleOpenCreateEmployee = () => {
    setOpen(true);
  };

  const handleDetailsOpen = async (id) => {
    try {
      const token = localStorage.getItem("jwt");
      const data = await employeeService.getEmployeeProfessionalDetails(
        id,
        token
      );
      setSelectedEmployeeDetails(data);
      setOpenDetails(true);
      console.log("Employee id data", data);
    } catch (error) {
      console.error("Error fetching employee professional details:", error);
    }
  };
  const handleDetailsAddOpen = async (id) => {
    try {
      const token = localStorage.getItem("jwt");
      const data = await employeeService.getEmployeeProfessionalDetails(
        id,
        token
      );
      setSelectedEmployeeDetails(data);
      setOpenAdd(true);
      console.log("Employee id data", data);
    } catch (error) {
      console.error("Error fetching employee professional details:", error);
    }
  };

  const handleDetailsClose = () => {
    setOpenDetails(false);
    // setSelectedEmployeeDetails(null);
  };
  const handleDetailsAddClose = () => {
    setOpenAdd(false);
    // setSelectedEmployeeDetails(null);
  };

  const fetchEmployees = async () => {
    try {
      const token = localStorage.getItem("jwt");
      const data = await employeeService.getEmployees(token);
      setEmployees(data);
      console.log("Employee data", data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleDeleteEmployee = async (id) => {
    try {
      await employeeService.deleteEmployee(id);
      setEmployees((prevEmployees) =>
        prevEmployees.filter((employee) => employee.id !== id)
      );
      console.log("Employee deleted successfully.........!");
    } catch (error) {
      console.log("Error message", error);
    }
  };

  // const handleCreateSuccess = () => {
  //   fetchEmployees(); // Refresh employee list
  //   setOpen(false); // Close create employee dialog
  // };

  return (
    <Box>
      <Card
        sx={{ mt: 1, bgcolor: "#0d0e12", color: "white" }}
        className="border rounded-md border-indigo-200"
      >
        <CardHeader
          action={
            <IconButton
              onClick={handleOpenCreateEmployee}
              aria-label="settings"
              sx={{ color: "white", fontSize: "5rem" }}
            >
              <PersonAddIcon />
            </IconButton>
          }
          title={"Employees"}
          sx={{ pt: 2 }}
        />
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 650, bgcolor: "#0d0e12" }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow sx={{ fontWeight: "bold" }}>
                <TableCell
                  align="left"
                  sx={{
                    color: "white",
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                  }}
                >
                  Id
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    color: "white",
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                  }}
                >
                  Name
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    color: "white",
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                  }}
                >
                  Email
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    color: "white",
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                  }}
                >
                  Gender
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    color: "white",
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                  }}
                >
                  Professional Details
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    color: "white",
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                  }}
                >
                  Additional Details
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    color: "white",
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                  }}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees.map((item) => (
                <TableRow
                  key={item.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" sx={{ color: "white" }}>
                    {item.id}
                  </TableCell>
                  <TableCell align="left" sx={{ color: "white" }}>
                    {item.name}
                  </TableCell>
                  <TableCell align="left" sx={{ color: "white" }}>
                    {item.email}
                  </TableCell>
                  <TableCell align="left" sx={{ color: "white" }}>
                    {item.gender}
                  </TableCell>

                  <TableCell align="left">
                    <Button
                      onClick={() => handleDetailsOpen(item.id)}
                      sx={{ color: "#646cff" }}
                    >
                      View
                    </Button>
                  </TableCell>
                  <TableCell align="left">
                    <Button
                      onClick={() => handleDetailsAddOpen(item.id)}
                      sx={{ color: "#646cff" }}
                    >
                      View
                    </Button>
                  </TableCell>
                  <TableCell align="left">
                    <Button
                      onClick={() => handleOpenUpdateEmployee(item.id)}
                      sx={{ color: "#646cff" }}
                    >
                      Update
                    </Button>
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

      <Dialog
        open={open}
        onClose={handleCloseCreateEmployee}
        fullWidth
        // maxWidth="lg"
      >
        <DialogTitle>
          <div className="font-semibold text-2xl text-indigo-600">
            Create an Employee
            <IconButton
              onClick={handleCloseCreateEmployee}
              style={{ float: "right", color: "#646cff" }}
            >
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent>
          <CreateEmployeeForm
            onSuccess={fetchEmployees}
            close={handleCloseCreateEmployee}
          />
        </DialogContent>
      </Dialog>

      <Dialog
        open={openDetails}
        onClose={handleDetailsClose}
        fullWidth
        maxWidth="lg"
      >
        <DialogTitle>
          <div className="font-semibold text-2xl text-indigo-600">
            Employee Professional Details
            <IconButton
              onClick={handleDetailsClose}
              style={{ float: "right", color: "#646cff" }}
            >
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent>
          <EmployeeProfessionalDetails details={selectedEmployeeDetails} />
        </DialogContent>
        <DialogActions>
          <Button
            sx={{ mr: 4, mb: 2 }}
            color="error"
            variant="contained"
            onClick={handleDetailsClose}
            // className="mr-10"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openAdd}
        onClose={handleDetailsAddClose}
        fullWidth
        maxWidth="lg"
      >
        <DialogTitle>
          <div className="font-semibold text-2xl text-indigo-600">
            Employee Additional Details
            <IconButton
              onClick={handleDetailsAddClose}
              style={{ float: "right", color: "#646cff" }}
            >
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent>
          <EmployeeAdditionalDetails details={selectedEmployeeDetails} />
        </DialogContent>
        <DialogActions>
          <Button
            sx={{ mr: 4, mb: 2 }}
            color="error"
            variant="contained"
            onClick={handleDetailsAddClose}
            // className="mr-10"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openUpdate}
        onClose={handleCLoseUpdateEmployee}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          <div className="font-semibold text-2xl text-indigo-600">
            Update Employee Details
            <IconButton
              onClick={handleCLoseUpdateEmployee}
              style={{ float: "right", color: "#646cff" }}
            >
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent>
          <EmployeeUpdateForm
            employeeId={selectedEmployeeId}
            onClose={handleCLoseUpdateEmployee}
            onUpdate={() => {
              fetchEmployees();
              setOpenUpdate(false);
            }}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default EmployeeTable;
