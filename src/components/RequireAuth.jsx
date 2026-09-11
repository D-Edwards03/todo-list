import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";

function RequireAuth({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      // Redirect to the login page and preserve the location they were trying to access
      navigate('/login', { 
        replace: true, 
        state: { from: location } 
      });
    }
  }, [isAuthenticated, navigate, location]);

  // While the useEffect is triggering the redirect, show a brief loading/redirect message
  if (!isAuthenticated) {
    return <p>Redirecting to login...</p>;
  }

  // If the user is authenticated, render the protected component
  return children;
}

export default RequireAuth;