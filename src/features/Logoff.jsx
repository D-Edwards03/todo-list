import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";

function Logoff() {
  const { logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [isLoggingOff, setIsLoggingOff] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isLoggingOff && isAuthenticated) {
      navigate('/login', {replace: true});
    }
  }, [isAuthenticated, isLoggingOff, navigate]);

  async function handleLogoff() {
    setIsLoggingOff(true);
    setError('');

    const result = await logout();

    if (!result.success) {
      setError(result.error || 'Failed to log off.');
      setIsLoggingOff(false);
    }
  }

  if (!isAuthenticated && !isLoggingOff) {
    return null;
  }

  return (
    <div className="logoff-container">
      {error && <span style={{ color: 'red' }}>{error}</span>}
      <button 
        onClick={handleLogoff} 
        disabled={isLoggingOff}
      >
        {isLoggingOff ? "Logging off..." : "Log Off"}
      </button>
    </div>
  );
}

export default Logoff;