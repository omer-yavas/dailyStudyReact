import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const { authenticated } = useSelector((store) => store.user);

  if (!authenticated) {
    return <Navigate to="/login" />;
  }
  return children;
};
export default ProtectedRoute;
