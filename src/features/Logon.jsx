import { useState } from "react";

function Logon({ onSetEmail, onSetToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [isLoggingOn, setIsLoggingOn] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setAuthError("");
    setIsLoggingOn(true);

    try {
      const response = await fetch("/api/users/logon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.status === 200 && data.name && data.csrfToken) {
        onSetEmail(data.name);
        onSetToken(data.csrfToken);
      } else {
        setAuthError(`Authentication failed: ${data?.message}`);
      }
    } catch (error) {
      setAuthError(`Error: ${error.name} | ${error.message}`);
    } finally {
      setIsLoggingOn(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Logon</h2>

      {authError && <p style={{ color: "red" }}>{authError}</p>}

      <label htmlFor="logon-email">Email</label>
      <input
        id="logon-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label htmlFor="logon-password">Password</label>
      <input
        id="logon-password"
        type="password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit" disabled={isLoggingOn}>
        {isLoggingOn ? "Logging in..." : "Logon"}
      </button>
    </form>
  );
}

export default Logon;
