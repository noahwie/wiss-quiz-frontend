import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Navigation = () => {
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = () => {
    console.log("🚪 Logout wird durchgeführt...");
    logout();
  };

  return (
    <nav className="layout-header-nav">
      <Link to="/">Home</Link>

      {isAuthenticated && <Link to="/quiz">Quiz</Link>}

      {isAuthenticated && <Link to="/leaderboard">Leaderboard</Link>}
      {isAuthenticated && <Link to="/user-stats">Stats</Link>}

      {isAuthenticated && user?.role === "ADMIN" && (
        <Link to="/admin">Fragen verwalten</Link>
      )}

      <Link to="/regeln">Regeln</Link>
      <Link to="/blabli">Impressum</Link>

      {isAuthenticated ? (
        <>
          <span
            className="nav-user-info"
            style={{
              marginLeft: "20px",
              padding: "5px 12px",
              background: user.role === "ADMIN" ? "#dc3545" : "#007bff",
              color: "white",
              borderRadius: "4px",
              fontSize: "14px",
              fontWeight: "500",
            }}
          >
            👤 {user.username} ({user.role})
          </span>

          <button
            onClick={handleLogout}
            className="nav-logout-btn"
            style={{
              marginLeft: "10px",
              padding: "5px 12px",
              background: "#6c757d",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "500",
            }}
          >
            Logout
          </button>
        </>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </nav>
  );
};

export default Navigation;
