import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const Navigation = () => {
  return (
    <nav className="layout-header-nav">
      <Link to="/">Home</Link>
      <Link to="/quiz">Quiz</Link>
      <Link to="/admin">Fragen verwalten</Link>
      <Link to="/regeln">Regeln</Link>
      <Link to="/blabli">Impressum</Link>
      <Link to="/login">Login</Link>
    </nav>
  );
};

export default Navigation;
