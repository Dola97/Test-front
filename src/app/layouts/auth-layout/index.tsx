import { Navigate, useOutlet } from "react-router-dom";
import "./layout.css";
import Cookies from "js-cookie";
import { TOKEN_NAME } from "../../constants";
export const AuthLayout = () => {
  const token = Cookies.get(TOKEN_NAME);
  const outlet = useOutlet();
  if (token) {
    return <Navigate to="/" replace />;
  }
  return <main className="authmain">{outlet}</main>;
};
