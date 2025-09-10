import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../context/Userr.contex";
export default function GusetRoute({ children }) {
  const { token } = useContext(UserContext);
  if (!token) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
}
