import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const Navigation = () => {
  const { user, isAuthenticated } = useContext(AuthContext);

  return (
    <nav className="layout-header-nav">
      <Link to="/">Home</Link>
      <Link to="/quiz">Quiz</Link>
      <Link to="/admin">Fragen verwalten</Link>
      <Link to="/regeln">Regeln</Link>
      <Link to="/blabli">Impressum</Link>

      {/* User-Anzeigen */}
      {isAuthenticated && ( 
        <span style={{ 
          marginLeft: '20px',
          padding: '5px 10xp',
          background: user.role === 'ADMIN' ? '#dc3545' : '#007bff' ,
         color: 'white',
          borderRadius: '4px',
          fontSize: '14px'
        }}>
          👤 {user.username} ({user.role})
        </span>
      )}
    </nav>
  );
};

export default Navigation;
