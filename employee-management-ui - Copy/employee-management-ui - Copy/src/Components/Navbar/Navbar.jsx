/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable no-constant-condition */
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  Menu,
  MenuItem,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

const Navbar = ({ authState, setAuthState }) => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    handleClose();
    setAuthState({
      jwt: null,
      admin: null,
      employee: null,
    });
    navigate("/");
  };

  const handleOpenLogin = () => {
    setOpen(true);
  };

  const handleCloseLogin = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      const adminLoginResponse = await axios.post(
        "http://localhost:9000/auth/signin",
        {
          email,
          password,
        }
      );

      if (adminLoginResponse.status === 200) {
        localStorage.setItem("jwt", adminLoginResponse.data.jwt);
        setAuthState({
          jwt: adminLoginResponse.data.jwt,
          admin: adminLoginResponse.data,
          employee: null,
        });
        console.log("Admin login success", adminLoginResponse.data);
        navigate("/admin/");
        handleCloseLogin();
        return;
      }
    } catch (adminError) {
      console.log("Admin login failed, trying employee login", adminError);
      try {
        // If admin login fails, attempt to login as employee
        const employeeLoginResponse = await axios.post(
          "http://localhost:9000/auth/employee/signin",
          {
            email,
            password,
          }
        );

        if (employeeLoginResponse.status === 200) {
          const { jwt, id } = employeeLoginResponse.data;
          localStorage.setItem("jwt", jwt);
          console.log("Employee login success", employeeLoginResponse.data);

          // Fetch employee data using the employee ID
          const employeeDataResponse = await axios.get(
            `http://localhost:9000/api/employee/${id}`,
            {
              headers: {
                Authorization: `Bearer ${jwt}`,
              },
            }
          );

          const employeeData = employeeDataResponse.data;
          console.log("Fetched employee data", employeeData);
          setAuthState({
            jwt,
            employee: employeeData,
            admin: null,
          });

          // Navigate to the employee dashboard and pass the employee data
          // navigate(`/employee/${id}}`, { state: { employee: employeeData } });
          navigate(`/employee/${id}}`);
          handleCloseLogin();
          return;
        }
      } catch (employeeError) {
        console.log("Employee login failed", employeeError);
        setError("Invalid email or password");
      }
    }
  };

  return (
    <Box className="sticky px-5 z-50 py-[.8rem] bg-[#0d0e12] lg:px-20 flex justify-between">
      <div className="lg:mr-10 cursor-pointer flex items-center space-x-4">
        <img
          src="https://texts.com/_next/image?url=%2Ficon.png&w=64&q=75"
          alt=""
        />
        <li
          onClick={() => navigate("/")}
          className="logo font-bold text-gray-300 text-5xl list-none"
        >
          Employee
        </li>
      </div>
      <div className=" space-x-2 lg:space-x-10">
        <div className="cursor-pointer flex flex-row items-center gap-5">
          <div className="flex gap-5 font-semibold text-xl">
            <li className="list-none ">FAQ</li>
            <li className="list-none">Support</li>
          </div>
          {authState.employee ? (
            <>
              <Avatar
                onClick={handleClick}
                sx={{
                  bgcolor: "white",
                  color: "#646cff",
                  fontSize: "27px",
                  mt: 1,
                  pt: 0.3,
                  fontWeight: "semiboldbold",
                }}
              >
                {authState.employee?.name[0].toUpperCase()}
              </Avatar>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <IconButton onClick={handleOpenLogin}>
              <PersonIcon
                sx={{ fontSize: "40px" }}
                className="text-white hover: bg-indigo-400 rounded-full"
              />
            </IconButton>
          )}
          <Dialog
            open={open}
            onClose={handleCloseLogin}
            fullWidth
            maxWidth="xs"
          >
            <DialogTitle>
              <div className="font-semibold text-2xl text-indigo-600">
                Login
                <IconButton
                  onClick={handleCloseLogin}
                  style={{ float: "right", color: "#646cff" }}
                >
                  <CloseIcon />
                </IconButton>
              </div>
            </DialogTitle>
            <DialogContent>
              {/* <DialogContentText>Login here</DialogContentText> */}
              <form onSubmit={handleSubmit} className="w-[24rem]">
                {error && (
                  <div style={{ color: "red", marginBottom: "10px" }}>
                    {error}
                  </div>
                )}
                <TextField
                  sx={{
                    // backgroundColor: "#fff",
                    borderRadius: "8px",
                    fontSize: "18px",
                    border: "white",
                    color: "#fff",
                  }}
                  className="text-white"
                  fullWidth
                  label="Email"
                  margin="normal"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  margin="normal"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      defaultChecked
                      sx={{ color: "#646cff" }}
                    ></Checkbox>
                  }
                  label="Agree Terms & Conditions"
                ></FormControlLabel>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ bgcolor: "#646cff", mt: 2 }}
                >
                  Login
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </Box>
  );
};

export default Navbar;
