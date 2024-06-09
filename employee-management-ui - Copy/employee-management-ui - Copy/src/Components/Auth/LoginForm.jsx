import { Button, TextField, Typography } from "@mui/material";
import { useState } from "react";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Username:", username);
    console.log("Password:", password);
  };
  return (
    <div className="flex justify-center py-20">
      <Typography variant="h5" className="text-center">
        Login
      </Typography>
      <form onSubmit={handleSubmit} className="w-[24rem]">
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
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
