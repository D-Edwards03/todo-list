import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

function Logoff() {
  const { logout } = useAuth();
  const [error, setError] = useState("");
  const [isLoggingOff, setIsLoggingOff] = useState(false);

  async function handleLogout() {
    setError("");
    setIsLoggingOff(true);

    const result = await logout();

    if (!result.success) {
      setError(result.error);
      setIsLoggingOff(false);
    }
  }

  return (
    <div className="logoff-container">
      {error && <p style={{ color: "red"}}>{error}</p>}
      
      <button 
        onClick={handleLogout} 
        disabled={isLoggingOff}
      >
        {isLoggingOff ? "Logging off..." : "Log Off"}
      </button>
    </div>
  );
}

export default Logoff;