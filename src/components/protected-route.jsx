import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

// Protected Route Component Schützt Routen vor unauthentifizierten zugriffen
const ProtectedRoute = ({ children, requiredRole }) => {
    const { isAuthenticated, user, isLoading } = useAuth();

    // Während AuthContext noch Lädt, zeige Loading
    if (isLoading) {
        return (
            <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                minHeight: '60vh' 
            }}>
                <h2>Lädt...</h2>
            </div>    
        );
    }

    // Check 1: Ist User eingeloggt?
    if (!isAuthenticated) {
        console.log('ProtectedRoute: Nicht eingeloggt - Redirect zu /login');
        return <Navigate to="/login" replace />;
    }

    // Check 2: Hat User die richtige Rolle? 
    if (requiredRole && user?.role !== requiredRole) {
        console.log(`ProtectedRoute: Rolle "${user?.role}" nicht ausreichend. Erfordelrich: "${requiredRole}`);

        // Redirect zu Forbidden Page (oder zurück zu Home)
        return <Navigate to="/forbidden" replace />
    }

    // Alle checks bestanden 
    console.log('ProtectedRoute: Zugriff gewährt');
    return children;
};

export default ProtectedRoute;