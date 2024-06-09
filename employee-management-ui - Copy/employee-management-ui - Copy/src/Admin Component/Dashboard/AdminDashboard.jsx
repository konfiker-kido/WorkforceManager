import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <div
      className="min-h-[80vh] flex flex-col justify-center
   items-center text-center"
    >
      <div className="flex flex-col items-center justify-center">
        <AccountCircleIcon
          sx={{ fontSize: "9rem", color: "#646cff" }}
          className="rounded-full"
        />
        <h1 className="text-2xl font-semibold py-5">Srinu Viswa</h1>
        <p className="font-semibold text-xl">Email: srinu@gmail.com</p>
        <Button
          variant="contained"
          onClick={handleLogout}
          sx={{ margin: "2rem 0rem", bgcolor: "#646cff" }}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default AdminDashboard;
