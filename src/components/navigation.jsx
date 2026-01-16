import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Navigation = () => {
  // AuthContext verwenden
  const { isAuthenticated, user, logout } = useAuth();

  /**
   * Logout Handler
   */
  const handleLogout = () => {
    console.log("🚪 Logout wird durchgeführt...");
    logout();
    // Redirect passiert automatisch in AuthContext!
  };

  return (
    <nav className="layout-header-nav">
      <Link to="/">Home</Link>
      <Link to="/quiz">Quiz</Link>
      <Link to="/admin">Fragen verwalten</Link>
      <Link to="/regeln">Regeln</Link>
      <Link to="/blabli">Impressum</Link>
      {/* Conditional Rendering basierend auf Auth-Status */}
      {isAuthenticated ? (
        // ==========================================
        // EINGELOGGT: User-Info + Logout
        // ==========================================
        <>
          {/* User Info anzeigen */}
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

          {/* Logout Button */}
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
        // ==========================================
        // NICHT EINGELOGGT: Login Link
        // ==========================================
        <Link to="/login">Login</Link>
      )}
    </nav>
  );
};

export default Navigation;
