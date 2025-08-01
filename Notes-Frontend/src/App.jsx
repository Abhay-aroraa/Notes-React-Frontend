import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';
import Archieve from './pages/archieve';
import Trash from './pages/trash';
import Login from './pages/Login';
import SignUp from './pages/Signup';
import ForgetPassword from './pages/ForgetPassword';
import PrivateRoute from "./components/common/privateRoute";

function App() {
  return (
    <Router>
      <Toaster position="bottom-left" reverseOrder={false} />

      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forget-password" element={<ForgetPassword />} />

        {/* Protected routes */}
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/trash"
          element={
            <PrivateRoute>
              <Trash />
            </PrivateRoute>
          }
        />
        <Route
          path="/archieve"
          element={
            <PrivateRoute>
              <Archieve />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
