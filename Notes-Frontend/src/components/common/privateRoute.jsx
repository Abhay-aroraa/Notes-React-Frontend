import { Navigate } from "react-router-dom";
import { getAuthToken } from "../../services/noteService";

const PrivateRoute = ({ children }) => {
  const token = getAuthToken();
  console.log(token)
  return token ? children : <Navigate to="/" />;
};

export default PrivateRoute;
