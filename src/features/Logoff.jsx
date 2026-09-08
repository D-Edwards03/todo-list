import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

function Logoff() {
  const { logout } = useAuth();

  const [isLoggingOff, setIsLoggingOff] = useState(false);

  async function handleLogout() {
    setIsLoggingOff(true);

    await logout();
  }

  return (
    <div className="logoff-container">
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