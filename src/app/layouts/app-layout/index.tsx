import { Navigate, useOutlet } from "react-router-dom";
import "./layout.css";
import Cookies from "js-cookie";
import { TOKEN_NAME } from "../../constants";
export const AppLayout = () => {
  const token = Cookies.get(TOKEN_NAME);
  const outlet = useOutlet();
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <main className="appmain">{outlet}</main>;
};
