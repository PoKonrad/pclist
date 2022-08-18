import logo from './logo.svg';
import './App.css';
import Index from './routes/Index'
import Login from './routes/Login'
import UserList from './routes/UserList'
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  Routes
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path='/' element={<Index />} />
      <Route path='/login' element={<Login />} />
      <Route path='/userlist' element={<UserList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
