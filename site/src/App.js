import "./App.css";
import Index from "./routes/Index";
import Login from "./routes/Login";
import UserList from "./routes/UserList";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppBar, Typography, Button } from "@mui/material";
import { Container } from "@mui/system";

function App() {
  return (
    <div>
      <AppBar position="static">
        <Container
          maxWidth="1x"
          sx={{ height: "4rem", display: "flex", alignItems: "center", gap: '1rem' }}
        >
          <Typography>Computer List</Typography>
          <Button variant="text" color="inherit">User List</Button>
          <Button variant="text" color="inherit">Log Off</Button>
          <Button></Button>
        </Container>
      </AppBar>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/userlist" element={<UserList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
