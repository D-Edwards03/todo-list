import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import formStyles from "../shared/Forms.module.css";

function Logon() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [isLoggingOn, setIsLoggingOn] = useState(false);

  const from = location.state?.from?.pathname || "/todos";

  async function handleSubmit(event) {
    event.preventDefault();
    setAuthError("");
    setIsLoggingOn(true);

    const result = await login(email, password);

    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setAuthError(result.error || "Failed to log on.");
      setIsLoggingOn(false);
    }
  }

  return (
    <div className={formStyles.formContainer}>
      <h2>Log On</h2>

      {authError && (
        <p className={formStyles.formError}>{authError}</p>
      )}

      <form onSubmit={handleSubmit} className={formStyles.form}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="text"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={formStyles.input}
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={formStyles.input}
        />

        <button
          type="submit"
          disabled={isLoggingOn}
          className={`${formStyles.btnPrimary} ${
            isLoggingOn ? formStyles.btnLoading : ""
          }`}
        >
          {isLoggingOn ? "Logging in..." : "Log On"}
        </button>
      </form>
    </div>
  );
}

export default Logon;
