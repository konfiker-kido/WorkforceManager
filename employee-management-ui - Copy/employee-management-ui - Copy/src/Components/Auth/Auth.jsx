import { Box, Modal } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  outline: "none",
  boxShadow: 24,
  p: 4,
  borderRadius: "5px",
};

const Auth = () => {
  // const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const handleClose = () => {
    // setOpen(false);
    navigate("/");
  };
  // const handleOpen = () => {
  //   setOpen(true); // Open the modal
  // };
  return (
    <>
      <Modal
        className="border-red-200"
        onClose={handleClose}
        open={
          location.pathname === "/account/register" ||
          location.pathname === "/account/login"
        }
      >
        <Box sx={style}>
          {location.pathname === "/account/register" ? (
            <RegisterForm />
          ) : (
            <LoginForm />
          )}
        </Box>
      </Modal>
    </>
  );
};

export default Auth;
