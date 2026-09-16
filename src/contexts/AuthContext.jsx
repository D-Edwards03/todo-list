import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState("");


  const login = async (userEmail, password) => {
    setIsLoading(true);
    setAuthError("");

    if (!userEmail.trim() || !password.trim()) {
      setIsLoading(false);
      setAuthError("Email and password are required.");
      return { success: false };
    }

    try {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email: userEmail, password }),
      };

      const res = await fetch("/api/users/logon", options);
      const data = await res.json();

      if (res.status === 200 && data.name && data.csrfToken) {
        setEmail(userEmail);
        setName(data.name);
        setToken(data.csrfToken);
        return { success: true };
      }

      setAuthError(data?.message || "Authentication failed.");
      return { success: false };
    } catch {
      setAuthError("Network error during login.");
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);

    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": token,
        },
        credentials: "include",
      };

      await fetch("/api/users/logoff", options);
    } catch {
      // Even if server fails, we still clear client state
    } finally {
      setEmail("");
      setName("");
      setToken("");
      setIsLoading(false);
      setAuthError("");
    }

    return { success: true };
  };

  const value = {
    email,
    name,
    token,
    isAuthenticated: !!token,
    isLoading,
    authError,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
