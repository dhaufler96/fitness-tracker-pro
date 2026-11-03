import { Link, useNavigate } from "react-router";
import { useAuth } from "../auth/AuthContext";
export default function Navbar() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  return <header><p>Fitness Trackr</p><nav>
    <Link to="/activities">Activities</Link>{" | "}
    <Link to="/routines">Routines</Link>{" | "}
    {token ? <button onClick={() => { logout(); navigate("/activities"); }}>Log out</button> :
      <><Link to="/register">Register</Link>{" | "}<Link to="/login">Login</Link></>}
  </nav></header>;
}
