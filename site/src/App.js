import "./App.css";
import Index from "./routes/Index";
import Login from "./routes/Login";
import UserList from "./routes/UserList";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
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
