import {
  TextField,
  Paper,
  Tab,
  Tabs,
  Typography,
  Button,
  FormControl,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";

const Login = () => {

  const [tabsState, setTabsState] = useState(0);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState({
    message: "",
    error: false,
  });
  const [passwordError, setPasswordError] = useState({
    message: "",
    error: false,
  });

  const handleTabsChange = (e, newValue) => {
    setTabsState(newValue);
  };

  const handleForm = (e) => {
    e.preventDefault();
    if (login.length === 0) {
      setLoginError({
        message: "Field cannot be empty.",
        error: true,
      });
      if (password.length === 0) {
        setPasswordError({
          message: "Field cannot be empty.",
          error: true,
        });
      }
    }
}

    const handleLoginChange = (e) => {
      setLoginError({
        message: "",
        error: false,
      });
      setLogin(e.target.value);
    };

    const handlePasswordChange = (e) => {
      setPasswordError({
        message: "",
        error: false,
      });
      setPassword(e.target.value);
    };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        sx={{
          width: "30rem",
          height: "30rem",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          gap: "1rem",
          padding: "1rem",
          marginTop: "1rem",
        }}
      >
        <Typography variant="h4">COMPTUER LIST</Typography>
        <Tabs
          value={tabsState}
          onChange={handleTabsChange}
          sx={{ width: "100%" }}
        >
          <Tab label="Login" sx={{ width: "50%" }} />
          <Tab label="Register" sx={{ width: "50%" }} />
        </Tabs>
        <form style={{ all: "inherit" }} onSubmit={handleForm}>
          <TextField
            type="text"
            label="Login"
            sx={{ width: "80%", marginTop: "1rem" }}
            onChange={handleLoginChange}
            error={loginError.error}
            helperText={loginError.message}
          />
          <TextField
            type="password"
            label="Password"
            sx={{ width: "80%", marginTop: "1rem" }}
            onChange={handlePasswordChange}
            error={passwordError.error}
            helperText={passwordError.message}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ width: "80%", height: "2rem" }}
          >
            {tabsState ? "Register" : "Login"}
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;
